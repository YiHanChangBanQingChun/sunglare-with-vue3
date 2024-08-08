import geopandas as gpd
import time
import pandas as pd

def shp_to_csv_with_geometry(shp_path, csv_path):
    start_time = time.time()
    
    # 读取Shapefile
    gdf = gpd.read_file(shp_path, encoding='utf-8')
    print(f"读取Shapefile耗时: {time.time() - start_time:.2f}秒")
    
    # 检查几何数据是否有效
    if not gdf['geometry'].is_empty.any() and gdf['geometry'].is_valid.all():
        # 将几何数据转换为WKT格式
        gdf['geometry'] = gdf['geometry'].apply(lambda x: x.wkt)
    else:
        print("警告: 几何列包含无效或空的几何对象。")
    
    start_time = time.time()
    # 将GeoDataFrame导出为CSV
    gdf.to_csv(csv_path, index=False, encoding='utf-8')
    print(f"保存CSV文件耗时: {time.time() - start_time:.2f}秒")

# # 使用示例
shp_path = r"E:\webgislocation\poinrd50_3_yaw.shp"
csv_path = r"E:\webgislocation\poinrd50_3_yaw.csv"
shp_to_csv_with_geometry(shp_path, csv_path)


import pandas as pd

def process_csv(input_csv_path, output_csv_path):
    # 读取CSV文件
    df = pd.read_csv(input_csv_path, encoding='utf-8')
    
    # 筛选出pid不等于-1的行
    df_filtered = df[df['pid'] != -1]
    
    # 统计每个pid的出现次数，并合并对应的lon_lat信息
    result = df_filtered.groupby('pid').agg(
        pid_count=('pid', 'size'),
        lon_lat=('lon', lambda x: ';'.join(f"{lon}_{lat}" for lon, lat in zip(df_filtered.loc[x.index, 'lon'], df_filtered.loc[x.index, 'lat'])))
    ).reset_index()
    
    # 按pid_count列降序排序
    result = result.sort_values(by='pid_count', ascending=False)
    
    # 添加序号列
    result.insert(0, '序号', range(1, len(result) + 1))
    
    # 清空第一行第四个格子的内容
    if not result.empty:
        result.at[0, 'lon_lat'] = ''
    
    # 保存结果到新的CSV文件
    result.to_csv(output_csv_path, index=False, encoding='utf-8-sig')

# # 使用示例
# input_csv_path = r"E:\webgislocation\sun-glare-project\data\test-vector\pano_dot\panonear10inroad50_2.csv"
# output_csv_path = r"E:\webgislocation\sun-glare-project\data\test-vector\pano_dot\pano_nr10inrd50_2_js.csv"
# process_csv(input_csv_path, output_csv_path)
import os
import shutil
import pandas as pd
from tqdm import tqdm

def copy_files_based_on_pid(csv_path, source_folders, target_folder):
    # 读取CSV文件
    df = pd.read_csv(csv_path, encoding='utf-8')
    
    # 获取所有pid，跳过第一行
    pids = df['pid'].astype(str).tolist()[1:]
    
    # 确保目标文件夹存在
    if not os.path.exists(target_folder):
        os.makedirs(target_folder)
    
    # 统计需要复制的文件数量，基于CSV文件中的行数
    total_files = len(pids)
    
    # 遍历每个源文件夹并复制文件，显示进度条
    with tqdm(total=total_files, desc="复制文件进度") as pbar:
        for folder in source_folders:
            for root, _, files in os.walk(folder):
                for file in files:
                    # 提取文件名中的pid部分
                    file_pid = file.split('_')[0]
                    if file_pid in pids:
                        # 构建源文件路径和目标文件路径
                        source_file = os.path.join(root, file)
                        target_file = os.path.join(target_folder, file)
                        try:
                            # 复制文件
                            shutil.copy2(source_file, target_file)
                            pbar.update(1)
                            print(f"复制文件: {source_file} 到 {target_file}")
                        except Exception as e:
                            print(f"错误: 无法复制文件 {source_file} 到 {target_file}. 错误信息: {e}")

# # 使用示例
# csv_path = r"D:\街景全景_武汉\sunglare\pano_nr10inrd50_2_jishu.csv"
# source_folders = [
#     r"D:\街景全景_武汉\part1",
#     r"D:\街景全景_武汉\part2_车头朝中间",
#     r"D:\街景全景_武汉\part3_车头朝中间",
#     r"D:\街景全景_武汉\part4_车头朝中间",
#     r"D:\街景全景_武汉\part5_车头朝中间"
# ]
# target_folder = r"D:\wuhan_rd_pano\processed_files"

# copy_files_based_on_pid(csv_path, source_folders, target_folder)
