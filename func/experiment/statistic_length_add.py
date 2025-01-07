import os
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

    total_distance_increase = 0
    count = 0

    # 新增三列
    combined_df['distance_routelist'] = np.nan
    combined_df['distance_other'] = np.nan
    combined_df['distance_increase_percentage'] = np.nan

    for i, row in tqdm(combined_df.iterrows(), total=combined_df.shape[0], desc="Calculating distance increase"):
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

                # 更新 combined_df
                combined_df.at[i, 'distance_routelist'] = round(distance_routelist,4)
                combined_df.at[i, 'distance_other'] = round(distance_other,4)
                combined_df.at[i, 'distance_increase_percentage'] = round(distance_increase * 100,4)

    # 保存为新的 CSV 文件
    output_csv_path = os.path.join(routelist_folder, time_folder, 'distance_increase.csv')
    combined_df.to_csv(output_csv_path, index=False)

    if count > 0:
        average_distance_increase_percentage = (total_distance_increase / count) * 100
    else:
        average_distance_increase_percentage = 0

    return average_distance_increase_percentage

def main():
    # 文件夹路径
    routelist_folder = r"E:\webgislocation\analysis\v20241227\change0104\low_glare"
    other_routelist_folder = r"E:\webgislocation\analysis\v20241227\change0104\closest"
    time_folder_list = ['5_t5_30_00', '5_t5_40_00', 
                        '5_t5_50_00', '5_t6_00_00', '5_t6_10_00',
                        '5_t6_20_00', '5_t6_30_00', '5_t6_40_00', 
                        '5_t6_50_00', '5_t7_00_00', '5_t7_10_00', 
                        '5_t7_20_00', '5_t7_30_00', '5_t17_10_00',
                        '5_t17_20_00', '5_t17_30_00', '5_t17_40_00',
                        '5_t17_50_00', '5_t18_00_00', '5_t18_10_00',
                        '5_t18_20_00', '5_t18_30_00', '5_t18_40_00',
                        '5_t18_50_00', '5_t19_00_00']

    # time_folder_list = ['5_t5_30_00', '5_t5_40_00', 
    #                     '5_t5_50_00', '5_t6_00_00', '5_t6_10_00',
    #                     '5_t6_20_00', '5_t6_30_00', '5_t6_40_00', 
    #                     '5_t6_50_00', '5_t7_00_00', '5_t7_10_00', 
    #                     '5_t7_20_00', '5_t7_30_00']

    # time_folder_list = ['5_t17_10_00',
    #                     '5_t17_20_00', '5_t17_30_00', '5_t17_40_00',
    #                     '5_t17_50_00', '5_t18_00_00', '5_t18_10_00',
    #                     '5_t18_20_00', '5_t18_30_00', '5_t18_40_00',
    #                     '5_t18_50_00', '5_t19_00_00']


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
    main()