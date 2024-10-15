from datetime import timezone, timedelta, datetime
from pysolar.solar import get_altitude, get_azimuth

# 7.计算眩光遮挡状况
def date_to_sun_elevation(date, lon, lat):
    '''
    根据日期与经纬度获得太阳高度角
    '''
    sun_elevation = get_altitude(lat, lon, date)
    return sun_elevation

def azimuth_angle_calculator(lat, lon, date):
    '''
    计算太阳方位角，根据经纬度以及日期
    '''
    azimuth_angle = get_azimuth(lat, lon, date)
    return azimuth_angle

def main():
    # 日期
    year = 2021
    month = 6
    day = 21
    hour = 12
    minute = 0
    second = 0
    date = datetime(year, month, day, hour, minute, second, 0, timezone(timedelta(hours=8)))
    print("日期：", date)
    # 经纬度
    lon = 116.405285
    lat = 39.904989
    sun_elevation = date_to_sun_elevation(date, lon, lat)
    azimuth_angle = azimuth_angle_calculator(lat, lon, date)
    print("太阳高度角：", sun_elevation)
    print("太阳方位角：", azimuth_angle)

if __name__ == '__main__':
    main()