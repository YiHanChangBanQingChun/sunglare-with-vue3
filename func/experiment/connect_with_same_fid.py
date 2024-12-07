import pandas as pd
import geopandas as gpd
from tqdm import tqdm

def merge_shapefile_with_csv(shp_file, shp_field, csv_file, csv_field, output_file):
    """
    将 CSV 文件的数据与 Shapefile 文件的数据进行连接，并保存为新的 Shapefile 文件。

    参数:
    shp_file (str): 需要增加字段的 Shapefile 文件路径。
    shp_field (str): Shapefile 文件中的字段名。
    csv_file (str): 需要连接的 CSV 文件路径。
    csv_field (str): CSV 文件中的字段名。
    output_file (str): 输出的 Shapefile 文件路径。
    """
    # 读取 CSV 文件
    csv_data = pd.read_csv(csv_file)

    # 读取 Shapefile 文件
    shp_data = gpd.read_file(shp_file)
    # 打印所有列名
    print(shp_data.columns)

    # 将 CSV 数据的 csv_field 字段与 Shapefile 数据的 shp_field 字段进行比较
    for index, row in tqdm(csv_data.iterrows(), total=csv_data.shape[0], desc="Processing rows"):
        fid = row[csv_field]
        matching_rows = shp_data[shp_data[shp_field] == fid]
        
        if not matching_rows.empty:
            for col in csv_data.columns:
                if col != csv_field:
                    shp_data.loc[shp_data[shp_field] == fid, col] = row[col]
        else:
            # 如果没有匹配的 fid，则填充为 -1
            new_row = {col: -1 for col in shp_data.columns}
            new_row.update(row.to_dict())
            shp_data = shp_data.append(new_row, ignore_index=True)

    # 保存为新的 Shapefile 文件
    shp_data.to_file(output_file)

# 示例调用
shp_file = 'E:\\webgislocation\\analysis\\data\\rd_0515.shp'
shp_field = 'code'
csv_file = 'E:\\webgislocation\\analysis\\result_2024_05_15_interval_10min.csv'
csv_field = 'near_fid'
output_file = 'E:\\webgislocation\\analysis\\data\\rd_0515_merge.shp'

merge_shapefile_with_csv(shp_file, shp_field, csv_file, csv_field, output_file)