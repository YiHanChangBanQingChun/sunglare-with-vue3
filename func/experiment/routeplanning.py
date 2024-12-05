import psycopg2
import json
import os
import uuid
import random
import csv
import geopandas as gpd
from datetime import datetime, timedelta
from shapely import wkb
from shapely.geometry import mapping, Point
import copy
from tqdm import tqdm
from geopy.distance import geodesic

# 数据库连接参数
conn_params = {
    "dbname": "postgis_34_sample",
    "user": "postgres",
    "password": "postgres1",
    "host": "localhost"
}

def runmore():
    name_list = ['5_t18_10_00', '5_t18_20_00', '5_t18_30_00', '5_t18_40_00', '5_t18_50_00', '5_t19_00_00']
    
    time_list = ['18:00:00', '18:20:00', '18:30:00', '18:40:00','18:50:00', '19:00:00']
    
    count = len(name_list)

    date = '2024-05-15'

    runningtime = 1000
    for _ in count:
        name = name_list[_]
        time = time_list[_]
        main(name, time, date, runningtime)

def main(name, time, date, runningtime = 1000):
    # 时间参数
    date = date
    time = time
    name = name

    # 根据指定日期创建文件夹
    route_with_time = os.path.join(r'E:\webgislocation\analysis\routelist', name)
    shapefile_path = r'E:\webgislocation\analysis\data\randomregion.shp'
    csv_output_path = os.path.join(route_with_time, 'route_plans.csv')

    route_no_time = os.path.join(r'E:\webgislocation\analysis\other_routelist', name)
    route_no_time_path = os.path.join(route_no_time, 'route_plans.csv')

    # 创建文件夹
    os.makedirs(route_with_time, exist_ok=True)
    os.makedirs(route_no_time, exist_ok=True)
    # 读取面要素文件
    gdf = gpd.read_file(shapefile_path)
    bounds = gdf.total_bounds  # 获取范围 [minx, miny, maxx, maxy]

    # 随机生成 1000 对起点和终点
    random_points = []
    for _ in range(runningtime):
        start = generate_random_point(bounds, gdf)
        end = generate_random_point(bounds, gdf, (start[1], start[0]))
        random_points.append((start, end))
    # 将1000对起点终点保存到csv文件
    with open(os.path.join(route_with_time, 'random_points.csv'), mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['start_lng', 'start_lat', 'end_lng', 'end_lat'])
        for start, end in random_points:
            writer.writerow([start[0], start[1], end[0], end[1]])

    try:
        date_obj = datetime.strptime(date, '%Y-%m-%d')
        time_obj = datetime.strptime(time, '%H:%M:%S')
        month = date_obj.month
        day = date_obj.day
        hour = time_obj.hour
        minute = time_obj.minute
        closest_table_name = get_closest_table_name(month, day, hour, minute)
    except Exception as e:
        print(f"Error parsing date/time: {e}")
        closest_table_name = "whrd7"

    # 打开 CSV 文件以追加模式写入
    with open(csv_output_path, mode='w', newline='') as file, open(route_no_time_path, mode='w', newline='') as other_file:
        writer = csv.writer(file)
        other_writer = csv.writer(other_file)
        writer.writerow(['id', 'way', 'uuid', 'start_lng', 'start_lat', 'end_lng', 'end_lat', 'total_distance_km', 'total_time_minutes', 'sunglaretimes'])
        other_writer.writerow(['id','way', 'uuid', 'start_lng', 'start_lat', 'end_lng', 'end_lat', 'total_distance_km', 'total_time_minutes', 'sunglaretimes'])

        # 初始化进度条
        count = 1
        sum = 4 * len(random_points)
        with tqdm(total=sum) as pbar:
            for start, end in random_points:
                # 正向路径规划
                route_plan_id, temp_file_path, total_distance, total_time, sunglaretimes = execute_route_plan(start, end, closest_table_name, time_obj, route_with_time)
                if route_plan_id:
                    way = 1
                    writer.writerow([count, way, route_plan_id, start[0], start[1], end[0], end[1], total_distance, total_time, sunglaretimes])
                else:
                    print("Failed to execute route plan")
                pbar.update(1)

                # 反向路径规划
                route_plan_id, temp_file_path, total_distance, total_time, sunglaretimes = execute_route_plan(end, start, closest_table_name, time_obj, route_with_time)
                if route_plan_id:
                    way = 0
                    writer.writerow([count, way, route_plan_id, end[0], end[1], start[0], start[1], total_distance, total_time, sunglaretimes])
                else:
                    print("Failed to execute route plan")
                pbar.update(1)

                # 使用 whrd7 表进行正向路径规划
                route_plan_id, temp_file_path, total_distance, total_time, sunglaretimes = execute_route_plan(start, end, "whrd7", time_obj, route_with_time)
                if route_plan_id:
                    way = 1
                    other_temp_file_path = os.path.join(route_no_time, f"route_plan_{route_plan_id}.geojson")
                    os.makedirs(route_no_time, exist_ok=True)
                    other_writer.writerow([count, way, route_plan_id, start[0], start[1], end[0], end[1], total_distance, total_time, sunglaretimes])
                    with open(other_temp_file_path, "w") as tmp:
                        with open(temp_file_path, "r") as src:
                            tmp.write(src.read())
                    os.remove(temp_file_path)  # 删除原始文件
                else:
                    print("Failed to execute route plan with whrd7")
                pbar.update(1)

                # 使用 whrd7 表进行反向路径规划
                route_plan_id, temp_file_path, total_distance, total_time, sunglaretimes = execute_route_plan(end, start, "whrd7", time_obj, route_with_time)
                if route_plan_id:
                    way = 0
                    other_temp_file_path = os.path.join(route_no_time, f"route_plan_{route_plan_id}.geojson")
                    os.makedirs(route_no_time, exist_ok=True)
                    other_writer.writerow([count, way, route_plan_id, end[0], end[1], start[0], start[1], total_distance, total_time, sunglaretimes])
                    with open(other_temp_file_path, "w") as tmp:
                        with open(temp_file_path, "r") as src:
                            tmp.write(src.read())
                    os.remove(temp_file_path)  # 删除原始文件
                else:
                    print("Failed to execute route plan with whrd7")
                pbar.update(1)
                count += 1

def generate_random_point(bounds, gdf, other_point=None):
    minx, miny, maxx, maxy = bounds
    while True:
        p = Point(random.uniform(minx, maxx), random.uniform(miny, maxy))
        if gdf.contains(p).any():
            if other_point:
                distance = geodesic((p.y, p.x), other_point).km
                if distance >= 1.5:
                    return p.x, p.y
            else:
                return p.x, p.y

def get_closest_table_name(month, day, hour, minute):
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
        print(f"Error fetching tables: {e}")
        return None

    closest_table = "whrd7"
    closest_time_diff = timedelta.max

    available_days = [15] if month in [1, 2, 3, 4, 5, 6, 7, 8, 10, 12] else [i for i in range(1, 32)]

    for table in tables:
        table_name = table[0]
        try:
            parts = table_name.split('_')
            if len(parts) < 5:
                continue

            table_month = int(parts[1])
            if not parts[2].startswith('t'):
                continue

            table_hour = int(parts[2][1:])
            table_minute = int(parts[3])
            table_second = int(parts[4])

            if len(parts) == 6:
                table_day = int(parts[5])
            else:
                table_day = 15

            if table_month == month:
                table_time = datetime(2024, table_month, table_day, table_hour, table_minute, table_second)
                input_time = datetime(2024, month, day, hour, minute)
                time_diff = abs((table_time - input_time).total_seconds())

                if time_diff < closest_time_diff.total_seconds():
                    closest_time_diff = timedelta(seconds=time_diff)
                    closest_table = table_name

        except (ValueError, IndexError) as e:
            print(f"Error parsing table name {table_name}: {e}")
        except Exception as e:
            print(f"Unexpected error parsing table name {table_name}: {e}")

    if closest_time_diff.total_seconds() > 3600:
        closest_table = "whrd7"

    print(f"Closest table: {closest_table}")

    return closest_table

def fix_segments(geojson):
    geojson_copy = copy.deepcopy(geojson)
    features = geojson_copy['features']
    
    for i in range(len(features) - 1):
        current_feature = features[i]
        next_feature = features[i + 1]
        
        current_coords = current_feature['geometry']['coordinates']
        next_coords = next_feature['geometry']['coordinates']
        
        current_coords = [list(coord) for coord in current_coords]
        next_coords = [list(coord) for coord in next_coords]

        current_end = current_coords[-1][-1] if isinstance(current_coords[-1], list) else current_coords[-1]
        next_start = next_coords[0][0] if isinstance(next_coords[0], list) else next_coords[0]
        
        if current_end != next_start:
            if isinstance(next_coords[0], list):
                next_coords[0][0] = current_end
            else:
                next_coords[0] = current_end
    
    return geojson_copy

def execute_route_plan(start, end, table_name, is_whrd7, route_with_time):
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

        total_distance = 0
        total_time = 0
        sunglaretimes = 0

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
                            "cost": round(row[4], 2),
                            "agg_cost": round(row[5], 2),
                            "length": round(row[7], 2),
                            "name": row[8],
                            "maxspeed": row[9]
                        }
                    }
                    features.append(feature)
                    total_distance += row[7]
                    if row[4] != 99999:
                        total_time += row[4]
                    else:
                        sunglaretimes += 1
                except Exception as e:
                    print(f"Error processing row: {e}")
        
        if table_name == "whrd7":
            month = is_whrd7.month
            day = is_whrd7.day
            hour = is_whrd7.hour
            minute = is_whrd7.minute
            statis_table = get_closest_table_name(month, day, hour, minute)
            for feature in features:
                edge = feature["properties"]["edge"]
                cur.execute(f"SELECT forward_time FROM {statis_table} WHERE gid = %s", (edge,))
                forward_time = cur.fetchone()[0]
                if forward_time == 99999:
                    sunglaretimes += 1
                    print(sunglaretimes)

        geojson = {
            "type": "FeatureCollection",
            "features": features
        }

        geojson = fix_segments(geojson)

        route_plan_id = str(uuid.uuid4())
        temp_file_name = f"route_plan_{route_plan_id}.geojson"
        temp_file_path = os.path.join(route_with_time, temp_file_name)

        with open(temp_file_path, "w") as tmp:
            json.dump(geojson, tmp)

        cur.close()
        conn.close()

        total_distance = round(total_distance / 1000, 2)  # 转换为公里
        total_time = round(total_time / 60, 2)  # 转换为分钟

        print(f"Route plan executed successfully, route_plan_id: {route_plan_id})")
        return route_plan_id, temp_file_path, total_distance, total_time, sunglaretimes
    except Exception as e:
        print(f"Error executing route plan: {e}")
        return None, None, None, None, None


if __name__ == '__main__':
    runmore()