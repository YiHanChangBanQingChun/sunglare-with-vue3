from flask import Flask, request, jsonify,send_file,Response
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


# step 1: create a Flask app
# 初始化 Flask 应用
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
# CORS(app)
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
print(BASE_DIR)
temp_dir = os.path.join(BASE_DIR, 'tmp')
print(temp_dir)

# 检查 tmp 目录是否存在，如果不存在则创建
if not os.path.exists(temp_dir):
    os.makedirs(temp_dir)

# step 2: create a model
class Location(db.Model):
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
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    security_question = db.Column(db.String(100), nullable=False)
    security_answer = db.Column(db.String(100), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    avatar = db.Column(db.String(200), nullable=True)  # 头像文件位置

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

# 清空 temp 文件夹的函数
def clear_temp_folder():
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)
    os.makedirs(temp_dir)

# 标志变量，确保 clear_temp_folder 只执行一次
temp_folder_cleared = False

class Statistics(db.Model):
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

# step 3: crate a route
# step 3.1: add information to the table
@app.route('/api/location', methods=['POST'])
def add_point():
    data = request.json
    new_location = Location(name=data['name'], geom=f'SRID=4326;POINT({data["lon"]} {data["lat"]})')  # 使用 Location 类和正确的 geom 字段
    db.session.add(new_location)
    db.session.commit()
    return jsonify({'message': 'Point added successfully!'}), 201

# step 3.2: get information from the table
@app.route('/api/location', methods=['GET'])
def get_points():
    points = Location.query.all()
    return jsonify([{'name': point.name, 'geom': str(point.geom)} for point in points])  # 修改这里

# step 3.3: renew the information to the table
@app.route('/api/location/<int:id>', methods=['PUT'])
def update_point(id):
    point = Location.query.get_or_404(id)
    data = request.json
    point.name = data.get('name', point.name)  # 如果提供了新的名称，则更新
    if 'lon' in data and 'lat' in data:
        point.geom = f'SRID=4326;POINT({data["lon"]} {data["lat"]})'  # 确保更新 geom 字段
    db.session.commit()
    return jsonify({'message': 'Point updated successfully!'})

# step 3.4: delete the information from the table
@app.route('/api/location/<int:id>', methods=['DELETE'])
def delete_point(id):
    point = Location.query.get_or_404(id)
    db.session.delete(point)
    db.session.commit()
    return jsonify({'message': 'Point deleted successfully!'})

# step 4: search the information of poi from the table
@app.route('/api/search', methods=['POST'])
def search():
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
    print(f"Finding closest table for month: {month:02d}, day: {day:02d}, hour: {hour:02d}, minute: {minute:02d}")
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
        print(f"Error connecting to database: {e}")
        return None

    closest_table = "whrd7"  # Default to the base table
    closest_time_diff = timedelta.max

    for table in tables:
        table_name = table[0]
        try:
            parts = table_name.split('_')
            if len(parts) < 5:
                print(f"Skipping table with unexpected format: {table_name}")
                continue  # Skip tables that don't follow the expected format

            # 提取月份部分
            table_month = int(parts[1])
            # print(f"Table month: {table_month}")
            # 检查时间部分是否以 't' 开头，并且包含 '_'
            if not parts[2].startswith('t'):
                # print(f"Skipping table with unexpected time format: {table_name}")
                continue  # Skip if the time part does not follow expected format
            
            # 提取时间部分并进行分割
            table_hour = int(parts[2][1:])  # Get the part after 't'
            table_minute = int(parts[3])
            table_second = int(parts[4])
            # 如果是9月，提取天数部分
            if month == 9 and len(parts) > 5:
                table_day = int(parts[5])
            else:
                table_day = 15  # 默认值
            # print(f"Table time: {table_hour:02d}:{table_minute:02d}:{table_second:02d}")
            # 计算时间差
            table_time = datetime(2023, table_month,table_day, table_hour, table_minute, table_second)
            input_time = datetime(2023, month, day, hour, minute)
            time_diff = abs(table_time - input_time)
            
            # 更新最接近的表
            if time_diff < closest_time_diff:
                closest_time_diff = time_diff
                closest_table = table_name
            
            # print(f"Table {table_name}: {table_month:02d}/{table_hour:02d}:{table_minute:02d}, time diff: {time_diff}")
        except (ValueError, IndexError) as e:
            print(f"Error parsing table name {table_name}: {e}")
        except Exception as e:
            print(f"Unexpected error parsing table name {table_name}: {e}")

        # 如果最接近的表的时间差超过1小时（忽略日期差别），则使用默认表
    if closest_time_diff.total_seconds() % 86400 > 3600:  # 86400秒 = 24小时, 3600秒 = 1小时
        closest_table = "whrd7"

    print(f"Closest table for {month:02d}/{day:02d} {hour:02d}:{minute:02d} is {closest_table}")
    return closest_table

def execute_route_plan(start, end, table_name):
    print(f"Executing route plan for table: {table_name}, start: {start}, end: {end}")
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
        SELECT seq, path_seq, node, edge, cost, agg_cost, ST_AsBinary(geom) AS geom, length
        FROM pgr_astar(
            'SELECT gid AS id, source, target, 
            forward_time AS cost, 
            reverse_time AS reverse_cost, 
            COALESCE(ST_X(ST_StartPoint(geom)), 0) AS x1, COALESCE(ST_Y(ST_StartPoint(geom)), 0) AS y1, 
            COALESCE(ST_X(ST_EndPoint(geom)), 0) AS x2, COALESCE(ST_Y(ST_EndPoint(geom)), 0) AS y2 
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
            geom_data = row[-2]
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
                            "cost": row[4],
                            "agg_cost": row[5],
                            "length": row[7]
                        }
                    }
                    features.append(feature)
                except Exception as e:
                    print(f"Error loading WKB data: {e}")
        
        geojson = {
            "type": "FeatureCollection",
            "features": features
        }

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
    data = request.json
    start = data['start']['location']
    end = data['end']['location']
    date = data.get('date')
    time = data.get('time')
    
    print(f"Received route plan request: start={start}, end={end}, date={date}, time={time}")
    
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
            print(f"Error parsing date/time: {e}")
            closest_table_name = None
    else:
        closest_table_name = None

    if closest_table_name and closest_table_name != "whrd7":
        time_based_route_plan_id, time_based_temp_file_path = execute_route_plan(start, end, closest_table_name)
    else:
        time_based_route_plan_id = None
        time_based_temp_file_path = None

    print(f"Route plan response: default_id={default_route_plan_id}, time_based_id={time_based_route_plan_id}")
    return jsonify({
        "default_id": default_route_plan_id,
        "default_temp_file_path": default_temp_file_path,
        "time_based_id": time_based_route_plan_id,
        "time_based_temp_file_path": time_based_temp_file_path
    })


@app.route('/api/get_geojson/<route_id>')
def get_geojson(route_id):
    file_path = os.path.join(temp_dir, f'route_plan_{route_id}.geojson')
    if os.path.exists(file_path):
        return send_file(file_path, mimetype='application/json')
    else:
        return jsonify({"error": "File not found"}), 404

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    print("注册请求数据:", data)

     # 检查用户名是否已经存在
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    print(f"生成的哈希密码: {hashed_password}")

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
    data = request.get_json()
    print("接收到的登录请求数据:", data)

    username = data.get('username')
    password = data.get('password')
    
    print(f"登录请求数据: username={username}, password={password}")

    user = User.query.filter_by(username=username).first()
    if user:
        print(f"找到用户: {user.username}, 加密后的密码: {user.password}")
    else:
        print("未找到用户")

    try:
        if user and bcrypt.check_password_hash(user.password, password):
            print("密码匹配成功")
            return jsonify({'message': '登录成功'}), 200
        else:
            print("用户名或密码错误")
            return jsonify({'message': '用户名或密码错误'}), 401
    except ValueError as e:
        print(f"检查密码哈希时出错: {e}")
        return jsonify({'message': '内部服务器错误'}), 500

@app.route('/api/user_info', methods=['GET'])
def get_user_info():
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



@app.route('/api/solar_angles', methods=['GET'])
def get_solar_angles():
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
    print(f"太阳方位角: {azimuth}, 转换后的太阳方位角: {converted_azimuth}, 太阳高度角: {altitude}")
    
    # 返回计算结果
    return jsonify({
        'area_name': area_name,
        'longitude': longitude,
        'latitude': latitude,
        'utc_time': dt_utc.isoformat(),
        'solar_azimuth': converted_azimuth,
        'solar_altitude': altitude
    })

@app.route('/api/solar_angles_day', methods=['GET'])
def get_solar_angles_day():
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
    times = [datetime.combine(date, datetime.min.time()) + timedelta(hours=5) + timedelta(minutes=10 * i) for i in range(90)]
    
    solar_angles = []
    for dt in times:
        dt_utc = dt.astimezone(timezone.utc)
        azimuth = get_azimuth(latitude, longitude, dt_utc)
        altitude = get_altitude(latitude, longitude, dt_utc)
        if altitude > 0:
            converted_azimuth = (450 - azimuth) % 360
            solar_angles.append({
                'time': dt.isoformat(),
                'solar_azimuth': converted_azimuth,
                'solar_altitude': altitude
            })
            print(f"时间: {dt}, 太阳方位角: {azimuth}, 太阳高度角: {altitude}")
    return jsonify(solar_angles)

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    district_code = request.args.get('district')
    print(f"查询县区代码: {district_code}")

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

    district_name = district_names.get(district_code)

    try:
        # 连接数据库
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        if district_name:
            # Query for statistics data for the specific district
            query = """
            SELECT name, count, t01, t02, t03, t04, t05, t06, t07, t08, t09, t10, t11, t12
            FROM statistics
            WHERE name = %s
            """
            cur.execute(query, (district_name,))
        else:
            # Query all district statistics
            query = """
            SELECT name, count, t01, t02, t03, t04, t05, t06, t07, t08, t09, t10, t11, t12
            FROM statistics
            """
            cur.execute(query)

        statistics = cur.fetchall()

        # Convert the result to JSON
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
                print(f"Found statistics for {stat[0]}")
                print(stat)
            return jsonify(result)
        else:
            return jsonify({'message': 'No statistics found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'An error occurred'}), 500
    finally:
        # 关闭数据库连接
        cur.close()
        conn.close()


@app.before_request
def initialize():
    global temp_folder_cleared
    if not temp_folder_cleared:
        clear_temp_folder()
        temp_folder_cleared = True

@app.route('/api/getapp', methods=['GET'])
def getapp():
    url_list = [
        {"date": "2024-09-01", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=a29dc123ec1e46e5a391e62cb43ac095"},
        {"date": "2024-09-05", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=64e61674326e4a87954f9b790bcbeb1b"},
        {"date": "2024-09-10", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=700280f37e0449fc9701e22103d88de4"},
        {"date": "2024-09-15", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=957ed46de859472595081c1dfbeb72a0"},
        {"date": "2024-09-20", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=c14dc9f9965f4e9e858e7afdd46cb75e"},
        {"date": "2024-09-25", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=97fb5c3168814345ba994d2080315dca"},
        {"date": "2024-09-30", "url": "https://www.geosceneonline.cn/geoscene/apps/instant/interactivelegend/index.html?appid=21896e400b9e470b8d8e6325ae1b84d3"}
    ]
    current_date = datetime.now().date()
    
    closest_date = None
    closest_url = None
    for entry in url_list:
        entry_date = datetime.strptime(entry["date"], "%Y-%m-%d").date()
        if closest_date is None or abs((entry_date - current_date).days) < abs((closest_date - current_date).days):
            closest_date = entry_date
            closest_url = entry["url"]
    print(f"Closest URL: {closest_url}")
    if closest_url:
        return jsonify({'url': closest_url})
    else:
        return jsonify({'message': 'No URL found'}), 404
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    # 获取当前文件的目录
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    print(BASE_DIR)
    temp_dir = os.path.join(BASE_DIR, 'tmp')
    print(temp_dir)
    # 检查 tmp 目录是否存在，如果不存在则创建
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    app.run(debug=True)
# test codes are as follows, in order to test the database connection and data situation
