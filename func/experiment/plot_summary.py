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
