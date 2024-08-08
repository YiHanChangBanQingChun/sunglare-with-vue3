# 1. 将多线转换为单线
import geopandas as gpd
from shapely.geometry import LineString

def split_line(line, row):
    """将一条线分割成多条两点组成的直线"""
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
    # 读取原始shp文件，指定编码为 UTF-8
    gdf = gpd.read_file(input_shp, encoding='utf-8')
    
    # 检查并打印 CRS
    print("原始 CRS:", gdf.crs)
    
    # 如果 CRS 不是 EPSG:4326，则转换为 EPSG:4326
    if gdf.crs != 'EPSG:4326':
        gdf = gdf.to_crs('EPSG:4326')
        print("转换后的 CRS:", gdf.crs)
    
    # 打印转换前的属性表
    print("转换前的属性表:")
    print(gdf)
    i = 0
    # 将多线转换为单线，并确保每条线只有两个坐标点
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
            # 非线性几何类型，直接添加
            singlelines.append(row)
    
    # 创建新的GeoDataFrame
    new_gdf = gpd.GeoDataFrame(singlelines, crs=gdf.crs)
    
    # 打印转换后的属性表
    print("\n转换后的属性表:")
    print(new_gdf)
    
    # 保存为新的shp文件，指定编码为 UTF-8
    new_gdf.to_file(output_shp, encoding='utf-8')

# 2. 计算道路行驶方向
import geopandas as gpd
from shapely.geometry import LineString
from tqdm import tqdm
import pandas as pd
import time

def reverse_lines(gdf):
    # 设置显示选项以完整显示几何属性
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
import geopandas as gpd
from tqdm import tqdm

def calculate_e_angle(gdf):
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
import geopandas as gpd
from tqdm import tqdm

import geopandas as gpd
from tqdm import tqdm

def update_yaw_with_e_angle(point_shp_path, line_shp_path, output_shp_path):
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



# 5. 生成鱼眼图像，北对齐
from PIL import Image
import numpy as np
import os, os.path
import math
import cv2
def cylinder2fisheyeImage (panoImg,yaw,outputImgFile='fisheye.jpg'):
    
    # read the dimension information of input panorama
    dims = panoImg.shape

    Hs = dims[0]
    Ws = dims[1]
    
    panoImg2 = panoImg[0:int(Hs/2),:]
    del panoImg
    
    
    #the roate anagle
    rotateAng = 360 - float(yaw)# the rotate angle
    
    
    # get the radius of the fisheye
    R1 = 0
    R2 = int(2*Ws/(2*np.pi) - R1 +0.5) # For google Street View pano
    
    R22 = Hs + R1
    
    # estimate the size of the sphere or fish-eye image
    Hd = int(Ws/np.pi)+2
    Wd = int(Ws/np.pi)+2
    
    # create empty matrics to store the affine parameters
    xmap = np.zeros((Hd,Wd),np.float32)
    ymap = np.zeros((Hd,Wd),np.float32)
    
    # the center of the destination image, or the sphere image
    CSx = int(0.5*Wd)
    CSy = int(0.5*Hd)
    
    # split the sphere image into four parts, and reproject the panorama for each section
    for yD in range(Hd):
        for xD in range(CSx):
            r = math.sqrt((yD - CSy)**2 + (xD - CSx)**2)
            theta = 0.5*np.pi + math.atan((yD - CSy)/(xD - CSx+0.0000001))
            
            xS = theta/(2*np.pi)*Ws
            yS = (r - R1)/(R2 - R1)*Hs
            
            xmap.itemset((yD,xD),xS)
            ymap.itemset((yD,xD),yS)
        
        for xD in range(CSx,Wd):
            r = math.sqrt((yD - CSy)**2 + (xD - CSx)**2)            
            theta = 1.5*np.pi + math.atan((yD - CSy)/(xD - CSx+0.0000001))
            
            xS = theta/(2*np.pi)*Ws
            yS = (r - R1)/(R2 - R1)*Hs 
            
            xmap.itemset((yD,xD),xS)
            ymap.itemset((yD,xD),yS)
    
    # using the affine to generate new hemispherical image
    outputImg = cv2.remap(panoImg2,xmap,ymap,cv2.INTER_CUBIC)
    del xmap,ymap,panoImg2    
    
    # remove the black line in central column of the buttom
    if len(dims) > 2:
        outputImg[int(CSy):,CSx,:] = outputImg[int(CSy):,CSx - 1,:]
        outputImg[int(CSy):,int(CSx + 0.5),:] = outputImg[CSy:,int(CSx + 0.5) + 1,:]
    else:
        outputImg[int(CSy):,CSx] = outputImg[int(CSy):,CSx - 1]
        outputImg[int(CSy):,int(CSx + 0.5)] = outputImg[CSy:,int(CSx + 0.5) + 1]
    
    # [rows,cols,bands] = outputImg.shape
    dims = outputImg.shape
    rows = dims[0]
    cols = dims[1]
    
    M = cv2.getRotationMatrix2D((cols/2,rows/2),rotateAng,1)
    rotatedFisheyeImg = cv2.warpAffine(outputImg,M,(cols,rows))
    
    
    img = Image.fromarray(rotatedFisheyeImg)
    del outputImg
    img.save(outputImgFile)
    del img
    
    return rotatedFisheyeImg

def generate_fisheye_images(shp_file, image_folder, output_folder):
    # Read the point shapefile
    gdf = gpd.read_file(shp_file)

    # Filter out rows where pid is -1
    gdf = gdf[gdf['pid'] != -1]

    # Initialize the progress bar
    with tqdm(total=len(gdf)) as pbar:
        # Iterate through the filtered rows in the shapefile
        for index, row in gdf.iterrows():
            pid = row['pid']
            yaw = row['yaw']

            # Find the corresponding PNG file in the image folder
            file_name = f"{pid}.png"
            file_path = os.path.join(image_folder, file_name)

            if os.path.exists(file_path):
                # Read PNG image and convert to numpy array
                with Image.open(file_path) as img:
                    panoImg = np.array(img)

                    # Call the function to convert to fisheye image
                    hemi_img = cylinder2fisheyeImage(panoImg, yaw)

                    # Generate output file path
                    output_file = os.path.join(output_folder, f"{pid}.png")

                    # Save the hemi_img to the specified output file location
                    Image.fromarray(hemi_img).save(output_file)
            
            # Update the progress bar
            pbar.update(1)

if __name__ == "__main__":
    multiline_file = r"E:\webgislocation\rdraw.shp"
    singleline_file = r"E:\webgislocation\rdsingle.shp"
    rdsingle_only_BF_file = r"E:\webgislocation\rdsingle_onlyBF.shp"
    rdsingle_from_E_file = r"E:\webgislocation\rdsingle_from_E.shp"
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
    # 示例调用
    # point_shp_path = r"E:\webgislocation\poinrd50_3.shp"
    # line_shp_path = r"E:\webgislocation\rdsingle_from_E.shp"
    # output_shp_path = r"E:\webgislocation\poinrd50_3_yaw.shp"

    # update_yaw_with_e_angle(point_shp_path, line_shp_path, output_shp_path)

    # 5. 生成鱼眼图像，北对齐
    shp_file = r"E:\webgislocation\poinrd50_3_yaw.shp"
    image_folder = 'path/to/your/image/folder'
    output_folder = 'path/to/your/output/folder'

    # 调用 generate_fisheye_images 函数
    generate_fisheye_images(shp_file, image_folder, output_folder)