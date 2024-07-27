#文件夹中每个文件都进行压缩
# -*- coding: utf-8 -*-
import rasterio as rio
import rasterio
import os
from tqdm import tqdm

#每个线程选择一个文件夹
Input_path =r"E:\shizhan_osm\wuhanstreetview\new20240423location\skyonly"
Output_path =r"E:\shizhan_osm\wuhanstreetview\new20240423location\skyonly"
#文件列表
pathDir= os.listdir(Input_path)

#压缩函数
for i in tqdm(range(len(pathDir))):
    # 读入栅格文件
    rasterfile = Input_path+"\\"+pathDir[i]
    #打开栅格
    rasterdata = rio.open(rasterfile)
    #读取栅格
    rasterdata2= rasterdata.read()
    #获取栅格信息
    profile = rasterdata.profile
    print(profile)
    #选择压缩方式
    profile.update(
        compress='rle',  #压缩方式：rle，lzw等
        )
    #导出文件路径与名字
    out_put_name=Output_path +"RLE"+pathDir[i]
    #导出
    with rasterio.open(out_put_name, mode='w', **profile) as dst:
        dst.write(rasterdata2)
'''
os.chdir(r'E:\shizhan_osm\wuhanstreetview')
root = os.getcwd()
year = 2016
month = 7
day = 20
minute = 0
second = 0
zone = -8 # https://www.esrl.noaa.gov/gmd/grad/solcalc/azel.html

# watch out the longitude for the west hemisphere is positive and east is negative
latitude = lat_mean
longitude = -lon_mean

# create fields for different time stamps
hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

# the output sunexpo shapefile
shpfile = os.path.join(root, f'sunexpo-{year}-{month}-{day}-{hours[0]}h-to-{hours[1]}h.shp')

# create a shpafile to save the sun duration
driver = ogr.GetDriverByName('ESRI Shapefile')

if os.path.exists(shpfile):
    driver.DeleteDataSource(shpfile)

data_source = driver.CreateDataSource(shpfile)

targetSpatialRef = osr.SpatialReference()
targetSpatialRef.ImportFromEPSG(4326)

outLayer = data_source.CreateLayer('Sunexpo', targetSpatialRef, ogr.wkbPoint)
panoId = ogr.FieldDefn('panoid', ogr.OFTString)
outLayer.CreateField(panoId)

for hour in hours:
    fieldname = 'expo%s'%(hour)
    exposureField = ogr.FieldDefn(fieldname, ogr.OFTInteger) # 0 means not shaded or exposed to sunlight, 1 mean shaded or not exposed to sunlight
    outLayer.CreateField(exposureField)

i = 0
jishu = 0
for skyimgfile in os.listdir(image_place):
        if not skyimgfile.endswith('_hemi.tif'): 
            continue
        
        i = i + 1
        if i % 1000 == 0: print('You have processed %s'%(i))

        skyImgFileFullname = os.path.join(image_place, skyimgfile)
        skyImg = np.asarray(Image.open(skyImgFileFullname))
        
        #basename = skyimgfile.split('_sky.')[0]
        # 根据第一个下划线进行分割，只分割一次
        basename = skyimgfile.split('_', 1)[0]

        # 根据文件名格式，取得 panoID 部分
        panoID = basename

        data_for_last = pd.read_csv('location_test.csv')
        
        # 找到pid与panoID匹配的行
        matching_row = data_for_last[data_for_last['pid'] == basename]
        #print(matching_row)
        if not matching_row.empty:
            # 如果找到匹配的行，取第一行（假设只有一行匹配）
            lon = matching_row.iloc[0]['lon']
            lat = matching_row.iloc[0]['lat']
        #fields = basename.split(' - ')
        #panoID = fields[1]
        #lon = float(fields[2]) # watch out in the NOAA sunpos model, the eastern hemisphere has longitude negative, west has longitude positive
        #lat = float(fields[3])
        data_for_last.to_csv('location_test.csv')

        point = ogr.Geometry(ogr.wkbPoint)
        point.AddPoint(lon, lat)
        
        # create feature and set the attribute values
        featureDefn = outLayer.GetLayerDefn()
        outFeature = ogr.Feature(featureDefn)
        
        # set the geometrical feature
        outFeature.SetGeometry(point)
        outFeature.SetField('panoid', panoID)
        
        for hour in hours:
        # calculate the sun position
            
            #[azimuth, sunele] = SunposLib.calcSun(latitude, longitude, zone, year, month, day, hour, minute, second)
            [azimuth, sunele] = SunposLib.calcSun(lat, lon, zone, year, month, day, hour, minute, second)
            # Judge whether the sunlight is blocked or not, 0 is not shaded, 1 is shaded. 
            shade = function_libraty.Shaded_judgement_noaa(skyImg, 0, 4, azimuth, sunele)
            
            date = function_libraty.time_calculator(year,month,day,hour,minute,second)
            for west_or_east in [0,1]:

                point_file_path = 'merged_points.shp'
                gdf = gpd.read_file(point_file_path)
                gdf.crs = from_epsg(4326)
                near_angles = gdf['NEAR_ANGLE']
                longitude = gdf['lon']
                latitude = gdf['lat']
                matched_row = gdf.loc[gdf['pid'] == basename]
                #print('MATCHROW',matched_row)
                # 如果有匹配的行
                if not matched_row.empty:
                    # 获取 NEAR_ANGLE 的值
                    near_point_angle = matched_row['NEAR_ANGLE'].iloc[0]
                    #print("NEAR_ANGLE:", near_point_angle)
                else:
                    #print("No matching row found for the given panoid.")
                     1
                
                
                vision_form_east_angle = function_libraty.vision_form_east_angle_calculator(near_point_angle,west_or_east)
                vision_form_slope_angle = 0
                vertical_glare = function_libraty.vertical_glare_calculatior(date,lon,lat,vision_form_slope_angle)
                #print("this:",vertical_glare)
                sun_glare_situation = function_libraty. sun_glare_calculator(date,lon,lat,vision_form_slope_angle,vision_form_east_angle)
                if sun_glare_situation == 0:
                    shade = 1
            exposure = 1 - shade # exposed to sunlight 1, not exposed to sunlight 0
            fieldname = 'expo%s'%(hour)
            outFeature.SetField(fieldname, exposure)
        jishu = jishu +1
        print ('finish point sun expose',jishu)

        outLayer.CreateFeature(outFeature)
        outFeature.Destroy()
    

data_source.Destroy()
'''