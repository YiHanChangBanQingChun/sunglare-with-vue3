import geopandas as gpd
import pandas as pd
from shapely.geometry import Point
import matplotlib.pyplot as plt
import numpy as np
from tqdm import tqdm
from scipy.spatial import cKDTree
import fiona

def calculate_distances(shapefile_path, output_csv_path):
    # 读取点数据的 shapefile
    print("读取 shapefile...")
    gdf = gpd.read_file(shapefile_path)
    
    print("转换坐标系")
    # 将坐标系从 EPSG:4326 转换为 EPSG:32648
    gdf = gdf.to_crs(epsg=32648)
    
    print("构建空间索引...")
    # 构建空间索引
    coords = np.array(list(gdf.geometry.apply(lambda geom: (geom.x, geom.y))))
    tree = cKDTree(coords)
    
    print("计算最近点距离...")
    # 计算每个点到最近点的距离
    distances = []
    for i in tqdm(range(len(coords)), desc="计算距离"):
        dist, idx = tree.query(coords[i], k=2)  # k=2 因为第一个最近的点是它自己
        distances.append(dist[1])
    
    # 将距离添加到 GeoDataFrame
    gdf['nearest_distance'] = distances
    
    # 保存结果到 CSV 文件
    gdf[['geometry', 'nearest_distance']].to_csv(output_csv_path, index=False)
    
    # 计算统计信息
    mean_distance = np.mean(distances)
    max_distance = np.max(distances)
    min_distance = np.min(distances)
    variance_distance = np.var(distances)
    
    print(f"平均距离: {mean_distance}")
    print(f"最大距离: {max_distance}")
    print(f"最小距离: {min_distance}")
    print(f"方差: {variance_distance}")
    
    # 绘制箱线图
    plt.boxplot(distances)
    plt.title('点到最近点的距离箱线图')
    plt.ylabel('距离 (米)')
    plt.show()

# 示例调用
# shapefile_path = r"E:\webgislocation\sun-glare-project\data\test-vector\pano_dot\panonear10inroad.shp"
# output_csv_path = r"E:\webgislocation\sun-glare-project\data\test-vector\pano_dot\panonear10inroad.csv"
# calculate_distances(shapefile_path, output_csv_path)

import fiona
import geopandas as gpd
import numpy as np
import pandas as pd
from scipy.spatial import cKDTree
from shapely.geometry import Point
from tqdm import tqdm

def generate_points_along_line(line, distance):
    points = []
    num_points = int(line.length // distance)
    for i in range(num_points + 1):
        point = line.interpolate(i * distance)
        points.append(point)
    return points

def assign_nearest_point_attributes(line_shapefile, point_shapefile, output_shapefile, distance=50, search_radius=3): # distance=50, search_radius=5
    # 读取线和点的 shapefile
    print("读取 shapefile...")
    with fiona.open(line_shapefile, encoding='utf-8') as src:
        print("读取线...")
        lines_gdf = gpd.GeoDataFrame.from_features(src, crs=src.crs)
    with fiona.open(point_shapefile, encoding='utf-8') as src:
        print("读取点...")
        points_gdf = gpd.GeoDataFrame.from_features(src, crs=src.crs)
    
    # 确保 GeoDataFrame 有 CRS
    if lines_gdf.crs is None:
        lines_gdf = lines_gdf.set_crs(epsg=4326)
    if points_gdf.crs is None:
        points_gdf = points_gdf.set_crs(epsg=4326)
    
    print("转换坐标系...")
    # 将坐标系从 EPSG:4326 转换为 EPSG:32648
    lines_gdf = lines_gdf.to_crs(epsg=32648)
    points_gdf = points_gdf.to_crs(epsg=32648)
    
    print("生成线上的点...")
    # 在每条线上每隔 distance 米生成一个点
    generated_points = []
    for line in tqdm(lines_gdf.geometry, desc="生成点"):
        generated_points.extend(generate_points_along_line(line, distance))
    
    print("创建生成的点 GeoDataFrame...")
    generated_points_gdf = gpd.GeoDataFrame(geometry=generated_points, crs=lines_gdf.crs)
    
    print("新增两列 50lon 和 50lat...")
    # 新增两列 50lon 和 50lat
    generated_points_gdf['50lon'] = generated_points_gdf.geometry.apply(lambda geom: geom.x)
    generated_points_gdf['50lat'] = generated_points_gdf.geometry.apply(lambda geom: geom.y)
    
    print("构建空间索引...")
    # 构建空间索引
    coords = np.array(list(points_gdf.geometry.apply(lambda geom: (geom.x, geom.y))))
    tree = cKDTree(coords)
    
    print("查找最近点并赋值属性...")
    # 查找每个生成的点在 search_radius 范围内最近的一个点，并赋值属性
    attributes = []
    for point in tqdm(generated_points_gdf.geometry, desc="查找最近点"):
        dist, idx = tree.query((point.x, point.y), k=1, distance_upper_bound=search_radius)
        if dist == float('inf'):
            # 没有找到匹配的点
            attributes.append([-1] * (len(points_gdf.columns) - 1))  # 排除 geometry 列
        else:
            # 找到最近的点，获取其属性，排除 geometry 列
            attributes.append(points_gdf.iloc[idx].drop('geometry').tolist())
    
    print("将属性添加到生成的点 GeoDataFrame...")
    # 将属性添加到生成的点 GeoDataFrame
    attributes_df = pd.DataFrame(attributes, columns=points_gdf.columns.drop('geometry'))
    generated_points_gdf = pd.concat([generated_points_gdf, attributes_df], axis=1)
    
    print("保存结果到 shapefile 文件...")
    # 保存结果到 shapefile 文件
    with fiona.Env(encoding='utf-8'):
        generated_points_gdf.to_file(output_shapefile, encoding='utf-8', index=False)
    
    print("处理完成，结果已保存到", output_shapefile)

# 示例调用
line_shapefile = r"E:\webgislocation\sun-glare-project\data\test-vector\whrd7.shp"
point_shapefile = r"E:\webgislocation\sun-glare-project\data\test-vector\pano_dot\panonear10inroad.shp"
output_shapefile = r"E:\webgislocation\sun-glare-project\data\test-vector\pano_dot\panonear10inroad50_2.shp"
assign_nearest_point_attributes(line_shapefile, point_shapefile, output_shapefile)
