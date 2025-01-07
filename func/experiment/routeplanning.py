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
from concurrent.futures import ThreadPoolExecutor, as_completed
import shutil


# 数据库连接参数
conn_params = {
    "dbname": "postgis_34_sample",
    "user": "postgres",
    "password": "postgres1",
    "host": "localhost"
}

def runmore():
    name_list = ['5_t5_30_00', '5_t5_40_00', 
                '5_t5_50_00', '5_t6_00_00', '5_t6_10_00',
                '5_t6_20_00', '5_t6_30_00', '5_t6_40_00', 
                '5_t6_50_00', '5_t7_00_00', '5_t7_10_00', 
                '5_t7_20_00', '5_t7_30_00', '5_t17_10_00',
                '5_t17_20_00', '5_t17_30_00', '5_t17_40_00',
                '5_t17_50_00', '5_t18_00_00', '5_t18_10_00',
                '5_t18_20_00', '5_t18_30_00', '5_t18_40_00',
                '5_t18_50_00', '5_t19_00_00']
    
    # 根据 name_list 生成 time_list
    time_list = []
    for name in name_list:
        parts = name.split('_')
        if len(parts) >= 3:
            hour = parts[1][1:]  # 去掉 't' 前缀
            minute = parts[2]
            second = parts[3]
            time_str = f"{hour}:{minute}:{second}"
            time_list.append(time_str)
    
    count = len(name_list)

    date = '2024-05-15'
    runningtime = 1000

    # 公共 CSV 文件路径
    common_csv_path = r'E:\webgislocation\analysis\v20241227\common_random_points.csv'

    # 检查公共 CSV 文件是否存在，如果不存在则生成并保存
    if not os.path.exists(common_csv_path):
        print("Generating random points...")
        generate_and_save_random_points(common_csv_path, runningtime)

    # 使用 ThreadPoolExecutor 并行处理多个时间
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = []
        for i in range(count):
            print(f"Processing {name_list[i]}")
            name = name_list[i]
            time = time_list[i]
            futures.append(executor.submit(singlerun, name, time, date, common_csv_path))

        for future in as_completed(futures):
            try:
                future.result()
            except Exception as e:
                print(f"Error in thread: {e}")

def generate_and_save_random_points(csv_path, runningtime):
    shapefile_path = r"E:\webgislocation\三环\武汉市_三环线\武汉市三环面_wgs.shp"
    gdf = gpd.read_file(shapefile_path)
    bounds = gdf.total_bounds  # 获取范围 [minx, miny, maxx, maxy]

    random_points = []
    with tqdm(total=runningtime, desc="Generating random points") as pbar:
        for _ in range(runningtime):
            while True:
                start = generate_random_point(bounds, gdf)
                end = generate_random_point(bounds, gdf, (start[1], start[0]))
                distance = geodesic((start[1], start[0]), (end[1], end[0])).km
                if distance >= 1.5:
                    random_points.append((start, end))
                    break
            pbar.update(1)

    # 将1000对起点终点保存到公共csv文件
    with open(csv_path, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['start_lng', 'start_lat', 'end_lng', 'end_lat'])
        for start, end in random_points:
            writer.writerow([start[0], start[1], end[0], end[1]])

def write_to_csv(file_path, row, header):
    file_exists = os.path.isfile(file_path)
    with open(file_path, mode='a', newline='') as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(header)
        writer.writerow(row)

def singlerun(name, time, date, common_csv_path):
    # 时间参数
    date = date
    time = time
    name = name

    # 根据指定日期创建文件夹
    low_glare_lfile = os.path.join(r'E:\webgislocation\analysis\v20241227\change0104\closest', name)
    low_glare_lcsv = os.path.join(low_glare_lfile, 'route_plans.csv')

    closest_lfile = os.path.join(r'E:\webgislocation\analysis\v20241227\change0104\low_glare', name)
    closest_lcsv = os.path.join(closest_lfile, 'route_plans.csv')

    # 创建文件夹
    os.makedirs(low_glare_lfile, exist_ok=True)
    os.makedirs(closest_lfile, exist_ok=True)

    # 读取公共csv文件中的起点终点
    random_points = []
    with open(common_csv_path, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            start = (float(row['start_lng']), float(row['start_lat']))
            end = (float(row['end_lng']), float(row['end_lat']))
            random_points.append((start, end))

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

    # 初始化进度条
    count = 1
    sum = 4 * len(random_points)
    header = ['id', 'way', 'uuid', 'start_lng', 'start_lat', 'end_lng', 'end_lat', 'total_distance_km', 'total_time_minutes', 'sunglaretimes']
    with tqdm(total=sum) as pbar:
        # 定义临时文件夹路径
        temp_folder = r'E:\webgislocation\analysis\v20241227\change0104\temp'
        os.makedirs(temp_folder, exist_ok=True)

        for start, end in random_points:
            # 正向路径规划
            route_plan_id, temp_file_path, total_distance, total_time, sunglaretimes = execute_route_plan(start, end, closest_table_name, False, temp_folder)
            if route_plan_id:
                way = 1
                row = [count, way, route_plan_id, start[0], start[1], end[0], end[1], total_distance, total_time, sunglaretimes]
                write_to_csv(low_glare_lcsv, row, header)
                final_path = os.path.join(low_glare_lfile, f"route_plan_{route_plan_id}.geojson")
                shutil.move(temp_file_path, final_path)
            else:
                print("Failed to execute route plan")
            pbar.update(1)

            # 反向路径规划
            route_plan_id, temp_file_path, total_distance, total_time, sunglaretimes = execute_route_plan(end, start, closest_table_name, False, temp_folder)
            if route_plan_id:
                way = 0
                row = [count, way, route_plan_id, end[0], end[1], start[0], start[1], total_distance, total_time, sunglaretimes]
                write_to_csv(low_glare_lcsv, row, header)
                final_path = os.path.join(low_glare_lfile, f"route_plan_{route_plan_id}.geojson")
                shutil.move(temp_file_path, final_path)
            else:
                print("Failed to execute route plan")
            pbar.update(1)

            # 使用 whrd7 表进行正向路径规划
            route_plan_id, temp_file_path, total_distance, total_time, sunglaretimes = execute_route_plan(start, end, closest_table_name, True, temp_folder)
            if route_plan_id:
                way = 1
                row = [count, way, route_plan_id, start[0], start[1], end[0], end[1], total_distance, total_time, sunglaretimes]
                write_to_csv(closest_lcsv, row, header)
                final_path = os.path.join(closest_lfile, f"route_plan_{route_plan_id}.geojson")
                shutil.move(temp_file_path, final_path)
            else:
                print("Failed to execute route plan with whrd7")
            pbar.update(1)

            # 使用 whrd7 表进行反向路径规划
            route_plan_id, temp_file_path, total_distance, total_time, sunglaretimes = execute_route_plan(end, start, closest_table_name, True, temp_folder)
            if route_plan_id:
                way = 0
                row = [count, way, route_plan_id, end[0], end[1], start[0], start[1], total_distance, total_time, sunglaretimes]
                write_to_csv(closest_lcsv, row, header)
                final_path = os.path.join(closest_lfile, f"route_plan_{route_plan_id}.geojson")
                shutil.move(temp_file_path, final_path)
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
    # print("month: ", month, "day: ", day, "hour: ", hour, "minute: ", minute)
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
    # print(f"Closest table: {closest_table}, time diff: {closest_time_diff}")

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

def execute_route_plan(start, end, table_name, is_whrd7, low_glare_lfile):
    if is_whrd7:
        date_table = table_name
        table_name = "whrd7"
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
        
        # if is_whrd7:
        #     print("date_table IS", date_table)
        #     for feature in features:
        #         edge = feature["properties"]["edge"]
        #         cur.execute(f"SELECT forward_time FROM {date_table} WHERE gid = %s", (edge,))
        #         forward_time = cur.fetchone()[0]
        #         if forward_time == 99999:
        #             sunglaretimes += 1
        #             print(sunglaretimes)

        geojson = {
            "type": "FeatureCollection",
            "features": features
        }

        geojson = fix_segments(geojson)

        route_plan_id = str(uuid.uuid4())
        temp_file_name = f"route_plan_{route_plan_id}.geojson"
        temp_file_path = os.path.join(low_glare_lfile, temp_file_name)

        with open(temp_file_path, "w") as tmp:
            json.dump(geojson, tmp)

        cur.close()
        conn.close()

        total_distance = round(total_distance / 1000, 2)  # 转换为公里
        total_time = round(total_time / 60, 2)  # 转换为分钟

        # if not is_whrd7:
        #     print(f"Route plan executed successfully, table name: {table_name}, closest: {is_whrd7}, route plan ID: {route_plan_id}")
        # else:
        #     print(f"Route plan executed successfully, table name: {date_table}, closest: {is_whrd7}, route plan ID: {route_plan_id}")
        print(f"Route plan executed successfully, table name: {table_name}, is_whrd7: {is_whrd7}, route plan ID: {route_plan_id}")
        return route_plan_id, temp_file_path, total_distance, total_time, sunglaretimes
    except Exception as e:
        print(f"Error executing route plan: {e}")
        return None, None, None, None, None


if __name__ == '__main__':
    runmore()