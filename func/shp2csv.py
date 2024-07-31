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
    gdf.to_csv(csv_path, index=False, encoding='utf-8-sig')
    print(f"保存CSV文件耗时: {time.time() - start_time:.2f}秒")

# # 使用示例
# shp_path = r"E:\webgislocation\sun-glare-project\data\test-vector\pano_dot\panonear10inroad50_2.shp"
# csv_path = r"E:\webgislocation\sun-glare-project\data\test-vector\pano_dot\panonear10inroad50_2.csv"
# shp_to_csv_with_geometry(shp_path, csv_path)


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
# output_csv_path = r"E:\webgislocation\sun-glare-project\data\test-vector\pano_dot\pano_nr10inrd50_2_jishu.csv"
# process_csv(input_csv_path, output_csv_path)


