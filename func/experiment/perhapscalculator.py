import pandas as pd
import os
import geopandas as gpd
import matplotlib.pyplot as plt
from tqdm import tqdm
import re

def merge_with_coordinates(input_csv, coordinates_csv, merged_csv):
    # 读取输入的CSV文件
    df_input = pd.read_csv(input_csv)
    
    # 读取包含经纬度信息的CSV文件
    df_coordinates = pd.read_csv(coordinates_csv)
    
    # 合并两个数据框，基于pid列
    df_merged = pd.merge(df_input, df_coordinates[['pid', 'lon', 'lat']], on='pid', how='left')
    
    # 保存合并后的数据框到新的CSV文件
    df_merged.to_csv(merged_csv, index=False)

def filter_unique_pid(input_csv, unique_csv):
    # 读取输入的CSV文件
    df = pd.read_csv(input_csv)
    
    # 过滤掉重复的pid，只保留每个pid的第一条记录
    df_unique = df.drop_duplicates(subset='pid')
    
    # 保存过滤后的数据框到新的CSV文件
    df_unique.to_csv(unique_csv, index=False)

def filter_points_in_polygon(input_csv, shapefile_path, output_csv):
    # 读取输入的CSV文件
    df = pd.read_csv(input_csv)
    
    # 读取shapefile文件
    polygon = gpd.read_file(shapefile_path)
    
    # 将CSV文件中的点转换为GeoDataFrame
    gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat))
    
    # 筛选在指定面内的点
    points_in_polygon = gpd.sjoin(gdf, polygon, op='within')
    
    # 保存筛选后的点到新的CSV文件
    points_in_polygon.drop(columns='geometry', inplace=True)
    points_in_polygon.to_csv(output_csv, index=False)

def filter_pid_in_shapefile(input_csv, shapefile_path, output_csv):
    # 读取输入的CSV文件
    df = pd.read_csv(input_csv)
    
    # 读取shapefile文件
    pano_dot = gpd.read_file(shapefile_path)
    
    # 过滤pid在shapefile中的点
    filtered_df = df[df['pid'].isin(pano_dot['pid'])]
    
    # 保存过滤后的数据框到新的CSV文件
    filtered_df.to_csv(output_csv, index=False)

def calculate_glare_probability(filtered_csv, output_image):
    # 读取筛选后的CSV文件
    df = pd.read_csv(filtered_csv)
    
    # 获取所有时间列
    time_columns = [col for col in df.columns if re.match(r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}', col)]

    # 检查每个时间列是否包含0，1以外的值，如果包含则移除该列
    valid_time_columns = []
    for col in time_columns:
        if df[col].isin([0, 1]).all():
            valid_time_columns.append(col)
    
    # 统计每个时间点的眩光发生次数和总次数
    glare_counts = df[valid_time_columns].sum()
    total_counts = df[valid_time_columns].count()
    
    # 打印当日眩光总概率，只要有一列有1则该行pid认为发生了眩光
    total_glare_probability = (df[valid_time_columns].max(axis=1).sum() / len(df)) * 100
    print(f"当日眩光总概率: {total_glare_probability:.2f}%")

    # 计算眩光发生概率
    glare_probabilities = (glare_counts / total_counts) * 100
    
    # 检查最前面和最后面的概率为0的列
    while len(valid_time_columns) > 3 and glare_probabilities.iloc[0] == 0:
        valid_time_columns.pop(0)
        glare_probabilities = glare_probabilities[1:]
    while len(valid_time_columns) > 3 and glare_probabilities.iloc[-1] == 0:
        valid_time_columns.pop()
        glare_probabilities = glare_probabilities[:-1]
    
    # 绘制折线图
    plt.figure(figsize=(18, 12))
    plt.plot(glare_probabilities.index, glare_probabilities.values, marker='', label='眩光发生概率')
    plt.xlabel('时间 (小时:分钟)')
    plt.ylabel('眩光发生概率 (%)')
    plt.title('2024年5月15日武汉市三环内全景影像眩光发生概率折线图')
    plt.xticks(rotation=45)
    
    # 设置x轴标签的显示间隔
    num_labels = len(glare_probabilities.index)
    step = max(1, num_labels // 10)
    plt.xticks(ticks=range(0, num_labels, step), labels=[glare_probabilities.index[i][11:16] for i in range(0, num_labels, step)])
    
    plt.grid(True)
    plt.legend()
    plt.tight_layout()
    plt.savefig(output_image)
    plt.show()

# 确定全局可以正常在画布显示中文
def set_ch():
    from matplotlib import font_manager as fm, rcParams
    import os

    # 指定宋体和 Times New Roman 字体的路径
    simsun_path = os.path.join('C:\\Windows\\Fonts', 'simsun.ttc')
    times_new_roman_path = os.path.join('C:\\Windows\\Fonts', 'timesbi.ttf')

    # 加载字体
    if os.path.exists(simsun_path):
        simsun_font = fm.FontProperties(fname=simsun_path)
        rcParams['font.sans-serif'] = [simsun_font.get_name()]
    if os.path.exists(times_new_roman_path):
        times_new_roman_font = fm.FontProperties(fname=times_new_roman_path)
        rcParams['font.serif'] = [times_new_roman_font.get_name()]

    rcParams['font.family'] = 'sans-serif'
    rcParams['axes.unicode_minus'] = False  # 解决保存图像时负号'-'显示为方块的问题
    rcParams['font.size'] = 22  # 字体加大
    rcParams['font.weight'] = 'bold'  # 字体加粗

def main():
    set_ch()
    input_csv = r'E:\webgislocation\analysis\v20241227\change0110\result_2024_05_15_interval_1min.csv'
    coordinates_csv = r'E:\webgislocation\pano_road_01.csv'
    merged_csv = r'E:\webgislocation\analysis\v20241227\change0110\merged_result.csv'
    unique_csv = r'E:\webgislocation\analysis\v20241227\change0110\unique_result.csv'
    shapefile_path = r'E:\webgislocation\三环\武汉市_三环线\武汉市三环面_wgs.shp'
    filtered_csv = r'E:\webgislocation\analysis\v20241227\change0110\filtered_points.csv'
    pano_dot_path = r'E:\webgislocation\analysis\v20241227\region\pano_dot.shp'
    final_filtered_csv = r'E:\webgislocation\analysis\v20241227\change0110\final_filtered_points.csv'
    output_image = r'E:\webgislocation\analysis\v20241227\change0110\glare_probability.png'
    
    # 合并输入CSV和坐标CSV
    if not os.path.exists(merged_csv):
        with tqdm(total=100, desc="合并坐标") as pbar:
            merge_with_coordinates(input_csv, coordinates_csv, merged_csv)
            pbar.update(100)
    
    # 过滤掉重复的pid
    if not os.path.exists(unique_csv):
        with tqdm(total=100, desc="过滤pid") as pbar:
            filter_unique_pid(merged_csv, unique_csv)
            pbar.update(100)
    
    # 筛选在指定面内的点
    if not os.path.exists(filtered_csv):
        with tqdm(total=100, desc="筛选点") as pbar:
            filter_points_in_polygon(unique_csv, shapefile_path, filtered_csv)
            pbar.update(100)
    
    # 可选：进一步过滤pid，确保它们存在于pano_dot.shp中
    # if not os.path.exists(final_filtered_csv):
    #     with tqdm(total=100, desc="进一步过滤pid") as pbar:
    #         filter_pid_in_shapefile(filtered_csv, pano_dot_path, final_filtered_csv)
    #         pbar.update(100)
    
    # # 计算眩光概率
    # with tqdm(total=100, desc="计算眩光概率") as pbar:
    #     calculate_glare_probability(final_filtered_csv, output_image)
    #     pbar.update(100)

    # 计算眩光概率
    with tqdm(total=100, desc="计算眩光概率") as pbar:
        calculate_glare_probability(filtered_csv, output_image)
        pbar.update(100)
if __name__ == "__main__":
    main()