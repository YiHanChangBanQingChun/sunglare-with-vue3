from datetime import datetime, timedelta
import pytz
from pysolar.solar import get_altitude, get_azimuth

# 设置观察者位置为武汉市
latitude = 30.5833
longitude = 114.2833

# 设置时间为北京时间2024年5月15日7时40分
beijing_tz = pytz.timezone('Asia/Shanghai')
beijing_time = beijing_tz.localize(datetime(2024, 5, 15, 7, 40, 0))

# 转换为UTC时间
utc_time = beijing_time.astimezone(pytz.utc)

# 获取太阳的位置
altitude = get_altitude(latitude, longitude, utc_time)
azimuth = get_azimuth(latitude, longitude, utc_time)

# 打印太阳高度和方位角
print(f"太阳高度: {altitude:.2f} 度")
print(f"太阳方位角: {azimuth:.2f} 度")