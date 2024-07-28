from flask import Flask, request, jsonify,send_file
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

# step 1: create a Flask app
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres1@localhost/postgis_34_sample'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

# step 2: create a model
'''
you can use the psql tool to get the table structure.
such as this command:
    SELECT
        column_name,
        data_type,
        character_maximum_length,
        numeric_precision,
        column_default,
        is_nullable
    FROM
        information_schema.columns
    WHERE
        table_name = 'locations';
for my table, the result is:
    column_name   |     data_type     | character_maximum_length | numeric_pr
    ecision |            column_default             | is_nullable
    -----------------+-------------------+--------------------------+-----------
    --------+---------------------------------------+-------------
    id              | integer           |                          |
        32 | nextval('locations_id_seq'::regclass) | NO
    name            | character varying |                      255 |
            |                                       | YES
    address         | character varying |                      255 |
            |                                       | YES
    baidu_longitude | double precision  |                          |
        53 |                                       | YES
    baidu_latitude  | double precision  |                          |
        53 |                                       | YES
    wgs84_longitude | double precision  |                          |
        53 |                                       | YES
    wgs84_latitude  | double precision  |                          |
        53 |                                       | YES
    baidu_index     | character varying |                      255 |
            |                                       | YES
    label           | character varying |                      255 |
            |                                       | YES
    geom            | USER-DEFINED      |                          |
            |                                       | YES
    (10 rows)
so the model are as follows:
'''
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
    
# step 3: crate a route
# step 3.1: add information to the table
@app.route('/location', methods=['POST'])
def add_point():
    data = request.json
    new_location = Location(name=data['name'], geom=f'SRID=4326;POINT({data["lon"]} {data["lat"]})')  # 使用 Location 类和正确的 geom 字段
    db.session.add(new_location)
    db.session.commit()
    return jsonify({'message': 'Point added successfully!'}), 201

# step 3.2: get information from the table
@app.route('/location', methods=['GET'])
def get_points():
    points = Location.query.all()
    return jsonify([{'name': point.name, 'geom': str(point.geom)} for point in points])  # 修改这里

# step 3.3: renew the information to the table
@app.route('/location/<int:id>', methods=['PUT'])
def update_point(id):
    point = Location.query.get_or_404(id)
    data = request.json
    point.name = data.get('name', point.name)  # 如果提供了新的名称，则更新
    if 'lon' in data and 'lat' in data:
        point.geom = f'SRID=4326;POINT({data["lon"]} {data["lat"]})'  # 确保更新 geom 字段
    db.session.commit()
    return jsonify({'message': 'Point updated successfully!'})

# step 3.4: delete the information from the table
@app.route('/location/<int:id>', methods=['DELETE'])
def delete_point(id):
    point = Location.query.get_or_404(id)
    db.session.delete(point)
    db.session.commit()
    return jsonify({'message': 'Point deleted successfully!'})

# step 4: search the information of poi from the table
@app.route('/search', methods=['POST'])
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

'''
# the main function are as follows,if you see the console output likes:
#  * Serving Flask app 'server-app'
#  * Debug mode: on
# WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
#  * Running on http://127.0.0.1:5000
# Press CTRL+C to quit
#  * Restarting with watchdog (windowsapi)
#  * Debugger is active!
#  * Debugger PIN: 369-638-132
# then the database connection is successful.
'''

# 数据库连接参数
conn_params = {
    "dbname": "postgis_34_sample",
    "user": "postgres",
    "password": "postgres1",
    "host": "localhost"
}

@app.route('/api/route/plan', methods=['POST'])
def route_plan():
    data = request.json
    start = data['start']['location']
    end = data['end']['location']
    
    # 连接数据库
    conn = psycopg2.connect(**conn_params)
    cur = conn.cursor()
    
    # 执行路径规划查询
    query = """
    WITH start_vertex AS (
        SELECT id FROM whrd7_vertices_pgr
        ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(%s, %s), 4326) LIMIT 1
    ), end_vertex AS (
        SELECT id FROM whrd7_vertices_pgr
        ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(%s, %s), 4326) LIMIT 1
    )
    SELECT seq, path_seq, node, edge, cost, agg_cost, ST_AsBinary(geom) AS geom
    FROM pgr_astar(
        'SELECT gid AS id, source, target, length AS cost, reverse_cost, 
        COALESCE(ST_X(ST_StartPoint(geom)), 0) AS x1, COALESCE(ST_Y(ST_StartPoint(geom)), 0) AS y1, 
        COALESCE(ST_X(ST_EndPoint(geom)), 0) AS x2, COALESCE(ST_Y(ST_EndPoint(geom)), 0) AS y2 
        FROM whrd7
        WHERE geom IS NOT NULL AND (ST_GeometryType(geom) = ''ST_LineString'' OR ST_GeometryType(geom) = ''ST_MultiLineString'')',
        (SELECT id FROM start_vertex), (SELECT id FROM end_vertex), directed := true
    ) AS route
    JOIN whrd7 ON route.edge = whrd7.gid;
    """
    
    cur.execute(query, (start[0], start[1], end[0], end[1]))
    route_result = cur.fetchall()
    # print(route_result)
    # 将查询结果转换为GeoJSON
    features = []
    # 在循环中处理每一行结果
    for row in route_result:
        geom_data = row[-1]
        if isinstance(geom_data, memoryview):  # 如果geom_data是memoryview类型
            geom_data = geom_data.tobytes()
        geom = wkb.loads(geom_data, hex=True)
        geom_json = mapping(geom)  # 使用mapping函数转换
        feature = {
            "type": "Feature",
            "geometry": geom_json,
            "properties": {
                "seq": row[0],
                "path_seq": row[1],
                "node": row[2],
                "edge": row[3],
                "cost": row[4],
                "agg_cost": row[5]
            }
        }
        features.append(feature)

    
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }

    # 使用同一个UUID既作为文件名的一部分，也作为返回给前端的ID
    route_plan_id = str(uuid.uuid4())
    temp_dir = r"E:\webgislocation\sun-glare-project\func\tmp"
    temp_file_name = f"route_plan_{route_plan_id}.geojson"
    temp_file_path = os.path.join(temp_dir, temp_file_name)

    with open(temp_file_path, "w") as tmp:
        json.dump(geojson, tmp)

    # 关闭数据库连接
    cur.close()
    conn.close()
    
    return jsonify({"id": route_plan_id, "tempFilePath": temp_file_path})

@app.route('/get_geojson/<route_id>')
def get_geojson(route_id):
    # 根据route_id构造文件路径
    print(route_id)
    file_path = f'E:/webgislocation/sun-glare-project/func/tmp/route_plan_{route_id}.geojson'
    # 返回文件内容
    return send_file(file_path, mimetype='application/json')

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    security_question = db.Column(db.String(100), nullable=False)
    security_answer = db.Column(db.String(100), nullable=False)
    birthday = db.Column(db.Date, nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print("注册请求数据:", data)

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

@app.route('/login', methods=['POST'])
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
    
# 清空 temp 文件夹的函数
def clear_temp_folder():
    temp_dir = r"E:\webgislocation\sun-glare-project\func\tmp"
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)
    os.makedirs(temp_dir)

# 标志变量，确保 clear_temp_folder 只执行一次
temp_folder_cleared = False

@app.before_request
def initialize():
    global temp_folder_cleared
    if not temp_folder_cleared:
        clear_temp_folder()
        temp_folder_cleared = True


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
# test codes are as follows, in order to test the database connection and data situation
'''
def get_location_info_by_id(id):
    location = Location.query.get(id)
    if location:
        location_info = {
            'id': location.id,
            'name': location.name,
            'address': location.address,
            'baidu_longitude': location.baidu_longitude,
            'baidu_latitude': location.baidu_latitude,
            'wgs84_longitude': location.wgs84_longitude,
            'wgs84_latitude': location.wgs84_latitude,
            'baidu_index': location.baidu_index,
            'label': location.label
        }
        return location_info
    else:
        return {'message': 'Location not found'}

if __name__ == '__main__':
    with app.app_context():  # 创建应用上下文
        db.create_all()
        # 测试代码
        for test_id in range(16000):
            #location = Location(name=f'Location {i}', geom=f'SRID=4326;POINT({i} {i})')
        #test_id = 1  # 假设你有一个有效的 ID 为 1
            location_info = get_location_info_by_id(test_id)
            print(location_info)
    app.run(debug=True, use_reloader=False)
    # tips: 
    # if you see the console output likes:
    # {'id': 15999, 'name': '机场二高速/机场二通道/Ｓ１９/机场第二高速路入口', 'address': '湖北省武汉市东西湖区', 'baidu_longitude': 114.2537171, 'baidu_latitude': 30.65903207, 'wgs84_longitude': 114.24187046641983, 'wgs84_latitude': 30.655149767418738, 'baidu_index': '05a56a6b100467e16118097d', 'label': '机场入口'}
    # * Serving Flask app 'server-app'
    # * Debug mode: on
    # WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
    # * Running on http://127.0.0.1:5000
    # Press CTRL+C to quit
    # then the database connection is successful.
'''
