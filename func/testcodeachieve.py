

from pysolar.solar import *
import datetime

latitude = 23.5
longitude = 112.5

date = datetime.datetime(2015, 11, 25, 11, 25, 3, 130320, tzinfo=datetime.timezone.utc)
print(get_altitude(latitude, longitude, date))

