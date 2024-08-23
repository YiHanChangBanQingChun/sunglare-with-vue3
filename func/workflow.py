import geopandas as gpd
from shapely.geometry import LineString
import time
from tqdm import tqdm
from PIL import Image, ImageDraw
import numpy as np
import os, os.path
import math
# import cv2
import pandas as pd
from datetime import datetime, timedelta, timezone
from pysolar.solar import *
from shapely.geometry import Point
from pyproj import Transformer
import matplotlib.pyplot as plt
import psycopg2
from psycopg2 import sql
import re
# 1. 将多线转换为单线
def split_line(line, row):
    """
    将一条线分割成多条两点组成的直线
    """
    lines = []
    coords = list(line.coords)
    for i in range(len(coords) - 1):
        segment = LineString([coords[i], coords[i+1]])
        lines.append({
            'geometry': segment,
            **row.drop('geometry')
        })
    return lines

def multiline_to_singleline(input_shp, output_shp):
    """
    将多线转换为单线，并确保每条线只有两个坐标点
    """
    gdf = gpd.read_file(input_shp, encoding='utf-8')
    print("原始 CRS:", gdf.crs)
    if gdf.crs != 'EPSG:4326':
        gdf = gdf.to_crs('EPSG:4326')
        print("转换后的 CRS:", gdf.crs)
    print("转换前的属性表:")
    print(gdf)
    i = 0
    singlelines = []
    for index, row in gdf.iterrows():
        geom = row.geometry
        if geom.geom_type == 'MultiLineString':
            for line in geom:
                singlelines.extend(split_line(line, row))
        elif geom.geom_type == 'LineString':
            singlelines.extend(split_line(geom, row))
            i += 1
            print("LineString change singleline", i)
        else:
            singlelines.append(row)
    new_gdf = gpd.GeoDataFrame(singlelines, crs=gdf.crs)
    print("\n转换后的属性表:")
    print(new_gdf)
    new_gdf.to_file(output_shp, encoding='utf-8')

# 2. 计算道路行驶方向
def reverse_lines(gdf):
    '''
    反转几何属性并更新起点和终点坐标
    '''
    pd.set_option('display.max_colwidth', None)
    pd.set_option('display.max_rows', None)
    # 反转几何属性并更新起点和终点坐标
    print_count = 0
    for idx, row in tqdm(gdf.iterrows(), total=gdf.shape[0], desc="Processing"):
        if row['oneway'] == 'T':
            if print_count < 5:
                # 打印反转前的几何属性
                print(f"反转前的几何属性 (索引 {idx}): {row.geometry}")
            # 反转几何属性
            reversed_geom = LineString(row.geometry.coords[::-1])
            gdf.at[idx, 'geometry'] = reversed_geom
            # 更新起点和终点坐标
            gdf.at[idx, 'start_x'] = reversed_geom.coords[0][0]
            gdf.at[idx, 'start_y'] = reversed_geom.coords[0][1]
            gdf.at[idx, 'end_x'] = reversed_geom.coords[-1][0]
            gdf.at[idx, 'end_y'] = reversed_geom.coords[-1][1]
            # 将 'oneway' 标签的值从 'T' 转为 'F'
            gdf.at[idx, 'oneway'] = 'F'
            # 更新 'angle' 属性
            new_angle = row['angle'] + 180
            if new_angle > 360:
                new_angle -= 360
            gdf.at[idx, 'angle'] = new_angle
            if print_count < 5:
                # 打印反转后的几何属性
                print(f"反转后的几何属性 (索引 {idx}): {reversed_geom}")
                print_count += 1
                time.sleep(3)
    return gdf

#3. 重置为东开始的角度
def calculate_e_angle(gdf):
    '''
    计算从东开始的逆时针角度
    '''
    # 新建字段 'E_angle'
    gdf['E_angle'] = None
    for idx, row in tqdm(gdf.iterrows(), total=gdf.shape[0], desc="Calculating E_angle"):
        angle = row['angle']
        # 计算从东开始的逆时针角度
        e_angle = (450 - angle) % 360
        # 将计算结果保存到新字段
        gdf.at[idx, 'E_angle'] = e_angle
    return gdf

# 4. 更新点数据的yaw列
def update_yaw_with_e_angle(point_shp_path, line_shp_path, output_shp_path):
    '''
    更新点数据的yaw列
    '''
    # 读取点和线的shapefile数据
    points_gdf = gpd.read_file(point_shp_path)
    lines_gdf = gpd.read_file(line_shp_path)
    # 打印点和线数据的列名
    print("Points GeoDataFrame columns:", points_gdf.columns)
    print("Lines GeoDataFrame columns:", lines_gdf.columns)
    # 设置坐标系为 EPSG:4326
    points_gdf = points_gdf.to_crs(epsg=4326)
    lines_gdf = lines_gdf.to_crs(epsg=4326)
    # 初始化点数据中的yaw列，全部赋值为-1
    points_gdf['yaw'] = -1
    # 确保 NEAR_FID 和 id 列的数据类型一致
    points_gdf['NEAR_FID'] = points_gdf['NEAR_FID'].astype(int)
    lines_gdf['id'] = lines_gdf['id'].astype(int)
    # 创建一个字典用于快速查找线数据中的E_angle
    line_angle_dict = lines_gdf.set_index('id')['E_angle'].to_dict()
    # 打印字典的前几个元素以进行调试
    print("Line angle dictionary (first 5 elements):", dict(list(line_angle_dict.items())[:5]))
    # 遍历点数据，更新yaw列
    for idx, row in tqdm(points_gdf.iterrows(), total=points_gdf.shape[0], desc="Updating yaw"):
        near_fid = row['NEAR_FID']
        if near_fid in line_angle_dict:
            points_gdf.at[idx, 'yaw'] = line_angle_dict[near_fid]
    # 保存更新后的点数据到新的shapefile
    points_gdf.to_file(output_shp_path, encoding='utf-8', driver='ESRI Shapefile')
'''

'''
# 5. 生成鱼眼图像，北对齐
# def cylinder2fisheyeImage (panoImg,yaw,outputImgFile='fisheye.jpg'):
#     '''
#     将全景图像转换为鱼眼图像
#     '''
#     # 读取输入全景图的尺寸信息
#     dims = panoImg.shape
#     Hs = dims[0]
#     Ws = dims[1]
#     panoImg2 = panoImg[0:int(Hs/2),:]
#     del panoImg
#     # 旋转角的定义
#     rotateAng = 360 - float(yaw)
#     # 得到鱼眼的半径
#     R1 = 0
#     R2 = int(2*Ws/(2*np.pi) - R1 +0.5)
#     R22 = Hs + R1
#     # 估计球体或鱼眼图像的大小
#     Hd = int(Ws/np.pi)+2
#     Wd = int(Ws/np.pi)+2
#     # 创建空矩阵来存储仿射参数
#     xmap = np.zeros((Hd,Wd),np.float32)
#     ymap = np.zeros((Hd,Wd),np.float32)
#     # 目标图像或球体图像的中心
#     CSx = int(0.5*Wd)
#     CSy = int(0.5*Hd)
#     # 将球体图像分成四个部分，并为每个部分重新投影全景
#     for yD in range(Hd):
#         for xD in range(CSx):
#             r = math.sqrt((yD - CSy)**2 + (xD - CSx)**2)
#             theta = 0.5*np.pi + math.atan((yD - CSy)/(xD - CSx+0.0000001)) 
#             xS = theta/(2*np.pi)*Ws
#             yS = (r - R1)/(R2 - R1)*Hs
#             xmap.itemset((yD,xD),xS)
#             ymap.itemset((yD,xD),yS)
#         for xD in range(CSx,Wd):
#             r = math.sqrt((yD - CSy)**2 + (xD - CSx)**2)            
#             theta = 1.5*np.pi + math.atan((yD - CSy)/(xD - CSx+0.0000001))
#             xS = theta/(2*np.pi)*Ws
#             yS = (r - R1)/(R2 - R1)*Hs 
#             xmap.itemset((yD,xD),xS)
#             ymap.itemset((yD,xD),yS)
#     # 利用仿射生成新的半球形图像
#     outputImg = cv2.remap(panoImg2,xmap,ymap,cv2.INTER_CUBIC)
#     del xmap,ymap,panoImg2    
#     # 去掉底部中心栏的黑线
#     if len(dims) > 2:
#         outputImg[int(CSy):,CSx,:] = outputImg[int(CSy):,CSx - 1,:]
#         outputImg[int(CSy):,int(CSx + 0.5),:] = outputImg[CSy:,int(CSx + 0.5) + 1,:]
#     else:
#         outputImg[int(CSy):,CSx] = outputImg[int(CSy):,CSx - 1]
#         outputImg[int(CSy):,int(CSx + 0.5)] = outputImg[CSy:,int(CSx + 0.5) + 1]
#     dims = outputImg.shape
#     rows = dims[0]
#     cols = dims[1]
#     M = cv2.getRotationMatrix2D((cols/2,rows/2),rotateAng,1)
#     rotatedFisheyeImg = cv2.warpAffine(outputImg,M,(cols,rows))
#     img = Image.fromarray(rotatedFisheyeImg)
#     del outputImg
#     img.save(outputImgFile)
#     del img
#     return rotatedFisheyeImg

# def generate_fisheye_images(shp_file, image_folder, output_folder):
#     '''
#     适应文件夹系统的生成鱼眼图像流程函数
#     '''
#     # 读取点shp文件
#     gdf = gpd.read_file(shp_file)
#     # 过滤掉pid为-1的行
#     gdf = gdf[gdf['pid'] != -1]
#     # 初始化进度条
#     with tqdm(total=len(gdf)) as pbar:
#         # 遍历shapefile中过滤的行
#         for index, row in gdf.iterrows():
#             pid = row['pid']
#             yaw = row['yaw']
#             # 在image文件夹中找到相应的PNG文件
#             file_name = f"{pid}.png"
#             file_path = os.path.join(image_folder, file_name)
#             if os.path.exists(file_path):
#                 # 读取PNG图像并转换为numpy数组
#                 with Image.open(file_path) as img:
#                     panoImg = np.array(img)
#                     # 调用该函数转换为鱼眼图像
#                     hemi_img = cylinder2fisheyeImage(panoImg, yaw)
#                     output_file = os.path.join(output_folder, f"{pid}.png")
#                     # 将hemi_img保存到指定的输出文件位置
#                     Image.fromarray(hemi_img).save(output_file)
#             # Update the progress bar
#             pbar.update(1)

# 6.优化csv文件
def get_better_csv(input_file, output_file):
    # 读取 CSV 文件
    df = pd.read_csv(input_file, encoding='utf-8')
    
    # 删除指定的列
    df.drop(columns=['name','NEAR_DIST', 'NEAR_ANGLE', 'geometry'], inplace=True)
    
    # 删除 pid 列中等于 "-1" 的行
    df = df[df['pid'] != '-1']
    
    # 将 'id' 列移动到最前面并重命名为 'dot_id'
    df.rename(columns={'id': 'dot_id'}, inplace=True)
    cols = ['dot_id'] + [col for col in df.columns if col != 'dot_id']
    df = df[cols]
    
    # 将所有大写的列名修改为小写
    df.columns = [col.lower() for col in df.columns]
    
    # 坐标转换：从 EPSG:32648 转换为 EPSG:4326
    transformer = Transformer.from_crs("epsg:32648", "epsg:4326")
    df['50lon'], df['50lat'] = transformer.transform(df['50lon'].values, df['50lat'].values)
    
    # 保存处理后的数据到新的 CSV 文件中
    df.to_csv(output_file, index=False, encoding='utf-8-sig')

# 7.计算眩光遮挡状况
def date_to_sun_elevation(date,lon,lat):
    '''
    根据日期与经纬度获得太阳高度角
    '''
    sun_elevation = get_altitude(lat,lon,date)
    return sun_elevation

def azimuth_angle_calculator(lat,lon,date):
    '''
    计算太阳方位角，根据经纬度以及日期
    '''
    azimuth_angle = (get_azimuth(lat,lon,date))
    return azimuth_angle

def Sun_judgement_noaa_creat_new(pid, skyImg, glareSize, azimuth, sunele, output_img_dir):
    '''
    判断太阳是否被遮挡
    pid: str - 图像的唯一标识符
    skyImg: numpy.ndarray - 天空图像的数组表示
    glareSize: int - 太阳眩光的大小
    azimuth: float - 太阳方位角
    sunele: float - 太阳高度角
    output_img_dir: str - 输出图像的文件夹路径
    '''
    # 如果不存在，新建一个文件夹用于存储输出图像
    if not os.path.exists(output_img_dir):
        os.makedirs(output_img_dir)
    [cols, rows] = skyImg.shape
    # 将方位角和日晷转换为弧度
    azimuth_skyimg = -(azimuth - 90)
    if azimuth_skyimg < 0: 
        azimuth_skyimg += 360
    sunele = sunele * np.pi / 180.0
    azimuth = azimuth_skyimg * np.pi / 180.0
    # 根据方位角和太阳高度在鱼眼图像上定位相应的像素点
    R = int(0.5 * rows)
    if sunele < 0: 
        sunele = 0
    r = (90 - sunele * 180 / np.pi) / 90.0 * R
    px = int(r * math.cos(azimuth) + int(0.5 * cols)) - 1
    py = int(int(0.5 * rows) - r * math.sin(azimuth)) - 1
    boundXl = px - glareSize
    if boundXl < 0: boundXl = 0
    boundXu = px + glareSize
    if boundXu > cols - 1: boundXu = cols - 1
    boundYl = py - glareSize
    if boundYl < 0: boundYl = 0
    boundYu = py + glareSize
    if boundYu > rows - 1: boundYu = rows - 1
    # 确定太阳是在遮挡的还是开放的天空像素上
    idx = np.where(skyImg[boundYl:boundYu, boundXl:boundXu] == 255)  # 白色为天空
    if len(idx[0]) / (4 * glareSize * glareSize) > 0.5:
        shade = 0
    else:
        shade = 1
    # 在天空图像上绘制太阳位置
    img = Image.fromarray(skyImg)
    draw = ImageDraw.Draw(img)
    draw.point((px, py), fill="red")
    # 修改原图像中的像素值
    skyImg[py, px] = 5
    # 生成具有唯一名称的输出图像路径
    img_filename = os.path.join(output_img_dir, f"{pid}_sun.png")
    # 保存修改后的天空图像与太阳的位置
    img.save(img_filename)
    return shade

def Sun_judgement_noaa(skyImg, glareSize, azimuth, sunele):
    '''
    判断太阳是否被遮挡
    pid: str - 图像的唯一标识符
    skyImg: numpy.ndarray - 天空图像的数组表示
    glareSize: int - 太阳眩光的大小
    azimuth: float - 太阳方位角
    sunele: float - 太阳高度角
    output_img_dir: str - 输出图像的文件夹路径
    '''
    [cols, rows] = skyImg.shape
    # 将方位角和日晷转换为弧度
    azimuth_skyimg = -(azimuth - 90)
    if (azimuth_skyimg < 0): 
        azimuth_skyimg += 360
    sunele = sunele * np.pi / 180.0
    azimuth = azimuth_skyimg * np.pi / 180.0
    # 根据方位角和太阳高度在鱼眼图像上定位相应的像素点
    R = int(0.5 * rows)
    if (sunele < 0): 
        sunele = 0
    r = (90 - sunele * 180 / np.pi) / 90.0 * R
    px = int(r * math.cos(azimuth) + int(0.5 * cols)) - 1
    py = int(int(0.5 * rows) - r * math.sin(azimuth)) - 1
    boundXl = px - glareSize
    if (boundXl < 0): boundXl = 0
    boundXu = px + glareSize
    if (boundXu > cols - 1): boundXu = cols - 1
    boundYl = py - glareSize
    if (boundYl < 0): boundYl = 0
    boundYu = py + glareSize
    if (boundYu > rows - 1): boundYu = rows - 1
    # 确定太阳是在遮挡的还是开放的天空像素上
    idx = np.where(skyImg[boundYl:boundYu, boundXl:boundXu] == 255)  # 白色为天空
    if (len(idx[0]) / (4 * glareSize * glareSize) > 0.5):
        shade = 0
    else:
        shade = 1
    return shade

def sun_glare_calculator(date,lon,lat,vision_form_slope_angle,vision_form_east_angle):
    '''
    太阳眩光的判断,未考虑街景,单纯从水平与垂直着手,判断水平和垂直是否符合条件,符合条件返回1
    '''
    horizental_glare_situation = horizental_glare_calculator(date,lon,lat,vision_form_east_angle)
    vertical_glare_situation = vertical_glare_calculatior(date,lon,lat,vision_form_slope_angle)
    if horizental_glare_situation == 1 and vertical_glare_situation == 1:
        sun_glare_situation = 1
    else:
        sun_glare_situation = 0
    return sun_glare_situation

def horizental_glare_calculator(date,lon,lat,vision_form_east_angle):
    '''
    水平眩光的判断
    '''
    azimuth_angle_east = azimuth_angle_calculator_north_to_east(lat,lon,date)
    horizental_glare = azimuth_angle_east - vision_form_east_angle
    horizental_glare_situation = (horizental_glare < 25) & (horizental_glare > -25)
    return horizental_glare_situation.astype(int)

def azimuth_angle_calculator_north_to_east(lat,lon,date):
    '''
    将太阳方位角转为东开始，且逆时针增加
    '''
    azimuth_angle = azimuth_angle_calculator(lat,lon,date)
    azimuth_angle_east = 90 - azimuth_angle
    while azimuth_angle_east < 0:
        azimuth_angle_east += 360
    return azimuth_angle_east

def vertical_glare_calculatior(date,lon,lat,vision_form_slope_angle = 0):
    '''
    坡度默认为0,因为街景图象获取的时候都是平视角获取的
    '''
    sun_elevation = date_to_sun_elevation(date,lon,lat)
    vertical_glare = sun_elevation - vision_form_slope_angle
    vertical_glare_situation = (vertical_glare < 25) & (vertical_glare > -25)
    #1 is true
    return vertical_glare_situation.astype(int)

def initialize_csv(csv_file):
    if not os.path.exists(csv_file):
        with open(csv_file, mode='w', newline='') as file:
            file.write("pid,result\n")
    return pd.read_csv(csv_file)

# def get_sun_glare_situation_from_hemi_pano_and_date(csv_file, hemi_place_test, year, month, day, second, interval_minutes):
#     # 生成文件名
#     result_filename = f"result_{year}_{month:02d}_{day:02d}_interval_{interval_minutes}min.csv"
#     result_df = initialize_csv(result_filename)
#     df = pd.read_csv(csv_file)
#     for index, row in tqdm(df.iterrows(), total=len(df), desc="Processing"):
#         pid = row['pid']
#         lon, lat = row['lon'], row['lat']
#         yaw = row['yaw']
#         image_file = f"{pid}.png"
#         image_path = os.path.join(hemi_place_test, image_file)
#         totaltime = 0
#         if not os.path.exists(image_path):
#             print(f"Image file {image_file} not found, skipping...")
#             continue
#         hemiimg_pil = Image.open(image_path)
#         print(image_file)
#         hemiimg = np.array(hemiimg_pil)
#         hemiimg_gray = cv2.cvtColor(hemiimg, cv2.COLOR_RGB2GRAY)
#         start_time = datetime(year, month, day, 6, 0, second)
#         end_time = datetime(year, month, day, 18, 59, second)
#         current_time = start_time
#         while current_time <= end_time:
#             date = current_time.strftime("%Y-%m-%d %H:%M:%S")
#             if date not in result_df.columns:
#                 result_df[date] = 0
#             sunele = date_to_sun_elevation(date, lon, lat)
#             if sunele <= 0:
#                 current_time += timedelta(minutes=interval_minutes)
#                 continue
#             azimuth = azimuth_angle_calculator(lat, lon, date)
#             zhedang = Sun_judgement_noaa(hemiimg_gray, 5, azimuth, sunele)
#             xuanguangtiaojian = sun_glare_calculator(date, lon, lat, vision_form_slope_angle=0, vision_form_east_angle=yaw)
#             if xuanguangtiaojian == 1 and zhedang == 0:
#                 totaltime += interval_minutes
#                 now = 1
#                 print(date, "YES", pid)
#             else:
#                 now = 0
#             result_df.loc[result_df['pid'] == pid, date] = now
#             current_time += timedelta(minutes=interval_minutes)
#         result_df.loc[result_df['pid'] == pid, 'result'] = totaltime
#     result_df.to_csv('result_{year}_{month:02d}_{day:02d}_interval_{interval_minutes}min.csv', index=False)

# 7.1使用多线程运行的方式
'''
import pandas as pd
import os
from tqdm import tqdm
from PIL import Image
import numpy as np
import math
import cv2
from datetime import datetime as dt, timedelta
from pysolar.solar import *
import pytz
from multiprocessing import Pool, Manager

def date_to_sun_elevation(date, lon, lat):
    sun_elevation = get_altitude(lat, lon, date)
    return sun_elevation

def azimuth_angle_calculator(lat, lon, date):
    azimuth_angle = get_azimuth(lat, lon, date)
    return azimuth_angle

def Sun_judgement_noaa(skyImg, glareSize, azimuth, sunele):
    [cols, rows] = skyImg.shape
    azimuth_skyimg = -(azimuth - 90)
    if azimuth_skyimg < 0:
        azimuth_skyimg += 360
    sunele = sunele * np.pi / 180.0
    azimuth = azimuth_skyimg * np.pi / 180.0
    R = int(0.5 * rows)
    if sunele < 0:
        sunele = 0
    r = (90 - sunele * 180 / np.pi) / 90.0 * R
    px = int(r * math.cos(azimuth) + int(0.5 * cols)) - 1
    py = int(int(0.5 * rows) - r * math.sin(azimuth)) - 1
    boundXl = px - glareSize
    if boundXl < 0: boundXl = 0
    boundXu = px + glareSize
    if boundXu > cols - 1: boundXu = cols - 1
    boundYl = py - glareSize
    if boundYl < 0: boundYl = 0
    boundYu = py + glareSize
    if boundYu > rows - 1: boundYu = rows - 1
    idx = np.where(skyImg[boundYl:boundYu, boundXl:boundXu] == 255)
    shade = 0 if len(idx[0]) / (4 * glareSize * glareSize) > 0.5 else 1
    return shade

def sun_glare_calculator(date, lon, lat, vision_form_slope_angle, vision_form_east_angle):
    sun_elevation = date_to_sun_elevation(date, lon, lat)
    if sun_elevation <= 0:
        return 0  # 太阳高度角小于0，不可能产生眩光
    
    horizental_glare_situation = horizental_glare_calculator(date, lon, lat, vision_form_east_angle)
    vertical_glare_situation = vertical_glare_calculatior(date, lon, lat, vision_form_slope_angle)
    sun_glare_situation = 1 if horizental_glare_situation == 1 and vertical_glare_situation == 1 else 0
    return sun_glare_situation

def horizental_glare_calculator(date, lon, lat, vision_form_east_angle):
    azimuth_angle_east = azimuth_angle_calculator_north_to_east(lat, lon, date)
    horizental_glare = azimuth_angle_east - vision_form_east_angle
    horizental_glare_situation = (horizental_glare < 25) & (horizental_glare > -25)
    return horizental_glare_situation.astype(int)

def azimuth_angle_calculator_north_to_east(lat, lon, date):
    azimuth_angle = azimuth_angle_calculator(lat, lon, date)
    azimuth_angle_east = 90 - azimuth_angle
    while azimuth_angle_east < 0:
        azimuth_angle_east += 360
    return azimuth_angle_east

def vertical_glare_calculatior(date, lon, lat, vision_form_slope_angle=0):
    sun_elevation = date_to_sun_elevation(date, lon, lat)
    vertical_glare = sun_elevation - vision_form_slope_angle
    vertical_glare_situation = (vertical_glare < 25) & (vertical_glare > -25)
    return vertical_glare_situation.astype(int)

def split_csv_file(csv_file, output_dir, num_chunks):
    df = pd.read_csv(csv_file)
    chunk_size = len(df) // num_chunks
    chunks = [df.iloc[i:i + chunk_size] for i in range(0, len(df), chunk_size)]
    
    chunk_files = []
    for i, chunk in enumerate(chunks):
        chunk_file = os.path.join(output_dir, f"chunk_{i}.csv")
        chunk.to_csv(chunk_file, index=False)
        chunk_files.append(chunk_file)
    
    return chunk_files

def process_image_chunk(args):
    chunk_file, hemi_place_test, year, month, day, second, interval_minutes, local_timezone, output_dir, chunk_index = args
    df = pd.read_csv(chunk_file)
    result_filename = os.path.join(output_dir, f"result_chunk_{chunk_index}.csv")
    
    # 如果文件不存在，创建它，并写入表头
    if not os.path.exists(result_filename):
        result_df = pd.DataFrame(columns=['pid'] + [f"{year}-{month:02d}-{day:02d} {hour:02d}:{minute:02d}:{second:02d}" 
                                                     for hour in range(5, 20) 
                                                     for minute in range(20 if hour == 5 else 0, 60, interval_minutes)] + ['result'])
        result_df.to_csv(result_filename, index=False, mode='w')

    for index, row in df.iterrows():
        pid = row['pid']
        lon, lat = row['lon'], row['lat']
        yaw = row['yaw']
        image_file = f"{pid}.png"
        image_path = os.path.join(hemi_place_test, image_file)
        totaltime = 0
        if pid == '-1' or not os.path.exists(image_path):
            continue

        hemiimg_pil = Image.open(image_path)
        hemiimg = np.array(hemiimg_pil)
        hemiimg_gray = cv2.cvtColor(hemiimg, cv2.COLOR_RGB2GRAY)
        start_time = dt(year, month, day, 5, 20, second)
        end_time = dt(year, month, day, 19, 50, second)
        current_time = start_time

        result_data = {'pid': pid}
        
        while current_time <= end_time:
            date = local_timezone.localize(current_time)
            sunele = date_to_sun_elevation(date, lon, lat)
            if sunele <= 0:
                now = 0
                result_data[date.strftime("%Y-%m-%d %H:%M:%S")] = now
                current_time += timedelta(minutes=interval_minutes)
                continue
            azimuth = azimuth_angle_calculator(lat, lon, date)
            zhedang = Sun_judgement_noaa(hemiimg_gray, 5, azimuth, sunele)
            xuanguangtiaojian = sun_glare_calculator(date, lon, lat, vision_form_slope_angle=0, vision_form_east_angle=yaw)
            now = 1 if xuanguangtiaojian == 1 and zhedang == 0 else 0

            result_data[date.strftime("%Y-%m-%d %H:%M:%S")] = now
            totaltime += interval_minutes if now else 0

            current_time += timedelta(minutes=interval_minutes)
        
        result_data['result'] = totaltime
        
        # 将结果附加到CSV文件中
        result_df = pd.DataFrame([result_data])
        result_df.to_csv(result_filename, index=False, mode='a', header=False)
    
    return result_filename

def merge_csv_files(csv_files, output_file):
    combined_df = pd.concat([pd.read_csv(f) for f in csv_files])
    combined_df.to_csv(output_file, index=False)

def get_sun_glare_situation_multithreaded(csv_file, hemi_place_test, year, month, day, second, interval_minutes, output_dir, num_threads):
    # Split the input CSV file into smaller chunks
    chunk_files = split_csv_file(csv_file, output_dir, num_threads)
    
    local_timezone = pytz.timezone('Asia/Shanghai')
    result_files = []
    
    # 计算总的图像数量，用于设置进度条的总数
    total_images = sum([len(pd.read_csv(chunk_file)) for chunk_file in chunk_files])

    # Process each chunk file in a separate process
    with Pool(processes=num_threads) as pool:
        args = [
            (chunk_file, hemi_place_test, year, month, day, second, interval_minutes, local_timezone, output_dir, i)
            for i, chunk_file in enumerate(chunk_files)
        ]
        with tqdm(total=total_images, desc="Overall Progress") as pbar:
            for result_file in pool.imap_unordered(process_image_chunk, args):
                result_files.append(result_file)
                pbar.update(1)
    
    # Merge the result CSV files into a single file
    final_result_file = os.path.join(output_dir, f"result_{year}_{month:02d}_{day:02d}_interval_{interval_minutes}min.csv")
    merge_csv_files(result_files, final_result_file)

    # Clean up temporary files
    for file in chunk_files + result_files:
        os.remove(file)

if __name__ == "__main__":
    # 示例调用
    clean_pano_csv_file = r'D:\wuhan_rd_pano\road\pano_road_01.csv'
    hemi_folder = r'D:\wuhan_rd_pano\hemi'
    output_directory = r'D:\wuhan_rd_pano\road\season'
    num_threads = 48  # 使用系统CPU核数作为线程数
    get_sun_glare_situation_multithreaded(clean_pano_csv_file, hemi_folder, 2024, 1, 15, 0, 10, output_directory, num_threads)
'''

# 8. 合并并优化列名，删除无眩光列
def merge_csv_files_in_chunks(clean_csv_path, date_csv_folder, output_folder):
    # 获取 date_csv_folder 文件夹中的所有 CSV 文件
    date_csv_files = [f for f in os.listdir(date_csv_folder) if f.endswith('.csv')]
    
    # 如果输出文件夹不存在，则创建它
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # 读取 clean_csv_path 文件
    clean_df = pd.read_csv(clean_csv_path)
    clean_df['pid'] = clean_df['pid'].astype(str)
    
    # 循环处理每个 CSV 文件，并显示进度条
    for date_csv_file in tqdm(date_csv_files, desc="合并CSV文件进度"):
        date_csv_path = os.path.join(date_csv_folder, date_csv_file)
        
        # 读取 date_csv_path 文件
        date_df = pd.read_csv(date_csv_path)
        
        # 将 date_df 的 pid 列转换为字符串类型
        date_df['pid'] = date_df['pid'].astype(str)
        
        # 修改列名，删除日期部分并在时间前面加上 't'
        new_columns = ['pid'] + ['t' + col.split(' ')[1] if ' ' in col else col for col in date_df.columns[1:]]
        date_df.columns = new_columns
        
        # 删除 result 列为 0 的行
        date_df = date_df[date_df['result'] != 0]
        
        # 删除全是 0 的列
        date_df = date_df.loc[:, (date_df != 0).any(axis=0)]
        # 根据 pid 列进行合并
        merged_df = pd.merge(date_df, clean_df[['pid', '50lon', '50lat', 'road_name', 'near_fid', 'yaw']], on='pid', how='left')
        
        # 保存合并后的 DataFrame 到新的 CSV 文件
        output_csv_path = os.path.join(output_folder, date_csv_file)
        merged_df.to_csv(output_csv_path, index=False, encoding='utf-8-sig')

def csv_to_shp(csv_file, shp_file, lon_col='50lon', lat_col='50lat', epsg=32648):
    """
    将 CSV 文件中的点数据转换为 Shapefile 格式。

    参数:
    csv_file (str): 输入的 CSV 文件路径。
    shp_file (str): 输出的 Shapefile 文件路径。
    lon_col (str): 经度列名，默认为 '50lon'。
    lat_col (str): 纬度列名，默认为 '50lat'。
    epsg (int): 坐标系 EPSG 代码，默认为 32648。
    """
    # 读取 CSV 文件
    df = pd.read_csv(csv_file, low_memory=False)

    # 处理列名，将日期部分去掉，只保留时间部分，并在时间部分前加上字母 t
    new_columns = {}
    for col in df.columns:
        if ' ' in col:
            new_col = 't' + col.split(' ')[1]
            new_columns[col] = new_col
        else:
            new_columns[col] = col
    df.rename(columns=new_columns, inplace=True)

    # 创建几何列
    geometry = [Point(xy) for xy in zip(df[lon_col], df[lat_col])]

    # 创建 GeoDataFrame
    gdf = gpd.GeoDataFrame(df, geometry=geometry)

    # 设置坐标系为 EPSG:32648
    gdf.set_crs(epsg=epsg, inplace=True)

    # 保存为 Shapefile，确保保存为中文
    gdf.to_file(shp_file, encoding='utf-8')

def update_whrd7_tables_noday(date_csv_folder, db_params):
    # 获取 date_csv_folder 文件夹中的所有 CSV 文件
    date_csv_files = [f for f in os.listdir(date_csv_folder) if f.endswith('.csv')]
    
    # 连接数据库
    conn = psycopg2.connect(**db_params)
    cur = conn.cursor()
    
    # 循环处理每个 CSV 文件，并显示进度条
    for date_csv_file in tqdm(date_csv_files, desc="处理CSV文件进度"):
        date_csv_path = os.path.join(date_csv_folder, date_csv_file)
        
        # 读取 date_csv_path 文件
        date_df = pd.read_csv(date_csv_path)
        
        # 获取月份
        month = date_csv_file.split('_')[2]
        
        # 获取所有时间列
        time_columns = [col for col in date_df.columns if col.startswith('t')]
        
        for time_col in time_columns:
            # 创建专属的 whrd7 表
            sanitized_time_col = time_col.replace(':', '_')
            whrd7_table_name = f"whrd7_{month}_{sanitized_time_col}"
            cur.execute(f"CREATE TABLE {whrd7_table_name} AS TABLE whrd7")
            
            # 获取需要更新的 near_fid 列表
            near_fids = date_df.loc[date_df[time_col] == 1, 'near_fid'].tolist()
            print(f"Updating {len(near_fids)} records in {whrd7_table_name}...")
            # 更新 whrd7 表中的 forward_time 和 reverse_time
            update_query = f"""
            UPDATE {whrd7_table_name}
            SET forward_time = 99999, reverse_time = 99999
            WHERE id = ANY(%s)
            """
            cur.execute(update_query, (near_fids,))
    
    # 提交更改并关闭数据库连接
    conn.commit()
    cur.close()
    conn.close()

def update_whrd7_tables(date_csv_folder, db_params):
    # 获取 date_csv_folder 文件夹中的所有 CSV 文件
    date_csv_files = [f for f in os.listdir(date_csv_folder) if f.endswith('.csv')]
    
    # 连接数据库
    conn = psycopg2.connect(**db_params)
    cur = conn.cursor()
    
    # 循环处理每个 CSV 文件，并显示进度条
    for date_csv_file in tqdm(date_csv_files, desc="处理CSV文件进度"):
        date_csv_path = os.path.join(date_csv_folder, date_csv_file)
        
        # 读取 date_csv_path 文件
        date_df = pd.read_csv(date_csv_path)
        
        # 获取月份和天数
        parts = date_csv_file.split('_')
        month = parts[2]
        day = parts[3]
        print(f"Processing{day}...")
        
        # 获取所有时间列
        time_columns = [col for col in date_df.columns if col.startswith('t')]
        
        for time_col in time_columns:
            # 创建专属的 whrd7 表
            sanitized_time_col = time_col.replace(':', '_')
            whrd7_table_name = f"whrd7_{month}_{sanitized_time_col}_{day}"
            cur.execute(f"CREATE TABLE {whrd7_table_name} AS TABLE whrd7")
            
            # 获取需要更新的 near_fid 列表
            near_fids = date_df.loc[date_df[time_col] == 1, 'near_fid'].tolist()
            print(f"Updating {len(near_fids)} records in {whrd7_table_name}...")
            # 更新 whrd7 表中的 forward_time 和 reverse_time
            update_query = f"""
            UPDATE {whrd7_table_name}
            SET forward_time = 99999, reverse_time = 99999
            WHERE id = ANY(%s)
            """
            cur.execute(update_query, (near_fids,))
    
    # 提交更改并关闭数据库连接
    conn.commit()
    cur.close()
    conn.close()

# 数据库连接参数
db_params = {
    "dbname": "postgis_34_sample",
    "user": "postgres",
    "password": "postgres1",
    "host": "localhost"
}

# 画图函数
def plot_solar_angles():
    # 设置中文字体
    plt.rcParams['font.sans-serif'] = ['SimHei']  # 使用黑体
    plt.rcParams['axes.unicode_minus'] = False  # 解决负号显示问题

    # 武汉市的经纬度
    latitude = 30.52
    longitude = 114.31

    # 2024年6月到8月的日期，每5天一条线
    start_date = datetime(2024, 6, 1)
    end_date = datetime(2024, 8, 31)
    delta_days = 3

    # 创建两个独立的图形
    fig1, ax1 = plt.subplots(figsize=(10, 6))
    fig2, ax2 = plt.subplots(figsize=(10, 6))

    current_date = start_date
    while current_date <= end_date:
        times = []
        altitudes = []
        azimuths = []

        # 从日出到日落，每5分钟一个间隔
        dt = current_date.replace(hour=0, minute=0, second=0, microsecond=0, tzinfo=timezone.utc)
        while dt.date() == current_date.date():
            # 转换为北京时间
            dt_beijing = dt.astimezone(timezone(timedelta(hours=8)))
            altitude = get_altitude(latitude, longitude, dt_beijing)
            if altitude > 0:  # 只记录高度角大于0的时间点
                azimuth = get_azimuth(latitude, longitude, dt_beijing)
                times.append(dt_beijing.hour + dt_beijing.minute / 60)  # 只记录小时和分钟
                altitudes.append(altitude)
                azimuths.append((450 - azimuth) % 360)  # 转换方位角为从东开始逆时针
            dt += timedelta(minutes=5)

        if times:  # 确保有数据才绘制
            # 绘制高度角
            ax1.scatter(times, altitudes, label=current_date.strftime('%Y-%m-%d'), s=10)  # 设置点的大小为10

            # 绘制方位角
            ax2.scatter(times, azimuths, label=current_date.strftime('%Y-%m-%d'), s=10)  # 设置点的大小为10

        current_date += timedelta(days=delta_days)

    # 设置高度角图形属性
    ax1.set_title('太阳高度角 (武汉市, 2024年6月到8月)')
    ax1.set_xlabel('时间 (小时)')
    ax1.set_ylabel('高度角 (度)')
    ax1.set_xticks(range(0, 25, 2))  # 设置 x 轴刻度为每2小时
    ax1.legend()
    ax1.grid(True)  # 显示格网

    # 设置方位角图形属性
    ax2.set_title('太阳方位角 (武汉市, 2024年6月到8月)')
    ax2.set_xlabel('时间 (小时)')
    ax2.set_ylabel('方位角 (度)')
    ax2.set_xticks(range(0, 25, 2))  # 设置 x 轴刻度为每2小时
    ax2.legend()
    ax2.grid(True)  # 显示格网

    plt.tight_layout()
    plt.show()

# 10. 统计各区街景点数据
def count_points_in_districts(point_csv, polygon_shp, output_csv):
    # 读取点数据
    points_df = pd.read_csv(point_csv)
    points_gdf = gpd.GeoDataFrame(points_df, geometry=gpd.points_from_xy(points_df['50lon'], points_df['50lat']), crs="EPSG:4326")
    
    # 读取面数据
    polygons_gdf = gpd.read_file(polygon_shp)
    
    # 确保面数据的坐标系为WGS84
    polygons_gdf = polygons_gdf.to_crs(epsg=4326)
    
    # 空间连接，找到每个点所在的区
    joined_gdf = gpd.sjoin(points_gdf, polygons_gdf, how="left", op="within")
    
    # 统计每个区的点数量
    district_counts = joined_gdf.groupby('县区name').size().reset_index(name='计数')
    
    # 保存结果到新的CSV文件
    district_counts.to_csv(output_csv, index=False, encoding='utf-8-sig')

def count_points_in_districts_month(point_csv, polygon_shp, output_csv, monthly_files):
    # 读取点数据
    points_df = pd.read_csv(point_csv)
    points_gdf = gpd.GeoDataFrame(points_df, geometry=gpd.points_from_xy(points_df['50lon'], points_df['50lat']), crs="EPSG:4326")
    
    # 读取面数据
    polygons_gdf = gpd.read_file(polygon_shp)
    
    # 确保面数据的坐标系为WGS84
    polygons_gdf = polygons_gdf.to_crs(epsg=4326)
    
    # 空间连接，找到每个点所在的区
    joined_gdf = gpd.sjoin(points_gdf, polygons_gdf, how="left", op="within")
    
    # 统计每个区的点数量
    district_counts = joined_gdf.groupby('县区name').size().reset_index(name='计数')
    
    # 处理每个月的文件
    for monthly_file in monthly_files:
        month_name = os.path.basename(monthly_file).split('_')[2]  # 从文件名中提取月份
        monthly_df = pd.read_csv(monthly_file)
        monthly_gdf = gpd.GeoDataFrame(monthly_df, geometry=gpd.points_from_xy(monthly_df['50lon'], monthly_df['50lat']), crs="EPSG:4326")
        
        # 空间连接，找到每个点所在的区
        monthly_joined_gdf = gpd.sjoin(monthly_gdf, polygons_gdf, how="left", op="within")
        
        # 统计每个区的点数量
        monthly_counts = monthly_joined_gdf.groupby('县区name').size().reset_index(name=f't{month_name}')
        
        # 将每个月的统计结果合并到总的统计结果中
        district_counts = district_counts.merge(monthly_counts, on='县区name', how='left')
    
    # 保存结果到新的CSV文件
    district_counts.to_csv(output_csv, index=False, encoding='utf-8-sig')

def count_time_intervals_in_districts(polygon_shp, monthly_files, output_csv):
    # 读取面数据
    polygons_gdf = gpd.read_file(polygon_shp)
    
    # 确保面数据的坐标系为WGS84
    polygons_gdf = polygons_gdf.to_crs(epsg=4326)
    
    all_time_counts = pd.DataFrame()
    
    # 处理每个月的文件
    for monthly_file in monthly_files:
        month_name = os.path.basename(monthly_file).split('_')[2]  # 从文件名中提取月份
        monthly_df = pd.read_csv(monthly_file)
        monthly_gdf = gpd.GeoDataFrame(monthly_df, geometry=gpd.points_from_xy(monthly_df['50lon'], monthly_df['50lat']), crs="EPSG:4326")
        
        # 空间连接，找到每个点所在的区
        monthly_joined_gdf = gpd.sjoin(monthly_gdf, polygons_gdf, how="left", op="within")
        
        # 统计每个区每个时间段的点数量
        time_columns = [col for col in monthly_df.columns if col.startswith('t')]
        for time_col in time_columns:
            time_counts = monthly_joined_gdf[monthly_joined_gdf[time_col] == 1].groupby('县区name').size().reset_index(name=f't{month_name}_{time_col}')
            if all_time_counts.empty:
                all_time_counts = time_counts
            else:
                all_time_counts = all_time_counts.merge(time_counts, on='县区name', how='outer')
    
    # 填充缺失值为0
    all_time_counts = all_time_counts.fillna(0)
    
    # 保存结果到新的CSV文件
    all_time_counts.to_csv(output_csv, index=False, encoding='utf-8-sig')

# 11.统计各区街景点数据，存入数据库
def import_csv_to_postgresql(csv_file, dbname, user, password, host, port, table_name):
    # 读取 CSV 文件
    df = pd.read_csv(csv_file)

    # 连接到 PostgreSQL 数据库
    conn = psycopg2.connect(
        dbname=dbname,
        user=user,
        password=password,
        host=host,
        port=port
    )
    cursor = conn.cursor()

    # 自动生成创建表的 SQL 语句
    columns = df.columns
    create_table_query = sql.SQL(
        'CREATE TABLE IF NOT EXISTS {} ({})'
    ).format(
        sql.Identifier(table_name),
        sql.SQL(', ').join(
            sql.SQL('{} {}').format(
                sql.Identifier(col),
                sql.SQL('TEXT') if df[col].dtype == 'object' else sql.SQL('INTEGER')
            ) for col in columns
        )
    )

    # 执行创建表的 SQL 语句
    cursor.execute(create_table_query)
    conn.commit()

    # 插入数据
    for index, row in df.iterrows():
        insert_query = sql.SQL(
            'INSERT INTO {} ({}) VALUES ({})'
        ).format(
            sql.Identifier(table_name),
            sql.SQL(', ').join(map(sql.Identifier, columns)),
            sql.SQL(', ').join(sql.Placeholder() * len(columns))
        )
        cursor.execute(insert_query, tuple(row))

    # 提交事务并关闭连接
    conn.commit()
    cursor.close()
    conn.close()

# 12.根据区打散街景点数据
def save_points_by_district(point_csv, polygon_shp, output_folder):
    # 读取点数据
    points_df = pd.read_csv(point_csv)
    points_gdf = gpd.GeoDataFrame(points_df, geometry=gpd.points_from_xy(points_df['50lon'], points_df['50lat']), crs="EPSG:4326")
    
    # 读取面数据
    polygons_gdf = gpd.read_file(polygon_shp)
    
    # 确保面数据的坐标系为WGS84
    polygons_gdf = polygons_gdf.to_crs(epsg=4326)
    
    # 空间连接，找到每个点所在的区
    joined_gdf = gpd.sjoin(points_gdf, polygons_gdf, how="left", predicate="within")
    
    # 创建输出文件夹
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # 初始化总的 GeoDataFrame 来保存所有点数据
    all_points_gdf = gpd.GeoDataFrame(columns=joined_gdf.columns, crs=joined_gdf.crs)
    
    # 遍历每个区，保存各区的点数据到单独的Shapefile文件
    for district_name, group in joined_gdf.groupby('县区name'):
        district_points_gdf = gpd.GeoDataFrame(group, geometry='geometry')
        
        # 将 Shape_Area 字段转换为字符串
        if 'Shape_Area' in district_points_gdf.columns:
            district_points_gdf['Shape_Area'] = district_points_gdf['Shape_Area'].astype(str)
        
        # 重命名字段，确保字段名长度不超过10个字符
        district_points_gdf = district_points_gdf.rename(columns=lambda x: x[:10])
        
        # 创建区文件夹
        district_folder = os.path.join(output_folder, district_name)
        if not os.path.exists(district_folder):
            os.makedirs(district_folder)
        
        output_path = os.path.join(district_folder, f"{district_name}.shp")
        district_points_gdf.to_file(output_path, encoding='utf-8')
        print(f"Saved {district_name} points to {output_path}")
        
        # 删除重复的列名
        district_points_gdf = district_points_gdf.loc[:, ~district_points_gdf.columns.duplicated()]
        
        # 将当前区的点数据添加到总的 GeoDataFrame 中
        all_points_gdf = pd.concat([all_points_gdf, district_points_gdf], ignore_index=True)
        
        # 删除总的 GeoDataFrame 中的重复列名
        all_points_gdf = all_points_gdf.loc[:, ~all_points_gdf.columns.duplicated()]
    
    # 重命名总的 GeoDataFrame 的字段，确保字段名长度不超过10个字符
    all_points_gdf = all_points_gdf.rename(columns=lambda x: x[:10])
    
    # 保存总的点数据到一个 Shapefile 文件
    wuhan_folder = os.path.join(output_folder, "武汉市")
    if not os.path.exists(wuhan_folder):
        os.makedirs(wuhan_folder)
    
    wuhan_output_path = os.path.join(wuhan_folder, "武汉市.shp")
    all_points_gdf.to_file(wuhan_output_path, encoding='utf-8')
    print(f"Saved all points to {wuhan_output_path}")

# 12.根据区打散街景点数据
def save_points_by_district(point_csv, polygon_shp, output_folder):
    # 读取点数据
    points_df = pd.read_csv(point_csv)
    points_gdf = gpd.GeoDataFrame(points_df, geometry=gpd.points_from_xy(points_df['50lon'], points_df['50lat']), crs="EPSG:4326")
    
    # 读取面数据
    polygons_gdf = gpd.read_file(polygon_shp)
    
    # 确保面数据的坐标系为WGS84
    polygons_gdf = polygons_gdf.to_crs(epsg=4326)
    
    # 空间连接，找到每个点所在的区
    joined_gdf = gpd.sjoin(points_gdf, polygons_gdf, how="left", predicate="within")
    
    # 创建输出文件夹
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # 初始化总的 GeoDataFrame 来保存所有点数据
    all_points_gdf = gpd.GeoDataFrame(columns=joined_gdf.columns, crs=joined_gdf.crs)
    
    # 遍历每个区，保存各区的点数据到单独的Shapefile文件
    for district_name, group in joined_gdf.groupby('县区name'):
        district_points_gdf = gpd.GeoDataFrame(group, geometry='geometry')
        
        # 将 Shape_Area 字段转换为字符串
        if 'Shape_Area' in district_points_gdf.columns:
            district_points_gdf['Shape_Area'] = district_points_gdf['Shape_Area'].astype(str)
        
        # 重命名字段，确保字段名长度不超过10个字符
        district_points_gdf = district_points_gdf.rename(columns=lambda x: x[:10])
        
        # 创建区文件夹
        district_folder = os.path.join(output_folder, district_name)
        if not os.path.exists(district_folder):
            os.makedirs(district_folder)
        
        output_path = os.path.join(district_folder, f"{district_name}.shp")
        district_points_gdf.to_file(output_path, encoding='utf-8')
        print(f"Saved {district_name} points to {output_path}")
        
        # 删除重复的列名
        district_points_gdf = district_points_gdf.loc[:, ~district_points_gdf.columns.duplicated()]
        
        # 将当前区的点数据添加到总的 GeoDataFrame 中
        all_points_gdf = pd.concat([all_points_gdf, district_points_gdf], ignore_index=True)
        
        # 删除总的 GeoDataFrame 中的重复列名
        all_points_gdf = all_points_gdf.loc[:, ~all_points_gdf.columns.duplicated()]
    
    # 重命名总的 GeoDataFrame 的字段，确保字段名长度不超过10个字符
    all_points_gdf = all_points_gdf.rename(columns=lambda x: x[:10])
    
    # 保存总的点数据到一个 Shapefile 文件
    wuhan_folder = os.path.join(output_folder, "武汉市")
    if not os.path.exists(wuhan_folder):
        os.makedirs(wuhan_folder)
    
    wuhan_output_path = os.path.join(wuhan_folder, "武汉市.shp")
    all_points_gdf.to_file(wuhan_output_path, encoding='utf-8')
    print(f"Saved all points to {wuhan_output_path}")


if __name__ == "__main__":
    multiline_file = r"E:\webgislocation\rdraw.shp"
    singleline_file = r"E:\webgislocation\rdsingle.shp"
    rdsingle_only_BF_file = r"E:\webgislocation\rdsingle_onlyBF.shp"
    rdsingle_from_E_file = r"E:\webgislocation\rdsingle_from_E.shp"
    point_shp_path = r"E:\webgislocation\poinrd50_3.shp"
    yaw_shp_path = r"E:\webgislocation\poinrd50_3_yaw.shp"
    pano_folder = 'path/to/your/image/folder'
    sky_image_folder = 'path/to/your/image/folder'
    hemi_folder = 'path/to/your/image/folder'
    pano_csv_file = r"E:\webgislocation\filtered.csv"
    clean_pano_csv_file = r"E:\webgislocation\pano_road_01.csv"
    shp_date_file = r"E:\webgislocation\merged_pano_road.shp"
    polygon_shp = r"E:\webgislocation\wuhan_village.shp"
    statistics_file = r"E:\webgislocation\statistics.csv"
    monthly_files = [os.path.join(r"E:\webgislocation\time_merge", f) for f in os.listdir(r"E:\webgislocation\time_merge") if f.endswith('.csv')]
    time_intervals_file = r"E:\webgislocation\district_time_intervals_counts.csv"
    # 1. 将多线转换为单线
    # # 调用函数
    # multiline_to_singleline(multiline_file, singleline_file)

    # 2. 计算道路行驶方向
    # gdf = gpd.read_file(singleline_file, encoding='utf-8')
    # # 确保坐标系为EPSG:4326
    # gdf = gdf.to_crs(epsg=4326)
    # # 反转几何属性并更新起点和终点坐标
    # gdf = reverse_lines(gdf)
    # # 保存处理后的数据
    # gdf.to_file(rdsingle_only_BF_file, encoding='utf-8')

    # 3. 重置为东开始的角度
    # gdf = gpd.read_file(rdsingle_only_BF_file, encoding='utf-8')
    # # 确保坐标系为EPSG:4326
    # gdf = gdf.to_crs(epsg=4326)
    # # 计算 E_angle
    # gdf = calculate_e_angle(gdf)
    # gdf.to_file(rdsingle_from_E_file, encoding='utf-8')

    # 4. 更新点数据的yaw列
    # update_yaw_with_e_angle(point_shp_path, rdsingle_from_E_file, yaw_shp_path)

    # 5. 生成鱼眼图像，北对齐
    # output_folder = 'path/to/your/output/folder'
    # # 调用 generate_fisheye_images 函数
    # generate_fisheye_images(yaw_shp_path, sky_image_folder, hemi_folder)

    # 6. 优化csv文件
    # get_better_csv(pano_csv_file, clean_pano_csv_file)

    # 7. 计算眩光遮挡状况
    # get_sun_glare_situation_from_hemi_pano_and_date(clean_pano_csv_file, hemi_folder, 2021, 1, 1, 0, 15)

    # 8. 合并csv
    # merge_csv_files_in_chunks(clean_pano_csv_file,r"E:\webgislocation\time",r"E:\webgislocation\time_merge")
    # # csv_to_shp(merge_csv_file, shp_date_file)

    # 9. 更新 whrd7 表
    update_whrd7_tables(r"E:\webgislocation\time_merge_9", db_params)

    # 10.统计数据
    # count_points_in_districts(clean_pano_csv_file, polygon_shp, statistics_file)
    # count_points_in_districts_month(clean_pano_csv_file, polygon_shp, statistics_file, monthly_files)
    # count_time_intervals_in_districts(polygon_shp, monthly_files, time_intervals_file)

    # 11.将统计数据存入数据库
    # import_csv_to_postgresql(
    #     csv_file= time_intervals_file,
    #     dbname='postgis_34_sample',
    #     user='postgres',
    #     password='postgres1',
    #     host='localhost',
    #     port='5432',
    #     table_name='time_statistics'
    # )

    # 12.根据区打散街景点数据
    # save_points_by_district(clean_pano_csv_file, polygon_shp, r'E:\webgislocation\各区街景点shp')