'''
E:\webgislocation\time_merge\gis_dev>dir
 驱动器 E 中的卷是 My Passport
 卷的序列号是 C03F-DC46

 E:\webgislocation\time_merge\gis_dev 的目录

2024/12/16  21:50    <DIR>          .
2024/12/16  21:47    <DIR>          ..
2024/08/21  16:05         5,495,769 result_2024_01_15_interval_10min.csv
2024/08/21  16:05         5,198,169 result_2024_02_15_interval_10min.csv
2024/08/15  16:01         4,427,938 result_2024_03_15_interval_10min.csv
2024/08/21  16:05         5,031,475 result_2024_04_15_interval_10min.csv
2024/08/21  16:05         4,139,863 result_2024_05_15_interval_10min.csv
2024/08/15  16:01         4,237,944 result_2024_06_15_interval_10min.csv
2024/08/21  16:05         4,071,738 result_2024_07_15_interval_10min.csv
2024/08/21  16:05         3,893,040 result_2024_08_15_interval_10min.csv
2024/08/21  16:05         4,577,548 result_2024_09_15_interval_10min.csv
2024/08/21  16:05         4,921,777 result_2024_10_15_interval_10min.csv
2024/08/21  16:05         5,427,258 result_2024_11_15_interval_10min.csv
2024/08/15  16:01         5,820,559 result_2024_12_15_interval_10min.csv
              12 个文件     57,243,078 字节
               2 个目录 242,182,170,624 可用字节

对于某一csv而言，结构如下：
pid,t07:30:00,t07:40:00,t07:50:00,t08:00:00,t08:10:00,t08:20:00,t08:30:00,t08:40:00,t08:50:00,t09:00:00,t09:10:00,t09:20:00,t09:30:00,t09:40:00,t09:50:00,t15:20:00,t15:30:00,t15:40:00,t15:50:00,t16:00:00,t16:10:00,t16:20:00,t16:30:00,t16:40:00,t16:50:00,t17:00:00,t17:10:00,t17:20:00,t17:30:00,t17:40:00,result,50lon,50lat,road_name,near_fid,yaw
02000200001408211055337000B,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,120,114.02748230928552,30.63793518878345,兴工十三路,102835,202.652009962
02000200001408211055377400B,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,40,114.0270167154915,30.6377408809086,兴工十三路,102835,202.652009962

需要根据坐标50lon,50lat相同或者在1米范围内有多个点，则保留一个点，删除其他点
'''
# import os
# import pyproj
# from shapely.geometry import Point
# from shapely.ops import transform
# from shapely.strtree import STRtree
# from tqdm import tqdm

# def get_func_time(func):
#     def wrapper(*args, **kwargs):
#         import time
#         start = time.time()
#         print(f'开始运行函数{func.__name__}')
#         result = func(*args, **kwargs)
#         print(f'函数{func.__name__}运行时间为{time.time()-start}秒')
#         return result
#     return wrapper

# def split_csv(csv_path, num_parts=8):
#     with open(csv_path, 'r', encoding='utf-8') as f:
#         lines = f.readlines()
    
#     header = lines[0]
#     data_lines = lines[1:]
#     part_size = len(data_lines) // num_parts
#     parts = [data_lines[i * part_size:(i + 1) * part_size] for i in range(num_parts)]
    
#     for i, part in enumerate(parts):
#         part.insert(0, header)
#         with open(f'{csv_path}_part_{i}.csv', 'w', encoding='utf-8') as f:
#             f.writelines(part)

# @get_func_time
# def delete_same_dot(csv_path):
#     with open(csv_path, 'r', encoding='utf-8') as f:
#         lines = f.readlines()
#     new_lines = []
#     new_lines.append(lines[0])
#     existing_points = []
#     duplicate_count = 0

#     print('开始定义投影转换')
#     wgs84 = pyproj.CRS('EPSG:4326')
#     utm = pyproj.CRS('EPSG:32648')
#     project = pyproj.Transformer.from_crs(wgs84, utm, always_xy=True).transform

#     header = lines[0].strip().split(',')
#     lon_index = header.index('50lon')
#     lat_index = header.index('50lat')

#     print('开始删除重复点')
#     for line in tqdm(lines[1:], desc="处理点"):
#         line = line.strip().split(',')
#         lon = float(line[lon_index])
#         lat = float(line[lat_index])
#         current_point = Point(lon, lat)
#         utm_point = transform(project, current_point)

#         is_duplicate = False
#         if existing_points:
#             tree = STRtree(existing_points)
#             nearest_points = tree.query(utm_point.buffer(1))
#             for point in nearest_points:
#                 if isinstance(point, Point) and utm_point.distance(point) < 10:
#                     is_duplicate = True
#                     duplicate_count += 1
#                     break

#         if not is_duplicate:
#             new_lines.append(','.join(line) + '\n')
#             existing_points.append(utm_point)

#     with open(csv_path, 'w', encoding='utf-8') as f:
#         f.writelines(new_lines)

#     print(f'{csv_path} 删除了 {duplicate_count} 个重复点')

# def merge_csvs(csv_paths, output_path):
#     all_lines = []
#     for csv_path in csv_paths:
#         with open(csv_path, 'r', encoding='utf-8') as f:
#             lines = f.readlines()
#             if not all_lines:
#                 all_lines.extend(lines)
#             else:
#                 all_lines.extend(lines[1:])
    
#     with open(output_path, 'w', encoding='utf-8') as f:
#         f.writelines(all_lines)

# def delete_temp_files(file_paths):
#     for file_path in file_paths:
#         os.remove(file_path)

# if __name__ == '__main__':
#     csv_folder = r'E:\webgislocation\time_merge\gis_dev'
#     for csv in os.listdir(csv_folder):
#         csv_path = os.path.join(csv_folder, csv)
#         split_csv(csv_path)
#         part_paths = [f'{csv_path}_part_{i}.csv' for i in range(8)]
        
#         for part_path in part_paths:
#             delete_same_dot(part_path)
        
#         merge_csvs(part_paths, f'{csv_path}_merged_1.csv')
#         delete_temp_files(part_paths)
        
#         delete_same_dot(f'{csv_path}_merged_1.csv')
        
#         print(f'{csv_path} done')
import os
from tqdm import tqdm

def get_func_time(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        print(f'开始运行函数{func.__name__}')
        result = func(*args, **kwargs)
        print(f'函数{func.__name__}运行时间为{time.time()-start}秒')
        return result
    return wrapper

@get_func_time
def delete_same_dot(csv_path):
    with open(csv_path, 'r', encoding='utf-8-sig') as f:  # 使用 'utf-8-sig' 编码去除BOM
        lines = f.readlines()
    new_lines = []
    new_lines.append(lines[0])
    existing_pids = set()
    duplicate_count = 0

    header = lines[0].strip().split(',')
    # print(f'CSV文件头部: {header}')  # 添加调试信息
    try:
        pid_index = header.index('pid')
    except ValueError:
        print(f'错误: 在文件 {csv_path} 的头部找不到 "pid" 字段')
        return

    print('开始删除重复点')
    for line in tqdm(lines[1:], desc="处理点"):
        line = line.strip().split(',')
        pid = line[pid_index]

        if pid in existing_pids:
            duplicate_count += 1
        else:
            new_lines.append(','.join(line) + '\n')
            existing_pids.add(pid)

    with open(csv_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

    print(f'{csv_path} 删除了 {duplicate_count} 个重复点')

if __name__ == '__main__':
    csv_folder = r'E:\webgislocation\time_merge\gis_dev'
    for csv in os.listdir(csv_folder):
        csv_path = os.path.join(csv_folder, csv)
        delete_same_dot(csv_path)
        print(f'{csv_path} done')