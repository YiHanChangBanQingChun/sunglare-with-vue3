
import sys
import function_library
import SunposLib
import pandas as pd
from osgeo import ogr,osr
import pyproj
import numpy as np
import math
import datetime
from pysolar.solar import *
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import geopandas as gpd
from fiona.crs import from_epsg
import os
from PIL import Image,ImageDraw
import time
import tqdm
import csv
import cv2


def calculate_sun_elevation_data(year, lon, lat,interval):
    sun_elevation_csv = pd.DataFrame(columns=['year', 'month', 'day', 'hour', 'minute', 'second', 'sun_elevation'])
    for month in range(1, 13):
        day_list = function_library.day_in_month_calculator(year, month)
        for day in day_list:
            for hour in range(0, 24):
                for minute in range(0, 60, interval):
                    second = 0
                    date = function_library.time_calculator(year, month, day, hour, minute, second)
                    sun_elevation = function_library.date_to_sun_elevation(date, lon, lat)
                    if sun_elevation >= 0:
                        1
                    else:
                        sun_elevation = 0
                    sun_elevation_csv = sun_elevation_csv.append({'year': year, 'month': month,
                                                                  'day': day, 'hour': hour,
                                                                  'minute': minute, 'second': second,
                                                                  'sun_elevation': sun_elevation}, ignore_index=True)   
        print("finish month:", month)
    sun_elevation_csv.to_csv('sun_elevation_data.csv', index=False)




def sunelevationplot():
    df = pd.read_csv('sun_elevation_data_per20.csv')
    df['time'] = pd.to_datetime(df[['hour', 'minute']].astype(str).agg(':'.join, axis=1), format='%H:%M')
    plt.figure(figsize=(10, 10))
    for month in df['month'].unique():
        monthly_data = df[(df['month'] == month) & (df['day'] == 20)]
        mask = np.where(monthly_data['sun_elevation'] != 0)
        plt.plot(monthly_data['time'].iloc[mask], monthly_data['sun_elevation'].iloc[mask], label=f'Month {month}')
    plt.axhline(y=25, color='r', linestyle='--', label='Y=25')
    plt.xlabel('Time of day')
    plt.ylabel('Sun Elevation Angle (degrees)')
    plt.title('Sun Elevation Angle on the 20th of Each Month')
    plt.legend(loc='upper right')
    plt.xticks(rotation=45)
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%H:%M'))
    plt.grid(True)
    plt.savefig('sun_elevation_plot.png', dpi=300)
    plt.show()


def calculate_azimuth_angle_csv(year, lat, lon):
    azimuth_angle_csv = pd.DataFrame(columns=['year', 'month', 'day', 'hour', 'minute', 'second', 'azimuth_angle', 'azimuth_angle_east'])
    for month in range(1, 13):
        day_list = function_library.day_in_month_calculator(year, month)
        for day in day_list:
            for hour in range(0, 24):
                for minute in range(0, 60, 10):
                    second = 0
                    date = function_library.time_calculator(year, month, day, hour, minute, second)
                    azimuth_angle = function_library.azimuth_angle_calculator(lat, lon, date)
                    azimuth_angle_east = function_library.azimuth_angle_calculator_north_to_east(lat, lon, date)
                    #sun_elevation = function_library.date_to_sun_elevatoion(date,lon,lat)
                #azimuth_angle = function_library.azimuth_angle_calculator(hour,minute,second,day,year,sun_elevation,lon,lat)
                    azimuth_angle_csv = azimuth_angle_csv.append({'year': year, 'month': month,
                                                                    'day': day, 'hour': hour,
                                                                    'minute': minute, 'second': second,
                                                                    'azimuth_angle': azimuth_angle,
                                                                    'azimuth_angle_east': azimuth_angle_east}, ignore_index=True)   
        print("finish month:", month)
    azimuth_angle_csv.to_csv('azimuth_angle_pypolar.csv', index=False)




def senazimuthangleplot():
    df = pd.read_csv('azimuth_angle_data_per20.csv')
    df['time'] = pd.to_datetime(df[['hour', 'minute']].astype(str).agg(':'.join, axis=1), format='%H:%M')
    plt.figure(figsize=(10, 10))
    for month in df['month'].unique():
        monthly_data = df[(df['month'] == month) & (df['day'] == 20)]
        mask = np.where(monthly_data['azimuth_angle'] != 0)
        plt.plot(monthly_data['time'].iloc[mask], monthly_data['azimuth_angle'].iloc[mask], label=f'Month {month}')
    plt.xlabel('Time of day')
    plt.ylabel('Azimuth Angle (degrees)')
    plt.title('Azimuth Angle on the 20th of Each Month')
    plt.legend(loc='upper left')
    plt.xticks(rotation=45)
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%H:%M'))
    plt.grid(True)
    plt.savefig('azimuth_angle_plot.png', dpi=300)
    plt.show()
  
 


def getsunglarepoint(gdf, near_angles, longitude, latitude):
    hour_sum_list = []
    for index, near_point_angle in enumerate(near_angles):
        # 举例
        lon = longitude.iloc[index]
        lat = latitude.iloc[index]
        west_or_east = 0
        year = 2016
        month = 1
        day = 20
        vision_form_slope_angle = 0
        hour_sum = 0
        second = 0
        for hour in range(0, 24):
            for minute in range(0, 60, 10):
                date = function_library.time_calculator(year, month, day, hour, minute, second)
                for west_or_east in [0, 1]:
                    vision_form_east_angle = function_library.vision_form_east_angle_calculator(near_point_angle, west_or_east,cedixian=False)
                    sun_glare_situation = function_library.sun_glare_calculator(date, lon, lat, vision_form_slope_angle, vision_form_east_angle)
                    if sun_glare_situation == 1:
                        hour_sum = hour_sum + 10
        hour_sum_list.append(hour_sum)
        print("finish points:", len(hour_sum_list))
    
    gdf['hour_sum'] = hour_sum_list
    gdf.to_file('points_sun_glare_January.shp')

def extract_sky_images(pano_place, skyimg_place):
    jishu = 0
    for pano in os.listdir(pano_place):
        if not pano.endswith('.jpg'): 
            continue

        file_path = os.path.join(pano_place, pano)
        panoImg = np.array(Image.open(file_path))
        
        # 检查是否已经存在sky文件
        sky_img_file = os.path.join(skyimg_place, pano.replace('panorama.jpg', 'sky.tif'))
        if os.path.exists(sky_img_file):
            jishu+=1
            print("Sky image already exists for:", pano)
            continue

        skyImg = function_library.OBIA_Skyclassification_vote2Modifed_2(panoImg)
        #skyImg = function_library.OBIA_Skyclassification_vote2Modifed_2_optimized(panoImg)
        #skyImg = function_library.optimize_sky_classification(panoImg)
        Image.fromarray(skyImg).save(sky_img_file)
        
        jishu += 1
        print("Finish sky:", jishu)

def generate_fisheye_images(shp_file, image_folder, output_folder):
    # Read the point shapefile
    gdf = gpd.read_file(shp_file)

    # Iterate through TIFF files in the image folder
    for file_name in os.listdir(image_folder):
        if file_name.endswith('.tif'):
            # Extract pid from file name
            pid = os.path.splitext(file_name)[0].split('_')[0]

            # Find wa corresponding to pid in the shapefile
            wa = gdf[gdf['pid'] == pid]['wa'].values[0]

            # Calculate yaw by subtracting 90 from wa
            yaw = wa - 90

            # Read TIFF image and convert to numpy array
            file_path = os.path.join(image_folder, file_name)
            with Image.open(file_path) as img:
                panoImg = np.array(img)

                # Call the function to convert to fisheye image
                hemi_img = function_library.cylinder2fisheyeImage(panoImg, yaw)

                # Generate output file path
                output_file = os.path.join(output_folder, os.path.splitext(file_name)[0] + '_whemi.tif')

                # Save the hemi_img to the specified output file location
                Image.fromarray(hemi_img).save(output_file)


def match_pid_with_images(shp_file_path, image_folder, output_shp_file):
    # Read the original shapefile
    gdf = gpd.read_file(shp_file_path)

    # Get all PIDs from the shapefile
    shp_pids = set(gdf['pid'])

    # Get all PIDs from the image folder
    image_pids = set()
    for image_file in os.listdir(image_folder):
        if image_file.endswith('_sky.tif'):
            pid = image_file.split('_')[0]
            image_pids.add(pid)

    # Find PIDs in the shapefile that do not have corresponding images
    pids_to_keep = shp_pids.intersection(image_pids)

    # Create a new GeoDataFrame with only the points that have corresponding images
    filtered_gdf = gdf[gdf['pid'].isin(pids_to_keep)]

    # Write the new GeoDataFrame to a new shapefile with explicit CRS
    filtered_gdf.to_file(output_shp_file, driver='ESRI Shapefile', crs=from_epsg(4326))

    print("New shapefile exported with points matching images:", output_shp_file)

def add_blank_bottom(image_folder):
    for file_name in os.listdir(image_folder):
        if file_name.endswith('_sky.tif'):
            file_path = os.path.join(image_folder, file_name)
            with Image.open(file_path) as img:
                width, height = img.size
                if height == 512:  # Process only images with a height of 512
                    new_img = Image.new('RGB', (width, 1024), (0, 0, 0))  # Create a 2048x1024 black image
                    new_img.paste(img, (0, 0))  # Paste the original image onto the upper half of the new image
                    new_file_path = os.path.splitext(file_path)[0]+"1.tif"  # Generate a new file path for the modified image
                    new_img.save(new_file_path)  # Save the modified image
                    os.remove(file_path)  # Remove the original image file

def mergecsvtoshp(shp_file,csv_file,outputshp):

    # 读取点shp文件和csv文件
    point_shp = gpd.read_file(shp_file)
    csv_file = pd.read_csv(csv_file)

    # 将csv文件的pid列转换为字符串类型
    csv_file['pid'] = csv_file['pid'].astype(str)

    # 将点shp文件和csv文件根据pid列进行合并
    merged_data = point_shp.merge(csv_file, on='pid', how='left')

    # 将合并后的数据写入新的shp文件
    merged_data.to_file(outputshp,crs=from_epsg(4326))

if __name__ == "__main__":
    pano_place = r"E:\shizhan_osm\wuhanstreetview\new20240423location\panoup"
    skyimg_place = r"E:\shizhan_osm\wuhanstreetview\new20240423location\skyonly\totalup" 
    hemi_place = r'E:\shizhan_osm\wuhanstreetview\new20240423location\skyonly\totalhemi'
    shp_file = r"E:\shizhan_osm\wuhanstreetview\new20240423location\shp\panoeastwest1319.shp"
    skyimg_place_test = r"E:\shizhan_osm\wuhanstreetview\new20240423location\skyonly\totaluptest"
    outputshp = r"E:\shizhan_osm\wuhanstreetview\new20240423location\shp\pano1319mergetime.shp"
    
    
    year = 2024 
    month = 6
    day = 25
    #hour = 7
    second = 0
    gdf = gpd.read_file(shp_file)
    csv_file = r"E:\shizhan_osm\wuhanstreetview\new20240423location\table\result.csv"
    #mergecsvtoshp(shp_file,csv_file,outputshp)

    if not os.path.exists(csv_file):
        with open(csv_file, mode='w', newline='') as file:
            file.write("pid,result\n")
    # 读取 CSV 文件并创建 DataFrame
    df = pd.read_csv(csv_file)

    for index,row in gdf.iterrows():
        pid = row['pid']
        df.at[index,'pid'] = pid
        lon, lat = row.geometry.x, row.geometry.y
        vision_angle1 = row['ea']
        vision_angle2 = row['wa']
        image_file = f"{pid}_sky1_hemi.tif"
        image_path = os.path.join(skyimg_place_test, image_file)
        totaltime = 0
        if os.path.exists(image_path):
            
            hemiimg_pil = Image.open(image_path)
           # Convert PIL Image to NumPy array
            print(image_file)
            hemiimg = np.array(hemiimg_pil)
            
            # Convert the image to grayscale (assuming it's RGB)
            hemiimg_gray = cv2.cvtColor(hemiimg, cv2.COLOR_RGB2GRAY)
            for hour in range(6,19):
                for minute in range(0,59,1):
                        date = function_library.time_calculator(year, month, day, hour, minute, second)
                        if date not in df.columns:
                            df[date] = 0
                        sunele = function_library.date_to_sun_elevation(date,lon,lat)
                        if sunele <=0:
                            continue
                        azimuth = function_library.azimuth_angle_calculator(lat,lon,date)             
                        zhedang = function_library.Shaded_judgement_noaa(pid,hemiimg_gray,0, 15, azimuth, sunele,output_img_dir=skyimg_place_test) #遮挡为1
                        xuanguangtiaojian1 = function_library.sun_glare_calculator(date,lon,lat,vision_form_slope_angle=0,vision_form_east_angle=vision_angle1)
                        xuanguangtiaojian2 = function_library.sun_glare_calculator(date,lon,lat,vision_form_slope_angle=0,vision_form_east_angle=vision_angle2) #符合为1
                        if (xuanguangtiaojian1 == 1 or xuanguangtiaojian2 == 1) and zhedang == 0:
                            totaltime += 15  #有眩光影响
                            now = 1
                            print(date,"YES",pid)
                        else:
                            now = 0#无眩光影响
                            # 将结果写入 DataFrame
                        df.loc[df['pid'] == pid, date] = now
                        #df.to_csv(csv_file, index=False)
            df.loc[df['pid']==pid, 'result'] = totaltime
            
            df.to_csv(csv_file, index=False)

    
                               

    #add_blank_bottom(skyimg_place)
    #match_pid_with_images(r"E:\shizhan_osm\wuhanstreetview\new20240423location\shp\panoroadeastwestangle.shp", r"E:\shizhan_osm\wuhanstreetview\new20240423location\skyonly\totalup", r"E:\shizhan_osm\wuhanstreetview\new20240423location\shp\panoeastwest1319.shp")
    #generate_fisheye_images(shp_file, skyimg_place,hemi_place)
    #extract_sky_images(pano_place, skyimg_place)
    
    # 输入文件夹路径和输出文件夹路径
    #input_folder = r"E:\shizhan_osm\wuhanstreetview\new20240423location\pano"
    #output_folder = r"E:\shizhan_osm\wuhanstreetview\new20240423location\panodown"

    # 调用函数进行裁剪
    #function_library.save_images_down(input_folder, output_folder)

#source_folder = r"E:\shizhan_osm\wuhanstreetview\new20240423location\pano"
#function_library.process_images(source_folder)
#gdf = gpd.read_file(r'E:\shizhan_osm\wuhanstreetview\new20240423location\shp\panolocationtoroaddot.shp')

#新建列ea和wa
#gdf['ea'] = gdf['NEAR_ANGLE'].apply(lambda x: function_library.vision_form_east_angle_calculator(x, 0, cedixian=False)) 
#gdf['wa'] = gdf['NEAR_ANGLE'].apply(lambda x: function_library.vision_form_east_angle_calculator(x, 1, cedixian=False))

#保存为新的点shp文件
#gdf.to_file(r'E:\shizhan_osm\wuhanstreetview\new20240423location\shp\panoroadeastwestangle.shp')
