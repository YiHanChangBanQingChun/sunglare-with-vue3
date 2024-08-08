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
    # 读取原始shp文件，指定编码为 UTF-8
    gdf = gpd.read_file(input_shp, encoding='utf-8')
    
    # 检查并打印 CRS
    print("原始 CRS:", gdf.crs)
    
    # 如果 CRS 不是 EPSG:4326，则转换为 EPSG:4326
    if gdf.crs != 'EPSG:4326':
        gdf = gdf.to_crs('EPSG:4326')
        print("转换后的 CRS:", gdf.crs)
    
    # 打印转换前的属性表
    print("转换前的属性表:")
    print(gdf)
    i = 0
    # 将多线转换为单线，并确保每条线只有两个坐标点
    singlelines = []
    for index, row in gdf.iterrows():
        geom = row.geometry
        if geom.geom_type == 'MultiLineString':
            for line in geom:
                singlelines.extend(split_line(line, row))
        elif geom.geom_type == 'LineString':
            singlelines.extend(split_line(geom, row))
            i += 1
            print("LineString change singleline", i)
        else:
            # 非线性几何类型，直接添加
            singlelines.append(row)
    
    # 创建新的GeoDataFrame
    new_gdf = gpd.GeoDataFrame(singlelines, crs=gdf.crs)
    
    # 打印转换后的属性表
    print("\n转换后的属性表:")
    print(new_gdf)
    
    # 保存为新的shp文件，指定编码为 UTF-8
    new_gdf.to_file(output_shp, encoding='utf-8')



if "__name__" == "__main__":
    multiline_file = r"E:\webgislocation\rdraw.shp"
    singleline_file = r"E:\webgislocation\rdsingle.shp"
    
    # 调用函数
    multiline_to_singleline(multiline_file, singleline_file)
    singleline_file = r"E:\webgislocation\rdsingle.shp"
    
    # 读取生成的shp文件
    new_gdf = gpd.read_file(singleline_file, encoding='utf-8')
    
    # 打印前10行的几何属性
    print("\n生成的shp文件的前10行几何属性:")
    print(new_gdf.geometry.head(10))