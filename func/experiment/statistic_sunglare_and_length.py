'''
E:\webgislocation\analysis\result_analyse，其内部结构如下：
    2024/12/06  14:22    <DIR>          05150530
    2024/12/06  14:21    <DIR>          05150540
    2024/12/06  14:21    <DIR>          05150550
    2024/12/06  14:21    <DIR>          05150600
    2024/12/06  14:21    <DIR>          05150610
    2024/12/06  14:20    <DIR>          05150620
    2024/12/06  14:20    <DIR>          05150630
    2024/12/06  14:20    <DIR>          05150640
    2024/12/06  14:20    <DIR>          05150650
    2024/12/06  14:19    <DIR>          05150700
    2024/12/06  14:19    <DIR>          05150710
    2024/12/06  14:19    <DIR>          05150720
    2024/12/06  14:18    <DIR>          05150730
    2024/12/06  14:15    <DIR>          05151710
    2024/12/06  14:15    <DIR>          05151720
    2024/12/06  14:15    <DIR>          05151730
    2024/12/06  14:15    <DIR>          05151740
    2024/12/06  14:14    <DIR>          05151750
    2024/12/06  14:14    <DIR>          05151800
    2024/12/06  14:14    <DIR>          05151810
    2024/12/06  14:13    <DIR>          05151820
    2024/12/06  14:13    <DIR>          05151830
    2024/12/06  14:13    <DIR>          05151840
    2024/12/06  14:11    <DIR>          05151850
    2024/12/06  14:10    <DIR>          05151900

以05150530为例，其内部结构如下：
    2024/12/05  19:07           417,574 distance_increase_results.csv
    2024/12/05  19:09           379,302 sunglare_results.csv

distance_increase_results.csv内部结构如下：
    id,way,uuid_routelist,start_lng,start_lat,end_lng,end_lat,total_distance_km_routelist,total_time_minutes_routelist,sunglaretimes_routelist,uuid_other,total_distance_km_other,total_time_minutes_other,sunglaretimes_other,distance_routelist,distance_other,distance_increase_percentage
    1,1,8d43ee70-6ccc-4947-90bc-a944f5edfbf9,114.3234543822603,30.330286030438284,114.27590170107098,30.69531791836597,46.75,54.31,0,d12bd622-458b-4029-bdc0-76a4c3abc673,46.75,54.31,0,51580.7195,51579.3839,0.0026
    1,0,6f138d98-a29f-40c0-a3ae-86134cbf256d,114.27590170107098,30.69531791836597,114.3234543822603,30.330286030438284,41.38,49.64,0,b5038875-e374-4517-9fe7-a11dbbd8cb91,41.38,49.64,0,45789.8227,45789.8227,-0.0
    ......

sunglare_results.csv内部结构如下：
    id,way,uuid_routelist,start_lng,start_lat,end_lng,end_lat,total_distance_km_routelist,total_time_minutes_routelist,sunglaretimes_routelist,uuid_other,total_distance_km_other,total_time_minutes_other,sunglaretimes_other,sunglare_routelist,sunglare_other,reduction_percentage
    1,1,8d43ee70-6ccc-4947-90bc-a944f5edfbf9,114.3234543822603,30.330286030438284,114.27590170107098,30.69531791836597,46.75,54.31,0,d12bd622-458b-4029-bdc0-76a4c3abc673,46.75,54.31,0,1,2,50.0
    1,0,6f138d98-a29f-40c0-a3ae-86134cbf256d,114.27590170107098,30.69531791836597,114.3234543822603,30.330286030438284,41.38,49.64,0,b5038875-e374-4517-9fe7-a11dbbd8cb91,41.38,49.64,0,0,0,0
    ......

'''

import os
import datetime
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from scipy.interpolate import interp1d

# 获取路径文件夹的所有子文件夹名字
def get_subfolder_names(folder_path):
    subfolder_names = []
    for root, dirs, files in os.walk(folder_path):
        for dir in dirs:
            subfolder_names.append(dir)
    return subfolder_names

# 文件夹名字转为时间格式，年份是2024，示例文件夹名字有'05150530', '05150540'
def folder_name_to_date(folder_name):
    date_str =folder_name
    date = datetime.datetime.strptime(date_str, '%m%d%H%M')
    return date

# 对每一个时间段，单独绘制一个箱线图，箱线图的数据是sunglare_results.csv中的reduction_percentage
# reduction_percentage是sunglare_routelist和sunglare_other的差值除以sunglare_other
def draw_sunglare_boxplot(result_analyse_folder, subfolder_name):
    # 读取sunglare_results.csv
    sunglare_results_path = os.path.join(result_analyse_folder, subfolder_name, 'sunglare_results.csv')
    sunglare_results_df = pd.read_csv(sunglare_results_path)
    reduction_percentage = sunglare_results_df['reduction_percentage']
    # 剔除小于0的数据
    reduction_percentage = reduction_percentage[reduction_percentage > 0]
    # 绘制箱线图
    plt.figure()
    plt.boxplot(reduction_percentage)
    plt.title(f"{subfolder_name} sunglare reduction percentage")
    plt.xlabel("reduction percentage")
    plt.ylabel("percentage")
    plt.show()
    # plt.savefig(os.path.join(result_analyse_folder, subfolder_name, 'sunglare_reduction_percentage.png'))

# 对每一个时间段，单独绘制一个小提琴图，小提琴图的数据是sunglare_results.csv中的reduction_percentage
# reduction_percentage是sunglare_routelist和sunglare_other的差值除以sunglare_other
def draw_sunglare_violinplot(result_analyse_folder, subfolder_name):
    # 读取sunglare_results.csv
    sunglare_results_path = os.path.join(result_analyse_folder, subfolder_name, 'sunglare_results.csv')
    sunglare_results_df = pd.read_csv(sunglare_results_path)
    reduction_percentage = sunglare_results_df['reduction_percentage']
    reduction_percentage = reduction_percentage[reduction_percentage > 0]
    # 绘制小提琴图
    plt.figure()
    plt.violinplot(reduction_percentage)
    plt.title(f"{subfolder_name} sunglare reduction percentage")
    plt.xlabel("reduction percentage")
    plt.ylabel("percentage")
    plt.show()
    # plt.savefig(os.path.join(result_analyse_folder, subfolder_name, 'sunglare_reduction_percentage.png'))

# 遍历每一个时间文件夹，遍历数据，然后再汇总所有时间的情况，把所有的时间作为x轴，百分比值作为y轴，绘制一个热力图。
# 热力图的数据是每个时间的sunglare_results.csv中的reduction_percentage
# reduction_percentage是sunglare_routelist和sunglare_other的差值除以sunglare_other
def draw_sunglare_heatmap(result_analyse_folder):
    # 获取所有子文件夹名字
    subfolder_names = get_subfolder_names(result_analyse_folder)
    # 存储所有时间的reduction_percentage
    reduction_percentages = []
    dates = []
    max_length = 0
    for subfolder_name in subfolder_names:
        # 读取sunglare_results.csv
        sunglare_results_path = os.path.join(result_analyse_folder, subfolder_name, 'sunglare_results.csv')
        if os.path.exists(sunglare_results_path):
            sunglare_results_df = pd.read_csv(sunglare_results_path)
            reduction_percentage = sunglare_results_df['reduction_percentage']
            reduction_percentage = reduction_percentage[reduction_percentage >= 0]  # 忽略负值
            reduction_percentages.append(reduction_percentage.values)
            max_length = max(max_length, len(reduction_percentage))
            dates.append(folder_name_to_date(subfolder_name))
            # print(f"reduction_percentage: {reduction_percentage.values}")
    
    # 填充缺失值，使得每个时间段的reduction_percentage数量一致
    for i in range(len(reduction_percentages)):
        if len(reduction_percentages[i]) < max_length:
            # 基于当前数据样本的分布来填充缺失值
            fill_values = np.random.choice(reduction_percentages[i][~np.isnan(reduction_percentages[i])], max_length - len(reduction_percentages[i]))
            reduction_percentages[i] = np.concatenate([reduction_percentages[i], fill_values])

    # 对日期进行排序
    sorted_indices = np.argsort(dates)
    dates = np.array(dates)[sorted_indices]
    reduction_percentages = np.array(reduction_percentages)[sorted_indices]

    # 计算每个时间段在每个百分比范围内的数据的百分比
    bins = np.arange(0, 110, 10)
    heatmap_data = np.zeros((len(bins) - 1, len(dates)))
    for i in range(len(dates)):
        hist, _ = np.histogram(reduction_percentages[i], bins=bins)
        heatmap_data[:, i] = hist / len(reduction_percentages[i])

    # 绘制热力图
    plt.figure(figsize=(12, 6))
    plt.imshow(heatmap_data, cmap='rainbow', interpolation='nearest', aspect='auto', origin='lower')
    plt.colorbar(label='Percentage')
    plt.title("Sunglare Reduction Percentage Heatmap")
    plt.xlabel("Time")
    plt.ylabel("Reduction Percentage Range")
    plt.xticks(ticks=np.arange(len(dates)), labels=[date.strftime('%H:%M') for date in dates], rotation=45)
    plt.yticks(ticks=np.arange(len(bins) - 1), labels=[f'{bins[i]}-{bins[i+1]}%' for i in range(len(bins) - 1)])
    plt.xlim(0, len(dates) - 1)  # 限制 x 轴范围
    plt.show()
    # plt.savefig(os.path.join(result_analyse_folder, 'sunglare_reduction_percentage.png'))

# 对每一个时间的所有路线，统计其太阳眩光在该路线的发生率，然后绘制一个折线图，x轴是时间，y轴是发生率。
# 可以通过sunglare_results.csv中的sunglare_other来计算，如果是0则表示没有发生太阳眩光，如果不是0则表示发生了太阳眩光
# 然后再统计概率,但需要注意,中间可能会有缺失的时间,这一段区域不绘制,不需要连起来,只需要绘制有数据的时间段即可.
# 时间分辨率为10分钟,可以设计一个算法去剔除没有时间的区域让其不绘制百分比
def draw_sunglare_occurrence_rate(result_analyse_folder):
    # 获取所有子文件夹名字
    subfolder_names = get_subfolder_names(result_analyse_folder)
    # 存储所有时间的sunglaretimes_other
    sunglaretimes_others = []
    dates = []
    max_length = 0
    for subfolder_name in subfolder_names:
        # 读取sunglare_results.csv
        sunglare_results_path = os.path.join(result_analyse_folder, subfolder_name, 'sunglare_results.csv')
        if os.path.exists(sunglare_results_path):
            sunglare_results_df = pd.read_csv(sunglare_results_path)
            sunglaretimes_other = sunglare_results_df['sunglare_other']
            sunglaretimes_others.append(sunglaretimes_other.values)
            max_length = max(max_length, len(sunglaretimes_other))
            dates.append(folder_name_to_date(subfolder_name))
    
    # 填充缺失值，使得每个时间段的sunglaretimes_other数量一致
    for i in range(len(sunglaretimes_others)):
        if len(sunglaretimes_others[i]) < max_length:
            fill_values = np.random.choice(sunglaretimes_others[i][~np.isnan(sunglaretimes_others[i])], max_length - len(sunglaretimes_others[i]))
            sunglaretimes_others[i] = np.concatenate([sunglaretimes_others[i], fill_values])

    # 对日期进行排序
    sorted_indices = np.argsort(dates)
    dates = np.array(dates)[sorted_indices]
    sunglaretimes_others = np.array(sunglaretimes_others)[sorted_indices]

    # 计算每个时间段的太阳眩光发生率
    occurrence_rates = []
    for i in range(len(dates)):
        occurrence_rate = np.sum(sunglaretimes_others[i] > 0) / len(sunglaretimes_others[i]) * 100  # 转换为百分比
        occurrence_rates.append(occurrence_rate)

    # 对于缺失的时间段,不绘制
    time_diffs = np.diff(dates)
    time_diffs = np.array([time_diff.total_seconds() / 60 for time_diff in time_diffs])
    missing_indices = np.where(time_diffs > 10)[0]
    for missing_index in missing_indices:
        occurrence_rates.insert(missing_index + 1, np.nan)
        dates = np.insert(dates, missing_index + 1, dates[missing_index] + pd.Timedelta(minutes=10))

    dates = [date.strftime('%H:%M') for date in dates]

    # 绘制折线图——cn
    plt.figure()
    plt.plot(dates, occurrence_rates, marker='o')
    plt.title("2024年5月15日武汉市全景影像覆盖主要地区的太阳眩光发生率")
    plt.xlabel("时间")
    plt.ylabel("发生率 (%)")
    plt.xticks(rotation=45)
    plt.show()

# 确定全局可以正常在画布显示中文
def set_ch():
    from pylab import mpl
    mpl.rcParams['font.sans-serif'] = ['SimHei']  # 指定默认字体
    mpl.rcParams['axes.unicode_minus'] = False # 解决保存图像是负号'-'显示为方块的问题
    # 字体加大
    mpl.rcParams['font.size'] = 18

def main():
    set_ch()
    # 文件夹路径
    result_analyse_folder = r'E:\webgislocation\analysis\result_analyse'
    subfolder_names = get_subfolder_names(result_analyse_folder)
    
    for subfolder_name in subfolder_names:
        folder_name_to_date(subfolder_name)
        # draw_sunglare_boxplot(result_analyse_folder, subfolder_name)
        # draw_sunglare_violinplot(result_analyse_folder, subfolder_name)

    # draw_sunglare_heatmap(result_analyse_folder)
    draw_sunglare_occurrence_rate(result_analyse_folder)

if __name__ == '__main__':
    main()