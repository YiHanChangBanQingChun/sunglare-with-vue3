import geopandas as gpd
import pandas as pd
from shapely.geometry import Point
from tqdm import tqdm
from rtree import index
import os
import matplotlib.pyplot as plt
from matplotlib import rcParams
from adjustText import adjust_text
import numpy as np

def read_file():
    # 读取武汉市的面shp文件
    wuhan_shp = gpd.read_file(r"E:\webgislocation\wuhan_village.shp")

    # 读取武汉市街景点数据
    street_view_points = gpd.read_file(r"E:\webgislocation\15w_have_pano.shp")

    # 读取武汉市的50米分辨率点数据
    road_points = gpd.read_file(r"E:\webgislocation\analysis\data\dot_caiyangdian.shp")

    # 确保所有数据的坐标系一致
    wuhan_shp = wuhan_shp.to_crs(epsg=4326)
    street_view_points = street_view_points.to_crs(epsg=4326)
    road_points = road_points.to_crs(epsg=4326)

    return wuhan_shp, street_view_points, road_points

def create_rtree_index(gdf):
    idx = index.Index()
    for pos, geom in enumerate(gdf.geometry):
        idx.insert(pos, geom.bounds)
    return idx

def calculate_statistics(wuhan_shp, street_view_points, road_points, csv_path):
    # 创建一个空的 DataFrame 来存储结果
    results = pd.DataFrame(columns=['区域', '街景点数', '路网点数', '街景点占路网点比', '各区街景点比例'])

    # 创建 Rtree 索引
    street_view_idx = create_rtree_index(street_view_points)
    road_points_idx = create_rtree_index(road_points)

    # 遍历每一个县区
    for index, row in tqdm(wuhan_shp.iterrows(), total=wuhan_shp.shape[0], desc="Processing counties"):
        county_name = row['县区name']
        county_polygon = row['geometry']
        
        # 统计该县区内的街景点数
        street_view_count = sum(1 for _ in street_view_idx.intersection(county_polygon.bounds) if street_view_points.iloc[_].geometry.within(county_polygon))
        
        # 统计该县区内的路网点数
        road_point_count = sum(1 for _ in road_points_idx.intersection(county_polygon.bounds) if road_points.iloc[_].geometry.within(county_polygon))
        
        # 计算街景点占路网点比
        if road_point_count > 0:
            street_view_ratio = street_view_count / road_point_count
        else:
            street_view_ratio = 0
        
        # 计算各区街景点比例
        total_street_view_points = street_view_points.shape[0]
        county_street_view_ratio = street_view_count / total_street_view_points
        print(county_name, street_view_count, road_point_count, street_view_ratio, county_street_view_ratio)
        
        # 将结果添加到 DataFrame
        results = results.append({
            '区域': county_name,
            '街景点数': street_view_count,
            '路网点数': road_point_count,
            '街景点占路网点比': street_view_ratio,
            '各区街景点比例': county_street_view_ratio
        }, ignore_index=True)

    # 将结果写入 CSV 文件
    results.to_csv(csv_path, index=False)

    print("统计结果已写入 wuhan_county_statistics2.csv")

def plot_pie_chart(csv_path, output_path):
    # 设置全局字体为 黑体
    rcParams['font.family'] = 'SimHei'

    # 设置全局字体大小
    rcParams['font.size'] = 18

    # 读取 CSV 文件
    df = pd.read_csv(csv_path)

    # 过滤掉总计行
    df = df[df['区域'] != '总计']

    # 按各区全景影像点比例排序，从小到大
    df = df.sort_values(by='各区全景影像点比例', ascending=True)

    # 提取数据
    labels = df['区域']
    sizes = df['各区全景影像点比例'] * 100  # 转换为百分比
    colors = plt.cm.tab20(range(len(labels)))

    # 绘制饼图
    plt.figure(figsize=(10, 8))
    # wedges, texts, autotexts = plt.pie(sizes, colors=colors, startangle=90, autopct='%1.2f%%', pctdistance=0.85)
    wedges, texts, autotexts = plt.pie(sizes, colors=colors, startangle=90, autopct='', pctdistance=0.85)
    # 调整标签位置，防止遮挡
    adjust_text(texts, arrowprops=dict(arrowstyle="-", color='black'))

    # 设置百分比标签的属性
    for autotext in autotexts:
        autotext.set_color('black')
        autotext.set_fontsize(12)

    # 添加图例
    plt.legend(wedges, labels, title="区域", loc="center left", bbox_to_anchor=(1, 0, 0.5, 1))

    # 确保饼图是圆形的
    plt.axis('equal')

    # 创建表格数据
    table_data = [['区域'] + labels.tolist(), ['百分比'] + [f'{size:.2f}%' for size in sizes]]

    # 添加表格
    table = plt.table(cellText=table_data, cellLoc='center', loc='bottom', bbox=[0, -0.3, 1, 0.2])

    # 调整表格字体大小
    table.auto_set_font_size(False)
    table.set_fontsize(14)

    # 保存图像
    plt.tight_layout()
    plt.savefig(output_path)
    plt.show()

    print(f"饼图已保存到 {output_path}")

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

def main1():
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

import os
import csv
import geopandas as gpd
import pandas as pd
from shapely.geometry import Point, Polygon, LineString
import numpy as np
import matplotlib.pyplot as plt
from tqdm import tqdm

def read_route_plans(folder_path, time_folder):
    csv_path = os.path.join(folder_path, time_folder, 'route_plans.csv')
    if not os.path.exists(csv_path):
        return pd.DataFrame()
    return pd.read_csv(csv_path)

def calculate_distance_increase_percentage(routelist_folder, other_routelist_folder, time_folder):
    # 读取两个文件夹中对应时间的route_plans.csv文件
    routelist_df = read_route_plans(routelist_folder, time_folder)
    other_routelist_df = read_route_plans(other_routelist_folder, time_folder)

    # 合并两个数据框
    combined_df = pd.merge(routelist_df, other_routelist_df, on=['id', 'way', 'start_lng', 'start_lat', 'end_lng', 'end_lat'], suffixes=('_routelist', '_other'))
    combined_df.to_csv(r'E:\webgislocation\analysis\conbined.csv', index=False)
    total_distance_increase = 0
    count = 0

    for _, row in tqdm(combined_df.iterrows(), total=combined_df.shape[0], desc="Calculating distance increase"):
        uuid_routelist = row['uuid_routelist']
        uuid_other = row['uuid_other']

        geojson_path_routelist = os.path.join(routelist_folder, time_folder, f'route_plan_{uuid_routelist}.geojson')
        geojson_path_other = os.path.join(other_routelist_folder, time_folder, f'route_plan_{uuid_other}.geojson')

        if os.path.exists(geojson_path_routelist) and os.path.exists(geojson_path_other):
            route_routelist = gpd.read_file(geojson_path_routelist)
            route_other = gpd.read_file(geojson_path_other)

            # 将几何数据转换为投影坐标系
            route_routelist = route_routelist.to_crs(epsg=32648)
            route_other = route_other.to_crs(epsg=32648)

            distance_routelist = route_routelist.geometry.length.sum()
            distance_other = route_other.geometry.length.sum()

            if distance_other > 0:
                distance_increase = (distance_routelist - distance_other) / distance_other
                total_distance_increase += distance_increase
                count += 1

    if count > 0:
        average_distance_increase_percentage = (total_distance_increase / count) * 100
    else:
        average_distance_increase_percentage = 0

    return average_distance_increase_percentage

def main2():
    # 文件夹路径
    routelist_folder = r'E:\webgislocation\analysis\routelist'
    other_routelist_folder = r'E:\webgislocation\analysis\other_routelist'
    time_folder = '5_t6_00_00'  # 替换为你选择的时间文件夹
    time_csv = r'E:\webgislocation\time_merge\result_2024_05_15_interval_10min.csv'

    # # 计算无眩光路径与常规路径平均的距离增加百分比
    # average_distance_increase_percentage = calculate_distance_increase_percentage(routelist_folder, other_routelist_folder, time_folder)

    # print(f"无眩光路径与常规路径平均的距离增加百分比: {average_distance_increase_percentage:.2f}%")

    # 测试
    time_folder_list = ['5_t5_30_00', '5_t5_40_00', 
                        '5_t5_50_00', '5_t6_00_00', '5_t6_10_00',
                        '5_t6_20_00', '5_t6_30_00', '5_t6_40_00', 
                        '5_t6_50_00', '5_t7_00_00', '5_t7_10_00', 
                        '5_t7_20_00', '5_t7_30_00']
    
    # time_folder_list = ['5_t5_30_00', '5_t5_40_00', 
    #                 '5_t5_50_00', '5_t6_00_00', '5_t6_10_00',
    #                 '5_t6_20_00', '5_t6_30_00', '5_t6_40_00', 
    #                 '5_t6_50_00', '5_t7_00_00', '5_t7_10_00', 
    #                 '5_t7_20_00', '5_t7_30_00', '5_t17_10_00',
    #                 '5_t17_20_00', '5_t17_30_00', '5_t17_40_00',
    #                 '5_t17_50_00', '5_t18_00_00', '5_t18_10_00',
    #                 '5_t18_20_00', '5_t18_30_00', '5_t18_40_00',
    #                 '5_t18_50_00', '5_t19_00_00']
    
    for time_folder in time_folder_list:
        try:
            print(f"当前时间文件夹: {time_folder}")
            average_distance_increase_percentage = calculate_distance_increase_percentage(routelist_folder, other_routelist_folder, time_folder)
            if average_distance_increase_percentage is not None:
                print(f"无眩光路径与常规路径平均的距离增加百分比: {average_distance_increase_percentage:.2f}%")
            else:
                print(f"跳过文件夹 {time_folder}")
        except Exception as e:
            print(f"Error processing folder {time_folder}: {e}")
            

if __name__ == '__main__':
    # main1()
    main2()