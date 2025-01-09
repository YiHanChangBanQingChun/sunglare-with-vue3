def rotate_panorama(image_path, yaw, output_path=None):
    """
    将街景图沿水平方向根据yaw进行裁切拼接。
    :param image_path: 原图路径
    :param yaw: 水平转动角度（0-360）
    :param output_path: 输出图路径，可选
    :return: 处理好的图像对象
    """
    from PIL import Image
    import numpy as np
    
    img = Image.open(image_path)
    arr = np.array(img)
    # 计算需要平移的像素宽度
    yaw = 360 - yaw
    shift = int(round((yaw / 360) * arr.shape[1]))
    
    # 拼接：右侧移到左侧，等量右侧对应区域丢弃
    shifted = np.concatenate([arr[:, shift:, :], arr[:, :shift, :]], axis=1)
    
    out_img = Image.fromarray(shifted)
    if output_path:
        out_img.save(output_path)
    return out_img


def cylinder2fisheyeImage(panoImg, yaw, outputImgFile='fisheye.jpg'):
    """
    原始的鱼眼转换逻辑，panoImg 参数直接是一个 numpy 数组
    （不在此函数内部重复读取图像文件）。
    """
    import cv2
    import numpy as np
    import math
    from PIL import Image

    # 读取输入全景图的尺寸信息
    dims = panoImg.shape
    Hs = dims[0]
    Ws = dims[1]

    # 在此示例中，取上半部分图像
    panoImg2 = panoImg[0:int(Hs/2), :]
    del panoImg

    # 旋转角的定义
    rotateAng = 360 - float(yaw)
    # 得到鱼眼的半径
    R1 = 0
    R2 = int(2 * Ws / (2 * np.pi) - R1 + 0.5)
    R22 = Hs + R1

    # 估计球体或鱼眼图像的大小
    Hd = int(Ws / np.pi) + 2
    Wd = int(Ws / np.pi) + 2

    xmap = np.zeros((Hd, Wd), np.float32)
    ymap = np.zeros((Hd, Wd), np.float32)

    # 目标图像或球体图像的中心
    CSx = int(0.5 * Wd)
    CSy = int(0.5 * Hd)

    # 将球体图像分成四个部分，并为每个部分重新投影全景
    for yD in range(Hd):
        for xD in range(CSx):
            r = math.sqrt((yD - CSy) ** 2 + (xD - CSx) ** 2)
            theta = 0.5 * np.pi + math.atan((yD - CSy) / (xD - CSx + 0.0000001))
            xS = theta / (2 * np.pi) * Ws
            yS = (r - R1) / (R2 - R1) * Hs
            xmap.itemset((yD, xD), xS)
            ymap.itemset((yD, xD), yS)
        for xD in range(CSx, Wd):
            r = math.sqrt((yD - CSy) ** 2 + (xD - CSx) ** 2)
            theta = 1.5 * np.pi + math.atan((yD - CSy) / (xD - CSx + 0.0000001))
            xS = theta / (2 * np.pi) * Ws
            yS = (r - R1) / (R2 - R1) * Hs
            xmap.itemset((yD, xD), xS)
            ymap.itemset((yD, xD), yS)

    # 利用仿射生成新的半球形图像
    outputImg = cv2.remap(panoImg2, xmap, ymap, cv2.INTER_CUBIC)
    del xmap, ymap, panoImg2

    # 去掉底部中心栏的黑线
    if len(dims) > 2:
        outputImg[int(CSy):, CSx, :] = outputImg[int(CSy):, CSx - 1, :]
        outputImg[int(CSy):, int(CSx + 0.5), :] = outputImg[CSy:, int(CSx + 0.5) + 1, :]
    else:
        outputImg[int(CSy):, CSx] = outputImg[int(CSy):, CSx - 1]
        outputImg[int(CSy):, int(CSx + 0.5)] = outputImg[int(CSy):, int(CSx + 0.5) + 1]

    dims = outputImg.shape
    rows = dims[0]
    cols = dims[1]

    M = cv2.getRotationMatrix2D((cols / 2, rows / 2), rotateAng, 1)
    rotatedFisheyeImg = cv2.warpAffine(outputImg, M, (cols, rows))

    img = Image.fromarray(rotatedFisheyeImg)
    img.save(outputImgFile)
    del img
    return rotatedFisheyeImg

import math
import numpy as np
from PIL import Image

def equirectangular_to_fisheye(input_image_path, output_image_path):
    # 加载全景影像
    equirect_img = Image.open(input_image_path)
    width, height = equirect_img.size  # 全景影像的宽度和高度
    equirect_array = np.array(equirect_img)
    
    # 定义鱼眼影像的尺寸
    fisheye_size = 653
    fisheye_img = np.zeros((fisheye_size, fisheye_size, 3), dtype=np.uint8)
    
    # 鱼眼图像中心点
    center = fisheye_size // 2
    
    for yh in range(-center, center):
        for xh in range(-center, center):
            # 转换为极坐标
            r = np.sqrt(xh**2 + yh**2)
            if r > center:  # 超出鱼眼范围
                continue
            
            alpha = np.arctan2(-yh, -xh) + np.pi/2 # alpha 角度
            # alpha 映射到 [0, 2π]
            alpha = alpha if alpha >= 0 else (alpha + 2 * np.pi)
            
            # 计算全景影像上的点坐标
            xp = int((alpha / (2 * np.pi)) * width)
            yp = int((r / center) * (height / 2))  # yp 映射到全景影像
            
            # 检查边界
            if 0 <= xp < width and 0 <= yp < height:
                fisheye_img[yh + center, xh + center] = equirect_array[yp, xp]
    
    # 保存鱼眼影像
    fisheye_img_pil = Image.fromarray(fisheye_img)
    fisheye_img_pil.save(output_image_path)


def main():
    pano_path = r"E:\webgislocation\analysis\v20241227\change0104\plt\sky_yaw.png"
    equirectangular_to_fisheye(pano_path, r"E:\webgislocation\analysis\v20241227\change0104\plt\my_fisheye_653.png")

if __name__ == "__main__":
    main()


# def main():
#     import cv2

#     # 1) 先对原始图像做扭转
#     yaw = 224.08
#     sky = r"E:\webgislocation\analysis\v20241227\change0104\plt\09000200011604211546465902H_panorama.png"
#     sky_yaw = r"E:\webgislocation\analysis\v20241227\change0104\plt\sky_yaw.png"
#     rotate_panorama(sky, yaw, sky_yaw)
    
#     # 2) 在主函数里，用 cv2 读取拼接好的图像，转换为 numpy 数组后，再调用 cylinder2fisheyeImage
#     pano_arr = cv2.imread(sky_yaw, cv2.IMREAD_COLOR)
#     cylinder2fisheyeImage(pano_arr, 0, r"E:\webgislocation\analysis\v20241227\change0104\plt\sky_fisheye.png")


# if __name__ == '__main__':
#     main()