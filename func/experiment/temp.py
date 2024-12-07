# E:\webgislocation\analysis\data\rd_0515.shp
# E:\webgislocation\analysis\result_2024_05_15_interval_10min.csv
# 我现在希望将csv文件数据的near_fid字段的值与rd_0515.shp文件的fid字段的值进行比较，如果相等，则将csv文件对应行的所有数据写入到shp文件中。
# 但是csv的行数较少，shp的行数较多，所以如果有空值，则直接填充为-1。
# 最后另存为一个新的shp文件。

import pandas as pd
import geopandas as gpd
from tqdm import tqdm

# 读取 CSV 文件
csv_file = 'E:\\webgislocation\\analysis\\result_2024_05_15_interval_10min.csv'
csv_data = pd.read_csv(csv_file)

# 读取 Shapefile 文件
shp_file = 'E:\\webgislocation\\analysis\\data\\rd_0515.shp'
shp_data = gpd.read_file(shp_file)
# 打印所有列名
print(shp_data.columns)

# 将 CSV 数据的 near_fid 字段与 Shapefile 数据的 fid 字段进行比较
for index, row in tqdm(csv_data.iterrows(), total=csv_data.shape[0], desc="Processing rows"):
    fid = row['near_fid']
    matching_rows = shp_data[shp_data['code'] == fid]
    
    if not matching_rows.empty:
        for col in csv_data.columns:
            if col != 'near_fid':
                shp_data.loc[shp_data['code'] == fid, col] = row[col]
    else:
        # 如果没有匹配的 fid，则填充为 -1
        new_row = {col: -1 for col in shp_data.columns}
        new_row.update(row.to_dict())
        shp_data = shp_data.append(new_row, ignore_index=True)

# 保存为新的 Shapefile 文件
new_shp_file = 'E:\\webgislocation\\analysis\\data\\rd_0515_merge.shp'
shp_data.to_file(new_shp_file)