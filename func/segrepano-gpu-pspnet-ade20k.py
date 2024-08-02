# coding: utf-8
from multiprocessing import cpu_count
from multiprocessing import Pool
import time
import os
import mxnet as mx
from mxnet import image, gpu
import gluoncv
from gluoncv.data.transforms.presets.segmentation import test_transform
from gluoncv.utils.viz import get_color_pallete
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# # 忽略警告
# import warnings; warnings.filterwarnings(action='once')
# warnings.filterwarnings("ignore")

# 设定使用GPU或者CUP进行计算，没有安装GPU版本的MXNet请使用CPU
ctx = mx.gpu(0)
print("success1")
# 下载模型，这里使用的是在Cityscapes数据集上预训练的PSPnet模型
model = gluoncv.model_zoo.get_model('psp_resnet101_ade', ctx=ctx, pretrained=True)
print("success2")
col_map = {}
adeclass_f = open("ADE20K_Class.csv")
adeclass_line = adeclass_f.readline()
while adeclass_line:
    adeclass_line=adeclass_line.replace("\n","")
    adeclass_line_array=adeclass_line.split(",")
    col_map[int(adeclass_line_array[0])]=adeclass_line_array[1]
    adeclass_line = adeclass_f.readline()
adeclass_f.close()

#读取替换字段名
replace_col_dict = {}
col_map_file = open("db与df字段对应表.csv")
col_map_file_line = col_map_file.readline()
while col_map_file_line:
    col_map_file_line=col_map_file_line.replace("\n","")
    col_map_file_line_array=col_map_file_line.split(",")
    replace_col_dict[col_map_file_line_array[0]]=col_map_file_line_array[1]
    col_map_file_line = col_map_file.readline()
col_map_file.close()

def replaceColName(dfColName):
    global replace_col_dict
    #x014ground,earth/ground
    for key, value in replace_col_dict.items():
        if dfColName==value:
            return key

def findAllFiles(root_dir, filter):
    print("Finding files ends with \'" + filter + "\' ...")
    separator = os.path.sep
    paths_return = []
    names_return = []
    files_return = []
    dirs = os.listdir(root_dir)
    for dir in dirs:
        files = os.listdir(os.path.join(root_dir, dir))
        for file in files:
            if file.endswith(".jpg"):
                image_path = os.path.join(root_dir, dir, file)
                result_path=image_path+".csv"
                if os.path.exists(result_path):
                    continue
                else:
                    paths_return.append(os.path.join(root_dir, dir)+ separator)
                    names_return.append(file)
                    files_return.append(os.path.join(root_dir, dir,file))
    return paths_return, names_return, files_return

# 定义函数对单张图片进行图像分割，并将结果存为pd.Series
def segment_one_image_ade(img_path):
    global model
    global col_map
    try:
        img = image.imread(img_path)

        # img = image.resize_short(img, 512)
        base = render_as_image(img)

        img = test_transform(img,ctx=ctx)
        output = model.predict(img)
        predict = mx.nd.squeeze(mx.nd.argmax(output, 1)).asnumpy()
        pred = []
        for i in range(0,150):
            pred.append((len(predict[predict==i])/(predict.shape[0]*predict.shape[1])))
        pred = pd.Series(pred).rename(col_map)

        # 对单张图片进行可视化

        if os.path.exists(img_path.replace('.jpg', '_v.jpg')):
            os.remove(img_path.replace('.jpg', '_v.jpg'))
        mask = get_color_pallete(predict, 'ade20k')
        plt.figure(figsize=(10, 5))
        # plt.imshow(base)
        # plt.imshow(mask, alpha=0.5)
        plt.imshow(mask)
        plt.axis('off')
        plt.savefig(img_path.replace('.jpg', '_v.jpg'), dpi=300, bbox_inches='tight')

        #将结果存到文件
        csv_path = img_path.replace('.jpg', '.csv')
        if os.path.exists(csv_path):
            return
        _columns = []
        _columns.append("pid")
        _columns.append("heading")
        for col_map_i in list(col_map.values()):
            _columns.append(col_map_i)
        df = pd.DataFrame(columns=_columns)
        pid = 'pid'
        heading = 'heading'
        data_i = pd.Series({'pid': pid, 'heading': heading}).append(pred)
        df = pd.concat([df, pd.DataFrame(data_i).T], axis=0, join='outer', ignore_index=True)
        df.to_csv(csv_path, index=False)  # 将结果保存到csv

        print('---------图片' + img_path + '已完成分割计算--------, 当前进程id='+str(os.getpid()))
    except Exception as e:
        print(' 图片解析失败，错误为：' + str(e))

def render_as_image(a):
    try:
        img = a.asnumpy() # convert to numpy array
        img = img.astype(np.uint8)  # use uint8 (0-255)
        return img
    except Exception as e:
        print(str(e))

if __name__ == '__main__':
    img_paths = [r'D:\1.jpg']
    for img_path in img_paths:
        segment_one_image_ade(img_path)