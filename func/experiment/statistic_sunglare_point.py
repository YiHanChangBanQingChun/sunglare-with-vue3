# import os
# import csv
# import geopandas as gpd
# import pandas as pd
# from shapely.geometry import Point, Polygon, LineString
# import numpy as np
# import matplotlib.pyplot as plt
# from tqdm import tqdm
# from multiprocessing import Pool

# def read_route_plans(folder_path, time_folder):
#     csv_path = os.path.join(folder_path, time_folder, 'route_plans.csv')
#     if not os.path.exists(csv_path):
#         return pd.DataFrame()
#     return pd.read_csv(csv_path)

# def read_sunglare_points(time_csv, time_column):
#     df = pd.read_csv(time_csv)
#     sunglare_points = df[df[time_column] == 1][['50lon', '50lat']]
#     return gpd.GeoDataFrame(geometry=[Point(lon, lat) for lon, lat in zip(sunglare_points['50lon'], sunglare_points['50lat'])], crs="EPSG:4326")

# def check_sunglare_on_route(route, sunglare_points, radius=0.5):
#     sunglare_points = sunglare_points.to_crs(route.crs)
#     sunglare_sindex = sunglare_points.sindex
#     for geom in route.geometry:
#         possible_matches_index = list(sunglare_sindex.intersection(geom.bounds))
#         possible_matches = sunglare_points.iloc[possible_matches_index]
#         precise_matches = possible_matches[possible_matches.distance(geom) <= radius]
#         if not precise_matches.empty:
#             return True
#     return False

# def process_route(args):
#     row, routelist_folder, other_routelist_folder, time_folder, sunglare_points = args
#     uuid_routelist = row['uuid_routelist']
#     uuid_other = row['uuid_other']

#     geojson_path_routelist = os.path.join(routelist_folder, time_folder, f'route_plan_{uuid_routelist}.geojson')
#     geojson_path_other = os.path.join(other_routelist_folder, time_folder, f'route_plan_{uuid_other}.geojson')

#     if os.path.exists(geojson_path_routelist) and os.path.exists(geojson_path_other):
#         route_routelist = gpd.read_file(geojson_path_routelist)
#         route_other = gpd.read_file(geojson_path_other)

#         # 将几何数据转换为投影坐标系
#         route_routelist = route_routelist.to_crs(epsg=32648)
#         route_other = route_other.to_crs(epsg=32648)

#         # 检查无眩光路径是否经过太阳眩光点
#         sunglare_routelist = check_sunglare_on_route(route_routelist, sunglare_points)

#         # 检查常规路径是否经过太阳眩光点
#         sunglare_other = check_sunglare_on_route(route_other, sunglare_points)

#         return sunglare_routelist, sunglare_other
#     return None, None

# def calculate_sunglare_reduction_percentage(routelist_folder, other_routelist_folder, time_folder, time_csv, time_column):
#     # 读取两个文件夹中对应时间的route_plans.csv文件
#     routelist_df = read_route_plans(routelist_folder, time_folder)
#     other_routelist_df = read_route_plans(other_routelist_folder, time_folder)

#     if routelist_df.empty or other_routelist_df.empty:
#         raise FileNotFoundError("One of the route_plans.csv files is missing or empty.")

#     # 合并两个数据框
#     combined_df = pd.merge(routelist_df, other_routelist_df, on=['id', 'way', 'start_lng', 'start_lat', 'end_lng', 'end_lat'], suffixes=('_routelist', '_other'))

#     # 读取太阳眩光点
#     sunglare_points = read_sunglare_points(time_csv, time_column)

#     total_sunglare_routelist = 0
#     total_sunglare_other = 0
#     count = 0

#     # 使用多进程并行处理
#     with Pool() as pool:
#         results = list(tqdm(pool.imap(process_route, [(row, routelist_folder, other_routelist_folder, time_folder, sunglare_points) for _, row in combined_df.iterrows()]), total=combined_df.shape[0], desc="Calculating sunglare reduction"))

#     for sunglare_routelist, sunglare_other in results:
#         if sunglare_routelist is not None and sunglare_other is not None:
#             if sunglare_routelist:
#                 total_sunglare_routelist += 1
#             if sunglare_other:
#                 total_sunglare_other += 1
#             count += 1

#     if count > 0:
#         reduction_percentage = ((total_sunglare_other - total_sunglare_routelist) / total_sunglare_other) * 100
#     else:
#         reduction_percentage = 0

#     return reduction_percentage

# def main():
#     # 文件夹路径
#     routelist_folder = r'E:\webgislocation\analysis\routelist'
#     other_routelist_folder = r'E:\webgislocation\analysis\other_routelist'
#     time_folder_list = ['5_t5_30_00', '5_t6_00_00', '5_t17_50_00']  # 替换为你选择的时间文件夹列表
#     time_csv = r'E:\webgislocation\time_merge\result_2024_05_15_interval_10min.csv'

#     for time_folder in time_folder_list:
#         try:
#             print(f"当前时间文件夹: {time_folder}")
#             # 文件名转时间列名，例如输入5_t5_30_00应转为t05:30:00，例如5_t17_50_00转为t17:50:00
#             time_parts = time_folder.split('_')[1:]
#             hour = time_parts[0][1:]  # 去除't'并获取小时部分
#             if int(hour) < 10:
#                 hour = f"0{hour}"
#             time_column = f"t{hour}:{time_parts[1]}:{time_parts[2]}"
#             print(f"时间列名: {time_column}")
#             reduction_percentage = calculate_sunglare_reduction_percentage(routelist_folder, other_routelist_folder, time_folder, time_csv, time_column)
#             print(f"无眩光路径减少太阳眩光的百分比: {reduction_percentage:.2f}%")
#         except Exception as e:
#             print(f"Error processing folder {time_folder}: {e}")

# if __name__ == '__main__':
#     main()

import os
import csv
import geopandas as gpd
import pandas as pd
from shapely.geometry import Point
import numpy as np
import matplotlib.pyplot as plt
from tqdm import tqdm
from multiprocessing import Pool

def read_route_plans(folder_path, time_folder):
    csv_path = os.path.join(folder_path, time_folder, 'route_plans.csv')
    if not os.path.exists(csv_path):
        return pd.DataFrame()
    return pd.read_csv(csv_path)

def read_sunglare_points(time_csv, time_column):
    df = pd.read_csv(time_csv)
    sunglare_points = df[df[time_column] == 1][['50lon', '50lat']]
    return gpd.GeoDataFrame(geometry=[Point(lon, lat) for lon, lat in zip(sunglare_points['50lon'], sunglare_points['50lat'])], crs="EPSG:4326")

def check_sunglare_on_route(route, sunglare_points, radius=0.2):
    sunglare_points = sunglare_points.to_crs(route.crs)
    sunglare_sindex = sunglare_points.sindex
    sunglare_count = 0
    unique_points = set()
    for geom in route.geometry:
        possible_matches_index = list(sunglare_sindex.intersection(geom.bounds))
        possible_matches = sunglare_points.iloc[possible_matches_index]
        precise_matches = possible_matches[possible_matches.distance(geom) <= radius]
        for point in precise_matches.geometry:
            # 将点的坐标四舍五入到小数点后3位（约1米精度），并转换为元组
            rounded_point = (round(point.x, 3), round(point.y, 3))
            unique_points.add(rounded_point)
    sunglare_count = len(unique_points)
    return sunglare_count

def process_route(args):
    row, routelist_folder, other_routelist_folder, time_folder, sunglare_points = args
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

        # 检查无眩光路径是否经过太阳眩光点
        sunglare_routelist = check_sunglare_on_route(route_routelist, sunglare_points)

        # 检查常规路径是否经过太阳眩光点
        sunglare_other = check_sunglare_on_route(route_other, sunglare_points)

        return sunglare_routelist, sunglare_other
    return None, None

def calculate_sunglare_reduction_percentage(routelist_folder, other_routelist_folder, time_folder, time_csv, time_column):
    # 读取两个文件夹中对应时间的route_plans.csv文件
    routelist_df = read_route_plans(routelist_folder, time_folder)
    other_routelist_df = read_route_plans(other_routelist_folder, time_folder)

    if routelist_df.empty or other_routelist_df.empty:
        raise FileNotFoundError("One of the route_plans.csv files is missing or empty.")

    # 合并两个数据框
    combined_df = pd.merge(routelist_df, other_routelist_df, on=['id', 'way', 'start_lng', 'start_lat', 'end_lng', 'end_lat'], suffixes=('_routelist', '_other'))

    # 读取太阳眩光点
    sunglare_points = read_sunglare_points(time_csv, time_column)

    total_sunglare_routelist = 0
    total_sunglare_other = 0
    count = 0

    # 打开 CSV 文件以追加模式写入
    output_csv_path = os.path.join(routelist_folder, time_folder, 'sunglare_results.csv')
    with open(output_csv_path, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(combined_df.columns.tolist() + ['sunglare_routelist', 'sunglare_other', 'reduction_percentage'])

        # 使用多进程并行处理
        with Pool() as pool:
            results = list(tqdm(pool.imap(process_route, [(row, routelist_folder, other_routelist_folder, time_folder, sunglare_points) for _, row in combined_df.iterrows()]), total=combined_df.shape[0], desc="Calculating sunglare reduction"))

        for i, (sunglare_routelist, sunglare_other) in enumerate(results):
            if sunglare_routelist is not None and sunglare_other is not None:
                reduction_percentage = ((sunglare_other - sunglare_routelist) / sunglare_other) * 100 if sunglare_other > 0 else 0
                row = combined_df.iloc[i].tolist() + [sunglare_routelist, sunglare_other, reduction_percentage]
                writer.writerow(row)

                total_sunglare_routelist += sunglare_routelist
                total_sunglare_other += sunglare_other
                count += 1

    return total_sunglare_routelist, total_sunglare_other, count

def main():
    # 文件夹路径
    routelist_folder = r'E:\webgislocation\analysis\routelist'
    other_routelist_folder = r'E:\webgislocation\analysis\other_routelist'
    # time_folder_list = ['5_t5_30_00', '5_t5_40_00', 
    #                     '5_t5_50_00', '5_t6_00_00', '5_t6_10_00',
    #                     '5_t6_20_00', '5_t6_30_00', '5_t6_40_00', 
    #                     '5_t6_50_00', '5_t7_00_00', '5_t7_10_00', 
    #                     '5_t7_20_00', '5_t7_30_00', '5_t17_10_00',
    #                     '5_t17_20_00', '5_t17_30_00', '5_t17_40_00',
    #                     '5_t17_50_00', '5_t18_00_00', '5_t18_10_00',
    #                     '5_t18_20_00', '5_t18_30_00', '5_t18_40_00',
    #                     '5_t18_50_00', '5_t19_00_00']

    # time_folder_list = ['5_t5_30_00', '5_t5_40_00', 
    #                 '5_t5_50_00', '5_t6_00_00', '5_t6_10_00',
    #                 '5_t6_20_00', '5_t6_30_00', '5_t6_40_00', 
    #                 '5_t6_50_00', '5_t7_00_00', '5_t7_10_00', 
    #                 '5_t7_20_00', '5_t7_30_00']



    # time_folder_list = ['5_t17_10_00',
    #                     '5_t17_20_00', '5_t17_30_00', '5_t17_40_00',
    #                     '5_t17_50_00', '5_t18_00_00', '5_t18_10_00',
    #                     '5_t18_20_00', '5_t18_30_00', '5_t18_40_00',
    #                     '5_t18_50_00', '5_t19_00_00']

    time_folder_list = [ '5_t17_40_00',
                        '5_t17_50_00', '5_t18_00_00', '5_t18_10_00',
                        '5_t18_20_00', '5_t18_30_00', '5_t18_40_00',
                        '5_t18_50_00', '5_t19_00_00']

    time_csv = r'E:\webgislocation\time_merge\result_2024_05_15_interval_10min.csv'

    for time_folder in time_folder_list:
        try:
            print(f"当前时间文件夹: {time_folder}")
            # 文件名转时间列名，例如输入5_t5_30_00应转为t05:30:00，例如5_t17_50_00转为t17:50:00
            time_parts = time_folder.split('_')[1:]
            hour = time_parts[0][1:]  # 去除't'并获取小时部分
            if int(hour) < 10:
                hour = f"0{hour}"
            time_column = f"t{hour}:{time_parts[1]}:{time_parts[2]}"
            print(f"时间列名: {time_column}")
            total_sunglare_routelist, total_sunglare_other, count = calculate_sunglare_reduction_percentage(routelist_folder, other_routelist_folder, time_folder, time_csv, time_column)
            if count > 0:
                reduction_percentage = ((total_sunglare_other - total_sunglare_routelist) / total_sunglare_other) * 100
                reduction_percentage = round(reduction_percentage,3)
                print(f"无眩光路径减少太阳眩光的总百分比: {reduction_percentage:.2f}%")
    
            else:
                print("没有有效的路径数据")
        except Exception as e:
            print(f"Error processing folder {time_folder}: {e}")

if __name__ == '__main__':
    main()