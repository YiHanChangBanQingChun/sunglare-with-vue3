import geopandas as gpd
import matplotlib.pyplot as plt
from pathlib import Path
import time
import matplotlib.patches as mpatches
import pyproj

def plot_data(pano_dot_path, ring3rd_path, sanhuan_path, time_field=None, plot_all=False, output_dir=None):
    # 读取数据
    pano_dot = gpd.read_file(pano_dot_path)
    ring3rd = gpd.read_file(ring3rd_path)
    sanhuan = gpd.read_file(sanhuan_path)

    # 创建输出目录
    if output_dir:
        output_dir = Path(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)

    def create_plot(ax, label, title=None):
        # 绘制三环面，只显示边界
        sanhuan.boundary.plot(ax=ax, edgecolor='black')

        # 绘制路网，设置为灰色
        ring3rd.plot(ax=ax, color='grey')

        # 去除图形标题
        ax.set_axis_off()

        # 添加左下角标签
        if title:
            label = f"{label} {title}"
        ax.text(0, 0, label, transform=ax.transAxes, verticalalignment='bottom')  # 下移标签

    def parse_field(field):
        # 假设field格式为 tHH_MM_SS
        parts = field[1:].split('_')  # 去掉第一个字符 't'
        month = 5
        day = 15
        hour = int(parts[0])
        minute = int(parts[1])
        return f"{hour}时{minute}分"

    if plot_all:
        fig, ax = plt.subplots(figsize=(12, 12))  # 增加画布大小
        plt.subplots_adjust(left=0, right=1, top=1, bottom=0)  # 调整边距
        create_plot(ax, '(a)', '武汉市三环内5月15日所有眩光点')
        pano_dot.plot(ax=ax, color='red', markersize=2, zorder=5)
        if output_dir:
            plt.savefig(output_dir / 'plot_all_points.png')
    else:
        if time_field:
            fig, ax = plt.subplots(figsize=(12, 12))  # 增加画布大小
            plt.subplots_adjust(left=0, right=1, top=1, bottom=0)  # 调整边距
            title = parse_field(time_field)
            create_plot(ax, '(a)', title)
            pano_dot_filtered = pano_dot[pano_dot[time_field] == 1]
            pano_dot_filtered.plot(ax=ax, color='red', markersize=2, zorder=5)
            if output_dir:
                plt.savefig(output_dir / f'plot_{time_field}.png')
        else:
            time_fields = [col for col in pano_dot.columns if col.startswith('t')]
            label_counter = ord('a')
            for field in time_fields:
                fig, ax = plt.subplots(figsize=(12, 12))  # 增加画布大小
                plt.subplots_adjust(left=0, right=1, top=1, bottom=0)  # 调整边距
                title = parse_field(field)
                label = f'({chr(label_counter)})'
                create_plot(ax, label, title)
                pano_dot_filtered = pano_dot[pano_dot[field] == 1]
                pano_dot_filtered.plot(ax=ax, color='red', markersize=2, zorder=5)
                if output_dir:
                    plt.savefig(output_dir / f'plot_{field}.png')
                label_counter += 1

# 确定全局可以正常在画布显示中文
def set_ch():
    from matplotlib import font_manager as fm, rcParams
    import os

    # 指定宋体和 Times New Roman 字体的路径
    simsun_path = os.path.join('C:\\Windows\\Fonts', 'simsun.ttc')
    times_new_roman_path = os.path.join('C:\\Windows\\Fonts', 'timesbi.ttf')

    # 加载字体
    if os.path.exists(simsun_path):
        simsun_font = fm.FontProperties(fname=simsun_path)
        rcParams['font.sans-serif'] = [simsun_font.get_name()]
    if os.path.exists(times_new_roman_path):
        times_new_roman_font = fm.FontProperties(fname=times_new_roman_path)
        rcParams['font.serif'] = [times_new_roman_font.get_name()]

    rcParams['font.family'] = 'sans-serif'
    rcParams['axes.unicode_minus'] = False  # 解决保存图像时负号'-'显示为方块的问题
    rcParams['font.size'] = 32  # 字体加大
    rcParams['font.weight'] = 'bold'  # 字体加粗

def add_north(ax, labelsize=34, loc_x=0.5, loc_y=0.55, width=0.24, height=0.40, pad=0.14):
    """
    画一个比例尺带'N'文字注释
    主要参数如下
    :param ax: 要画的坐标区域 Axes实例 plt.gca()获取即可
    :param labelsize: 显示'N'文字的大小
    :param loc_x: 以文字下部为中心的占整个ax横向比例
    :param loc_y: 以文字下部为中心的占整个ax纵向比例
    :param width: 指南针占ax比例宽度
    :param height: 指南针占ax比例高度
    :param pad: 文字符号占ax比例间隙
    :return: None
    """
    minx, maxx = ax.get_xlim()
    miny, maxy = ax.get_ylim()
    ylen = maxy - miny
    xlen = maxx - minx
    left = [minx + xlen*(loc_x - width*.5), miny + ylen*(loc_y - pad)]
    right = [minx + xlen*(loc_x + width*.5), miny + ylen*(loc_y - pad)]
    top = [minx + xlen*loc_x, miny + ylen*(loc_y - pad + height)]
    center = [minx + xlen*loc_x, left[1] + (top[1] - left[1])*.4]
    triangle = mpatches.Polygon([left, top, right, center], color='k')
    ax.text(s='N',
            x=minx + xlen*loc_x,
            y=miny + ylen*(loc_y - pad + height),
            fontsize=labelsize,
            horizontalalignment='center',
            verticalalignment='bottom')
    ax.add_patch(triangle)

def add_scale(ax, length=1000, location=(0.5, -0.3), linewidth=3, fontsize=18):
    """
    添加比例尺
    :param ax: 要画的坐标区域 Axes实例 plt.gca()获取即可
    :param length: 比例尺长度（米）
    :param location: 比例尺位置
    :param linewidth: 比例尺线宽
    :param fontsize: 比例尺字体大小
    :return: None
    """
    minx, maxx = ax.get_xlim()
    miny, maxy = ax.get_ylim()
    xlen = maxx - minx
    ylen = maxy - miny

    # 获取中心点的经纬度
    center_lon = (minx + maxx) / 2
    center_lat = (miny + maxy) / 2

    # 使用pyproj计算比例尺长度对应的经度差
    geod = pyproj.Geod(ellps='WGS84')
    lon1, lat1, _ = geod.fwd(center_lon, center_lat, 90, length)  # 向东计算length米后的经度
    length_lon = lon1 - center_lon

    x_start = minx + xlen * location[0]
    y_start = miny + ylen * location[1]
    ax.plot([x_start, x_start + length_lon], [y_start, y_start], color='k', linewidth=linewidth)
    ax.text(x_start + length_lon / 2, y_start + ylen * 0.02, f'{round(length/1000,0)} km', fontsize=fontsize, ha='center')

def plot_all_with_time_series(pano_dot_path, ring3rd_path, sanhuan_path, output_dir=None):
    # 读取数据
    pano_dot = gpd.read_file(pano_dot_path)
    ring3rd = gpd.read_file(ring3rd_path)
    sanhuan = gpd.read_file(sanhuan_path)

    # 创建输出目录
    if output_dir:
        output_dir = Path(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)

    def create_plot(ax, label, title=None):
        # 绘制三环面，只显示边界
        sanhuan.boundary.plot(ax=ax, edgecolor='black')

        # 绘制路网，设置为灰色
        ring3rd.plot(ax=ax, color='grey')

        # 去除图形标题
        ax.set_axis_off()

        # 添加左下角标签
        if title:
            label = f"{label} {title}"
        ax.text(0, 0, label, transform=ax.transAxes, verticalalignment='bottom')  # 下移标签

    def parse_field(field):
        # 假设field格式为 tHH_MM_SS
        parts = field[1:].split('_')  # 去掉第一个字符 't'
        hour = int(parts[0])
        minute = int(parts[1])
        if hour < 10:
            hour = f'0{hour}'
        if minute == 0:
            minute = '00'
        return f"{hour}:{minute}"

    fig, axes = plt.subplots(4, 4, figsize=(24, 24))  # 增加画布大小
    plt.subplots_adjust(left=0.05, right=0.95, top=0.95, bottom=0.05, wspace=0.1, hspace=0.1)  # 调整边距和间距

    # 绘制所有点的图在左上角
    create_plot(axes[0, 0], '(a)', '全天')
    pano_dot.plot(ax=axes[0, 0], color='red', markersize=2, zorder=5)

    time_fields = [col for col in pano_dot.columns if col.startswith('t')]
    print(time_fields)
    # 去除第一个时间字段
    # time_fields = time_fields[1:]
    label_counter = ord('b')
    for i in range(1, 15):
        row, col = divmod(i, 4)
        field_index = (i - 1) * 2
        if field_index < len(time_fields):
            field = time_fields[field_index]
            title = parse_field(field)
            label = f'({chr(label_counter)})'
            create_plot(axes[row, col], label, title)
            pano_dot_filtered = pano_dot[pano_dot[field] == 1]
            pano_dot_filtered.plot(ax=axes[row, col], color='red', markersize=2, zorder=5)
            label_counter += 1
        else:
            axes[row, col].axis('off')

    # 绘制图例在第15格
    ax = axes[3, 2]
    ax.set_axis_off()
    ax.plot([], [], 'ro', label='眩光发生点')
    ax.plot([], [], 'grey', label='路网')
    # ax.add_patch(mpatches.Patch(color='red', label='三环面'))
    ax.legend(loc='center', fontsize=34)

    # 在plot_all_with_time_series函数中，更新绘制指北针和比例尺的部分
    # 绘制指北针和比例尺在第16格
    ax = axes[3, 3]
    ax.set_axis_off()
    sanhuan.boundary.plot(ax=ax, edgecolor='white', alpha=0)  # 绘制透明的三环线面
    plt.subplots_adjust(left=0.05, right=0.95, top=0.95, bottom=0.05, wspace=0.1, hspace=0.1)
    add_north(ax)
    add_scale(ax, length=20000, location=(0.17, 0.3), linewidth=6, fontsize=34)

    if output_dir:
        plt.savefig(output_dir / 'plot_all_with_time_series.png')
        # t05_30_00,t05_40_00,t05_50_00,t06_00_00,t06_10_00,t06_20_00,
        # t06_30_00,t06_40_00,t06_50_00,t07_00_00,t07_10_00,t07_20_00,
        # t07_30_00,t17_10_00,t17_20_00,t17_30_00,t17_40_00,t17_50_00,
        # t18_00_00,t18_10_00,t18_20_00,t18_30_00,t18_40_00,t18_50_00,
        # t19_00_00

def main():
    set_ch()
    # plot_data(
    #     pano_dot_path=r'E:\webgislocation\analysis\v20241227\region\pano_dot.shp',
    #     ring3rd_path=r'E:\webgislocation\analysis\v20241227\region\ring3rd.shp',
    #     sanhuan_path=r'E:\webgislocation\三环\武汉市_三环线\武汉市三环面_wgs.shp',
    #     time_field=None,
    #     plot_all=True,
    #     output_dir=r'E:\webgislocation\analysis\v20241227\change0104\plt\time_diff'
    # )
    # plot_data(
    #     pano_dot_path=r'E:\webgislocation\analysis\v20241227\region\pano_dot.shp',
    #     ring3rd_path=r'E:\webgislocation\analysis\v20241227\region\ring3rd.shp',
    #     sanhuan_path=r'E:\webgislocation\三环\武汉市_三环线\武汉市三环面_wgs.shp',
    #     time_field=None,
    #     plot_all=False,
    #     output_dir=r'E:\webgislocation\analysis\v20241227\change0104\plt\time_diff'
    # )
    plot_all_with_time_series(
        pano_dot_path=r'E:\webgislocation\analysis\v20241227\region\pano_dot.shp',
        ring3rd_path=r'E:\webgislocation\analysis\v20241227\region\ring3rd.shp',
        sanhuan_path=r'E:\webgislocation\三环\武汉市_三环线\武汉市三环面_wgs.shp',
        output_dir=r'E:\webgislocation\analysis\v20241227\change0104\plt\time_diff'
    )

if __name__ == '__main__':
    main()