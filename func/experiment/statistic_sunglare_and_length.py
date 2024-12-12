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

# 统计弱眩光路径相比常规路径的增加百分比，计算方法在于统计每一个时间的csv文件：distance_increase_results.csv中的
# (distance_routelist - distance_other) / distance_other * 100，需要确保大于0，小于0忽略。
# 所有时间计算完后,绘制一个与上折线图类似的折线图,但是y轴是增加百分比。
def draw_distance_increase_percentage(result_analyse_folder):
    # 获取所有子文件夹名字
    subfolder_names = get_subfolder_names(result_analyse_folder)
    # 存储所有时间的distance_increase_percentage
    distance_increase_percentages = []
    dates = []
    max_length = 0
    for subfolder_name in subfolder_names:
        # 读取distance_increase_results.csv
        distance_increase_results_path = os.path.join(result_analyse_folder, subfolder_name, 'distance_increase_results.csv')
        if os.path.exists(distance_increase_results_path):
            distance_increase_results_df = pd.read_csv(distance_increase_results_path)
            distance_increase_percentage = distance_increase_results_df['distance_increase_percentage']
            distance_increase_percentage = distance_increase_percentage[distance_increase_percentage >= 0]  # 忽略负值
            distance_increase_percentages.append(distance_increase_percentage.values)
            max_length = max(max_length, len(distance_increase_percentage))
            dates.append(folder_name_to_date(subfolder_name))
    
    # 填充缺失值，使得每个时间段的distance_increase_percentage数量一致
    for i in range(len(distance_increase_percentages)):
        if len(distance_increase_percentages[i]) < max_length:
            fill_values = np.random.choice(distance_increase_percentages[i][~np.isnan(distance_increase_percentages[i])], max_length - len(distance_increase_percentages[i]))
            distance_increase_percentages[i] = np.concatenate([distance_increase_percentages[i], fill_values])

    # 对日期进行排序
    sorted_indices = np.argsort(dates)
    dates = np.array(dates)[sorted_indices]
    distance_increase_percentages = np.array(distance_increase_percentages)[sorted_indices]

    # 筛选3σ范围内的数据
    filtered_distance_increase_percentages = []
    for data in distance_increase_percentages:
        mean = np.mean(data)
        std = np.std(data)
        filtered_data = data[(data >= mean - 3 * std) & (data <= mean + 3 * std)]
        filtered_distance_increase_percentages.append(filtered_data)

    # 计算每个时间段的增加百分比
    increase_percentages = []
    for i in range(len(dates)):
        increase_percentage = np.mean(distance_increase_percentages[i])
        print(f"distance_increase_percentages: {round(increase_percentage,4)}")
        increase_percentages.append(increase_percentage)

    # 对于缺失的时间段,不绘制
    time_diffs = np.diff(dates)
    time_diffs = np.array([time_diff.total_seconds() / 60 for time_diff in time_diffs])
    missing_indices = np.where(time_diffs > 10)[0]
    for missing_index in missing_indices:
        increase_percentages.insert(missing_index + 1, np.nan)
        dates = np.insert(dates, missing_index + 1, dates[missing_index] + pd.Timedelta(minutes=10))

    dates = [date.strftime('%H:%M') for date in dates]

    # 绘制折线图
    plt.figure()
    plt.plot(dates, increase_percentages, marker='o')
    plt.title("2024年5月15日武汉市全景影像覆盖主要地区的弱眩光路径相比常规路径增加百分比")
    plt.xlabel("时间")
    plt.ylabel("增加百分比 (%)")
    plt.xticks(rotation=45)
    plt.show()

# 统计弱眩光路径相比常规路径的增加百分比的数值分布小提琴图，计算方法在于统计每一个时间的csv文件：distance_increase_results.csv中的
# (distance_routelist - distance_other) / distance_other * 100，需要确保大于0，小于等于0忽略。每一个时间都生成一个小提琴图,一共有25张,然后在一个画布上5*5排布
# 小画布上是单独时间的所有路径增加百分比小提琴图,路径不增加忽略.
def draw_distance_increase_percentage_violinplot(result_analyse_folder):
    # 获取所有子文件夹名字
    subfolder_names = get_subfolder_names(result_analyse_folder)
    # 存储所有时间的distance_increase_percentage
    distance_increase_percentages = []
    dates = []
    max_length = 0
    for subfolder_name in subfolder_names:
        # 读取distance_increase_results.csv
        distance_increase_results_path = os.path.join(result_analyse_folder, subfolder_name, 'distance_increase_results.csv')
        if os.path.exists(distance_increase_results_path):
            distance_increase_results_df = pd.read_csv(distance_increase_results_path)
            distance_routelist = distance_increase_results_df['distance_routelist']
            distance_other = distance_increase_results_df['distance_other']
            # 计算百分比增量
            distance_increase_percentage = (distance_routelist - distance_other) / distance_other * 100
            distance_increase_percentage = distance_increase_percentage[distance_increase_percentage > 0]  # 忽略负值
            distance_increase_percentages.append(distance_increase_percentage.values)
            max_length = max(max_length, len(distance_increase_percentage))
            dates.append(folder_name_to_date(subfolder_name))
    
    # 填充缺失值，使得每个时间段的distance_increase_percentage数量一致
    for i in range(len(distance_increase_percentages)):
        if len(distance_increase_percentages[i]) < max_length:
            fill_values = np.random.choice(distance_increase_percentages[i][~np.isnan(distance_increase_percentages[i])], max_length - len(distance_increase_percentages[i]))
            distance_increase_percentages[i] = np.concatenate([distance_increase_percentages[i], fill_values])

    # 对日期进行排序
    sorted_indices = np.argsort(dates)
    dates = np.array(dates)[sorted_indices]
    distance_increase_percentages = np.array(distance_increase_percentages)[sorted_indices]

    # 筛选3σ范围内的数据
    filtered_distance_increase_percentages = []
    for data in distance_increase_percentages:
        mean = np.mean(data)
        std = np.std(data)
        filtered_data = data[(data >= mean - 3 * std) & (data <= mean + 3 * std)]
        filtered_distance_increase_percentages.append(filtered_data)

    # 绘制小提琴图
    fig, axs = plt.subplots(5, 5, figsize=(20, 20))
    for i in range(25):
        row = i // 5
        col = i % 5
        if i < len(dates):
            parts = axs[row, col].violinplot(filtered_distance_increase_percentages[i], positions=[1], widths=0.3, showmeans=False, showmedians=True)
            axs[row, col].set_xlabel(dates[i].strftime('%H:%M'))
            axs[row, col].set_xticks([1])
            axs[row, col].set_xticklabels([''])
            axs[row, col].set_xlim(0.8, 1.2)
            if col == 0:
                axs[row, col].set_ylabel("距离增加百分比 (%)")
            else:
                # axs[row, col].set_yticklabels([])
                1
            # 设置小提琴图的颜色
            for pc in parts['bodies']:
                pc.set_alpha(0.3)
            # 设置均值和中位数的颜色，带数字
            # for partname in ('cmeans', 'cmedians'):
            #     vp = parts[partname]
            #     vp.set_edgecolor('brown' if partname == 'cmeans' else 'green')
            #     vp.set_linewidth(1.5)
            #     vp.set_linestyle('--')
            #     y = np.mean(filtered_distance_increase_percentages[i]) if partname == 'cmeans' else np.median(filtered_distance_increase_percentages[i])
            #     offset = 0.7 if partname == 'cmeans' else -0.7
            #     axs[row, col].text(1.08, y + offset, f'{y:.2f}', color=vp.get_edgecolor(), va='center')
            # 设置均值和中位数的颜色,不带数字
            # for partname in ('cmeans', 'cmedians'):
            #     vp = parts[partname]
            #     vp.set_edgecolor('brown' if partname == 'cmeans' else 'green')
            #     vp.set_linewidth(1.5)
            #     vp.set_linestyle('--')
            # if i == 24:
            #     axs[row, col].legend([parts['cmeans'], parts['cmedians']], ['均值', '中位数'], loc='upper right')
            # 只显示中位数，不显示均值，且中位数不带数字
            for partname in ('cmedians',):
                vp = parts[partname]
                vp.set_edgecolor('green')
                vp.set_linewidth(1.5)
                vp.set_linestyle('--')
            if i == 24:
                axs[row, col].legend([parts['cmedians']], ['中位数'], loc='upper right')
        else:
            axs[row, col].axis('off')
    plt.tight_layout()
    # plt.show()
    plt.savefig(r'E:\webgislocation\analysis\sunglare_increase_percentage_violinplot.png')

# 统计弱眩光道路相比于常规路径眩光减少的百分比,计算方法在于统计每一个时间的csv文件：sunglare_results.csv
# 运用公式：(sunglare_other - sunglare_routelist) / sunglare_other * 100，需要确保大于0，小于等于0忽略。
# 所有时间计算完后,绘制一个与上折线图类似的折线图,但是y轴是减少百分比。
def draw_sunglare_decrease_percentage(result_analyse_folder):
    # 获取所有子文件夹名字
    subfolder_names = get_subfolder_names(result_analyse_folder)
    # 存储所有时间的sunglare_decrease_percentage
    sunglare_decrease_percentages = []
    dates = []
    max_length = 0
    for subfolder_name in subfolder_names:
        # 读取sunglare_results.csv
        sunglare_results_path = os.path.join(result_analyse_folder, subfolder_name, 'sunglare_results.csv')
        if os.path.exists(sunglare_results_path):
            sunglare_results_df = pd.read_csv(sunglare_results_path)
            sunglare_other = sunglare_results_df['sunglare_other']
            sunglare_routelist = sunglare_results_df['sunglare_routelist']
            # 计算减少百分比
            sunglare_decrease_percentage = (sunglare_other - sunglare_routelist) / sunglare_other * 100
            sunglare_decrease_percentage = sunglare_decrease_percentage[sunglare_decrease_percentage > 0]  # 忽略小于等于0的值
            sunglare_decrease_percentages.append(sunglare_decrease_percentage.values)
            max_length = max(max_length, len(sunglare_decrease_percentage))
            dates.append(folder_name_to_date(subfolder_name))
    
    # 填充缺失值，使得每个时间段的sunglare_decrease_percentage数量一致
    for i in range(len(sunglare_decrease_percentages)):
        if len(sunglare_decrease_percentages[i]) < max_length:
            fill_values = np.random.choice(sunglare_decrease_percentages[i][~np.isnan(sunglare_decrease_percentages[i])], max_length - len(sunglare_decrease_percentages[i]))
            sunglare_decrease_percentages[i] = np.concatenate([sunglare_decrease_percentages[i], fill_values])

    # 对日期进行排序
    sorted_indices = np.argsort(dates)
    dates = np.array(dates)[sorted_indices]
    sunglare_decrease_percentages = np.array(sunglare_decrease_percentages)[sorted_indices]

    # 筛选3σ范围内的数据
    filtered_sunglare_decrease_percentages = []
    for data in sunglare_decrease_percentages:
        mean = np.mean(data)
        std = np.std(data)
        filtered_data = data[(data >= mean - 3 * std) & (data <= mean + 3 * std)]
        filtered_sunglare_decrease_percentages.append(filtered_data)

    # 计算每个时间段的减少百分比
    decrease_percentages = []
    for i in range(len(dates)):
        decrease_percentage = np.mean(filtered_sunglare_decrease_percentages[i])
        print(f"sunglare_decrease_percentages: {round(decrease_percentage,4)}")
        decrease_percentages.append(decrease_percentage)

    # 对于缺失的时间段,不绘制
    time_diffs = np.diff(dates)
    time_diffs = np.array([time_diff.total_seconds() / 60 for time_diff in time_diffs])
    missing_indices = np.where(time_diffs > 10)[0]
    for missing_index in missing_indices:
        decrease_percentages.insert(missing_index + 1, np.nan)
        dates = np.insert(dates, missing_index + 1, dates[missing_index] + pd.Timedelta(minutes=10))

    dates = [date.strftime('%H:%M') for date in dates]

    # 绘制折线图
    plt.figure()
    plt.plot(dates, decrease_percentages, marker='o')
    plt.title("2024年5月15日武汉市全景影像覆盖主要地区的太阳眩光风险下降百分比")
    plt.xlabel("时间")
    plt.ylabel("减少百分比 (%)")
    plt.xticks(rotation=45)
    plt.show()

# 统计弱眩光路径相比常规路径的减少百分比的数值分布小提琴图，计算方法在于统计每一个时间的csv文件：sunglare_results.csv中的
# (sunglare_other - sunglare_routelist) / sunglare_other * 100，需要确保大于0，小于等于0忽略。每一个时间都生成一个小提琴图,一共有25张,然后在一个画布上5*5排布
# 小画布上是单独时间的所有路径减少百分比小提琴图,路径不减少忽略.
def draw_sunglare_decrease_percentage_violinplot(result_analyse_folder):
    # 获取所有子文件夹名字
    subfolder_names = get_subfolder_names(result_analyse_folder)
    # 存储所有时间的sunglare_decrease_percentage
    sunglare_decrease_percentages = []
    dates = []
    max_length = 0
    for subfolder_name in subfolder_names:
        # 读取sunglare_results.csv
        sunglare_results_path = os.path.join(result_analyse_folder, subfolder_name, 'sunglare_results.csv')
        if os.path.exists(sunglare_results_path):
            sunglare_results_df = pd.read_csv(sunglare_results_path)
            sunglare_other = sunglare_results_df['sunglare_other']
            sunglare_routelist = sunglare_results_df['sunglare_routelist']
            # 计算减少百分比
            sunglare_decrease_percentage = (sunglare_other - sunglare_routelist) / sunglare_other * 100
            sunglare_decrease_percentage = sunglare_decrease_percentage[sunglare_decrease_percentage > 0]  # 忽略小于等于0的值
            sunglare_decrease_percentages.append(sunglare_decrease_percentage.values)
            max_length = max(max_length, len(sunglare_decrease_percentage))
            dates.append(folder_name_to_date(subfolder_name))
    
    # 填充缺失值，使得每个时间段的sunglare_decrease_percentage数量一致
    for i in range(len(sunglare_decrease_percentages)):
        if len(sunglare_decrease_percentages[i]) < max_length:
            fill_values = np.random.choice(sunglare_decrease_percentages[i][~np.isnan(sunglare_decrease_percentages[i])], max_length - len(sunglare_decrease_percentages[i]))
            sunglare_decrease_percentages[i] = np.concatenate([sunglare_decrease_percentages[i], fill_values])

    # 对日期进行排序
    sorted_indices = np.argsort(dates)
    dates = np.array(dates)[sorted_indices]
    sunglare_decrease_percentages = np.array(sunglare_decrease_percentages)[sorted_indices]

    # 筛选2σ范围内的数据
    filtered_sunglare_decrease_percentages = []
    for data in sunglare_decrease_percentages:
        mean = np.mean(data)
        std = np.std(data)
        filtered_data = data[(data >= mean - 2 * std) & (data <= mean + 2 * std)]
        filtered_sunglare_decrease_percentages.append(filtered_data)

    # 绘制小提琴图
    fig, axs = plt.subplots(5, 5, figsize=(20, 20))
    for i in range(25):
        row = i // 5
        col = i % 5
        if i < len(dates):
            parts = axs[row, col].violinplot(filtered_sunglare_decrease_percentages[i], positions=[1], widths=0.3, showmeans=False, showmedians=True)
            axs[row, col].set_xlabel(dates[i].strftime('%H:%M'))
            axs[row, col].set_xticks([1])
            axs[row, col].set_xticklabels([''])
            axs[row, col].set_xlim(0.8, 1.2)
            if col == 0:
                axs[row, col].set_ylabel("眩光减少百分比 (%)")
            else:
                # axs[row, col].set_yticklabels([])
                1
            # 设置小提琴图的颜色
            for pc in parts['bodies']:
                pc.set_alpha(0.3)
            # 设置均值和中位数的颜色,带数字
            # for partname in ('cmeans', 'cmedians'):
            #     vp = parts[partname]
            #     vp.set_edgecolor('brown' if partname == 'cmeans' else 'green')
            #     vp.set_linewidth(1.5)
            #     vp.set_linestyle('--')
            #     # 添加标记，均值向上移动，中位数向下移动
            #     y = np.mean(filtered_sunglare_decrease_percentages[i]) if partname == 'cmeans' else np.median(filtered_sunglare_decrease_percentages[i])
            #     offset = -0.5 if partname == 'cmeans' else 0.5
            #     axs[row, col].text(1.1, y + offset, f'{y:.2f}', color=vp.get_edgecolor(), va='center')
            # 设置均值和中位数的颜色,不带数字
            # for partname in ('cmeans', 'cmedians'):
            #     vp = parts[partname]
            #     vp.set_edgecolor('brown' if partname == 'cmeans' else 'green')
            #     vp.set_linewidth(1.5)
            #     vp.set_linestyle('--')
            # if i == 24:
            #     axs[row, col].legend([parts['cmeans'], parts['cmedians']], ['均值', '中位数'], loc='upper right')
            # 只显示中位数，不显示均值，且中位数不带数字
            for partname in ('cmedians',):
                vp = parts[partname]
                vp.set_edgecolor('green')
                vp.set_linewidth(1.5)
                vp.set_linestyle('--')
            if i == 24:
                axs[row, col].legend([parts['cmedians']], ['中位数'], loc='lower right')

        else:
            axs[row, col].axis('off')
    plt.tight_layout()
    plt.savefig(r'E:\webgislocation\analysis\sunglare_decrease_percentage_violinplot.png')

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
    # draw_sunglare_occurrence_rate(result_analyse_folder)
    draw_distance_increase_percentage(result_analyse_folder)
    # draw_distance_increase_percentage_violinplot(result_analyse_folder)
    # draw_sunglare_decrease_percentage(result_analyse_folder)
    # draw_sunglare_decrease_percentage_violinplot(result_analyse_folder)

if __name__ == '__main__':
    main()