'''
E:\webgislocation\analysis\v20241227\change0104 的目录

2025/01/06  15:35    <DIR>          .
2025/01/04  11:44    <DIR>          ..
2025/01/04  23:52    <DIR>          closest
2025/01/04  23:52    <DIR>          low_glare

E:\webgislocation\analysis\v20241227\change0104\low_glare 的目录有
2025/01/04  23:52    <DIR>          .
2025/01/06  15:35    <DIR>          ..
2025/01/06  15:33    <DIR>          5_t5_30_00
......
2025/01/06  15:34    <DIR>          5_t17_40_00
2025/01/06  15:34    <DIR>          5_t17_50_00
2025/01/06  15:34    <DIR>          5_t18_00_00

E:\webgislocation\analysis\v20241227\change0104\closest 的目录有
2025/01/04  23:52    <DIR>          .
2025/01/06  15:35    <DIR>          ..
2025/01/06  15:33    <DIR>          5_t5_30_00
......
2025/01/06  15:34    <DIR>          5_t17_40_00
2025/01/06  15:34    <DIR>          5_t17_50_00
2025/01/06  15:34    <DIR>          5_t18_00_00

对于low_glare中的文件夹，其有四种类型的文件：
1. 路径geojson，route_plan_ffef17bd-8f21-4257-884e-2e1c0729a0dd.geojson -- 低眩光路径规划原始数据
2. route_plans.csv -- 路径规划原始数据的统计数据
3. sunglare_decrease.csv -- 太阳眩光次数减少的统计数据
4. distance_increase.csv -- 路径长度增加的统计数据

对于closest中的文件夹，其有两种类型的文件：
1. 路径geojson，route_plan_ffef17bd-8f21-4257-884e-2e1c0729a0dd.geojson -- 最短时间的路径规划原始数据
2. route_plans.csv -- 路径规划原始数据的统计数据

我现在希望可以遍历所有的文件夹，先根据文件夹名字获取时间字段，在指定位置根据时间创建文件夹，格式月月时时分分。原始时间文件夹的时间格式为 月_t时时分分_秒秒 。
之后将对应时间的low_glare的route_plans.csv复制过去，重命名为low_glare_plans.csv。
然后将closest的route_plans.csv复制过去，重命名为closest_plans.csv。
最后将low_glare的distance_increase.csv以及sunglare_decrease.csv复制过去，不需要重命名，怎么做？需要封装为函数。
'''
import os
import shutil

def copy_files_by_time(low_glare_path, closest_path, dest_path):
    for folder_name in os.listdir(low_glare_path):
        if '_t' in folder_name:
            parts = folder_name.split('_t')
            month_str = parts[0].zfill(2)

            # 解析小时、分钟（不含秒）
            time_parts = parts[1].split('_')
            hour_str = time_parts[0].zfill(2)
            minute_str = time_parts[1].zfill(2)
            # 拼接为 "05_0530" 这种格式
            new_folder_name = f"{month_str}15{hour_str}{minute_str}"
            
            target_dir = os.path.join(dest_path, new_folder_name)
            os.makedirs(target_dir, exist_ok=True)
            
            # ...existing code...
            lg_sub = os.path.join(low_glare_path, folder_name)
            lg_plans = os.path.join(lg_sub, 'route_plans.csv')
            if os.path.isfile(lg_plans):
                shutil.copy(lg_plans, os.path.join(target_dir, 'low_glare_plans.csv'))
            for extra_file in ['distance_increase.csv', 'sunglare_decrease.csv']:
                src = os.path.join(lg_sub, extra_file)
                if os.path.isfile(src):
                    shutil.copy(src, target_dir)

            cl_sub = os.path.join(closest_path, folder_name)
            cl_plans = os.path.join(cl_sub, 'route_plans.csv')
            if os.path.isfile(cl_plans):
                shutil.copy(cl_plans, os.path.join(target_dir, 'closest_plans.csv'))

def get_low_glare_path_and_closest_path_from_master_path(master_path):
    return os.path.join(master_path, 'low_glare'), os.path.join(master_path, 'closest')

def main():
    master_path = r"E:\webgislocation\analysis\v20241227\change0104"
    low_glare_path, closest_path = get_low_glare_path_and_closest_path_from_master_path(master_path)
    dest_path = r"E:\webgislocation\analysis\v20241227\change0104\result_analysis"
    copy_files_by_time(low_glare_path, closest_path, dest_path)

if __name__ == "__main__":
    main()