# 太阳眩光项目 (sun-glare-project)

这个项目是为了分析和展示不同条件下的太阳眩光影响。以下是项目的设置和运行指南。
***

## 前端项目设置

1. 安装依赖
   
    + 首先，你需要安装项目依赖。打开终端（命令行），导航到项目的根目录，然后运行以下命令：
    ```cmd
    cd /your-project-path/sun-glare-project
    npm install
    ```

    + 这个命令会根据 `package.json` 文件中列出的依赖，下载并安装所有必要的包。这可能需要几分钟的时间。

2. 开发环境下编译和热重载
   
    + 为了在开发过程中实时查看你的更改，你可以运行以下命令来启动一个本地开发服务器：

    ```cmd
    npm run serve
    ```

    + 这个命令会启动一个热重载服务器，当你修改并保存代码后，页面会自动刷新以反映最新的更改。这对于开发和调试非常有用。

3. 生产环境下编译和压缩

    + 当你准备将项目部署到生产环境时，你应该运行以下命令来编译和压缩你的代码，以优化性能：

    ```cmd
    npm run build
    ```

    + 这个命令会在项目的 `dist/` 目录下生成生产环境用的代码。你可以将这个目录的内容部署到任何静态文件服务器上。

4. Lint和修复文件

    + 为了保持代码质量和一致性，你可以使用以下命令来检查和自动修复代码中的问题：

    ```cmd
    npm run lint
    ```

    + 这个命令会检查你的代码，并尝试自动修复任何发现的问题。对于无法自动修复的问题，你需要手动修改。

5. 自定义配置

    + Vue CLI 提供了许多配置选项来定制项目的构建过程。你可以在 Vue CLI 的官方配置参考文档中找到更多信息：[配置参考](https://cli.vuejs.org/config/)

***
## 后端flask部署

1. 安装python版本和依赖

   + 找到后端文件，即func中的server-app.py

   + 使用Python3.11.0

   + 可选：创建虚拟环境

      + 克隆

        ```cmd
        conda create --n flask-py11 python==3.11 
        ```

      + 激活

        ```cmd
        conda activate flask-py11
        ```
        cd到func文件夹中输入，即可完成
        ```cmd
        pip install -r requirements.txt
        ```

   +  注意：
 
      +  这里使用 psycopg2-binary 而不是 psycopg2，因为 psycopg2-binary 是预编译版本，更容易安装，但功能上与 psycopg2 相同。
  
      +  Flask - 用于创建Web应用。
 
      +  Flask-SQLAlchemy - 为Flask应用提供SQLAlchemy支持。

      +  GeoAlchemy2 - 用于在SQLAlchemy中处理地理空间数据。

      +  Flask-CORS - 用于处理跨源资源共享（CORS），允许跨域请求。

      +  psycopg2 - PostgreSQL数据库的适配器。

      +  uuid - 用于生成唯一标识符。

      +  Shapely - 用于处理和操作几何对象。

      +  pip不了就单独装，请仔细阅读报错原因
2. 更换你的数据库访问url

   + 下载postgresql，安装postgis，然后用postgis创建个数据集

   + 改这行代码

    ```Python
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://your-user-name:your-user-password@localhost/your-database-name'
    ```

   + 其中，your开头的部分都换成自己的就行

   + 然后点运行就可以，放在那不用管

   + 适当情况可以加打印信息调试

3. 将数据传入后端以让数据库调用

   + 前置条件，激活postgis

   + 在postgres的安装目录下找bin\postgisgui，里面有个shp2pgsql-gui.exe，用这个传入点shp数据

     + 用wuhanpoi84.shp文件，在sun-glare-project\use-data\test-vector下

     + 注意设置坐标系4326，即需要设置srid

     + 注意使用utf-8显示中文

     + 存储好点后，即可供后端查询
     
     + 注意，目前的列名需要更改为后端搭配的列名，即留意server-app下的模型结构，也要修改表单名字，改成英文的：
       ```python
       class Location(db.Model):
           __tablename__ = 'locations'
           id = db.Column(db.Integer, primary_key=True)
           name = db.Column(db.String(255))
           address = db.Column(db.String(255))
           baidu_longitude = db.Column(db.Float)
           baidu_latitude = db.Column(db.Float)
           wgs84_longitude = db.Column(db.Float)
           wgs84_latitude = db.Column(db.Float)
           baidu_index = db.Column(db.String(255))
           label = db.Column(db.String(255))
           geom = db.Column(Geometry(geometry_type='POINT', srid=4326))

       def __repr__(self):
           return f'<Location {self.name}>'
       ``` 

     + 你喜欢的话也可以用sun-glare-project\use-data\whpoi-wgs84.csv建表单，一样的，方法不做赘述。但需要注意使用postgis创建geom列。但需要注意，用这个方法传入需要使用的csv是notepad打开显示ANSI的csv，不然会报错。需要根据csv文件表头先创建空表，等等等等。

       + 加geom列方法：首先，添加一个新的geom列到你的表中。假设你的表名为your_table，可以使用以下SQL命令：

          ```sql
          ALTER TABLE your_table ADD COLUMN geom geometry(Point, 4326);
          ```
        
       + 其次，使用ST_SetSRID和ST_MakePoint函数将x和y列的值转换为geom列的值：

          ```sql
          ALTER TABLE your_table ADD COLUMN geom geometry(Point, 4326);
          ```

       + 确保geom列已正确填充，可以运行以下查询来检查：
        
          ```sql
          SELECT x, y, ST_AsText(geom) FROM your_table LIMIT 10;
          ```

     + 后面部署用更大的更全的poi，这个是老师给的，即同位置的“whpoi_wgs84_huge.csv”

   + 使用同一个工具，传入路网数据，因为网上教程少，建议按以下步骤做，可以正确部署(注：老方法已经弃用，我根据老方法处理完数据后，直接导出了csv，之后部署可以直接新建表然后复制表。只需要启动了pgrouting和postgis功能就可以操作)
     + 以下是旧方法（已弃用，下滑可查看新方法）
     + 用sun-glare-project\use-data\test-vector下的whrd7line.shp。打断方式在func中的python程序实现，我忘了保存加encording=utf-8了，现在没有路名...

     + 记得使用4326坐标系

     + 勾选第三个和第五个

     + 之后运行后，打开pgadmin4，然后记得先启动pgrouting

     + 键入以下代码（方便展示和写文档合并了，但是每次仅运行一行）
        
        ```SQL
        DELETE FROM whrd7
       WHERE fclass IN ('bridleway', 'footway', 'pedestrian', 'steps', 'cycleway');
        ALTER TABLE whrd7 ADD COLUMN source integer;
        ALTER TABLE whrd7 ADD COLUMN target integer;
        ALTER TABLE whrd7 ADD COLUMN length double precision;
        SELECT pgr_createTopology('whrd7',0.0001, 'geom', 'gid');
        CREATE INDEX source_idx ON whrd7 ("source");
        CREATE INDEX target_idx ON whrd7 ("target");
        update whrd7 set length =st_length(geom);
        ALTER TABLE whrd7 ADD COLUMN reverse_cost double precision;
        UPDATE whrd7 SET reverse_cost =length;
        ```
     + 乘以系数，将成本系数的度换为米
       ```sql
       UPDATE whrd7
       SET length = length * 98049.67060050,
           reverse_cost = reverse_cost * 98049.67060050;
       ``` 
     + 设置单双向正确的成本
       ```sql
       UPDATE whrd7
       SET 
           reverse_cost = CASE 
               WHEN oneway = 'F' THEN 99999 
               ELSE reverse_cost 
           END,
           length = CASE 
               WHEN oneway = 'T' THEN 99999 
               ELSE length 
           END
       WHERE oneway IN ('F', 'T');
       ``` 
     + 新建一列 maxspeed_mps，将 maxspeed 转换为米每秒单位
       ```sql
       ALTER TABLE whrd7 ADD COLUMN maxspeed_mps FLOAT;

       UPDATE whrd7
       SET maxspeed_mps = CASE
           WHEN maxspeed = 0 THEN 50 / 3.6
           ELSE maxspeed / 3.6
       END;
       ``` 
     + 新建两列 forward_time 和 reverse_time
       ```sql
       ALTER TABLE whrd7 ADD COLUMN forward_time FLOAT;
       ALTER TABLE whrd7 ADD COLUMN reverse_time FLOAT;
       ``` 
     + 计算正向和反向的时间成本
       ```sql
       UPDATE whrd7
       SET 
           forward_time = CASE
               WHEN length = 99999 THEN 99999
               ELSE length / maxspeed_mps
           END,
           reverse_time = CASE
               WHEN reverse_cost = 99999 THEN 99999
               ELSE reverse_cost / maxspeed_mps
           END;
       ``` 
     + 完成初始化后，让我们检验一下数据是否可以正确规划路径，以下是直接全部运行的脚本

        ```SQL
       WITH start_vertex AS (
           SELECT id FROM whrd7_vertices_pgr
           ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(114.13257559110757,30.62535117304848), 4326) LIMIT 1
       ), end_vertex AS (
           SELECT id FROM whrd7_vertices_pgr
           ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(114.32733343250193,30.260181353114426), 4326) LIMIT 1
       )
       SELECT seq, path_seq, node, edge, cost, agg_cost, geom, length
       FROM pgr_astar(
           'SELECT gid AS id, source, target, 
           CASE 
               WHEN forward_time = 99999 THEN 99999 
               ELSE forward_time 
           END AS cost, 
           CASE 
               WHEN reverse_time = 99999 THEN 99999 
               ELSE reverse_time 
           END AS reverse_cost, 
           COALESCE(ST_X(ST_StartPoint(geom)), 0) AS x1, COALESCE(ST_Y(ST_StartPoint(geom)), 0) AS y1, 
           COALESCE(ST_X(ST_EndPoint(geom)), 0) AS x2, COALESCE(ST_Y(ST_EndPoint(geom)), 0) AS y2 
           FROM whrd7
           WHERE geom IS NOT NULL AND (ST_GeometryType(geom) = ''ST_LineString'' OR ST_GeometryType(geom) = ''ST_MultiLineString'')',
           (SELECT id FROM start_vertex), (SELECT id FROM end_vertex), directed := true
       ) AS route
       JOIN whrd7 ON route.edge = whrd7.gid;
        ```
      + 以下是新方法（原始文件在use-data.7z里的whrd7.csv以及whrd7_vertices_pgr.csv，使用前先把之前的在数据库的同名路网两个文件给删除或重命名）：

      + 创建表
          ```sql
          CREATE TABLE whrd7 (
              gid SERIAL PRIMARY KEY,
              fclass VARCHAR(255),
              name VARCHAR(255),
              oneway VARCHAR(255),
              maxspeed INTEGER,
              e_angle FLOAT,
              id INTEGER,
              geom GEOMETRY(Geometry, 4326),
              source INTEGER,
              length FLOAT,
              target INTEGER,
              reverse_cost FLOAT,
              maxspeed_mps FLOAT,
              forward_time FLOAT,
              reverse_time FLOAT
          );
          CREATE TABLE whrd7_vertices_pgr (
              id SERIAL PRIMARY KEY,
              cnt INTEGER,
              chk INTEGER,
              ein INTEGER,
              eout INTEGER,
              the_geom GEOMETRY(Geometry, 4326)
          );
          ```
      + 复制表
          ```sql
         COPY whrd7 (gid, fclass, name, oneway, maxspeed, e_angle, id, geom, source, length, target, reverse_cost, maxspeed_mps, forward_time, reverse_time)
         FROM 'D:/path/to/your/whrd7.csv'
         DELIMITER ','
         CSV HEADER;

         COPY whrd7_vertices_pgr (id, cnt, chk, ein, eout, the_geom)
         FROM 'D:/path/to/your/whrd7_vertices_pgr.csv'
         DELIMITER ','
         CSV HEADER;
          ```
      + 之后键入旧方法的查询语句，也可以得到一样的结果
    + 
    + 目前只是简单搭建，这个路径规划的限制条件未增加，后面估计要结合眩光更改

    + 创建用户信息表单，在query tool键入以下语句即可
       
        ```sql
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(80) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        security_question VARCHAR(100) NOT NULL,
        security_answer VARCHAR(100) NOT NULL,
        birthday DATE NOT NULL
        );
        ```

***

## 恭喜完成项目部署！可以开始愉快coding了！祝你好运！


## 记录(可以写下工作情况、内容、等等)：

1. **Vue项目开发流程**：
   
    1. **拉取项目**：从GitHub或其他版本控制系统拉取最新的项目代码。
    
    ```sh
    git pull origin main
    ```
    
    2. **安装依赖**：每次拉取项目后，安装项目所需的依赖包。
    
    ```sh
    npm install
    ```
    
    3. **开发**：启动开发服务器进行开发。
    
    ```sh
    npm run serve
    ```
    
    4. **停止开发服务器**：在完成代码编写后，停止开发服务器。
    
    ```sh
    Ctrl + C
    ```
    
    5. **构建项目**：构建生产环境的代码。
    
    ```sh
    npm run build
    ```
    
    6. **提交代码**：将代码提交到GitHub或其他版本控制系统。
    
    ```sh
    git add .
    git commit -m "你的提交信息"
    git push origin main
    ```
    
    这个循环可以帮助你保持项目的最新状态，并确保所有依赖项都是最新的。

2. **服务器部署流程**

    1. **大部分同上**
    例如数据库创立，运行python。
    
    2. **注意nginx的conf文件修改**
    文件备份我备份在了func里面。

    3. **需要运行npm run build打包成disk**
    把disk复制到服务器上，注意和nginx的指定的位置一样。

    4. **注意修改server-app.py的main部分，使其监听所有端口**