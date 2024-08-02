import os
import time
import mxnet as mx
from mxnet.gluon.data.vision import transforms
import gluoncv
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import glob
from tqdm import tqdm
import torch

# 检查 CUDA 是否可用
if not torch.cuda.is_available():
    raise RuntimeError("CUDA is not available. Please ensure you have a compatible GPU and CUDA installed.")

print(torch.backends.cudnn.version())

# 输入和输出文件夹路径
input_folder = r'D:\wuhan_rd_pano\processed_files'
output_folder = r'D:\wuhan_rd_pano\sky_files'
csv_path = r'D:\街景全景_武汉\sunglare\pano_nr10inrd50_2_jishu.csv'

# 检查输入文件夹是否存在
start_time = time.time()
if not os.path.exists(input_folder):
    raise FileNotFoundError(f"Input folder not found: {input_folder}")
print(f"Input folder found: {input_folder}")
print(f"Time taken: {time.time() - start_time:.2f} seconds")

# 创建输出文件夹（如果不存在）
start_time = time.time()
os.makedirs(output_folder, exist_ok=True)
print(f"Output folder created or already exists: {output_folder}")
print(f"Time taken: {time.time() - start_time:.2f} seconds")

# 使用GPU
start_time = time.time()
ctx = mx.gpu() if mx.context.num_gpus() > 0 else mx.cpu()
print(f"Using context: {ctx}")
print(f"Time taken: {time.time() - start_time:.2f} seconds")

# 转换输入图像
start_time = time.time()
transform_fn = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize([.485, .456, .406], [.229, .224, .225])
])
print("Transform function created")
print(f"Time taken: {time.time() - start_time:.2f} seconds")

# 加载预训练模型
start_time = time.time()
model1 = gluoncv.model_zoo.get_model('deeplab_resnet101_citys', pretrained=True, ctx=ctx)
print("Pretrained model loaded")
print(f"Time taken: {time.time() - start_time:.2f} seconds")

# 读取CSV文件并获取所有需要处理的PID
df = pd.read_csv(csv_path, encoding='utf-8')

# 检查是否存在 'processed' 列，如果不存在则添加
if 'processed' not in df.columns:
    df['processed'] = 0

pids = df['pid'].astype(str).tolist()

# 初始化进度条
processed_pids = df[df['processed'] == 1]['pid'].astype(str).tolist()
total_files = len(pids)
processed_files = len(processed_pids)

# 预检查步骤：检查输出文件夹中的文件是否和CSV已处理文件对应
output_files = [f for f in os.listdir(output_folder) if f.endswith('.png')]
output_pids = [f.split('_')[0] for f in output_files]

for pid in output_pids:
    if pid not in processed_pids:
        print(f"Warning: Output file with PID {pid} found but not marked as processed in CSV.")

# 检查输出文件夹中的文件并更新 CSV 文件
def check_and_update_csv(csv_file_path, output_folder_path):
    df = pd.read_csv(csv_file_path)
    for index, row in df.iterrows():
        pid = row['pid']
        status = row['processed']
        output_file_1 = os.path.join(output_folder_path, f"{pid}.png")
        output_file_2 = os.path.join(output_folder_path, f"{pid}_sky.png")
        
        if status == 1:
            if not (os.path.exists(output_file_1) or os.path.exists(output_file_2)):
                df.at[index, 'processed'] = 0
                print(f"Updated status for pid {pid} to 0")
    
    df.to_csv(csv_file_path, index=False)
    print("CSV file updated")

# 调用函数检查并更新 CSV 文件
check_and_update_csv(csv_path, output_folder)

with tqdm(total=total_files, initial=processed_files, desc="处理进度") as pbar:
    # 遍历输入文件夹中的所有图像文件
    for filename in os.listdir(input_folder):
        if not filename.endswith('.jpg'):
            print(f"Skipping non-JPG file: {filename}")
            continue

        file_pid = filename.split('_')[0]
        if file_pid not in pids or file_pid in processed_pids:
            print(f"Skipping file with PID not in CSV or already processed: {filename}")
            continue

        file_path = os.path.join(input_folder, filename)
        print(f"Processing file: {file_path}")

        try:
            start_time = time.time()
            img = mx.image.imread(file_path)
            print(f"Image read successfully: {file_path}")
            print(f"Time taken: {time.time() - start_time:.2f} seconds")
        except Exception as e:
            print(f"Error reading the image file {file_path}: {e}")
            continue

        start_time = time.time()
        img = transform_fn(img)
        print(f"Image transformed: {file_path}")
        img = img.expand_dims(0).as_in_context(ctx)
        print(f"Image moved to context: {ctx}")
        print(f"Time taken: {time.time() - start_time:.2f} seconds")

        # 预测
        start_time = time.time()
        output = model1.predict(img)
        print(f"Prediction completed for: {file_path}")
        predict = mx.nd.squeeze(mx.nd.argmax(output, 1)).asnumpy()
        print(f"Prediction squeezed and converted to numpy array for: {file_path}")
        print(f"Time taken: {time.time() - start_time:.2f} seconds")

        # 识别天空
        start_time = time.time()
        sky = (predict == 10)
        print(f"Sky identified for: {file_path}")
        print(f"Time taken: {time.time() - start_time:.2f} seconds")

        # 创建黑白图像，白色表示天空，黑色表示其他
        start_time = time.time()
        sky_image = np.zeros_like(predict, dtype=np.uint8)
        sky_image[sky] = 255
        print(f"Sky image created for: {file_path}")
        print(f"Time taken: {time.time() - start_time:.2f} seconds")

        # 保存结果为PNG文件
        start_time = time.time()
        output_path = os.path.join(output_folder, filename.replace('_panorama.jpg', '_sky.png'))
        plt.imsave(output_path, sky_image, cmap='gray')
        print(f"Processed and saved sky image for {filename}")
        print(f"Time taken: {time.time() - start_time:.2f} seconds")

        # 更新CSV文件，标记已处理的PID
        df.loc[df['pid'] == file_pid, 'processed'] = 1
        processed_pids.append(file_pid)
        pbar.update(1)

        # 保存更新后的CSV文件
        df.to_csv(csv_path, index=False)
        print(f"CSV file updated with processed PID: {file_pid}")

print("Batch processing completed.")