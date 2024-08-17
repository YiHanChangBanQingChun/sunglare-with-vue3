import geopandas as gpd
from pysolar.solar import get_altitude, get_azimuth
from datetime import datetime, timezone, timedelta

def calculate_centroids(shapefile_path):
    # 读取 shapefile 数据
    gdf = gpd.read_file(shapefile_path)
    
    # 计算每个区的几何中心（质心）
    gdf['centroid'] = gdf.geometry.centroid
    
    # 将几何中心的坐标添加到数据框中
    gdf['centroid_x'] = gdf['centroid'].x
    gdf['centroid_y'] = gdf['centroid'].y
    
    # 删除多余的几何列，只保留原始几何列
    gdf = gdf.drop(columns=['centroid'])
    
    # 保存修改后的数据回原始文件
    gdf.to_file(shapefile_path, encoding='utf-8')


# # 1.计算 shapefile 文件中每个区的几何中心坐标
# shapefile_path = r"E:\webgislocation\wuhan_village.shp"
# calculate_centroids(shapefile_path)

def calculate_solar_angles(shapefile_path):
    # 读取 shapefile 数据
    gdf = gpd.read_file(shapefile_path)
    
    # 设置一个合理的时间点，例如北京时间 2024年6月22日12时
    dt = datetime(2024, 6, 22, 12, 0, 0, tzinfo=timezone(timedelta(hours=8)))
    
    # 计算太阳方位角和高度角并打印结果
    for index, row in gdf.iterrows():
        # 直接使用属性表中的质心坐标
        name = row['县区name']
        centroid_x = row['centroid_x']
        centroid_y = row['centroid_y']
        
        # 转换为 UTC 时间
        dt_utc = dt.astimezone(timezone.utc)
        azimuth = get_azimuth(centroid_y, centroid_x, dt_utc)
        altitude = get_altitude(centroid_y, centroid_x, dt_utc)
        
        # 打印中间结果以验证计算的正确性
        print(f"区 {name}: 经度 = {centroid_x:.2f}, 纬度 = {centroid_y:.2f}, UTC 时间 = {dt_utc}")
        print(f"区 {name}: 太阳方位角 = {azimuth:.2f}, 高度角 = {altitude:.2f}")
    
# 使用函数
shapefile_path = r"E:\webgislocation\wuhan_village.shp"
calculate_solar_angles(shapefile_path)