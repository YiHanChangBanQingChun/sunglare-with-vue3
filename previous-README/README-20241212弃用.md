# 太阳眩光路径规划与数据服务平台 (sun-glare-project)
***
+ **背景**：
  + *在我国经济持续高速发展的背景下，私人轿车及其他交通工具的数量急剧增长，交通网络日益复杂多样。与此同时，太阳眩光对道路交通安全构成的威胁也日益凸显，“太阳眩光”与“安全驾驶”成为公众热议的话题之一。研究表明，太阳眩光作为一种常见的驾驶干扰因素，在日出和日落时分尤为严重，由于阳光与地平线的低角度，容易通过车辆前挡风玻璃、道路标志、建筑物玻璃幕墙等反射，造成驾驶员瞬间致盲或视力模糊，可能导致驾驶员瞬间致盲或视力模糊，增加交通事故的风险。因此，用户迫切需要一种工具来预测和规避太阳眩光，以减少由此引起的交通事故和不便。*
  + *目前市场上对于驾驶安全辅助工具的需求日益增长，尤其是在自动驾驶技术尚未完全成熟的情况下，结合太阳眩光影响的路径规划系统作为一种辅助工具，有望填补市场空白，满足用户对于安全驾驶的需求。*
  + *网站将提供直观的地图展示和简洁的操作流程，确保用户能够快速方便地获取所需信息。*
  + *网站利用了GIS技术和大数据分析，结合深度学习模型，如在Cityscapes数据集上预训练的DeepLabv3模型，可以精确模拟太阳路径和光线，为用户提供准确的眩光预测。*
  + *在确定选定区域之后，我们需要进行道路提取，并在道路上选取特定间隔的点进行标注。这些标注点将作为收集街景影像的依据，同时也将用于判断太阳眩光的位置。为了获取特定位置和时间的太阳位置，首先需要使用NOAA（美国国家海洋和大气管理局）地球系统实验室（ESRL, Earth System Research Laboratory）提出的太阳位置估算法。这是一种基于天文和地球物理参数的算法，旨在精确计算太阳相对于地球表面的位置。该算法利用了球面三角学的基本公式，计算出太阳的高度角和方位角，通过这两个角度可以确定太阳在天空中的精确位置。我们可以利用这个算法来估计任何特定时刻的太阳位置，同时考虑天气条件（例如是否晴天），从而推断出给定时刻和地点处是否有太阳照射。*
  + *在先前的数据处理过程中，我们获得了大量的点数据。接下来，我们需要利用百度街景的API接口，通过这些点的坐标来收集街景图像。随后，我们将进行图像处理，利用PSPNet模型对街景图像中的天空部分进行提取，并生成鱼眼图片。然后，结合太阳的方位角和高度角数据，将其映射到图像上，以判断太阳的位置是否位于天空区域，从而完成对太阳眩光在多个时空的识别。本系统基于Jurado-Piña和Pardillo Mayora的研究成果，将太阳眩光形成的标准进行了量化。具体而言，我们采用了两个关键标准来识别可能受到太阳眩光影响的点：首先，驾驶人方向与太阳方位角之差的绝对值小于25度；其次，驾驶人位置的太阳高度角和坡度之差的绝对值小于25度。只有当这两个标准均满足时，我们才能确定该点在特定时间受到太阳眩光影响的可能性非常高。*
  + *首先，根据之前提到的太阳位置和街景影像数据，对特定区域内每个路段的太阳眩光程度进行评估。这可以通过计算每个路段在不同时间段内受到太阳眩光影响的概率或强度来实现。太阳眩光程度的评估应该综合考虑太阳高度角、方位角以及路面坡度等因素，以便更准确地反映眩光影响的实际情况。根据眩光程度评估结果，利用路径规划算法生成避免太阳眩光的最佳行车路线。可以使用Dijkstra算法或A star算法等。在路径规划过程中，将太阳眩光程度作为一个约束条件，确保生成的路线避开受太阳眩光影响较大的路段。使用前端开发技术（例如JavaScript、HTML、CSS）结合地图API（例如ArcGIS Map SDK for JS）实现优化后行车路线的交互式展示。在网页上展示地图，并提供用户交互功能，让用户可以选择不同时间段的行车路线，并查看路线详情和实时交通情况。用户可以根据自身需求选择最适合的路线，以避免太阳眩光的影响。*
  + *结合太阳眩光影响的路径规划系统建立之后，不仅可以提升驾驶安全性，减少由太阳眩光引起的交通事故，还能为城市规划、交通管理和环境科学研究提供有力的数据支持，具有显著的社会效益。*
  + *这个项目是为了分析和展示不同条件下的太阳眩光影响。以下是项目的设置和运行指南。*
***
1. **提示**：
   1. 请判断自身条件，开发环境需要内存大于40g（假设未安装各种插件），部署环境需要至少25g；
   2. 开发环境需要安装node.js、vue.cli、axios、geoscene api for js、echarts，visual c++ bulild tool、postgresql以及对应版本postgis、python3.11.4以及requirements.txt对应文件；
   3. 部署环境需要安装nginx、postgresql及对应版本posgis、python3.11.4以及requirements.txt对应文件。
***
2. **开发环境部署方法**：
   1. 从GitHub拉取项目，放置到你想放置的地方；
   2. 原地解压sql.zip；
   3. 下载好了node.js后，在相应的项目目录打开cmd，输入*npm install*，会自动安装所需要的插件；
   4. 创建虚拟环境，在你的python3.11.4版本区域打开cmd，输入*python -m venv flask-py11*，创建虚拟环境；
   5. 之后输入*.\venv\Scripts\activate*，激活虚拟环境；
   6. 然后使用cd，改变到项目所在位置；
   7. 输入*python setup.py*，按流程操作即可；
   8. 完成后，你需要修改server-app.py中关于数据库的配置；
   9. 运行项目，需要在flask-py11环境在对应项目的func文件夹的cmd中输入*python server-app.py*；
   10. 打开cmd，修改到项目位置，输入*npm run serve*，稍后在提示地址即可打开。
***
3. **生产环境部署方法**：
   1. 从GitHub拉取项目，放置到你想放置的地方；
   2. 原地解压sql.zip,dist.zip；
   3. 下载nginx，解压后，将conf里的nginx.conf替换为项目文件夹中的nginx.conf，并且将该文件里面的32到55行进行微调
      ```Python
      server {
           listen       80; # 修改成你的监听端口，80需要在防火墙开放
           server_name  112.125.122.56; # 修改成你的服务器ip

           location /sun-glare-project/ {
               root C:/dist/;  # 指向Vue构建输出目录的父目录，修改成dist的位置
               try_files $uri $uri/ /sun-glare-project/index.html;
           }

           location /sun-glare-project/api/ {
               rewrite ^/sun-glare-project/api/(.*)$ /api/$1 break;
               proxy_pass http://127.0.0.1:5000; # 修改成你的flask后端运行位置（默认5000）
               proxy_set_header Host $host;
               proxy_set_header X-Real-IP $remote_addr;
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
               proxy_set_header X-Forwarded-Proto $scheme;
               add_header Access-Control-Allow-Origin *;
               add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
               add_header Access-Control-Allow-Headers 'Origin, Content-Type, Accept, Authorization';

               if ($request_method = OPTIONS) {
                   return 204;
               }
           }
      ```
   4. 之后，在nginx文件夹，启动cmd，输入start nginx，运行程序，如果需要退出，输入nginx -s stop；
   5. 创建虚拟环境，在你的python3.11.4版本区域打开cmd，输入*python -m venv flask-py11*，创建虚拟环境；
   6. 之后输入*.\venv\Scripts\activate*，激活虚拟环境；
   7. 然后使用cd，改变到项目所在位置；
   8. 输入*python setup.py*，按流程操作即可；
   9. 完成后，你需要修改server-app.py中关于数据库的配置；
   10. 运行项目，需要在flask-py11环境在对应项目的func文件夹的cmd中输入*python server-app.py*。