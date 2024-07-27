import geopandas as gpd

def shp_to_csv_with_geometry(shp_path, csv_path):
    # 读取Shapefile
    gdf = gpd.read_file(shp_path)
    
    # 检查几何数据是否有效
    if not gdf['geometry'].is_empty.any() and gdf['geometry'].is_valid.all():
        # 将几何数据转换为WKT格式
        gdf['geometry'] = gdf['geometry'].apply(lambda x: x.wkt)
    else:
        print("警告: 几何列包含无效或空的几何对象。")
    
    # 将GeoDataFrame导出为CSV
    gdf.to_csv(csv_path, index=False)

# 使用示例
shp_path = r"E:\webgislocation\sun-glare-project\data\test-vector\wuhan-rd.shp"
csv_path = r"E:\webgislocation\sun-glare-project\data\wuhan-rd.csv"
shp_to_csv_with_geometry(shp_path, csv_path)