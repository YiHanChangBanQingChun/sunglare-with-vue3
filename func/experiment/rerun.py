# import pandas as pd
# import os
# from tqdm import tqdm
# from PIL import Image
# import numpy as np
# import math
# import cv2
# from datetime import datetime as dt, timedelta
# from pysolar.solar import *
# import pytz
# from multiprocessing import Pool, Manager

# def date_to_sun_elevation(date, lon, lat):
#     sun_elevation = get_altitude(lat, lon, date)
#     return sun_elevation

# def azimuth_angle_calculator(lat, lon, date):
#     azimuth_angle = get_azimuth(lat, lon, date)
#     return azimuth_angle

# def Sun_judgement_noaa(skyImg, glareSize, azimuth, sunele):
#     [cols, rows] = skyImg.shape
#     azimuth_skyimg = -(azimuth - 90)
#     if azimuth_skyimg < 0:
#         azimuth_skyimg += 360
#     sunele = sunele * np.pi / 180.0
#     azimuth = azimuth_skyimg * np.pi / 180.0
#     R = int(0.5 * rows)
#     if sunele < 0:
#         sunele = 0
#     r = (90 - sunele * 180 / np.pi) / 90.0 * R
#     px = int(r * math.cos(azimuth) + int(0.5 * cols)) - 1
#     py = int(int(0.5 * rows) - r * math.sin(azimuth)) - 1
#     boundXl = px - glareSize
#     if boundXl < 0: boundXl = 0
#     boundXu = px + glareSize
#     if boundXu > cols - 1: boundXu = cols - 1
#     boundYl = py - glareSize
#     if boundYl < 0: boundYl = 0
#     boundYu = py + glareSize
#     if boundYu > rows - 1: boundYu = rows - 1
#     idx = np.where(skyImg[boundYl:boundYu, boundXl:boundXu] == 255)
#     shade = 0 if len(idx[0]) / (4 * glareSize * glareSize) > 0.5 else 1
#     return shade

# def sun_glare_calculator(date, lon, lat, vision_form_slope_angle, vision_form_east_angle):
#     sun_elevation = date_to_sun_elevation(date, lon, lat)
#     if sun_elevation <= 0:
#         return 0  # 太阳高度角小于0，不可能产生眩光
    
#     horizental_glare_situation = horizental_glare_calculator(date, lon, lat, vision_form_east_angle)
#     vertical_glare_situation = vertical_glare_calculatior(date, lon, lat, vision_form_slope_angle)
#     sun_glare_situation = 1 if horizental_glare_situation == 1 and vertical_glare_situation == 1 else 0
#     return sun_glare_situation

# def horizental_glare_calculator(date, lon, lat, vision_form_east_angle):
#     azimuth_angle_east = azimuth_angle_calculator_north_to_east(lat, lon, date)
#     horizental_glare = azimuth_angle_east - vision_form_east_angle
#     horizental_glare_situation = (horizental_glare < 25) & (horizental_glare > -25)
#     return horizental_glare_situation.astype(int)

# def azimuth_angle_calculator_north_to_east(lat, lon, date):
#     azimuth_angle = azimuth_angle_calculator(lat, lon, date)
#     azimuth_angle_east = 90 - azimuth_angle
#     while azimuth_angle_east < 0:
#         azimuth_angle_east += 360
#     return azimuth_angle_east

# def vertical_glare_calculatior(date, lon, lat, vision_form_slope_angle=0):
#     sun_elevation = date_to_sun_elevation(date, lon, lat)
#     vertical_glare = sun_elevation - vision_form_slope_angle
#     vertical_glare_situation = (vertical_glare < 25) & (vertical_glare > -25)
#     return vertical_glare_situation.astype(int)

# def split_csv_file(csv_file, output_dir, num_chunks):
#     df = pd.read_csv(csv_file)
#     chunk_size = len(df) // num_chunks
#     chunks = [df.iloc[i:i + chunk_size] for i in range(0, len(df), chunk_size)]
    
#     chunk_files = []
#     for i, chunk in enumerate(chunks):
#         chunk_file = os.path.join(output_dir, f"chunk_{i}.csv")
#         chunk.to_csv(chunk_file, index=False)
#         chunk_files.append(chunk_file)
    
#     return chunk_files

# def process_image_chunk(args):
#     chunk_file, hemi_place_test, year, month, day, second, interval_minutes, local_timezone, output_dir, chunk_index = args
#     df = pd.read_csv(chunk_file)
#     result_filename = os.path.join(output_dir, f"result_chunk_{chunk_index}.csv")
    
#     # 如果文件不存在，创建它，并写入表头
#     if not os.path.exists(result_filename):
#         result_df = pd.DataFrame(columns=['pid'] + [f"{year}-{month:02d}-{day:02d} {hour:02d}:{minute:02d}:{second:02d}" 
#                                                      for hour in range(5, 20) 
#                                                      for minute in range(20 if hour == 5 else 0, 60, interval_minutes)] + ['result'])
#         result_df.to_csv(result_filename, index=False, mode='w')

#     for index, row in df.iterrows():
#         pid = row['pid']
#         lon, lat = row['lon'], row['lat']
#         yaw = row['yaw']
#         image_file = f"{pid}.png"
#         image_path = os.path.join(hemi_place_test, image_file)
#         totaltime = 0
#         if pid == '-1' or not os.path.exists(image_path):
#             continue

#         hemiimg_pil = Image.open(image_path)
#         hemiimg = np.array(hemiimg_pil)
#         hemiimg_gray = cv2.cvtColor(hemiimg, cv2.COLOR_RGB2GRAY)
#         start_time = dt(year, month, day, 5, 20, second)
#         end_time = dt(year, month, day, 19, 50, second)
#         current_time = start_time

#         result_data = {'pid': pid}
        
#         while current_time <= end_time:
#             date = local_timezone.localize(current_time)
#             sunele = date_to_sun_elevation(date, lon, lat)
#             if sunele <= 0:
#                 now = 0
#                 result_data[date.strftime("%Y-%m-%d %H:%M:%S")] = now
#                 current_time += timedelta(minutes=interval_minutes)
#                 continue
#             azimuth = azimuth_angle_calculator(lat, lon, date)
#             zhedang = Sun_judgement_noaa(hemiimg_gray, 5, azimuth, sunele)
#             xuanguangtiaojian = sun_glare_calculator(date, lon, lat, vision_form_slope_angle=0, vision_form_east_angle=yaw)
#             now = 1 if xuanguangtiaojian == 1 and zhedang == 0 else 0

#             result_data[date.strftime("%Y-%m-%d %H:%M:%S")] = now
#             totaltime += interval_minutes if now else 0

#             current_time += timedelta(minutes=interval_minutes)
        
#         result_data['result'] = totaltime
        
#         # 将结果附加到CSV文件中
#         result_df = pd.DataFrame([result_data])
#         result_df.to_csv(result_filename, index=False, mode='a', header=False)
    
#     return result_filename

# def merge_csv_files(csv_files, output_file):
#     combined_df = pd.concat([pd.read_csv(f) for f in csv_files])
#     combined_df.to_csv(output_file, index=False)

# def get_sun_glare_situation_multithreaded(csv_file, hemi_place_test, year, month, day, second, interval_minutes, output_dir, num_threads):
#     # Split the input CSV file into smaller chunks
#     chunk_files = split_csv_file(csv_file, output_dir, num_threads)
    
#     local_timezone = pytz.timezone('Asia/Shanghai')
#     result_files = []
    
#     # 计算总的图像数量，用于设置进度条的总数
#     total_images = sum([len(pd.read_csv(chunk_file)) for chunk_file in chunk_files])

#     # Process each chunk file in a separate process
#     with Pool(processes=num_threads) as pool:
#         args = [
#             (chunk_file, hemi_place_test, year, month, day, second, interval_minutes, local_timezone, output_dir, i)
#             for i, chunk_file in enumerate(chunk_files)
#         ]
#         with tqdm(total=total_images, desc="Overall Progress") as pbar:
#             for result_file in pool.imap_unordered(process_image_chunk, args):
#                 result_files.append(result_file)
#                 pbar.update(1)
    
#     # Merge the result CSV files into a single file
#     final_result_file = os.path.join(output_dir, f"result_{year}_{month:02d}_{day:02d}_interval_{interval_minutes}min.csv")
#     merge_csv_files(result_files, final_result_file)

#     # Clean up temporary files
#     for file in chunk_files + result_files:
#         os.remove(file)

# if __name__ == "__main__":
#     # 示例调用
#     clean_pano_csv_file = r'E:\webgislocation\pano_road_01.csv'
#     hemi_folder = r'G:\hemi'
#     output_directory = r'E:\webgislocation\analysis\v20241227\change0110'
#     num_threads = 8  # 使用系统CPU核数作为线程数
#     get_sun_glare_situation_multithreaded(clean_pano_csv_file, hemi_folder, 2024, 5, 15, 0, 1, output_directory, num_threads)