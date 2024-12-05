import os
import csv
import geopandas as gpd
import pandas as pd
from shapely.geometry import Point, Polygon
import numpy as np
import matplotlib.pyplot as plt
from tqdm import tqdm

def create_grid(bounds, resolution):
    minx, miny, maxx, maxy = bounds
    x_coords = np.arange(minx, maxx, resolution)
    y_coords = np.arange(miny, maxy, resolution)
    grid = []
    for x in x_coords:
        for y in y_coords:
            grid.append(Polygon([(x, y), (x + resolution, y), (x + resolution, y + resolution), (x, y + resolution)]))
    return gpd.GeoDataFrame({'geometry': grid}, crs="EPSG:4326")

def read_route_plans(folder_path, time_folder):
    csv_path = os.path.join(folder_path, time_folder, 'route_plans.csv')
    if not os.path.exists(csv_path):
        return pd.DataFrame()
    return pd.read_csv(csv_path)

def count_points_in_grid(grid, points):
    counts = np.zeros(len(grid))
    grid_sindex = grid.sindex  # 创建空间索引
    for point in tqdm(points, desc="Counting points in grid"):
        possible_matches_index = list(grid_sindex.intersection(point.bounds))
        possible_matches = grid.iloc[possible_matches_index]
        precise_matches = possible_matches[possible_matches.contains(point)]
        if not precise_matches.empty:
            counts[precise_matches.index[0]] += 1
    return counts

def plot_heatmap(grid, boundary, column, title, output_path):
    fig, ax = plt.subplots(1, 1, figsize=(10, 10))
    grid.plot(column=column, ax=ax, legend=True, cmap='OrRd', legend_kwds={'label': "Counts"})
    boundary.boundary.plot(ax=ax, edgecolor='black')
    plt.title(title)
    plt.savefig(output_path)
    plt.show()

def main():
    # 读取格网边界
    shapefile_path = r'E:\webgislocation\analysis\data\randomregion.shp'
    grid_boundary = gpd.read_file(shapefile_path)
    bounds = grid_boundary.total_bounds

    # 生成500米分辨率的格网
    resolution = 0.02  # 约2000米
    grid = create_grid(bounds, resolution)

    # 文件夹路径
    routelist_folder = r'E:\webgislocation\analysis\routelist'
    other_routelist_folder = r'E:\webgislocation\analysis\other_routelist'
    time_folder = '5_t17_50_00'  # 替换为你选择的时间文件夹

    # 读取两个文件夹中对应时间的route_plans.csv文件
    routelist_df = read_route_plans(routelist_folder, time_folder)
    other_routelist_df = read_route_plans(other_routelist_folder, time_folder)

    # 合并两个数据框
    combined_df = pd.concat([routelist_df, other_routelist_df])

    # 提取起点和终点
    start_points = [Point(lng, lat) for lng, lat in zip(combined_df['start_lng'], combined_df['start_lat'])]
    end_points = [Point(lng, lat) for lng, lat in zip(combined_df['end_lng'], combined_df['end_lat'])]

    # 统计每个格网单元作为起点或终点的次数
    start_counts = count_points_in_grid(grid, start_points)
    end_counts = count_points_in_grid(grid, end_points)
    total_counts = start_counts + end_counts

    # 将统计结果保存到一个新的文件中
    grid['start_counts'] = start_counts
    grid['end_counts'] = end_counts
    grid['total_counts'] = total_counts
    output_path = r'E:\webgislocation\analysis\grid_counts.csv'
    grid.to_csv(output_path, index=False)

    print(f"统计结果已保存到 {output_path}")

    # 绘制起点热力图
    plot_heatmap(grid, grid_boundary, 'start_counts', 'Start Points Heatmap', r'E:\webgislocation\analysis\start_points_heatmap.png')

    # 绘制终点热力图
    plot_heatmap(grid, grid_boundary, 'end_counts', 'End Points Heatmap', r'E:\webgislocation\analysis\end_points_heatmap.png')

    # 绘制起点和终点之和的热力图
    plot_heatmap(grid, grid_boundary, 'total_counts', 'Total Counts Heatmap', r'E:\webgislocation\analysis\total_counts_heatmap.png')


if __name__ == "__main__":
    main()