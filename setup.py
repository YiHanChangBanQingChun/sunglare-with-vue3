# 此脚本用于自动化传入所需要的数据库配置
# 1、首先，使用python -m venv flask-py11，创建虚拟环境，之后.\venv\Scripts\activate，激活虚拟环境。
# 2、cd到您项目的文件夹，运行pip install -r requirements.txt，安装依赖。
# 3 、如果有问题，网络环境不好，可以尝试pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
# 4、之后您就可以运行此脚本，输入您的数据库配置，进行自动化配置
import os
import pandas as pd
import psycopg2
import numpy as np
from tqdm import tqdm

# 设置根目录
root_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(root_dir)

# 提示用户输入数据库配置，按回车使用默认值
db_host = input("请输入数据库主机地址 (默认: localhost): ") or "localhost"
db_port = input("请输入数据库端口 (默认: 5432): ") or "5432"
db_user = input("请输入数据库用户名 (默认: postgres): ") or "postgres"
db_password = input("请输入数据库密码 (默认: postgres1): ") or "postgres1"
db_name = input("请输入数据库名称 (默认: postgis_34_sample): ") or "postgis_34_sample"

# 自动化配置数据库连接字符串
config_file = os.path.join(root_dir, 'db_config.py')
with open(config_file, 'w') as f:
    f.write(f"""
DB_HOST = '{db_host}'
DB_PORT = '{db_port}'
DB_USER = '{db_user}'
DB_PASSWORD = '{db_password}'
DB_NAME = '{db_name}'
""")

print("数据库配置已完成！")

try:
    connection = psycopg2.connect(
        host=db_host,
        port=db_port,
        user=db_user,
        password=db_password,
        database=db_name
    )
    cursor = connection.cursor()
    cursor.execute("SELECT version();")
    db_version = cursor.fetchone()
    print(f"成功连接到数据库: {db_version}")

    def table_exists(table_name):
        cursor.execute(f"SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '{table_name}');")
        return cursor.fetchone()[0]

    # print("第一步：开始插入poi数据到数据库...")
    # if not table_exists('locations'):
    #     # 读取 CSV 文件
    #     csv_file_path = os.path.join(root_dir, 'sql', 'locations.csv')
    #     df = pd.read_csv(csv_file_path, delimiter=',', names=[
    #         'id', 'name', 'address', 'baidu_longitude', 'baidu_latitude', 'wgs84_longitude', 'wgs84_latitude', 'baidu_index', 'label', 'geom'
    #     ])

    #     # 创建表
    #     create_table_query = """
    #     CREATE TABLE IF NOT EXISTS locations (
    #         id SERIAL PRIMARY KEY,
    #         name VARCHAR(255),
    #         address VARCHAR(255),
    #         baidu_longitude DOUBLE PRECISION,
    #         baidu_latitude DOUBLE PRECISION,
    #         wgs84_longitude DOUBLE PRECISION,
    #         wgs84_latitude DOUBLE PRECISION,
    #         baidu_index VARCHAR(255),
    #         label VARCHAR(255),
    #         geom GEOMETRY(Point, 4326)
    #     );
    #     """
    #     cursor.execute(create_table_query)
    #     connection.commit()

    #     # 插入数据并显示进度条
    #     for index, row in tqdm(df.iterrows(), total=df.shape[0], desc="插入数据进度"):
    #         insert_query = """
    #         INSERT INTO locations (name, address, baidu_longitude, baidu_latitude, wgs84_longitude, wgs84_latitude, baidu_index, label, geom)
    #         VALUES (%s, %s, %s, %s, %s, %s, %s, %s, ST_SetSRID(%s::geometry, 4326));
    #         """
    #         cursor.execute(insert_query, (
    #             row['name'], row['address'], row['baidu_longitude'], row['baidu_latitude'],
    #             row['wgs84_longitude'], row['wgs84_latitude'], row['baidu_index'], row['label'], row['geom']
    #         ))
    #     connection.commit()
    #     print("poi数据已成功插入到数据库！")
    # else:
    #     print("locations 表已存在，跳过创建和插入数据步骤。")

    # print("第二步：开始插入 statistics 数据到数据库...")
    # if not table_exists('statistics'):
    #     try:
    #         # 读取 statistics.csv 文件
    #         csv_file_path = os.path.join(root_dir, 'sql', 'statistics.csv')
    #         df_stats = pd.read_csv(csv_file_path, delimiter=',', header=None, names=[
    #             'name', 'count', 't01', 't02', 't03', 't04', 't05', 't06', 't07', 't08', 't09', 't10', 't11', 't12', 'id'
    #         ])
            
    #         # 检查列名是否正确
    #         print("CSV 文件的列名:", df_stats.columns.tolist())
            
    #         # 处理 NaN 和 inf 值
    #         df_stats.replace([np.inf, -np.inf], np.nan, inplace=True)
    #         df_stats.fillna(0, inplace=True)
            
    #         # 确保数据类型正确
    #         df_stats['count'] = df_stats['count'].astype(int)
    #         for col in ['t01', 't02', 't03', 't04', 't05', 't06', 't07', 't08', 't09', 't10', 't11', 't12']:
    #             df_stats[col] = df_stats[col].astype(int)
            
    #         # 创建 statistics 表
    #         create_table_query = """
    #         CREATE TABLE IF NOT EXISTS statistics (
    #             name VARCHAR(255),
    #             count INTEGER,
    #             t01 INTEGER,
    #             t02 INTEGER,
    #             t03 INTEGER,
    #             t04 INTEGER,
    #             t05 INTEGER,
    #             t06 INTEGER,
    #             t07 INTEGER,
    #             t08 INTEGER,
    #             t09 INTEGER,
    #             t10 INTEGER,
    #             t11 INTEGER,
    #             t12 INTEGER,
    #             id SERIAL PRIMARY KEY
    #         );
    #         """
    #         cursor.execute(create_table_query)
    #         connection.commit()

    #         # 插入数据并显示进度条
    #         for index, row in tqdm(df_stats.iterrows(), total=df_stats.shape[0], desc="插入数据进度"):
    #             insert_query = """
    #             INSERT INTO statistics (name, count, t01, t02, t03, t04, t05, t06, t07, t08, t09, t10, t11, t12)
    #             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
    #             """
    #             cursor.execute(insert_query, (
    #                 row['name'], row['count'], row['t01'], row['t02'], row['t03'], row['t04'],
    #                 row['t05'], row['t06'], row['t07'], row['t08'], row['t09'], row['t10'], row['t11'], row['t12']
    #             ))
    #         connection.commit()
    #         print("statistics 数据已成功插入到数据库！")
    #     except Exception as e:
    #         print(f"连接数据库失败: {e}")
    # else:
    #     print("statistics 表已存在，跳过创建和插入数据步骤。")

    # print("第三步：开始创建 users 表...")
    # if not table_exists('users'):
    #     # 创建 users 表
    #     create_table_query = """
    #     CREATE TABLE IF NOT EXISTS users (
    #         id SERIAL PRIMARY KEY,
    #         username VARCHAR(255),
    #         password VARCHAR(255),
    #         email VARCHAR(255),
    #         security_question VARCHAR(255),
    #         security_answer VARCHAR(255),
    #         birthday DATE,
    #         gender VARCHAR(50),
    #         phone VARCHAR(50),
    #         company VARCHAR(255),
    #         avatar VARCHAR(200)
    #     );
    #     """
    #     cursor.execute(create_table_query)
    #     connection.commit()
    #     print("空的 users 表已创建！")
    # else:
    #     print("users 表已存在，跳过创建步骤。")
    
    # print("第四步：开始插入 whrd7 数据到数据库...")
    # if not table_exists('whrd7'):
    #     try:
    #         # 读取 whrd7.csv 文件
    #         csv_file_path = os.path.join(root_dir, 'sql', 'whrd7.csv')
    #         df_whrd7 = pd.read_csv(csv_file_path, delimiter=',', names=[
    #             'gid', 'fclass', 'name', 'oneway', 'maxspeed', 'e_angle', 'id', 'geom', 'source', 'length', 'target', 'reverse_cost', 'maxspeed_mps', 'forward_time', 'reverse_time'
    #         ])
        
    #         # 创建 whrd7 表
    #         create_table_query = """
    #         CREATE TABLE IF NOT EXISTS whrd7 (
    #             gid SERIAL PRIMARY KEY,
    #             fclass VARCHAR(255),
    #             name VARCHAR(255),
    #             oneway VARCHAR(10),
    #             maxspeed INT,
    #             e_angle DOUBLE PRECISION,
    #             id INT,
    #             geom GEOMETRY(Geometry, 4326),
    #             source INT,
    #             length DOUBLE PRECISION,
    #             target INT,
    #             reverse_cost DOUBLE PRECISION,
    #             maxspeed_mps DOUBLE PRECISION,
    #             forward_time DOUBLE PRECISION,
    #             reverse_time DOUBLE PRECISION
    #         );
    #         """
    #         cursor.execute(create_table_query)
    #         connection.commit()
        
    #         # 插入 whrd7 数据并显示进度条
    #         for index, row in tqdm(df_whrd7.iterrows(), total=df_whrd7.shape[0], desc="插入 whrd7 数据进度"):
    #             try:
    #                 insert_query = """
    #                 INSERT INTO whrd7 (fclass, name, oneway, maxspeed, e_angle, id, geom, source, length, target, reverse_cost, maxspeed_mps, forward_time, reverse_time)
    #                 VALUES (%s, %s, %s, %s, %s, %s, ST_SetSRID(%s::geometry, 4326), %s, %s, %s, %s, %s, %s, %s);
    #                 """
    #                 cursor.execute(insert_query, (
    #                     row['fclass'], row['name'], row['oneway'], row['maxspeed'], row['e_angle'],
    #                     row['id'], row['geom'], row['source'], row['length'], row['target'], row['reverse_cost'],
    #                     row['maxspeed_mps'], row['forward_time'], row['reverse_time']
    #                 ))
    #             except Exception as e:
    #                 print(f"插入数据失败: {e}, 行: {index}")
    #                 connection.rollback()
    #         connection.commit()
    #         print("whrd7 数据已成功插入到数据库！")
    #     except Exception as e:
    #         print(f"连接数据库失败: {e}")
    # else:
    #     print("whrd7 表已存在，跳过创建和插入数据步骤。")
    
    # print("第五步：开始插入 whrd7_vertices_pgr 数据到数据库...")
    # if not table_exists('whrd7_vertices_pgr'):
    #     try:
    #         # 读取 whrd7_vertices_pgr.csv 文件
    #         csv_file_path = os.path.join(root_dir, 'sql', 'whrd7_vertices_pgr.csv')
    #         df_vertices = pd.read_csv(csv_file_path, delimiter=',', names=[
    #             'id', 'cnt', 'chk', 'ein', 'eout', 'the_geom'
    #         ])
            
    #         # 检查 id 列的值是否在 INTEGER 范围内
    #         df_vertices['id'] = df_vertices['id'].apply(lambda x: x if -2147483648 <= x <= 2147483647 else None)
            
    #         # 处理 NaN 和 inf 值
    #         df_vertices.replace([np.inf, -np.inf], np.nan, inplace=True)
    #         df_vertices.fillna('', inplace=True)
            
    #         # 确保数据类型正确
    #         df_vertices['cnt'] = df_vertices['cnt'].apply(lambda x: int(x) if x != '' else None)
            
    #         # 创建 whrd7_vertices_pgr 表
    #         create_table_query = """
    #         CREATE TABLE IF NOT EXISTS whrd7_vertices_pgr (
    #             id INTEGER PRIMARY KEY,
    #             cnt INT,
    #             chk VARCHAR(255),
    #             ein VARCHAR(255),
    #             eout VARCHAR(255),
    #             the_geom GEOMETRY(Point, 4326)
    #         );
    #         """
    #         cursor.execute(create_table_query)
    #         connection.commit()
            
    #         # 插入 whrd7_vertices_pgr 数据并显示进度条
    #         for index, row in tqdm(df_vertices.iterrows(), total=df_vertices.shape[0], desc="插入 whrd7_vertices_pgr 数据进度"):
    #             try:
    #                 if row['id'] is not None:
    #                     insert_query = """
    #                     INSERT INTO whrd7_vertices_pgr (id, cnt, chk, ein, eout, the_geom)
    #                     VALUES (%s, %s, %s, %s, %s, ST_SetSRID(%s::geometry, 4326));
    #                     """
    #                     cursor.execute(insert_query, (
    #                         row['id'], row['cnt'], row['chk'], row['ein'], row['eout'], row['the_geom']
    #                     ))
    #                 else:
    #                     print(f"跳过插入数据，id 超出范围，行: {index}")
    #             except Exception as e:
    #                 print(f"插入数据失败: {e}, 行: {index}")
    #                 connection.rollback()
    #         connection.commit()
    #         print("whrd7_vertices_pgr 数据已成功插入到数据库！")
    #     except Exception as e:
    #         print(f"连接数据库失败: {e}")
    # else:
    #     print("whrd7_vertices_pgr 表已存在，跳过创建和插入数据步骤。")
    
    print("第六步：开始更新 时间DLC的数据...")
    # date_csv_folder = os.path.join(root_dir, 'sql', 'road_date_time')
    date_csv_folder = r"E:\webgislocation\time_merge\juesaimerge"
    date_csv_files = [f for f in os.listdir(date_csv_folder) if f.endswith('.csv')]
    
    # 循环处理每个 CSV 文件，并显示进度条
    for date_csv_file in tqdm(date_csv_files, desc="处理CSV文件进度"):
        date_csv_path = os.path.join(date_csv_folder, date_csv_file)
        
        # 读取 date_csv_path 文件
        date_df = pd.read_csv(date_csv_path)
        
        # 获取月份和天数
        parts = date_csv_file.split('_')
        month = parts[2]
        print(f"Processing month:{month}...")
        day = parts[3]
        print(f"Processing day:{day}...")
        
        # 获取所有时间列
        time_columns = [col for col in date_df.columns if col.startswith('t')]
        
        for time_col in time_columns:
            # 创建专属的 whrd7 表
            sanitized_time_col = time_col.replace(':', '_')
            if month == '11' or month == 11:
                whrd7_table_name = f"whrd7_{month}_{sanitized_time_col}_{day}"
            else:
                whrd7_table_name = f"whrd7_{month}_{sanitized_time_col}"
            cursor.execute(f"CREATE TABLE {whrd7_table_name} AS TABLE whrd7")
            # 获取需要更新的 near_fid 列表
            near_fids = date_df.loc[date_df[time_col] == 1, 'near_fid'].tolist()
            print(f"Updating {len(near_fids)} records in {whrd7_table_name}...")
            # 更新 时间DLC的 forward_time 和 reverse_time
            update_query = f"""
            UPDATE {whrd7_table_name}
            SET forward_time = 99999, reverse_time = 99999
            WHERE id = ANY(%s)
            """
            cursor.execute(update_query, (near_fids,))
    
    # 提交更改并关闭数据库连接
    connection.commit()
    print("时间DLC的数据已成功更新！")

except Exception as e:
    print(f"连接数据库失败: {e}")
finally:
    if 'connection' in locals() and connection:
        cursor.close()
        connection.close()
