# import os
# import pandas as pd
# import numpy as np
# from PIL import Image, ImageDraw
# from pysolar.solar import get_altitude, get_azimuth
# import math
# from datetime import datetime, timedelta
# import pytz
# from astral import LocationInfo
# from astral.sun import sun

# def get_sun_position(lat, lon, dt_local):
#     '''
#     获取给定时间、经纬度的太阳高度角和方位角。
#     '''
#     # 将本地时间转换为 UTC，因为 pysolar 需要 UTC 时间
#     dt_utc = dt_local.astimezone(pytz.UTC)
#     elevation = get_altitude(lat, lon, dt_utc)
#     azimuth = get_azimuth(lat, lon, dt_utc)
#     return elevation, azimuth

# def convert_azimuth_north_to_east(azimuth):
#     '''
#     将太阳方位角从北向基准转换为东向基准，逆时针增加。
#     '''
#     azimuth_east = (90 - azimuth) % 360
#     return azimuth_east

# def calculate_pixel_position(sun_elevation, sun_azimuth, image_width, image_height):
#     '''
#     根据太阳高度角和方位角计算鱼眼图像中的像素位置。
#     '''
#     # 将角度转换为弧度
#     azimuth_rad = math.radians(sun_azimuth)
    
#     # 鱼眼图像参数
#     R = 0.5 * image_height
#     sun_elevation = max(sun_elevation, 0)  # 确保高度角非负
#     r = (90 - sun_elevation) / 90.0 * R
    
#     # 计算像素坐标
#     px = int(r * math.cos(azimuth_rad) + 0.5 * image_width)
#     py = int(0.5 * image_height - r * math.sin(azimuth_rad))
#     return px, py

# def draw_sun_dot(draw, px, py, size=5, color=(255, 0, 0)):
#     '''
#     在图像上绘制太阳点，默认为红色，5x5 像素大小的圆形。
#     '''
#     half_size = size // 2
#     left_up_point = (px - half_size, py - half_size)
#     right_down_point = (px + half_size, py + half_size)
#     draw.ellipse([left_up_point, right_down_point], fill=color)

# def main():
#     # 文件路径配置
#     input_csv = r"E:\挑战杯\exampledot.csv"
#     image_folder = r"E:\挑战杯\outputhemi"
#     output_image_folder = r"E:\挑战杯\sun_dots"
#     output_csv = r"E:\挑战杯\sun_visibility.csv"

#     # 创建输出文件夹
#     os.makedirs(output_image_folder, exist_ok=True)

#     # 读取输入 CSV 文件
#     try:
#         df = pd.read_csv(input_csv)
#         print(f"成功读取 CSV 文件，共 {len(df)} 条记录。")
#     except Exception as e:
#         print(f"读取 CSV 文件失败: {e}")
#         return

#     # 初始化输出数据列表
#     output_data = []

#     # 设置分析日期
#     analysis_date = datetime(2024, 12, 22).date()

#     # 定义本地时区
#     local_timezone = pytz.timezone("Asia/Shanghai")

#     # 遍历每一行数据
#     for index, row in df.iterrows():
#         pid = row['pid']
#         lon = row['lon']
#         lat = row['lat']
#         name = row['name']

#         print(f"\n正在处理 PID: {pid}")

#         # 计算日出和日落时间
#         try:
#             location = LocationInfo(name=name, region="China", timezone="Asia/Shanghai", latitude=lat, longitude=lon)
#             s = sun(location.observer, date=analysis_date, tzinfo=local_timezone)
#             sunrise = s['sunrise']
#             sunset = s['sunset']
#             print(f"PID {pid}: 日出时间 (本地): {sunrise}, 日落时间 (本地): {sunset}")
#         except Exception as e:
#             print(f"PID {pid} 计算日出日落时间失败: {e}")
#             continue

#         # 生成从日出到日落，每 20 分钟一个时间点
#         times = []
#         current_time = sunrise
#         while current_time <= sunset:
#             times.append(current_time)
#             current_time += timedelta(minutes=20)

#         print(f"PID {pid}: 生成了 {len(times)} 个时间点。")

#         # 定义需要处理的图像后缀
#         image_suffixes = ['', '_overlap', '_raw', '_result']

#         # 定义一个字典存储每个图像的绘制对象
#         images_with_dots = {}

#         # 加载并准备每个图像
#         for suffix in image_suffixes:
#             img_filename = f"{pid}{suffix}.png"
#             img_path = os.path.join(image_folder, img_filename)
#             if not os.path.exists(img_path):
#                 print(f"图像不存在: {img_path}")
#                 continue
#             try:
#                 img = Image.open(img_path).convert('RGB')  # 转换为 RGB 以便绘制彩色点
#                 draw = ImageDraw.Draw(img)
#                 images_with_dots[suffix] = {'image': img, 'draw': draw}
#                 print(f"加载图像: {img_path}")
#             except Exception as e:
#                 print(f"加载图像 {img_path} 失败: {e}")
#                 continue

#         # 如果没有成功加载任何图像，跳过此 pid
#         if not images_with_dots:
#             print(f"没有找到 PID {pid} 的任何图像，跳过。")
#             continue

#         # 加载天空图像用于判断太阳是否在天空
#         sky_img_filename = f"{pid}.png"  # 假设 pid.png 是纯天空图像
#         sky_img_path = os.path.join(image_folder, sky_img_filename)
#         if not os.path.exists(sky_img_path):
#             print(f"天空图像不存在: {sky_img_path}")
#             continue
#         try:
#             sky_img = Image.open(sky_img_path).convert('L')  # 转为灰度图
#             sky_np = np.array(sky_img)
#             print(f"加载天空图像: {sky_img_path}")
#         except Exception as e:
#             print(f"加载天空图像 {sky_img_path} 失败: {e}")
#             continue

#         image_width, image_height = sky_img.size

#         # 遍历每个时间点
#         for dt_local in times:
#             # 获取太阳位置
#             sun_elevation, sun_azimuth = get_sun_position(lat, lon, dt_local)
#             sun_azimuth_east = convert_azimuth_north_to_east(sun_azimuth)
#             print(f"PID {pid}: 时间 {dt_local} - 高度角: {sun_elevation:.2f}, 方位角: {sun_azimuth:.2f} (东向: {sun_azimuth_east:.2f})")

#             # 判断太阳是否在地平线上方
#             if sun_elevation <= 0:
#                 visible = 0
#                 color = (0, 0, 255)  # 蓝色表示被遮挡
#                 print(f"PID {pid}: 时间 {dt_local} - 太阳在地平线下")
#             else:
#                 # 计算像素位置
#                 px, py = calculate_pixel_position(sun_elevation, sun_azimuth_east, image_width, image_height)
#                 print(f"PID {pid}: 时间 {dt_local} - 像素位置: ({px}, {py})")

#                 # 检查像素位置是否在图像范围内
#                 if 0 <= px < image_width and 0 <= py < image_height:
#                     # 判断该像素是否为天空（白色）
#                     if sky_np[py, px] >= 250:  # 使用阈值避免噪声影响
#                         visible = 1
#                         color = (255, 0, 0)  # 红色表示未被遮挡
#                         print(f"PID {pid}: 时间 {dt_local} - 太阳可见")
#                     else:
#                         visible = 0
#                         color = (255, 0, 0)  # 蓝色表示被遮挡
#                         print(f"PID {pid}: 时间 {dt_local} - 太阳被遮挡")
                    
#                     # 绘制太阳点
#                     for suffix, img_info in images_with_dots.items():
#                         draw = img_info['draw']
#                         draw_sun_dot(draw, px, py, size=5, color=color)
#                 else:
#                     visible = 0
#                     color = (0, 0, 255)  # 蓝色表示被遮挡
#                     print(f"PID {pid}: 时间 {dt_local} - 像素位置超出图像范围")

#             # 记录结果
#             output_data.append({
#                 'pid': pid,
#                 'datetime': dt_local.strftime('%Y-%m-%d %H:%M:%S'),
#                 'visible': visible
#             })

#         # 保存所有绘制过点的图像
#         for suffix, img_info in images_with_dots.items():
#             output_suffix = f"{suffix}_sun_dots.png" if suffix else "_sun_dots.png"
#             output_img_filename = f"{pid}{output_suffix}"
#             output_img_path = os.path.join(output_image_folder, output_img_filename)
#             try:
#                 img_info['image'].save(output_img_path)
#                 print(f"保存图像: {output_img_path}")
#             except Exception as e:
#                 print(f"保存图像 {output_img_path} 失败: {e}")
#                 continue

#         print(f"PID {pid} 处理完成。")

#     # 将结果保存到输出 CSV 文件
#     try:
#         output_df = pd.DataFrame(output_data)
#         if not output_df.empty:
#             output_df.to_csv(output_csv, index=False, encoding='utf-8-sig')
#             print(f"\n所有处理完成。结果已保存到: {output_csv}")
#         else:
#             print("\n输出数据为空，未保存 CSV 文件。")
#     except Exception as e:
#         print(f"\n保存输出 CSV 文件失败: {e}")

# if __name__ == "__main__":
#     main()





'''

'''


# import os
# import pandas as pd
# import numpy as np
# from PIL import Image, ImageDraw
# from pysolar.solar import get_altitude, get_azimuth
# import math
# from datetime import datetime, timedelta
# import pytz
# from astral import LocationInfo
# from astral.sun import sun

# def get_sun_position(lat, lon, dt_local):
#     '''
#     获取给定时间、经纬度的太阳高度角和方位角。
#     '''
#     # 将本地时间转换为 UTC，因为 pysolar 需要 UTC 时间
#     dt_utc = dt_local.astimezone(pytz.UTC)
#     elevation = get_altitude(lat, lon, dt_utc)
#     azimuth = get_azimuth(lat, lon, dt_utc)
#     return elevation, azimuth

# def convert_azimuth_north_to_east(azimuth):
#     '''
#     将太阳方位角从北向基准转换为东向基准，逆时针增加。
#     '''
#     azimuth_east = (90 - azimuth) % 360
#     return azimuth_east

# def calculate_pixel_position(sun_elevation, sun_azimuth, image_width, image_height):
#     '''
#     根据太阳高度角和方位角计算鱼眼图像中的像素位置。
#     '''
#     # 将角度转换为弧度
#     azimuth_rad = math.radians(sun_azimuth)
    
#     # 鱼眼图像参数
#     R = 0.5 * image_height
#     sun_elevation = max(sun_elevation, 0)  # 确保高度角非负
#     r = (90 - sun_elevation) / 90.0 * R
    
#     # 计算像素坐标
#     px = int(r * math.cos(azimuth_rad) + 0.5 * image_width)
#     py = int(0.5 * image_height - r * math.sin(azimuth_rad))
#     return px, py

# def draw_sun_dot(draw, px, py, size=5, color=(255, 0, 0)):
#     '''
#     在图像上绘制太阳点，默认为红色，5x5 像素大小的圆形。
#     '''
#     half_size = size // 2
#     left_up_point = (px - half_size, py - half_size)
#     right_down_point = (px + half_size, py + half_size)
#     draw.ellipse([left_up_point, right_down_point], fill=color)

# def main():
#     # 文件路径配置
#     input_csv = r"E:\挑战杯\exampledot.csv"
#     image_folder = r"E:\挑战杯\outputhemi"
#     output_image_folder = r"E:\挑战杯\sun_dots"
#     output_csv = r"E:\挑战杯\sun_single.csv"

#     # 创建输出文件夹
#     os.makedirs(output_image_folder, exist_ok=True)

#     # 读取输入 CSV 文件
#     try:
#         df = pd.read_csv(input_csv)
#         print(f"成功读取 CSV 文件，共 {len(df)} 条记录。")
#     except Exception as e:
#         print(f"读取 CSV 文件失败: {e}")
#         return

#     # 初始化输出数据列表
#     output_data = []

#     # 设置分析日期和时间
#     analysis_datetime = datetime(2024, 6, 15, 9, 30, 0)  # 例如，2024年12月22日上午9:30
#     local_timezone = pytz.timezone("Asia/Shanghai")
#     analysis_datetime = local_timezone.localize(analysis_datetime)

#     # 遍历每一行数据
#     for index, row in df.iterrows():
#         pid = row['pid']
#         lon = row['lon']
#         lat = row['lat']
#         name = row['name']

#         print(f"\n正在处理 PID: {pid}")

#         # 定义需要处理的图像后缀
#         image_suffixes = ['', '_overlap', '_raw', '_result']

#         # 定义一个字典存储每个图像的绘制对象
#         images_with_dots = {}

#         # 加载并准备每个图像
#         for suffix in image_suffixes:
#             img_filename = f"{pid}{suffix}.png"
#             img_path = os.path.join(image_folder, img_filename)
#             if not os.path.exists(img_path):
#                 print(f"图像不存在: {img_path}")
#                 continue
#             try:
#                 img = Image.open(img_path).convert('RGB')  # 转换为 RGB 以便绘制彩色点
#                 draw = ImageDraw.Draw(img)
#                 images_with_dots[suffix] = {'image': img, 'draw': draw}
#                 print(f"加载图像: {img_path}")
#             except Exception as e:
#                 print(f"加载图像 {img_path} 失败: {e}")
#                 continue

#         # 如果没有成功加载任何图像，跳过此 pid
#         if not images_with_dots:
#             print(f"没有找到 PID {pid} 的任何图像，跳过。")
#             continue

#         # 加载天空图像用于判断太阳是否在天空
#         sky_img_filename = f"{pid}.png"  # 假设 pid.png 是纯天空图像
#         sky_img_path = os.path.join(image_folder, sky_img_filename)
#         if not os.path.exists(sky_img_path):
#             print(f"天空图像不存在: {sky_img_path}")
#             continue
#         try:
#             sky_img = Image.open(sky_img_path).convert('L')  # 转为灰度图
#             sky_np = np.array(sky_img)
#             print(f"加载天空图像: {sky_img_path}")
#         except Exception as e:
#             print(f"加载天空图像 {sky_img_path} 失败: {e}")
#             continue

#         image_width, image_height = sky_img.size

#         # 获取太阳位置
#         sun_elevation, sun_azimuth = get_sun_position(lat, lon, analysis_datetime)
#         sun_azimuth_east = convert_azimuth_north_to_east(sun_azimuth)
#         print(f"PID {pid}: 时间 {analysis_datetime} - 高度角: {sun_elevation:.2f}, 方位角: {sun_azimuth:.2f} (东向: {sun_azimuth_east:.2f})")

#         # 判断太阳是否在地平线上方
#         if sun_elevation <= 0:
#             visible = 0
#             color = (0, 0, 255)  # 蓝色表示被遮挡
#             print(f"PID {pid}: 时间 {analysis_datetime} - 太阳在地平线下")
#         else:
#             # 计算像素位置
#             px, py = calculate_pixel_position(sun_elevation, sun_azimuth_east, image_width, image_height)
#             print(f"PID {pid}: 时间 {analysis_datetime} - 像素位置: ({px}, {py})")

#             # 检查像素位置是否在图像范围内
#             if 0 <= px < image_width and 0 <= py < image_height:
#                 # 判断该像素是否为天空（白色）
#                 if sky_np[py, px] >= 250:  # 使用阈值避免噪声影响
#                     visible = 1
#                     color = (255, 0, 0)  # 红色表示未被遮挡
#                     print(f"PID {pid}: 时间 {analysis_datetime} - 太阳可见")
#                 else:
#                     visible = 0
#                     color = (255, 0, 0)  # 蓝色表示被遮挡（可选）
#                     print(f"PID {pid}: 时间 {analysis_datetime} - 太阳被遮挡")
                
#                 # 绘制太阳点
#                 for suffix, img_info in images_with_dots.items():
#                     draw = img_info['draw']
#                     draw_sun_dot(draw, px, py, size=50, color=color)
#             else:
#                 visible = 0
#                 color = (0, 0, 255)  # 蓝色表示被遮挡
#                 print(f"PID {pid}: 时间 {analysis_datetime} - 像素位置超出图像范围")

#         # 记录结果
#         output_data.append({
#             'pid': pid,
#             'datetime': analysis_datetime.strftime('%Y-%m-%d %H:%M:%S'),
#             'visible': visible
#         })

#         # 保存所有绘制过点的图像
#         for suffix, img_info in images_with_dots.items():
#             output_suffix = f"{suffix}_sun_dots.png" if suffix else "_sun_dots.png"
#             output_img_filename = f"{pid}{output_suffix}"
#             output_img_path = os.path.join(output_image_folder, output_img_filename)
#             try:
#                 img_info['image'].save(output_img_path)
#                 print(f"保存图像: {output_img_path}")
#             except Exception as e:
#                 print(f"保存图像 {output_img_path} 失败: {e}")
#                 continue

#         print(f"PID {pid} 处理完成。")

#     # 将结果保存到输出 CSV 文件
#     try:
#         output_df = pd.DataFrame(output_data)
#         if not output_df.empty:
#             output_df.to_csv(output_csv, index=False, encoding='utf-8-sig')
#             print(f"\n所有处理完成。结果已保存到: {output_csv}")
#         else:
#             print("\n输出数据为空，未保存 CSV 文件。")
#     except Exception as e:
#         print(f"\n保存输出 CSV 文件失败: {e}")

# if __name__ == "__main__":
#     main()

'''

'''

import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import rcParams

# 设置全局字体为 Times New Roman
rcParams['font.family'] = 'Times New Roman'

# 设置全局字体大小
rcParams['font.size'] =25  # 设置全局字体大小为14，可以根据需要调整

# 读取 Excel 文件
input_excel = r"E:\挑战杯\Baidu Street View dots.xlsx"
df = pd.read_excel(input_excel)

# 统计 year 列的类型和数量
year_counts = df['year'].value_counts().sort_index()

# 统计 month 列的类型和数量
month_counts = df['month'].value_counts().sort_index()

# 绘制 year 列的横向柱状图
plt.figure(figsize=(10, 6))
year_counts.plot(kind='barh', color='#1f77b4')  # 深蓝色
# plt.xlabel('Count')
# plt.xlabel('Numbers of Baidu Street View panoramas')
# plt.ylabel('Year')
# plt.title('Characteristics of Baidu Street View panoramas in Wuhan by Year')
plt.tight_layout()
plt.savefig(r'E:\webgislocation\analysis\year_counts.png')
plt.show()

# 绘制 month 列的横向柱状图
plt.figure(figsize=(10, 6))
month_counts.plot(kind='barh', color='#2ca02c')  # 深绿色
# plt.xlabel('Count')
# plt.xlabel('Numbers of Baidu Street View panoramas')
# plt.ylabel('Month')
# plt.title('Characteristics of Baidu Street View panoramas in Wuhan by Month')
plt.tight_layout()
plt.savefig(r'E:\webgislocation\analysis\month_counts.png')
plt.show()

'''

'''

# import pandas as pd
# import geopandas as gpd

# # 读取街景点数据
# print("正在读取街景点数据...")
# points_shapefile = r"E:\地信暂时不需要的操作记录\webgislocation\15w_have_pano.shp"
# points_gdf = gpd.read_file(points_shapefile)
# print("街景点数据的原始坐标系:", points_gdf.crs)
# if points_gdf.crs != "EPSG:4326":
#     points_gdf = points_gdf.to_crs(epsg=4326)  # 转换坐标系为WGS84
# print("街景点数据的转换后坐标系:", points_gdf.crs)

# print("正在读取路网数据...")
# # 读取路网数据
# roads_shapefile = r"E:\地信暂时不需要的操作记录\webgislocation\rdsingle_from_E.shp"
# roads_gdf = gpd.read_file(roads_shapefile)
# print("路网数据的原始坐标系:", roads_gdf.crs)
# if roads_gdf.crs != "EPSG:4326":
#     roads_gdf = roads_gdf.to_crs(epsg=4326)  # 转换坐标系为WGS84
# print("路网数据的转换后坐标系:", roads_gdf.crs)

# # 读取CSV文件
# print("正在读取CSV文件...")
# csv_file = r"E:\挑战杯\modified_sunelev.csv"
# csv_df = pd.read_csv(csv_file)

# # 选择时间字段
# print("正在处理数据...")
# time_fields = [f"{hour:02d}:00" for hour in range(6, 19)]

# # 过滤CSV数据，只保留需要的时间字段和pid
# print("正在合并数据...")
# filtered_csv_df = csv_df[['pid'] + time_fields]

# # 将CSV数据与街景点数据合并
# print("正在合并数据...")
# merged_points_gdf = points_gdf.merge(filtered_csv_df, left_on='pid', right_on='pid', how='left')
# print("合并后的街景点数据的坐标系:", merged_points_gdf.crs)

# # 确保 'id' 和 'NEAR_FID' 列为相同的数据类型
# roads_gdf['id'] = roads_gdf['id'].astype(str)
# merged_points_gdf['NEAR_FID'] = merged_points_gdf['NEAR_FID'].astype(str)

# # 将合并后的点数据与路网数据合并
# print("正在合并数据...")
# merged_roads_gdf = roads_gdf.merge(merged_points_gdf, left_on='id', right_on='NEAR_FID', how='left')
# print("合并后的路网数据的坐标系:", merged_roads_gdf.crs)

# # 处理一对多的情况，按id聚合数据，取时间字段的平均值
# print("正在处理一对多的情况...")
# # 检查并处理缺失的列
# for col in ['geometry', 'name']:
#     if col not in merged_roads_gdf.columns:
#         merged_roads_gdf[col] = None

# aggregated_roads_gdf = merged_roads_gdf.groupby('id').agg(
#     {**{col: 'first' for col in roads_gdf.columns if col != 'geometry'}, 
#      **{col: 'mean' for col in time_fields}, 
#      'geometry': 'first'}
# ).reset_index(drop=True)
# print("聚合后的路网数据的坐标系:", aggregated_roads_gdf.crs)

# # 选择需要的字段，保留原始路网数据的字段
# final_fields = list(roads_gdf.columns) + time_fields
# final_roads_gdf = aggregated_roads_gdf[final_fields]

# # 将 DataFrame 转换为 GeoDataFrame
# final_roads_gdf = gpd.GeoDataFrame(final_roads_gdf, geometry='geometry')
# final_roads_gdf = final_roads_gdf.set_crs(epsg=4326, allow_override=True)  # 设置坐标系为WGS84
# print("最终路网数据的坐标系:", final_roads_gdf.crs)

# # 保存为新文件
# output_shapefile = r"E:\挑战杯\roads_with_time_fields.shp"
# final_roads_gdf.to_file(output_shapefile)

# print("处理完成，结果已保存到:", output_shapefile)

'''

'''

# import geopandas as gpd
# from tqdm import tqdm

# # 读取点数据和路网数据
# print("正在读取点数据...")
# points_gdf = gpd.read_file(r"E:\地信暂时不需要的操作记录\webgislocation\15w_have_pano.shp", encoding='utf-8')
# print("正在读取路网数据...")
# roads_gdf = gpd.read_file(r"E:\挑战杯\streetsofwuhan.shp", encoding='utf-8')

# # 遍历点数据的每一行，添加进度条
# for idx, point_row in tqdm(points_gdf.iterrows(), total=points_gdf.shape[0], desc="Processing points"):
#     near_fid = point_row['NEAR_FID']
#     ifdata_value = point_row['ifdata']
    
#     # 在路网数据中查找匹配的行
#     matching_road_idx = roads_gdf[roads_gdf['newid'] == near_fid].index
    
#     # 如果匹配，将点数据的ifdata列信息添加到路网数据中
#     if not matching_road_idx.empty:
#         roads_gdf.loc[matching_road_idx, 'ifdata'] = ifdata_value

# # 保存更新后的路网数据
# output_shapefile = r"E:\挑战杯\streetsofwuhan_ifdata.shp"
# roads_gdf.to_file(output_shapefile, encoding='utf-8')

# print("处理完成，结果已保存到:", output_shapefile)