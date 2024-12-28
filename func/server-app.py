from flask import Flask, request, jsonify,send_file,Response,send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash,generate_password_hash
from geoalchemy2 import Geometry
from flask_cors import CORS
import psycopg2
from geoalchemy2.shape import to_shape
from geoalchemy2.elements import WKBElement
import uuid
import json
import os
import tempfile
import geoalchemy2.shape
import shapely.wkb as wkb
from shapely.geometry import mapping
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user
import hmac
import shutil
from flask_cors import CORS
from datetime import datetime, timezone,timedelta
from pysolar.solar import get_altitude, get_azimuth
from urllib.parse import unquote
import requests
import re
import copy


# 时间的装饰器
def timeit(method):
    def timed(*args, **kw):
        ts = datetime.now()
        result = method(*args, **kw)
        te = datetime.now()
        print(f"Function {method.__name__} took: {te - ts}")
        return result
    return timed

# 日志记录的装饰器
def logit(method):
    def logged(*args, **kw):
        print(f"Calling {method.__name__} with args: {args} and kw: {kw}")
        return method(*args, **kw)
    return logged

# 初始化 Flask 应用
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres1@localhost/postgis_34_sample'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 数据库连接参数
conn_params = {
    "dbname": "postgis_34_sample",
    "user": "postgres",
    "password": "postgres1",
    "host": "localhost"
}

# 初始化扩展
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

# 创建数据库表
with app.app_context():
    db.create_all()

# 获取当前文件的目录
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
temp_dir = os.path.join(BASE_DIR, 'tmp')

# 标志变量，确保 clear_temp_folder 只执行一次
temp_folder_cleared = False

class Location(db.Model):
    """
    Location model representing a geographical location with various attributes.
    Attributes:
        id (int): Primary key, unique identifier for the location.
        name (str): Name of the location.
        address (str): Address of the location.
        baidu_longitude (float): Longitude of the location in Baidu coordinate system.
        baidu_latitude (float): Latitude of the location in Baidu coordinate system.
        wgs84_longitude (float): Longitude of the location in WGS84 coordinate system.
        wgs84_latitude (float): Latitude of the location in WGS84 coordinate system.
        baidu_index (str): Index or identifier used in Baidu maps.
        label (str): Label or description of the location.
        geom (Geometry): Geometric representation of the location as a point with SRID 4326.
    Methods:
        __repr__(): Returns a string representation of the Location instance.
    """
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    address = db.Column(db.String(255))
    baidu_longitude = db.Column(db.Float)
    baidu_latitude = db.Column(db.Float)
    wgs84_longitude = db.Column(db.Float)
    wgs84_latitude = db.Column(db.Float)
    baidu_index = db.Column(db.String(255))
    label = db.Column(db.String(255))
    geom = db.Column(Geometry(geometry_type='POINT', srid=4326))

    def __repr__(self):
        return f'<Location {self.name}>'

class User(db.Model):
    """
    User model for storing user details.

    Attributes:
        id (int): Primary key, unique identifier for the user.
        username (str): Unique username for the user, maximum length of 50 characters.
        password (str): User's password, maximum length of 80 characters.
        email (str): Unique email address for the user, maximum length of 50 characters.
        security_question (str): Security question for account recovery, maximum length of 100 characters.
        security_answer (str): Answer to the security question, maximum length of 100 characters.
        birthday (date): User's date of birth.
        avatar (str, optional): File path to the user's avatar image, maximum length of 200 characters.
    """
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    security_question = db.Column(db.String(100), nullable=False)
    security_answer = db.Column(db.String(100), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    avatar = db.Column(db.String(200), nullable=True)  # 头像文件位置

class Statistics(db.Model):
    """
    A SQLAlchemy model representing the 'statistics' table.

    Attributes:
        name (str): The name of the statistic. This field is required and has a maximum length of 50 characters.
        count (int): The count of the statistic. This field is required.
        t01 (int): The value for time period 01. This field is required.
        t02 (int): The value for time period 02. This field is required.
        t03 (int): The value for time period 03. This field is required.
        t04 (int): The value for time period 04. This field is required.
        t05 (int): The value for time period 05. This field is required.
        t06 (int): The value for time period 06. This field is required.
        t07 (int): The value for time period 07. This field is required.
        t08 (int): The value for time period 08. This field is required.
        t09 (int): The value for time period 09. This field is required.
        t10 (int): The value for time period 10. This field is required.
        t11 (int): The value for time period 11. This field is required.
        t12 (int): The value for time period 12. This field is required.
        id (int): The primary key of the table.
    """
    __tablename__ = 'statistics'
    name = db.Column(db.String(50), nullable=False)
    count = db.Column(db.Integer, nullable=False)
    t01 = db.Column(db.Integer, nullable=False)
    t02 = db.Column(db.Integer, nullable=False)
    t03 = db.Column(db.Integer, nullable=False)
    t04 = db.Column(db.Integer, nullable=False)
    t05 = db.Column(db.Integer, nullable=False)
    t06 = db.Column(db.Integer, nullable=False)
    t07 = db.Column(db.Integer, nullable=False)
    t08 = db.Column(db.Integer, nullable=False)
    t09 = db.Column(db.Integer, nullable=False)
    t10 = db.Column(db.Integer, nullable=False)
    t11 = db.Column(db.Integer, nullable=False)
    t12 = db.Column(db.Integer, nullable=False)
    id = db.Column(db.Integer, primary_key=True)

areas = {
    "武汉市": {"longitude": 114.31, "latitude": 30.52},
    "蔡甸区": {"longitude": 113.96, "latitude": 30.45},
    "东西湖区": {"longitude": 114.08, "latitude": 30.69},
    "汉南区": {"longitude": 113.93, "latitude": 30.33},
    "汉阳区": {"longitude": 114.21, "latitude": 30.54},
    "洪山区": {"longitude": 114.42, "latitude": 30.54},
    "黄陂区": {"longitude": 114.35, "latitude": 30.98},
    "江岸区": {"longitude": 114.32, "latitude": 30.65},
    "江汉区": {"longitude": 114.25, "latitude": 30.61},
    "江夏区": {"longitude": 114.36, "latitude": 30.25},
    "硚口区": {"longitude": 114.21, "latitude": 30.60},
    "青山区": {"longitude": 114.43, "latitude": 30.63},
    "武昌区": {"longitude": 114.34, "latitude": 30.56},
    "新洲区": {"longitude": 114.75, "latitude": 30.80}
}

app_url_list = [
    {"date": "2024-09-01", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=a29dc123ec1e46e5a391e62cb43ac095"},
    {"date": "2024-09-05", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=64e61674326e4a87954f9b790bcbeb1b"},
    {"date": "2024-09-10", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=700280f37e0449fc9701e22103d88de4"},
    {"date": "2024-09-15", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=957ed46de859472595081c1dfbeb72a0"},
    {"date": "2024-09-20", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=c14dc9f9965f4e9e858e7afdd46cb75e"},
    {"date": "2024-09-25", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=97fb5c3168814345ba994d2080315dca"},
    # {"date": "2024-11-01", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=21896e400b9e470b8d8e6325ae1b84d3"}
    {"date": "2024-11-01", "url": "https://www.geosceneonline.cn/geoscene/apps/webappviewer/index.html?id=c7a4f6bdbde94605b3025bc3e3919648"},
    {"date": "2024-11-03", "url": "https://www.geosceneonline.cn/geoscene/apps/webappviewer/index.html?id=43613b5da59d41bb8c89e11c7dc353b4"},
    {"date": "2024-11-05", "url": "https://www.geosceneonline.cn/geoscene/apps/webappviewer/index.html?id=f6529613c4284ba49b2d5ea50915522e"},
    {"date": "2024-11-06", "url": "https://www.geosceneonline.cn/geoscene/apps/webappviewer/index.html?id=30cbc027ff0842f5bce32706f54af107"},
    {"date": "2024-11-07", "url": "https://www.geosceneonline.cn/geoscene/apps/webappviewer/index.html?id=637c1eebae274832bf31ad1bebb174a3"},
]

feature_layer_url_list = [
    {"date": "2024-12-15", "url": "https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_12_15_10min/FeatureServer"},
    {"date": "2024-11-09", "url": "https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_11_09_interval_10min/FeatureServer"},
    {"date": "2024-11-08", "url": "https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_11_08_interval_10min/FeatureServer"},
    {"date": "2024-11-07", "url": "https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_11_07_interval_10min/FeatureServer"},
    {"date": "2024-11-06", "url": "https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_11_06_interval_10min/FeatureServer"},
    {"date": "2024-11-05", "url": "https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_11_05_interval_10min/FeatureServer"},
    {"date": "2024-11-04", "url": "https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_11_04_interval_10min/FeatureServer"},
    {"date": "2024-11-03", "url": "https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_11_03_interval_10min/FeatureServer"},
    {"date": "2024-11-02", "url": "https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_11_02_interval_10min/FeatureServer"},
    {"date": "2024-11-01", "url": "https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_11_01_interval_10min/FeatureServer"},
    {"date": "2024-11-15", "url": "https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_11_15_interval_10min/FeatureServer"},
]

district_names = {
    '420100': '武汉市',
    '420102': '江岸区',
    '420103': '江汉区',
    '420104': '硚口区',
    '420105': '汉阳区',
    '420106': '武昌区',
    '420107': '青山区',
    '420111': '洪山区',
    '420112': '东西湖区',
    '420113': '汉南区',
    '420114': '蔡甸区',
    '420115': '江夏区',
    '420116': '黄陂区',
    '420117': '新洲区'
}

# 清空 temp 文件夹的函数
def clear_temp_folder():
    """
    Clears the temporary folder by deleting it if it exists and then recreating it.

    This function checks if the directory specified by `temp_dir` exists. If it does, 
    the directory and all its contents are removed. Afterward, a new directory with 
    the same name is created.

    Raises:
        OSError: If the directory cannot be removed or created.
    """
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)
    os.makedirs(temp_dir)

# 用于测试的路由
@app.route('/api/location', methods=['POST'])
def add_point():
    """
    Adds a new geographical point to the database.

    Expects a JSON payload with 'name', 'lon', and 'lat' fields.
    The 'geom' field is constructed using the provided longitude and latitude.

    Returns:
        A JSON response with a success message and HTTP status code 201.
    """
    data = request.json
    new_location = Location(name=data['name'], geom=f'SRID=4326;POINT({data["lon"]} {data["lat"]})')  # 使用 Location 类和正确的 geom 字段
    db.session.add(new_location)
    db.session.commit()
    return jsonify({'message': 'Point added successfully!'}), 201

@app.route('/api/location', methods=['GET'])
def get_points():
    """
    Retrieves all geographical points from the database.

    Returns:
        A JSON response containing a list of points with their names and geometries.
    """
    points = Location.query.all()
    return jsonify([{'name': point.name, 'geom': str(point.geom)} for point in points])

@app.route('/api/location/<int:id>', methods=['PUT'])
def update_point(id):
    """
    Updates an existing geographical point in the database.

    Expects a JSON payload with optional 'name', 'lon', and 'lat' fields.
    The 'geom' field is updated using the provided longitude and latitude if present.

    Args:
        id (int): The ID of the point to update.

    Returns:
        A JSON response with a success message.
    """
    point = Location.query.get_or_404(id)
    data = request.json
    point.name = data.get('name', point.name)  # 更新名称（如果提供）
    if 'lon' in data and 'lat' in data:
        point.geom = f'SRID=4326;POINT({data["lon"]} {data["lat"]})'  # 确保更新 geom 字段
    db.session.commit()
    return jsonify({'message': 'Point updated successfully!'})


@app.route('/api/location/<int:id>', methods=['DELETE'])
def delete_point(id):
    """
    Deletes a geographical point from the database.

    Args:
        id (int): The ID of the point to delete.

    Returns:
        A JSON response with a success message.
    """
    point = Location.query.get_or_404(id)
    db.session.delete(point)
    db.session.commit()
    return jsonify({'message': 'Point deleted successfully!'})

@app.route('/api/search', methods=['POST'])
def search():
    """
    Searches for locations based on a partial name match.

    Expects a JSON payload with 'searchQueryStart' field.
    Uses case-insensitive matching to find locations whose names contain the search query.

    Returns:
        A JSON response containing a list of matching locations with their details.
    """
    data = request.json
    search_query_start = data.get('searchQueryStart', '')
    # 使用 ILIKE 进行不区分大小写的模糊匹配
    results = Location.query.filter(Location.name.ilike(f'%{search_query_start}%')).all()
    # 将查询结果转换为字典列表
    locations = [{
        'id': location.id,
        'name': location.name,
        'address': location.address,
        'baidu_longitude': location.baidu_longitude,
        'baidu_latitude': location.baidu_latitude,
        'wgs84_longitude': location.wgs84_longitude,
        'wgs84_latitude': location.wgs84_latitude,
        'baidu_index': location.baidu_index,
        'label': location.label
    } for location in results]
    return jsonify(locations)

def get_closest_table_name(month, day, hour, minute):
    """
    Finds the closest table name based on the provided month, day, hour, and minute.
    
    Args:
        month (int): The month of the date.
        day (int): The day of the date.
        hour (int): The hour of the time.
        minute (int): The minute of the time.
    
    Returns:
        str: The name of the closest table.
    """
    # print(f"Finding closest table for month: {month:02d}, day: {day:02d}, hour: {hour:02d}, minute: {minute:02d}")
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()
        cur.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_name LIKE 'whrd7_%_t%_%_%'
        """)
        tables = cur.fetchall()
        cur.close()
        conn.close()
    except Exception as e:
        # print(f"Error connecting to database: {e}")
        return None

    closest_table = "whrd7"  # 默认使用基础表
    closest_time_diff = timedelta.max

    # 预定义的天数列表
    available_days = [1, 5, 9, 13, 17, 21, 25, 29]

    for table in tables:
        table_name = table[0]
        try:
            parts = table_name.split('_')
            if len(parts) < 5:
                # print(f"Skipping table with unexpected format: {table_name}")
                continue  # 跳过不符合预期格式的表

            # 提取月份部分
            table_month = int(parts[1])
            # 检查时间部分是否以 't' 开头，并且包含 '_'
            if not parts[2].startswith('t'):
                continue  # 跳过时间部分不符合预期格式的表

            # 提取时间部分并进行分割
            table_hour = int(parts[2][1:])  # 获取 't' 之后的部分
            table_minute = int(parts[3])
            table_second = int(parts[4])

            # 找到最接近的天数
            closest_day = min(available_days, key=lambda x: abs(x - day))
            # 计算时间差
            table_time = datetime(2023, table_month, closest_day, table_hour, table_minute, table_second)
            input_time = datetime(2023, month, day, hour, minute)
            time_diff = abs((table_time - input_time).total_seconds() % 86400)  # 86400秒 = 24小时
            
            # 更新最接近的表
            if time_diff < closest_time_diff.total_seconds():
                closest_time_diff = timedelta(seconds=time_diff)
                closest_table = table_name
            
        except (ValueError, IndexError) as e:
            # print(f"Error parsing table name {table_name}: {e}")
            1
        except Exception as e:
            # print(f"Unexpected error parsing table name {table_name}: {e}")
            1

    # 如果最接近的表的时间差超过1小时（忽略日期差别），则使用默认表
    if closest_time_diff.total_seconds() > 3600:  # 3600秒 = 1小时
        closest_table = "whrd7"
        # print(closest_time_diff.total_seconds())

    # print(f"Closest table for {month:02d}/{closest_day:02d} {hour:02d}:{minute:02d} is {closest_table}")
    return closest_table

def fix_segments(geojson):
    """
    Fixes disconnected segments in a GeoJSON object by ensuring that the end of one segment 
    matches the start of the next segment.

    Args:
        geojson (dict): The GeoJSON object containing the segments to be fixed.

    Returns:
        dict: A new GeoJSON object with fixed segments.
    """
    # 深拷贝以保证不会修改原始数据
    geojson_copy = copy.deepcopy(geojson)
    features = geojson_copy['features']
    
    for i in range(len(features) - 1):
        current_feature = features[i]
        next_feature = features[i + 1]
        
        # 获取当前线段的坐标和下一个线段的坐标
        current_coords = current_feature['geometry']['coordinates']
        next_coords = next_feature['geometry']['coordinates']
        
        # 将元组转换为列表
        current_coords = [list(coord) for coord in current_coords]
        next_coords = [list(coord) for coord in next_coords]

        # 处理 MultiLineString 和 LineString 的情况
        current_end = current_coords[-1][-1] if isinstance(current_coords[-1], list) else current_coords[-1]
        next_start = next_coords[0][0] if isinstance(next_coords[0], list) else next_coords[0]
        
        # 检查当前线段的终点与下一个线段的起点是否相同
        if current_end != next_start:
            # 修改下一个线段的起点，保持一致
            if isinstance(next_coords[0], list):
                next_coords[0][0] = current_end
            else:
                next_coords[0] = current_end

            # print(f"Fixed disconnection between segment {i} and {i + 1}")
    
    return geojson_copy


def execute_route_plan(start, end, table_name):
    """
    Executes a route plan using the provided start and end points and the specified table name.
    
    Args:
        start (tuple): The starting point coordinates (longitude, latitude).
        end (tuple): The ending point coordinates (longitude, latitude).
        table_name (str): The name of the table to use for the route plan.
    
    Returns:
        tuple: A tuple containing the route plan ID and the path to the temporary file with the route plan.
    """
    # print(f"Executing route plan for table: {table_name}, start: {start}, end: {end}")
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()
        
        query = f"""
        WITH start_vertex AS (
            SELECT id FROM whrd7_vertices_pgr
            ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(%s, %s), 4326) LIMIT 1
        ), end_vertex AS (
            SELECT id FROM whrd7_vertices_pgr
            ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(%s, %s), 4326) LIMIT 1
        )
        SELECT seq, path_seq, node, edge, cost, agg_cost, ST_AsBinary(geom) AS geom, length, name, maxspeed
        FROM pgr_astar(
            'SELECT gid AS id, source, target, 
            forward_time AS cost, 
            reverse_time AS reverse_cost, 
            COALESCE(ST_X(ST_StartPoint(geom)), 0) AS x1, COALESCE(ST_Y(ST_StartPoint(geom)), 0) AS y1, 
            COALESCE(ST_X(ST_EndPoint(geom)), 0) AS x2, COALESCE(ST_Y(ST_EndPoint(geom)), 0) AS y2 ,
            name,
            maxspeed
            FROM {table_name}
            WHERE geom IS NOT NULL AND (ST_GeometryType(geom) = ''ST_LineString'' OR ST_GeometryType(geom) = ''ST_MultiLineString'')',
            (SELECT id FROM start_vertex), (SELECT id FROM end_vertex), directed := true
        ) AS route
        JOIN {table_name} ON route.edge = {table_name}.gid;
        """
        
        cur.execute(query, (start[0], start[1], end[0], end[1]))
        route_result = cur.fetchall()
    
        features = []

        for row in route_result:
            geom_data = row[-4]
            if isinstance(geom_data, memoryview):
                geom_data = geom_data.tobytes()
            if isinstance(geom_data, bytes):
                try:
                    geom = wkb.loads(geom_data)
                    geom_json = mapping(geom)
                    feature = {
                        "type": "Feature",
                        "geometry": geom_json,
                        "properties": {
                            "seq": row[0],
                            "path_seq": row[1],
                            "node": row[2],
                            "edge": row[3],
                            # "cost": row[4],
                            "cost": round(row[4],2),
                            # "agg_cost": row[5],
                            "agg_cost": round(row[5],2),
                            "length": round(row[7],2),
                            # "length": row[7],
                            "name": row[8],
                            "maxspeed": row[9]
                        }
                    }
                    features.append(feature)
                except Exception as e:
                    # print(f"Error loading WKB data: {e}")
                    1
        
        geojson = {
            "type": "FeatureCollection",
            "features": features
        }

        # 连接断开的路径段
        geojson = fix_segments(geojson)
        # print(geojson)

        route_plan_id = str(uuid.uuid4())
        temp_file_name = f"route_plan_{route_plan_id}.geojson"
        temp_file_path = os.path.join(temp_dir, temp_file_name)

        with open(temp_file_path, "w") as tmp:
            json.dump(geojson, tmp)

        cur.close()
        conn.close()

        print(f"Route plan executed successfully, route_plan_id: {route_plan_id}, temp_file_path: {temp_file_path}")
        return route_plan_id, temp_file_path
    except Exception as e:
        print(f"Error executing route plan: {e}")
        return None, None

@app.route('/api/route/plan', methods=['POST'])
def route_plan():
    """
    Handles route planning requests by calculating the default and time-based routes.

    Expects a JSON payload with 'start', 'end', 'date', and 'time' fields.
    The 'start' and 'end' fields should contain the coordinates for the route.
    The 'date' and 'time' fields are optional and used for time-based route planning.

    Returns:
        A JSON response containing the IDs and file paths for the default and time-based routes.
    """
    data = request.json
    start = data['start']['location']
    end = data['end']['location']
    date = data.get('date')
    time = data.get('time')
    
    # print(f"Received route plan request: start={start}, end={end}, date={date}, time={time}")
    
    # 默认路径规划
    default_table_name = "whrd7"
    default_route_plan_id, default_temp_file_path = execute_route_plan(start, end, default_table_name)
    
    # 基于时间的路径规划
    if date and time:
        try:
            date_obj = datetime.strptime(date, '%Y-%m-%d')
            time_obj = datetime.strptime(time, '%H:%M:%S')
            month = date_obj.month
            day = date_obj.day
            hour = time_obj.hour
            minute = time_obj.minute
            print(f"Parsed date and time: month={month}, day={day}, hour={hour}, minute={minute}")
            closest_table_name = get_closest_table_name(month, day, hour, minute)
        except Exception as e:
            # print(f"Error parsing date/time: {e}")
            closest_table_name = None
    else:
        closest_table_name = None

    if closest_table_name and closest_table_name != "whrd7":
        time_based_route_plan_id, time_based_temp_file_path = execute_route_plan(start, end, closest_table_name)
    else:
        time_based_route_plan_id = None
        time_based_temp_file_path = None

    # print(f"Route plan response: default_id={default_route_plan_id}, time_based_id={time_based_route_plan_id}")
    return jsonify({
        "default_id": default_route_plan_id,
        "default_temp_file_path": default_temp_file_path,
        "time_based_id": time_based_route_plan_id,
        "time_based_temp_file_path": time_based_temp_file_path
    })


@app.route('/api/get_geojson/<route_id>')
def get_geojson(route_id):
    """
    Retrieve a GeoJSON file for a given route ID.

    Args:
        route_id (str): The ID of the route for which to retrieve the GeoJSON file.

    Returns:
        Response: A Flask response object containing the GeoJSON file if it exists,
                  or a JSON error message with a 404 status code if the file is not found.
    """
    file_path = os.path.join(temp_dir, f'route_plan_{route_id}.geojson')
    if os.path.exists(file_path):
        return send_file(file_path, mimetype='application/json')
    else:
        return jsonify({"error": "File not found"}), 404

# 用户加载函数
@login_manager.user_loader
def load_user(user_id):
    """
    Loads a user by their user ID.

    Args:
        user_id (int): The ID of the user to load.

    Returns:
        User: The user object if found, otherwise None.
    """
    return User.query.get(int(user_id))

@app.route('/api/register', methods=['POST'])
def register():
    """
    Registers a new user.

    Expects a JSON payload with 'username', 'password', 'email', 'security_question', 
    'security_answer', and 'birthday' fields.

    Returns:
        A JSON response with a success message and HTTP status code 201 if registration is successful.
        A JSON response with an error message and HTTP status code 400 if the username already exists.
    """
    data = request.json
    # print("注册请求数据:", data)

    # 检查用户名是否已经存在
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    # print(f"生成的哈希密码: {hashed_password}")

    new_user = User(
        username=data['username'], 
        password=hashed_password, 
        email=data['email'],
        security_question=data['security_question'],
        security_answer=data['security_answer'],
        birthday=data['birthday']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    """
    Handles user login requests.

    Expects a JSON payload with 'username' and 'password' fields.
    Verifies the provided credentials against the stored user data.

    Returns:
        A JSON response with a success message and HTTP status code 200 if login is successful.
        A JSON response with an error message and HTTP status code 401 if the credentials are incorrect.
        A JSON response with an error message and HTTP status code 500 if there is a server error.
    """
    data = request.get_json()
    # print("接收到的登录请求数据:", data)

    username = data.get('username')
    password = data.get('password')
    
    # print(f"登录请求数据: username={username}, password={password}")

    user = User.query.filter_by(username=username).first()
    # if user:
    #     print(f"找到用户: {user.username}, 加密后的密码: {user.password}")
    # else:
    #     print("未找到用户")

    try:
        if user and bcrypt.check_password_hash(user.password, password):
            # print("密码匹配成功")
            return jsonify({'message': '登录成功'}), 200
        else:
            # print("用户名或密码错误")
            return jsonify({'message': '用户名或密码错误'}), 401
    except ValueError as e:
        # print(f"检查密码哈希时出错: {e}")
        return jsonify({'message': '内部服务器错误'}), 500

@app.route('/api/forget_reset_password', methods=['POST'])
def forget_reset_password():
    """
    Resets the password for a user who has forgotten their password.

    Expects a JSON payload with 'username', 'security_answer', and 'newPassword' fields.
    Verifies the provided security answer and updates the password if correct.

    Returns:
        A JSON response with a success message and HTTP status code 200 if the password is reset successfully.
        A JSON response with an error message and HTTP status code 404 if the user does not exist.
        A JSON response with an error message and HTTP status code 400 if the security answer is incorrect or the new password does not meet the requirements.
    """
    data = request.json
    # print("忘记密码重置请求数据:", data)

    # 检查用户是否存在
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({'message': 'User does not exist'}), 404

    # 检查安全问题答案是否正确
    if user.security_answer != data['security_answer']:
        return jsonify({'message': 'Security answer is incorrect'}), 400

    # 检查新密码是否符合要求
    if not re.match(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$', data['newPassword']):
        return jsonify({'message': 'New password does not meet the requirements'}), 400

    # 生成新的哈希密码
    hashed_password = bcrypt.generate_password_hash(data['newPassword']).decode('utf-8')
    # print(f"生成的新哈希密码: {hashed_password}")

    # 更新用户密码
    user.password = hashed_password
    db.session.commit()
    return jsonify({'message': 'Password reset successfully'}), 200

@app.route('/api/reset_password', methods=['POST'])
def reset_password():
    """
    Resets the password for a user.

    Expects a JSON payload with 'username', 'currentPassword', and 'newPassword' fields.
    Verifies the provided current password and updates the password if correct.

    Returns:
        A JSON response with a success message and HTTP status code 200 if the password is reset successfully.
        A JSON response with an error message and HTTP status code 404 if the user does not exist.
        A JSON response with an error message and HTTP status code 400 if the current password is incorrect or the new password does not meet the requirements.
        A JSON response with an error message and HTTP status code 500 if there is a server error.
    """
    data = request.json
    # print("重置密码请求数据:", data)

    # 检查用户是否存在
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({'message': 'User does not exist'}), 404

    # 检查当前密码是否正确
    try:
        if not bcrypt.check_password_hash(user.password, data['currentPassword']):
            # print("当前密码不正确", user.password, data['currentPassword'])
            return jsonify({'message': 'Current password is incorrect'}), 400
    except ValueError as e:
        # print(f"哈希检查错误: {e}")
        return jsonify({'message': 'Invalid hash method'}), 500

    # 检查新密码是否符合要求
    if not re.match(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$', data['newPassword']):
        return jsonify({'message': 'New password does not meet the requirements'}), 400

    # 生成新的哈希密码
    hashed_password = bcrypt.generate_password_hash(data['newPassword']).decode('utf-8')
    # print(f"生成的新哈希密码: {hashed_password}")

    # 更新用户密码
    user.password = hashed_password
    db.session.commit()
    return jsonify({'message': 'Password reset successfully'}), 200

@app.route('/api/get_security_question', methods=['POST'])
def get_security_question():
    """
    Retrieves the security question for a given username.

    Expects a JSON payload with 'username' field.
    Returns the security question if the user is found, otherwise returns an error message.

    Returns:
        A JSON response containing the security question or an error message.
    """
    data = request.get_json()
    username = data.get('username')
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({'security_question': user.security_question})
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/api/verify_security_answer', methods=['POST'])
def verify_security_answer():
    """
    Verifies the security answer for a given username.

    Expects a JSON payload with 'username' and 'security_answer' fields.
    Checks if the provided security answer matches the stored answer for the user.

    Returns:
        A JSON response with 'correct' set to True if the answer is correct, otherwise False.
    """
    data = request.get_json()
    username = data.get('username')
    security_answer = data.get('security_answer')
    user = User.query.filter_by(username=username).first()
    if user and user.security_answer == security_answer:
        return jsonify({'correct': True})
    else:
        return jsonify({'correct': False})

@app.route('/api/update_user_info', methods=['POST'])
def update_user_info():
    """
    Updates user information.

    Expects a JSON payload with 'username' and optional fields to update:
    'new_username', 'email', 'security_question', 'security_answer', 'birthday', 'avatar'.

    Returns:
        A JSON response with the updated user information and HTTP status code 200 if successful.
        A JSON response with an error message and HTTP status code 400 if the username is not provided.
        A JSON response with an error message and HTTP status code 404 if the user does not exist.
    """
    data = request.get_json()
    # print("更新用户信息请求数据:", data)

    username = data.get('username')
    if not username:
        return jsonify({'message': 'Username is required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        # print(f"用户 {username} 不存在")
        return jsonify({'message': 'User does not exist'}), 404

    # 更新用户名
    new_username = data.get('new_username')
    if new_username:
        user.username = new_username
        # print(f"更新用户名: {new_username}")

    # 更新其他用户信息
    for field in ['email', 'security_question', 'security_answer', 'birthday', 'avatar']:
        if field in data:
            setattr(user, field, data[field])
            # print(f"更新 {field}: {data[field]}")

    db.session.commit()
    # print(f"用户 {username} 信息更新成功")
    return jsonify({field: getattr(user, field) for field in ['username', 'email', 'security_question', 'security_answer', 'birthday', 'avatar']}), 200

@app.route('/api/check_password', methods=['POST'])
def check_password():
    """
    Checks if the provided current password is correct for the given username.

    Expects a JSON payload with 'username' and 'currentPassword' fields.
    Verifies the provided current password against the stored user password hash.

    Returns:
        A JSON response with a success message and HTTP status code 200 if the password is correct.
        A JSON response with an error message and HTTP status code 404 if the user does not exist.
        A JSON response with an error message and HTTP status code 400 if the current password is incorrect.
        A JSON response with an error message and HTTP status code 500 if there is a server error.
    """
    data = request.json
    # print("检查密码请求数据:", data)

    # 检查用户是否存在
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({'message': 'User does not exist'}), 404

    # 检查用户密码哈希是否为空
    if not user.password:
        return jsonify({'message': 'User password hash is empty'}), 500

    # 检查当前密码是否正确
    try:
        if not bcrypt.check_password_hash(user.password, data['currentPassword']):
            # print("当前密码不正确", user.password, data['currentPassword'])
            return jsonify({'message': 'Current password is incorrect'}), 400
        else:
            1
            # print("当前密码正确", user.password, data['currentPassword'])
    except ValueError as e:
        # print(f"哈希检查错误: {e}")
        return jsonify({'message': 'Invalid hash method'}), 500

    return jsonify({'message': 'Current password is correct'}), 200



@app.route('/api/user_info', methods=['GET'])
def get_user_info():
    """
    Retrieve user information based on the provided username.

    This function fetches user details from the database using the username
    provided in the request arguments. If the user is found, it returns a JSON
    response containing the user's username, email, security question, birthday,
    and avatar. If the user is not found, it returns a JSON response with an
    error message and a 404 status code.

    Returns:
        Response: A JSON response containing user information or an error message.
    """
    username = request.args.get('username')
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({
            'username': user.username,
            'email': user.email,
            'security_question': user.security_question,
            'birthday': user.birthday.strftime('%Y-%m-%d'),
            'avatar': user.avatar  # 添加头像文件位置
        })
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/api/avatar/<filename>', methods=['GET'])
def get_avatar(filename):
    """
    从指定目录中发送头像文件。

    参数:
    filename (str): 头像文件的名称。

    返回:
    Flask响应对象: 包含头像文件的响应。
    """
    return send_from_directory(avatar_dir, filename)

@app.route('/api/upload_avatar', methods=['POST'])
def upload_avatar():
    """
    Handle avatar upload for a user.
    This function processes the uploaded avatar file, saves it to the server,
    updates the user's avatar information in the database, and deletes the old
    avatar file if it exists and is not the default avatar.
    Returns:
        Response: A JSON response indicating the success or failure of the upload.
        - 200: Avatar uploaded successfully.
        - 404: User not found.
        - 400: No file uploaded.
    """
    file = request.files['avatar']
    if file:
        filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
        file_path = os.path.join(avatar_dir, filename)
        file.save(file_path)

        username = request.form['username']
        user = User.query.filter_by(username=username).first()
        if user:
            old_avatar = user.avatar  # 获取旧头像文件名
            user.avatar = filename
            db.session.commit()

            # 删除旧头像文件，确保 old_avatar 不是默认值或空值
            if old_avatar and old_avatar != 'default_avatar.png':  # 假设 'default_avatar.png' 是默认头像文件名
                old_avatar_path = os.path.join(avatar_dir, old_avatar)
                if os.path.exists(old_avatar_path):
                    os.remove(old_avatar_path)

            return jsonify({'message': '头像上传成功', 'avatar': filename}), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        return jsonify({'message': 'No file uploaded'}), 400

@app.route('/api/solar_angles', methods=['GET'])
def get_solar_angles():
    """
    Retrieve solar angles (azimuth and altitude) for a given area and time.
    This function extracts the area name and time from the request arguments,
    validates them, and calculates the solar azimuth and altitude for the specified
    area and time. The azimuth is converted to a format where 0 degrees is east,
    increasing counterclockwise.
    Returns:
        JSON response containing the area name, longitude, latitude, UTC time,
        solar azimuth, and solar altitude. If the area is not found or the time
        format is invalid, an appropriate error message is returned.
    Raises:
        ValueError: If the time format is invalid.
    """
    area_name = request.args.get('area_name')
    area_name = unquote(area_name)  # 解码 URL 参数
    time_str = request.args.get('time')
    
    # 检查区域名字是否存在
    if area_name not in areas:
        return jsonify({'message': 'Area not found'}), 404
    
    # 解析时间参数
    try:
        dt = datetime.fromisoformat(time_str)
    except ValueError:
        return jsonify({'message': 'Invalid time format'}), 400
    
    # 获取区域的经纬度
    coords = areas[area_name]
    longitude = coords['longitude']
    latitude = coords['latitude']
    
    # 转换为 UTC 时间
    dt_utc = dt.astimezone(timezone.utc)
    azimuth = get_azimuth(latitude, longitude, dt_utc)
    altitude = get_altitude(latitude, longitude, dt_utc)
    # 转换方位角为从东开始逆时针
    converted_azimuth = (450 - azimuth) % 360
    # print(f"太阳方位角: {azimuth}, 转换后的太阳方位角: {converted_azimuth}, 太阳高度角: {altitude}")
    
    # 返回计算结果
    return jsonify({
        'area_name': area_name,
        'longitude': longitude,
        'latitude': latitude,
        'utc_time': dt_utc.isoformat(),
        'solar_azimuth': round(converted_azimuth, 3),
        'solar_altitude': round(altitude, 3)
    })

@app.route('/api/submit_feedback', methods=['POST'])
def submit_feedback():
    """
    Submits user feedback.

    Expects a JSON payload with 'username', 'feedbackContent', and 'timestamp' fields.
    Saves the feedback content to a file named with the timestamp and username.

    Returns:
        A JSON response with a success message and HTTP status code 200 if the feedback is submitted successfully.
        A JSON response with an error message and HTTP status code 400 if the data is invalid.
    """
    data = request.json
    username = data.get('username')
    feedback_content = data.get('feedbackContent')
    timestamp = data.get('timestamp')

    if not username or not feedback_content or not timestamp:
        return jsonify({'message': 'Invalid data'}), 400

    # 格式化时间戳，去掉无效字符
    formatted_timestamp = timestamp.replace(':', '-').replace('T', '_').replace('Z', '')

    # 创建文件名
    filename = f"{formatted_timestamp}_{username}.txt"
    filepath = os.path.join(feedback_dir, filename)

    # 写入文件
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(feedback_content)

    return jsonify({'message': 'Feedback submitted successfully'}), 200

@app.route('/api/solar_angles_day', methods=['GET'])
def get_solar_angles_day():
    """
    Retrieve solar angles (azimuth and altitude) for a given area and date throughout the day.
    
    This function extracts the area name and date from the request arguments,
    validates them, and calculates the solar azimuth and altitude for the specified
    area and date at 20-minute intervals from 5 AM to 8 PM. The azimuth is converted 
    to a format where 0 degrees is east, increasing counterclockwise.
    
    Returns:
        JSON response containing the solar angles for the specified area and date.
        If the area is not found or the date format is invalid, an appropriate error message is returned.
    """
    area_name = request.args.get('area_name')
    area_name = unquote(area_name)  # 解码 URL 参数
    date_str = request.args.get('date')
    
    # 检查区域名字是否存在
    if area_name not in areas:
        return jsonify({'message': 'Area not found'}), 404
    
    # 解析日期参数
    try:
        date = datetime.fromisoformat(date_str).date()
    except ValueError:
        return jsonify({'message': 'Invalid date format'}), 400
    
    # 获取区域的经纬度
    coords = areas[area_name]
    longitude = coords['longitude']
    latitude = coords['latitude']
    
    # 生成从5点到8点的时间点
    times = [datetime.combine(date, datetime.min.time()) + timedelta(hours=5) + timedelta(minutes=20 * i) for i in range(45)]
    
    solar_angles = []
    for dt in times:
        dt_utc = dt.astimezone(timezone.utc)
        azimuth = get_azimuth(latitude, longitude, dt_utc)
        altitude = get_altitude(latitude, longitude, dt_utc)
        if altitude > 0:
            converted_azimuth = (450 - azimuth) % 360
            solar_angles.append({
                'time': dt.isoformat(),
                'solar_azimuth': round(converted_azimuth, 3),
                'solar_altitude': round(altitude, 3)
            })
            # print(f"时间: {dt}, 太阳方位角: {azimuth}, 太阳高度角: {altitude}")
    return jsonify(solar_angles)

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    """
    Retrieves statistics data for a specific district or all districts.

    This function fetches statistics data from the database based on the provided
    district code. If a district code is provided, it retrieves data for that specific
    district. Otherwise, it retrieves data for all districts.

    Returns:
        Response: A JSON response containing the statistics data or an error message.
    """
    district_code = request.args.get('district')
    # print(f"查询县区代码: {district_code}")

    district_name = district_names.get(district_code)

    try:
        # 连接数据库
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        if district_name:
            # 查询指定县区的统计数据
            query = """
            SELECT name, count, t01, t02, t03, t04, t05, t06, t07, t08, t09, t10, t11, t12
            FROM statistics
            WHERE name = %s
            """
            cur.execute(query, (district_name,))
        else:
            # 查询所有县区的统计数据
            query = """
            SELECT name, count, t01, t02, t03, t04, t05, t06, t07, t08, t09, t10, t11, t12
            FROM statistics
            """
            cur.execute(query)

        statistics = cur.fetchall()

        # 转换为 JSON 格式
        if statistics:
            result = []
            for stat in statistics:
                result.append({
                    'name': stat[0],
                    'count': stat[1],
                    't01': stat[2],
                    't02': stat[3],
                    't03': stat[4],
                    't04': stat[5],
                    't05': stat[6],
                    't06': stat[7],
                    't07': stat[8],
                    't08': stat[9],
                    't09': stat[10],
                    't10': stat[11],
                    't11': stat[12],
                    't12': stat[13]
                })
                # print(f"Found statistics for {stat[0]}")
                # print(stat)
            return jsonify(result)
        else:
            return jsonify({'message': 'No statistics found'}), 404
    except Exception as e:
        # print(e)
        return jsonify({'message': 'An error occurred'}), 500
    finally:
        # 关闭数据库连接
        cur.close()
        conn.close()

@app.route('/api/get_api_key', methods=['GET'])
def get_api_key():
    """
    Get the API key for the application.

    Returns:
        Response: A JSON response containing the API key.
    """
    api_key = '32bb299d6d35b28d672e86cb6c15cba6'
    return jsonify({'key': api_key})

@app.before_request
def initialize():
    """
    Initialize the server application by clearing the temporary folder if it has not been cleared yet.

    This function checks the global variable `temp_folder_cleared`. If it is `False`, it calls the 
    `clear_temp_folder` function to clear the temporary folder and sets `temp_folder_cleared` to `True`.

    Note:
        This function modifies the global variable `temp_folder_cleared`.

    这是flask后端，在合理的位置（def下方）补充注释，函数下为英文，代码区域为中文，不要改我的代码
    """
    global temp_folder_cleared
    if not temp_folder_cleared:
        clear_temp_folder()
        temp_folder_cleared = True

@app.route('/api/get_feature_layer_dates', methods=['GET'])
def get_feature_layer_dates():
    """
    Retrieves the available dates for feature layers.

    This function extracts the dates from the `feature_layer_url_list` and returns them
    in a JSON response.

    Returns:
        Response: A JSON response containing the list of dates.
    """
    dates = [entry["date"] for entry in feature_layer_url_list]
    return jsonify({'dates': dates})

@app.route('/api/get_feature_layer_url_by_date', methods=['GET'])
def get_feature_layer_url_by_date():
    """
    Retrieves the feature layer URL for a given date.

    This function searches the `feature_layer_url_list` for an entry matching the
    provided date and returns the corresponding URL in a JSON response.

    Returns:
        Response: A JSON response containing the URL or an error message.
    """
    date = request.args.get('date')
    for entry in feature_layer_url_list:
        if entry["date"] == date:
            return jsonify({'url': entry["url"]})
    return jsonify({'message': 'No URL found for the given date'}), 404

@app.route('/api/getapp', methods=['GET'])
def getapp():
    """
    Retrieves the closest application URL based on the current date.

    This function compares the current date with the dates in the `app_url_list`
    and returns the URL that is closest to the current date.

    Returns:
        Response: A JSON response containing the closest URL or an error message.
    """
    current_date = datetime.now().date()
    
    closest_date = None
    closest_url = None
    for entry in app_url_list:
        entry_date = datetime.strptime(entry["date"], "%Y-%m-%d").date()
        if closest_date is None or abs((entry_date - current_date).days) < abs((closest_date - current_date).days):
            closest_date = entry_date
            closest_url = entry["url"]
    # print(f"Closest URL: {closest_url}")
    if closest_url:
        return jsonify({'url': closest_url})
    else:
        return jsonify({'message': 'No URL found'}), 404

@app.route('/api/get_dates', methods=['GET'])
def get_dates():
    """
    Retrieves the available dates for application URLs.

    This function extracts the dates from the `app_url_list` and returns them
    in a JSON response.

    Returns:
        Response: A JSON response containing the list of dates.
    """
    dates = [entry["date"] for entry in app_url_list]
    return jsonify({'dates': dates})

@app.route('/api/get_url_by_date', methods=['GET'])
def get_url_by_date():
    """
    Retrieves the application URL for a given date.

    This function searches the `app_url_list` for an entry matching the
    provided date and returns the corresponding URL in a JSON response.

    Returns:
        Response: A JSON response containing the URL or an error message.
    """
    date = request.args.get('date')
    for entry in app_url_list:
        if entry["date"] == date:
            return jsonify({'url': entry["url"]})
    return jsonify({'message': 'No URL found for the given date'}), 404

@app.route('/api/get_weather', methods=['GET'])
def get_weather():
    """
    Retrieves weather information for Wuhan city.

    This function fetches the API key from the local server, constructs a request
    to the weather API using the city code for Wuhan, and returns the weather data
    in JSON format.

    Returns:
        Response: A JSON response containing the weather data or an error message.
    """
    # 获取 API 密钥
    api_key_response = requests.get('http://localhost:5000/api/get_api_key')
    api_key = api_key_response.json().get('key')
    
    if not api_key:
        return jsonify({'error': 'Failed to retrieve API key'}), 500
    
    # 请求天气信息
    city_code = '420100'  # 武汉市的城市编码
    weather_url = f'https://restapi.amap.com/v3/weather/weatherInfo?city={city_code}&key={api_key}&extensions=all'
    
    weather_response = requests.get(weather_url)
    weather_data = weather_response.json()
    
    return jsonify(weather_data)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    # 获取当前文件的目录
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    # print(BASE_DIR)

    temp_dir = os.path.join(BASE_DIR, 'tmp')
    avatar_dir = os.path.join(BASE_DIR, 'avatar')
    feedback_dir = os.path.join(BASE_DIR, 'feedback')

    # 检查 avatar 目录是否存在，如果不存在则创建
    if not os.path.exists(avatar_dir):
        os.makedirs(avatar_dir)
    # 检查 tmp 目录是否存在，如果不存在则创建
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    # 检查 feedback 目录是否存在，如果不存在则创建
    if not os.path.exists(feedback_dir):
        os.makedirs(feedback_dir)

    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)