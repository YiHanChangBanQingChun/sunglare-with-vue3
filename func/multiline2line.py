import geopandas as gpd
from shapely.geometry import LineString
def split_line(line, row):
    """将一条线分割成多条两点组成的直线"""
    lines = []
    coords = list(line.coords)
    for i in range(len(coords) - 1):
        segment = LineString([coords[i], coords[i+1]])
        lines.append({
            'geometry': segment,
            **row.drop('geometry')
        })
    return lines

def multiline_to_singleline(input_shp, output_shp):
    # 读取原始shp文件
    gdf = gpd.read_file(input_shp)
    
    # 打印转换前的属性表
    print("转换前的属性表:")
    print(gdf)
    i=0
    # 将多线转换为单线，并确保每条线只有两个坐标点
    singlelines = []
    for index, row in gdf.iterrows():
        geom = row.geometry
        if geom.geom_type == 'MultiLineString':
            for line in geom:
                singlelines.extend(split_line(line, row))
        elif geom.geom_type == 'LineString':
            singlelines.extend(split_line(geom, row))
            i=i+1
            print("LineString change singleline",i)
        else:
            # 非线性几何类型，直接添加
            singlelines.append(row)
    
    # 创建新的GeoDataFrame
    new_gdf = gpd.GeoDataFrame(singlelines, crs=gdf.crs)
    
    # 打印转换后的属性表
    print("\n转换后的属性表:")
    print(new_gdf)
    
    # 保存为新的shp文件
    new_gdf.to_file(output_shp)

# 使用示例
input_shp = r"E:\webgislocation\sun-glare-project\data\test-vector\whrd7.shp"
output_shp = r"E:\webgislocation\sun-glare-project\data\test-vector\whrd7line.shp"
multiline_to_singleline(input_shp, output_shp)