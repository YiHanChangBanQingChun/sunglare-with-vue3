import pandas as pd
from osgeo import ogr,osr
import pyproj
import numpy as np
import math
import datetime
from pysolar.solar import *
import pytz
import geopandas as gpd
from PIL import Image, ImageDraw
import numpy as np
import os
import tempfile
import shutil


def day_in_month_calculator(year,month):
    '''
    平年闰年，可以根据年份和月生成该月天数
    '''
    if month in [1, 3, 5, 7, 8, 10, 12]:
        day_list = list(range(1, 32))
    elif month in [4,6,9,11]:
        day_list = list(range(1,31))
    elif month == 2:
        date_of_year = day_of_year_calculator(year)
        if date_of_year == 365:
            day_list = list(range(1,29))
        elif date_of_year == 366:
            day_list = list(range(1,30))
    return day_list

def create_point_shapefile(lon_list,lat_list,pid,output_shapefile):
    '''
    根据经纬度创建包含id信息的点shp文件
    '''
    driver = ogr.GetDriverByName('ESRI Shapefile')
    data_source = driver.CreateDataSource(output_shapefile)
    spatial_reference = osr.SpatialReference()
    #spatial_reference.ImportFromEPSG(4326)
    spatial_reference.SetWellKnownGeogCS("WGS84")
    layer = data_source.CreateLayer('point', spatial_reference, ogr.wkbPoint)
    number_of_point = len(lon_list)
    print(number_of_point)
    if number_of_point > 0:
        field_defn = ogr.FieldDefn('pid', ogr.OFTString)
        layer.CreateField(field_defn)
        for lon, lat, pid_val in zip(lon_list, lat_list, pid):
            point = ogr.Geometry(ogr.wkbPoint)
            point.AddPoint(lon, lat)
            feature = ogr.Feature(layer.GetLayerDefn())
            feature.SetGeometry(point)
            feature.SetField('pid', pid_val)
            layer.CreateFeature(feature)
            feature = None
        data_source = None
        print("Shapefile created successfully.")
    else:
        print ("You created a empty shapefile.")

def angle_to_rad(angle):
    '''
    角度转弧度
    '''
    rad=(math.pi*angle/180)
    return rad

def rad_to_angle(rad):
    '''
    弧度转角度
    '''
    angle = (rad/math.pi)*180
    return angle 

def time_calculator(year,month,day,hour,minute,second):
    '''
    将当地时间信息转为日期格式
    '''
    local_timezone = pytz.timezone('Asia/Shanghai')
    local_time = local_timezone.localize(datetime.datetime(year, month, day, hour, minute, second))
    return local_time

def date_to_sun_elevation(date,lon,lat):
    '''
    根据日期与经纬度获得太阳高度角
    '''
    sun_elevation = get_altitude(lat,lon,date)
    return sun_elevation

def day_of_year_calculator(year):
    '''
    由年份输出日期数
    '''
    if ((year / 4 == 0) and (year / 100 != 0)) or (year / 400 == 0):
        date_of_year = 366
    else:
        date_of_year = 365
    return date_of_year

def fraction_year_calculator(day,hour,year): 
    '''
    将年转为分数
    '''
    fraction_year = 2*math.pi*(day - 1 
                              + (hour - 12) / 24) / day_of_year_calculator(year)
    return fraction_year

def et_calculator(day,hour,year):
    '''
    根据日、小时和年，eqtime的计算
    '''
    fraction_year = fraction_year_calculator(day,hour,year)
    et = 229.18 *(0.000075 
                  + 0.001868*math.cos(fraction_year) 
                  - 0.032077*math.sin(fraction_year) 
                  - 0.014615*math.cos(2*fraction_year) 
                  - 0.040849*math.sin(2*fraction_year))
    return et

def time_zone_UTC_hour_calculator(lon,hour):
    '''
    时区计算器
    '''
    if lon > 0 :
        zone = int((lon / 15)) + 1
        time_zone = hour - zone
    elif lon < 0 :
        zone = int((-lon)/15) + 1
        time_zone = hour + zone
    elif lon == 0 :
        time_zone = hour
    return time_zone

def time_offset_calculator(day,hour,year,lon):
    '''
    时间偏差计算器，可以计算经度下时间的偏差
    '''
    et = et_calculator(day, hour, year)
    time_zone = time_zone_UTC_hour_calculator(lon,hour)
    time_offset = et + 4 * lon - 60 *time_zone
    return time_offset

def true_solar_time_calculator(hour,minute,second,day,year,lon):
    '''
    根据日期计算真太阳时
    '''
    time_offset = time_offset_calculator(day,hour,year,lon)
    true_solar_time = hour * 60 + minute + second / 60 +time_offset
    return true_solar_time

def hour_angle_calculator(hour,minute,second,day,year,lon):
    '''
    可以计算小时角，根据时间和地理位置信息
    '''
    true_solar_time = true_solar_time_calculator(hour,minute,second,day,year,lon)
    hour_angle = true_solar_time / 4 - 180
    return hour_angle

def azimuth_angle_calculator(lat,lon,date):
    '''
    计算太阳方位角，根据经纬度以及日期
    '''
    azimuth_angle = (get_azimuth(lat,lon,date))
    '''
    def azimuth_angle_calculator(hour,minute,second,day,year,sun_elevation,lon,lat):
        hour_angle = hour_angle_calculator(hour,minute,second,day,year,lon)
        cos_90_plus_azimuth_angle = ((math.sin(angle_to_rad(lat))
                                    * math.cos(angle_to_rad(90-sun_elevation))) 
                                    - math.sin(hour_angle)) * (-1) / (math.cos(angle_to_rad(lat)) 
                                                                        * math.sin(angle_to_rad(90-sun_elevation)))
        azimuth_angle = rad_to_angle(math.acos(cos_90_plus_azimuth_angle)) - 90
        if azimuth_angle >= 0 :
            1
        else:
            azimuth_angle = azimuth_angle + 360
    '''
    return azimuth_angle

def azimuth_angle_calculator_north_to_east(lat,lon,date):
    '''
    将太阳方位角转为东开始，且逆时针增加
    '''
    azimuth_angle = azimuth_angle_calculator(lat,lon,date)
    azimuth_angle_east = 90 - azimuth_angle
    while azimuth_angle_east < 0:
        azimuth_angle_east += 360
    return azimuth_angle_east

def horizental_glare_calculator(date,lon,lat,vision_form_east_angle):
    azimuth_angle_east = azimuth_angle_calculator_north_to_east(lat,lon,date)
    horizental_glare = azimuth_angle_east - vision_form_east_angle
    horizental_glare_situation = (horizental_glare < 25) & (horizental_glare > -25)
    return horizental_glare_situation.astype(int)

#坡度情况也不知道，假设知道为0。
def vertical_glare_calculatior(date,lon,lat,vision_form_slope_angle = 0):
    '''
    坡度默认为0，因为街景图象获取的时候都是平视角获取的
    '''
    sun_elevation = date_to_sun_elevation(date,lon,lat)
    vertical_glare = sun_elevation - vision_form_slope_angle
    vertical_glare_situation = (vertical_glare < 25) & (vertical_glare > -25)
    #1 is true
    return vertical_glare_situation.astype(int)

def sun_glare_calculator(date,lon,lat,vision_form_slope_angle,vision_form_east_angle):
    '''
    太阳眩光的判断，未考虑街景，单纯从水平与垂直着手，判断水平和垂直是否符合条件，符合条件返回1
    '''
    horizental_glare_situation = horizental_glare_calculator(date,lon,lat,vision_form_east_angle)
    vertical_glare_situation = vertical_glare_calculatior(date,lon,lat,vision_form_slope_angle)
    if horizental_glare_situation == 1 and vertical_glare_situation == 1:
        sun_glare_situation = 1
    else:
        sun_glare_situation = 0
    return sun_glare_situation

def vision_form_east_angle_calculator(near_point_angle,west_or_east,cedixian):
    '''
    arcgis pro处理后,如果是测地线，角度是北开始，逆负顺正.
    如果不是测地线,角度从东开始，逆正顺负.
    1为西向路,0为东向路.
    '''
    if cedixian == True:
        if ((near_point_angle <=180 and near_point_angle > 90 and west_or_east == 1) 
             or (near_point_angle <=90 and near_point_angle > 0 and west_or_east == 1)):
            vision_form_east_angle = 360 - near_point_angle
        elif ((near_point_angle <=0 and near_point_angle >-90 and west_or_east == 1)
             or (near_point_angle <=-90 and near_point_angle >-180 and west_or_east == 1)):
            vision_form_east_angle = -near_point_angle
        else:
            vision_form_east_angle = 180 - near_point_angle
    elif cedixian == False :
        if ((near_point_angle <=0 and near_point_angle >-90 and west_or_east == 0)
             or (near_point_angle <=90 and near_point_angle >0 and west_or_east == 1)
               or (near_point_angle <=180 and near_point_angle >90 and west_or_east == 1)) :
            vision_form_east_angle = near_point_angle  + 90
        elif ((near_point_angle <=-90 and near_point_angle >-180 and west_or_east == 1)
             or (near_point_angle <=90 and near_point_angle >0 and west_or_east == 0)
               or (near_point_angle <=0 and near_point_angle >-90 and west_or_east == 1)) :
            vision_form_east_angle = near_point_angle + 270
        elif (near_point_angle <=180 and near_point_angle >=90 and west_or_east == 0):
            vision_form_east_angle = near_point_angle - 90
        elif (near_point_angle <=-90 and near_point_angle >-180 and west_or_east == 0):
            vision_form_east_angle = 450 + near_point_angle
        return vision_form_east_angle 

# This program is used to classify the sky area from the fisheye images

def graythresh(array,level):
    '''
    这个函数是用来计算图像的阈值的，具体来说是使用OTSU算法来确定一个阈值，该阈值可以用来将图像分割成两部分，一部分是背景，另一部分是前景。
    函数的输入是一个numpy数组（代表图像），以及一个level参数（阈值的最小值）。
    函数首先对输入的数组进行一些预处理，确保数据范围在0-255之间。
    然后计算输入数组的直方图，并根据OTSU算法计算最佳阈值。
    如果所有计算的结果都是NaN或无穷大，则将阈值设置为level参数。最后返回计算得到的阈值。
    '''
    
    import numpy as np
    
    maxVal = np.max(array)
    minVal = np.min(array)
    
    #如果inputImage是double数据集的浮点数，那么我们对数据进行转换以字节为单位，范围从[0 255]
    if maxVal <= 1:
        array = array*255
        # print "New max value is %s" %(np.max(array))
    elif maxVal >= 256:
        array = np.int((array - minVal)/(maxVal - minVal))
        # print "New min value is %s" %(np.min(array))
    
    # turn the negative to natural number
    negIdx = np.where(array < 0)
    array[negIdx] = 0
    
    # calculate the hist of 'array'
    dims = np.shape(array)
    hist = np.histogram(array,range(257))
    P_hist = hist[0]*1.0/np.sum(hist[0])
    
    omega = P_hist.cumsum()
    
    temp = np.arange(256)
    mu = P_hist*(temp+1)
    mu = mu.cumsum()
    
    n = len(mu)
    mu_t = mu[n-1]
    
    #sigma_b_squared = (mu_t*omega - mu)**2/(omega*(1-omega))
    
    epsilon = 1e-10
    omega_term = omega * (1 - omega) + epsilon
    sigma_b_squared = (mu_t * omega - mu)**2 / omega_term

    # try to found if all sigma_b squrered are NaN or Infinity
    indInf = np.where(sigma_b_squared == np.inf)
    
    CIN = 0
    if len(indInf[0])>0:
        CIN = len(indInf[0])
    
    maxval = np.max(sigma_b_squared)
    
    IsAllInf = CIN == 256
    if IsAllInf !=1:
        index = np.where(sigma_b_squared==maxval)
        idx = np.mean(index)
        threshold = (idx - 1)/255.0
    else:
        threshold = level
    
    if np.isnan(threshold):
        threshold = level
        
    return threshold
    

def OBIA_Skyclassification_vote2Modifed_2(panoImage,classImgFile='skyRes.tif'):
    '''
    基于“obia_skyclassification_vote2modified”修改
    该函数的输入是numpy数组，并返回numpy数组类res
    此函数是对OBIA天空分类进行修改后用来提取的
    图像中的天空像素。不同于OBIA_Skyclassification_vote
    这个函数处理白色天空像素
    参数:
    inputiming:输入半球图像，numpy数组
    outputFileName:输出的天空图像文件名
    返回:
    分类结果为numpy数组格式
    
    这段代码是一个用于天空分类的函数，其目的是从输入的全景图像中提取天空像素。函数的输入是一个Numpy数组表示的全景图像，返回值也是一个Numpy数组，代表分类结果。
    以下是代码的主要步骤和注释解释：
    导入所需的库：代码中导入了一些常用的Python库，包括操作系统路径处理库（os.path）、图像处理库（PIL）、Numpy库等。
    定义函数 OBIA_Skyclassification_vote2Modifed_2，它接受两个参数，第一个参数 panoImage 是全景图像的Numpy数组表示，
    第二个参数 classImgFile 是输出天空图像文件的文件名，默认为'skyRes.tif'。
    对输入的全景图像进行预处理：
    basewidth 是全景图像的宽度（假设图像是正方形），在这段代码中似乎被错误地设为图像高度。
    对图像进行归一化处理，将像素值范围映射到 [0, 1] 区间。
    分离出图像的红色通道、绿色通道和蓝色通道。
    使用 pymeanshift 库中的函数对全景图像进行分割，得到分割图像、标签图像和分割的区域数。
    计算图像的指数差值（ExG），并根据其进行阈值分割，提取可能是天空的区域。
    计算绿色通道与其他两个通道的差值，并进行阈值分割，得到可能是天空的区域。
    通过几何信息对分类结果进行细化：
    将全景图像划分为多个条带。
    循环处理每个分割的天空对象，对其进行进一步的处理：
    如果对象覆盖了全景图像的中心点，则认定该对象为天空。
    获取对象的中心点，并沿着与中心点到全景图像中心的直线的路径检查像素，如果发现建筑像素，则将该对象标记为非天空。
    最后，再次确保中心点处的像素被正确标记为天空。
    保存分类结果为图像文件。
    返回天空分类结果的Numpy数组。
    总体来说，该函数通过分割和阈值分割以及几何信息的细化，试图从全景图像中提取出天空区域，并将其标记出来。
    '''
    
    import os,os.path
    from PIL import Image, ImageEnhance
    import numpy as np
    import pymeanshift as pms
    
    
    basewidth = panoImage.shape[0]
    pixlImg = panoImage/255.0
    redP = pixlImg[:,:,0]
    greenP = pixlImg[:,:,1]
    blueP = pixlImg[:,:,2]
    
    ExG = 2*greenP - redP - blueP
    '''
    在计算指数绿色（ExG）时，使用了以下公式：
    ExG=2×greenP−redP−blueP
    这个公式的目的是为了强调绿色成分，并减少红色和蓝色成分对结果的影响。这种操作通常用于图像分割或特征提取中，尤其在植被和非植被区域的区分上很有用。

    具体来说，这个公式中的各项含义如下：

    greenP、redP、blueP 分别代表图像中的绿色、红色和蓝色通道的像素值。
    ExG 计算了图像中绿色通道的相对强度。由于植被通常在绿色通道中具有较高的亮度值，而其他地物（比如建筑物、道路等）则较少，因此通过减去红色和蓝色通道，可以凸显植被的特征，使得植被区域更容易被区分出来。
    这种操作有助于将植被与其他类型的地物区分开来，从而在图像分析中提取出具有植被特征的区域。
    '''
    del pixlImg,greenP,redP,blueP
    
    # call the function from pymeanshift to segment the GSV images    
    (segmented_image, labels_image, number_regions) = pms.segment(panoImage,spatial_radius=8, 
                                                          range_radius=6, min_density=40)        
    '''
    这行代码调用了 pymeanshift 库中的 segment 函数，用于对全景图像进行分割。函数的参数包括：

    panoImage：全景图像的输入，是一个Numpy数组，包含了待分割的图像数据。
    spatial_radius：空间半径，用于定义邻域的大小，影响像素的空间关系。
    range_radius：范围半径，用于定义颜色相似性的阈值，影响像素的颜色相似性。
    min_density：最小密度，指定了像素点的最小数量，用于形成一个区域。
    函数的返回值为一个元组 (segmented_image, labels_image, number_regions)，其中：

    segmented_image：经过分割后的图像数据，是一个Numpy数组，表示分割后的图像。
    labels_image：标签图像，是一个Numpy数组，表示每个像素点所属的区域标签。
    number_regions：分割后得到的区域数目，代表了分割后图像中区域的数量。
    这个函数的主要作用是将全景图像分割成多个区域，使得每个区域内的像素具有相似的空间特性和颜色特性。分割后的结果可以用于后续的图像分析和处理，如对象检测、边界提取等。
    '''
    
    I = segmented_image/255.0
    red = I[:,:,0]
    green = I[:,:,1]
    blue = I[:,:,2]
    
    ExB = 2*blue - red - green
    threshBlue = graythresh(ExB, 0.60)
    '''
    graythresh 函数是一种常用的图像处理函数，用于计算图像的阈值。在这里，它被用来计算指数蓝色（ExB）图像的阈值。

    具体而言，graythresh 函数的参数包括：

    ExB：代表指数蓝色图像的Numpy数组，该图像表示了图像中蓝色通道的强度。
    0.60：是一个参数，用于指定阈值计算时的参数。在这里，它可能指定了图像中的一部分像素用于计算阈值的比例。
    函数的返回值 threshBlue 是一个阈值，它是根据 Otsu's method （Otsu的方法）计算出来的。Otsu's method 是一种经典的图像阈值选择方法，它会尝试找到一个阈值，使得根据该阈值分割后的两个类内方差之和最小，从而达到最佳的分割效果。

    因此，threshBlue 表示了根据蓝色通道的强度计算出的阈值，用于将图像中的蓝色通道分割为两部分。通常情况下，此阈值将被用于后续的图像处理步骤，比如对图像进行二值化处理。






    '''
    skyBlue = ExB > threshBlue
    
    #计算绿色波段与其他两个波段的差值
    green_red_Diff = green - red
    green_blue_Diff = green - blue
    sumImg = (0.5*red + green + 2*blue)/3
    
    threshold1 = graythresh(sumImg, 0.70)
    if threshold1 < 0.70:
        threshold1 = 0.70
    
    #print ('The threshod for the sum image is',threshold1)
    skyImg1 = sumImg > threshold1
    skyImg = skyImg1*1
    skyImg = skyBlue + skyImg
    
    del skyImg1,skyBlue
     
    #阈值为绿色植被像素
    thresholdGreen = graythresh(ExG,0.08)
    if thresholdGreen > 0.02:
        thresholdGreen = 0.02
    #print ('The threshold for the green canpy is:',thresholdGreen)
    del red, blue, green, I,segmented_image
    
    
    # 将球体视图图像分割为若干条
    dims = skyImg.shape
    radius = int(skyImg.shape[0]/2)
    
    # 循环所有分割的天空物体
    for i in range(1,number_regions):
        idx = np.where(labels_image == i)
        
        rows = idx[0]
        cols = idx[1]
        pxlNum = len(rows)
        
        # 覆盖中心点的物体必须是天空
        mdPntX = int(0.5*basewidth)
        mdPntY = int(0.5*basewidth)
        
        if mdPntX in rows and mdPntY in cols:
            skyImg[rows,cols] = 1
        
        if not skyImg[idx][1]:
            continue
        
        # the center point of the object
        Cy = int(sum(rows)/len(rows))
        Cx = int(sum(cols)/len(cols))
        '''
         这两行代码计算了分割对象的中心点坐标 (Cx, Cy)。在这里，rows 和 cols 分别是包含了分割对象所有像素的行坐标和列坐标的 Numpy 数组。
        具体而言，这两行代码的含义如下：
        Cy = int(sum(rows)/len(rows))：计算了分割对象所有像素的行坐标的平均值，即中心点的行坐标。
        首先，使用 sum(rows) 计算了所有行坐标的总和，然后除以 len(rows)（即行数）得到平均值，并将结果取整。
        Cx = int(sum(cols)/len(cols))：类似地，计算了分割对象所有像素的列坐标的平均值，即中心点的列坐标。
        通过这两行代码，我们可以得到分割对象的中心点坐标 (Cx, Cy)，这对于后续的处理来说可能是有用的，比如进一步分析分割对象的特征或者将中心点作为参考点进行进一步的处理。
        '''
        # get all the pixels along the line between (Cx,Cy) and center of the sphere image
        slope = (Cy - 0.5*dims[0])/(Cx - 0.5*dims[1] + 0.0001) # slope of the line
        pxL = int(min(Cx,0.5*dims[1])) # x lower limit
        pxU = int(max(Cx,0.5*dims[1])) # x upper limit
        
        '''
        slope = (Cy - 0.5*dims[0])/(Cx - 0.5*dims[1] + 0.0001)：计算了两点之间的斜率。
        这里使用了两点式来计算斜率，其中 Cy - 0.5*dims[0] 表示纵坐标的差值，Cx - 0.5*dims[1] 表示横坐标的差值。
        由于分母可能为零，为了避免除零错误，加上一个很小的值 0.0001。
        pxL = int(min(Cx,0.5*dims[1]))：计算了像素遍历的横坐标下限。
        取 Cx 和全景图像中心横坐标 0.5*dims[1] 中的较小值，并将结果取整。这里是为了确定线段的起始点。
        pxU = int(max(Cx,0.5*dims[1]))：计算了像素遍历的横坐标上限。
        取 Cx 和全景图像中心横坐标 0.5*dims[1] 中的较大值，并将结果取整。这里是为了确定线段的结束点。
        这段代码的目的是为了获取分割对象中心点 (Cx, Cy) 和全景图像中心 (0.5*dims[1], 0.5*dims[0]) 之间的所有像素点。
        通过计算两点之间的斜率和确定像素遍历的范围，可以遍历得到位于这条直线上的所有像素点的坐标。
        '''
        for x in range(pxL,pxU,5):
            y = int(slope*(x - 0.5*dims[1]) + 0.5*dims[0])
            
            # if we find building pixels in the inner part of the grid, then change the skyobject back to building
            if sumImg[y,x] < threshold1 and ExB[y,x] < threshBlue:                
                # print 'building find above the "sky pixel", change it back to building'
                skyImg[rows,cols] = 0
                break
                
        if mdPntX in rows and mdPntY in cols:
            skyImg[rows,cols] = 1
    
    del labels_image, sumImg,ExB

    #outImg = Image.fromarray(skyImg.astype(np.float32))
    outImg = Image.fromarray(skyImg.astype(np.uint8))
    outImg.save(classImgFile)
    del outImg
    '''
    这段代码是一个用于天空分类的函数，其目的是从输入的全景图像中提取天空像素。以下是代码中这一节的详细作用：
    获取分割对象中心点与全景图像中心之间的像素：
    在给定的范围内遍历 pxL 和 pxU 之间的横坐标。
    对于每个横坐标，计算对应的纵坐标 y，通过直线方程 y = slope * (x - 0.5*dims[1]) + 0.5*dims[0] 计算得到。
    检查获取的像素是否位于天空中。如果位于天空中，且与之对应的 sumImg 值小于 threshold1 并且 ExB 值小于 threshBlue，
    则将其标记为建筑物，将 skyImg 对应位置的像素值设为 0，并且通过 break 跳出循环，因为已经确定当前对象不是天空。
    最后，确保中心点 (mdPntX, mdPntY) 处的像素被正确标记为天空。
    标记为天空的像素设置为1：
    最后，通过 mdPntX 和 mdPntY 确保中心点处的像素被正确标记为天空，将对应的 skyImg 中的像素值设为 1。
    释放不再需要的变量：
    释放 labels_image、sumImg 和 ExB，以释放内存空间。
    保存分类结果为图像文件：
    将最终得到的 skyImg 保存为图像文件。
    返回分类结果的Numpy数组：
    最后返回分类结果的Numpy数组 skyImg。
    综上所述，这段代码的主要作用是在通过几何信息对分类结果进行细化的过程中，
    将可能为建筑物的像素重新标记为非天空，并确保中心点周围的像素正确标记为天空。
    '''
    return skyImg

def process_edges(image, skyImg, threshold=0.5):
    edge_pixels = np.zeros_like(skyImg)
    
    # Find edge pixels
    for i in range(1, image.shape[0]-1):
        for j in range(1, image.shape[1]-1):
            if skyImg[i, j] == 1 and (skyImg[i-1, j-1] == 0 or skyImg[i-1, j] == 0 or skyImg[i-1, j+1] == 0 or
                                      skyImg[i, j-1] == 0 or skyImg[i, j+1] == 0 or
                                      skyImg[i+1, j-1] == 0 or skyImg[i+1, j] == 0 or skyImg[i+1, j+1] == 0):
                edge_pixels[i, j] = 1
                
    # Adjust edge pixels based on surrounding pixels
    for i in range(1, image.shape[0]-1):
        for j in range(1, image.shape[1]-1):
            if edge_pixels[i, j] == 1:
                sum_neighbors = skyImg[i-1:i+2, j-1:j+2].sum()
                if sum_neighbors / 8 < threshold:
                    skyImg[i, j] = 0
                
    return skyImg

def OBIA_Skyclassification_vote2Modifed_2_optimized(image, classImgFile='skyRes.tif'):
    
    import pymeanshift as pms
    from PIL import Image
    basewidth = image.shape[0]
    
    # Call the function from pymeanshift to segment the GSV images    
    segmented_image, _, number_regions = pms.segment(image, spatial_radius=8, range_radius=6, min_density=40)        

    sumImg = (0.5 * image[:,:,0] + image[:,:,1] + 2 * image[:,:,2]) / 3
    threshold1 = np.max([np.mean(sumImg) * 0.7, 0.7])
    
    skyImg = sumImg > threshold1
    
    skyImg = process_edges(image, skyImg)
    
    outImg = Image.fromarray(skyImg.astype(np.float32))
    outImg.save(classImgFile)

    return skyImg



def optimize_sky_classification(panoImage, classImgFile='skyRes.tif'):
    
    import numpy as np
    from PIL import Image
    import pymeanshift as pms
    basewidth = panoImage.shape[0]
    
    # Calculate ExG
    redP = panoImage[:,:,0] / 255.0
    greenP = panoImage[:,:,1] / 255.0
    blueP = panoImage[:,:,2] / 255.0
    ExG = 2 * greenP - redP - blueP
    
    # Segment the image using pymeanshift
    segmented_image, labels_image, number_regions = pms.segment(panoImage, spatial_radius=8, range_radius=6, min_density=35)
    
    # Calculate ExB and threshold values
    ExB = 2 * blueP - redP - greenP
    threshBlue = np.percentile(ExB, 53)
    threshold1 = np.percentile((0.5 * redP + greenP + 2 * blueP) / 3, 63)
    
    # Create binary sky image
    skyBlue = ExB > threshBlue
    skyImg = ((0.5 * redP + greenP + 2 * blueP) / 3) > threshold1
    skyImg = np.logical_or(skyBlue, skyImg).astype(np.float32)
    
    # Optimize the loop for sky classification
    for i in range(1, number_regions):
        idx = np.where(labels_image == i)
        rows, cols = idx
        
        mdPntX = int(0.5 * basewidth)
        mdPntY = int(0.5 * basewidth)
        
        if mdPntX in rows and mdPntY in cols:
            skyImg[rows, cols] = 1
        
        if not skyImg[idx].any():
            continue
        
        Cy = int(np.mean(rows))
        Cx = int(np.mean(cols))
        
        slope = (Cy - 0.5 * panoImage.shape[0]) / (Cx - 0.5 * panoImage.shape[1] + 0.00001)
        pxL = int(min(Cx, 0.5 * panoImage.shape[1]))
        pxU = int(max(Cx, 0.5 * panoImage.shape[1]))
        
        for x in range(pxL, pxU, 8):
            y = int(slope * (x - 0.5 * panoImage.shape[1]) + 0.5 * panoImage.shape[0])
            
            if ((0.5 * redP[y, x] + greenP[y, x] + 2 * blueP[y, x]) / 3) < threshold1 and ExB[y, x] < threshBlue:
                skyImg[rows, cols] = 0
                break
        
        if mdPntX in rows and mdPntY in cols:
            skyImg[rows, cols] = 1
    
    outImg = Image.fromarray(skyImg)
    outImg.save(classImgFile)
    
    return skyImg

# Example usage:
# skyImg = optimize_sky_classification(panoImage)



def cylinder2fisheyeImage (panoImg,yaw,outputImgFile='fisheye.jpg'):
    '''
    这个函数是用来将柱面投影的全景图像转换为原始图像（鱼眼图像）。我会解释每一部分的功能：
    函数签名和文档字符串：
    函数的名称是 cylinder2fisheyeImage，它有三个参数：panoImg（柱面投影的全景图像），yaw（偏航角），outputImgFile（输出的鱼眼图像文件名）。
    函数文档字符串提供了函数的描述、输入参数、输出以及一些注意事项。
    导入模块：
    函数内部导入了需要的模块，包括 PIL、numpy、os、math 和 cv2。这些模块提供了图像处理、数组操作、文件系统操作和数学计算的功能。
    获取输入图像的尺寸：
    函数首先获取输入全景图像的高度和宽度，并保存在 Hs 和 Ws 变量中。
    调整全景图像大小：
    由于只对全景图像的上半部分进行处理，因此将全景图像切割为一半，并保存在 panoImg2 变量中。
    计算鱼眼图像的半径：
    根据全景图像的宽度和用户提供的偏航角，计算出鱼眼图像的半径 R2。
    估算鱼眼图像的尺寸：
    根据鱼眼图像的半径，估算出鱼眼图像的高度 Hd 和宽度 Wd。
    创建空的映射矩阵：
    创建空的映射矩阵 xmap 和 ymap，用于存储从柱面投影到鱼眼图像的映射关系。
    计算映射关系：
    循环遍历鱼眼图像的每个像素，并根据柱面投影和用户提供的偏航角计算出相应的柱面投影坐标，然后将其映射到鱼眼图像中。
    使用仿射变换生成新的图像：
    使用 cv2.remap() 函数将切割后的全景图像重新映射到鱼眼图像中。
    去除黑色线条：
    去除生成鱼眼图像中的黑色线条。
    旋转生成的鱼眼图像：
    根据用户提供的偏航角，旋转生成的鱼眼图像，确保鱼眼图像的顶部与北方对齐。
    保存输出图像：
    使用 PIL 库将生成的鱼眼图像保存到输出文件中。
    返回生成的鱼眼图像：
    返回生成的鱼眼图像的 numpy 数组。
    '''
    from PIL import Image
    import numpy as np
    import os, os.path
    import math
    import cv2
    
    
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











def Shaded_judgement_noaa(pid, skyImg, obstructionpixelLabel, glareSize, azimuth, sunele, output_img_dir):
    
    from PIL import Image, ImageDraw
    import numpy as np
    import os
    import math

    # Create the output directory if it doesn't exist
    if not os.path.exists(output_img_dir):
        os.makedirs(output_img_dir)

    [cols, rows] = skyImg.shape

    # Convert azimuth and sunele to radians
    azimuth_skyimg = -(azimuth - 90)
    if azimuth_skyimg < 0: 
        azimuth_skyimg += 360
    
    sunele = sunele * np.pi / 180.0
    azimuth = azimuth_skyimg * np.pi / 180.0
    
    # BASED ON THE AZIMUTH AND SUN ELEVATION TO LOCATE THE CORRESPONDING PIXELS ON THE FISHEYE IMAGE
    R = int(0.5 * rows)
    
    if sunele < 0: 
        sunele = 0
    
    r = (90 - sunele * 180 / np.pi) / 90.0 * R
    
    px = int(r * math.cos(azimuth) + int(0.5 * cols)) - 1
    py = int(int(0.5 * rows) - r * math.sin(azimuth)) - 1
    
    boundXl = px - glareSize
    if boundXl < 0: boundXl = 0
    boundXu = px + glareSize
    if boundXu > cols - 1: boundXu = rows - 1
    boundYl = py - glareSize
    if boundYl < 0: boundYl = 0
    boundYu = py + glareSize
    if boundYu > rows - 1: boundYu = cols - 1
    
    # Determine if the sun is on obstructed or open sky pixels
    idx = np.where(skyImg[boundYl:boundYu, boundXl:boundXu] != obstructionpixelLabel)
    
    if len(idx[0]) / (4 * glareSize * glareSize) > 0.5:
        shade = 0
    else:
        shade = 1
    
    # Draw sun position on the sky image
    img = Image.fromarray(skyImg)
    draw = ImageDraw.Draw(img)
    draw.point((px, py), fill="red")

    # Modify the pixel value in the original image
    skyImg[py, px] = 5


    
    # Generate output image path with a unique name
    img_filename = os.path.join(output_img_dir, f"{pid}_copy6.tif")

    # Save the modified sky image with the sun position
    img.save(img_filename)
    
    return shade


def copy_fisheye_image(src_path, dest_path):
    if not os.path.exists(dest_path):
        shutil.copy(src_path, dest_path)



def process_images(source_folder):
    from PIL import Image
    import os
    
    # 确保源文件夹存在
    if not os.path.exists(source_folder):
        print("指定的文件夹不存在。")
        return
    
    # 创建一个新的文件夹来存放处理后的图片
    output_folder = os.path.join(source_folder, "processed")
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # 遍历源文件夹中的所有图片
    for filename in os.listdir(source_folder):
        if filename.endswith(".png") or filename.endswith(".jpg"):
            # 获取文件名中的英文字母
            first_letter = filename[filename.index("_") - 1]
            # 如果不是以"C"或"B"开头，则执行操作
            if first_letter not in ['C', 'B']:
                # 打开图片
                img = Image.open(os.path.join(source_folder, filename))
                
                # 获取图片的宽度和高度
                width, height = img.size
                
                # 计算新图片的宽度
                new_width = width + width // 4
                new_height = height
                
                # 创建新图片对象
                new_img = Image.new("RGB", (new_width, new_height))
                
                # 将原图片复制到新图片的左侧
                new_img.paste(img, (0, 0))
                
                # 将原图片的左1/4部分粘贴到新图片的右侧
                new_img.paste(img.crop((0, 0, width // 4, height)), (width, 0))
                
                # 删除新图片的左1/5
                new_img = new_img.crop((width // 4, 0, new_width, new_height))
                
                # 保存新图片
                new_filename = os.path.join(output_folder, filename)
                new_img.save(new_filename)
                
                print(f"已处理并保存：{new_filename}")
            else:
                print(f"文件 {filename} 是以'C'或'B'开头的，已跳过。")
    
    print("处理完成。")

# 调用函数并传入源文件夹路径
#source_folder = "your_source_folder_path"
#process_images(source_folder)



def delete_unmatched_images(shp_file, img_folder):
    # Read the point shapefile
    import os
    points = gpd.read_file(shp_file)
    point_pids = set(points['pid'].astype(str))
    
    # Get a list of image files in the folder
    img_files = os.listdir(img_folder)
    
    for img_file in img_files:
        if not img_file.endswith('.jpg'):
            continue
        
        pid = img_file.split('_')[0]
        if pid not in point_pids:
            os.remove(os.path.join(img_folder, img_file))
            print(f"Deleted image: {img_file}")

def save_images_up(input_folder, output_folder):
    # 创建输出文件夹
    '''
    把原始图像下半部分删除
    '''
    import os
    from PIL import Image
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # 循环处理每张图片
    for filename in os.listdir(input_folder):
        if filename.endswith(".jpg"):
            # 打开图片
            img_path = os.path.join(input_folder, filename)
            img = Image.open(img_path)

            # 裁剪图片，保留上半部分
            width, height = img.size
            cropped_img = img.crop((0, 0, width, height // 2))

            # 保存裁剪后的图片
            output_path = os.path.join(output_folder, filename)
            cropped_img.save(output_path)

            print("Processed:", filename)


def save_images_down(input_folder, output_folder):
    # 创建输出文件夹
    '''
    把原始图像下半部分删除
    '''
    import os
    from PIL import Image
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # 循环处理每张图片
    for filename in os.listdir(input_folder):
        if filename.endswith(".jpg"):
            # 打开图片
            img_path = os.path.join(input_folder, filename)
            img = Image.open(img_path)

            # 裁剪图片，保留下半部分
            width, height = img.size
            cropped_img = img.crop((0, height // 2, width, height))

            # 保存裁剪后的图片
            output_path = os.path.join(output_folder, filename)
            cropped_img.save(output_path)

            print("Processed:", filename)
