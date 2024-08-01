
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
   + 目前我用的是py3.11.4，感觉版本影响不大，因为包少
   ```cmd
   pip install Flask Flask-SQLAlchemy GeoAlchemy2 Flask-CORS psycopg2-binary uuid shapely
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
2. 更换你的数据库访问url
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
     + 注意设置坐标系4326
     + 注意使用utf-8显示中文
     + 存储好点后，即可供后端查询
     + 你喜欢的话也可以用sun-glare-project\use-data\whpoi-wgs84.csv建表单，一样的，方法不做赘述。但需要注意，用这个方法传入需要使用的csv是notepad打开显示ANSI的csv，不然会报错。需要根据csv文件表头先创建空表，等等等等。
     + 后面部署用更大的更全的poi，这个是老师给的，即同位置的“whpoi_wgs84_huge.csv”
   + 使用同一个工具，传入路网数据，因为网上教程少，建议按以下步骤做，可以正确部署
     + 用sun-glare-project\use-data\test-vector下的whrd7line.shp。打断方式在func中的python程序实现，我忘了保存加encording=utf-8了，现在没有路名...
     + 记得使用4326坐标系
     + 勾选第三个和第五个
     + 之后运行后，打开pgadmin4，然后记得先启动pgrouting
     + 键入以下代码（方便展示和写文档合并了，但是每次仅运行一行）
    ```SQL
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
     + 完成初始化后，让我们检验一下数据是否可以正确规划路径以下是直接全部运行的脚本
    ```SQL
    WITH start_vertex AS (
    SELECT id FROM whrd7_vertices_pgr
    ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(114.13257559110757,30.62535117304848), 4326) LIMIT 1
    ), end_vertex AS (
    SELECT id FROM whrd7_vertices_pgr
    ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(114.32733343250193,30.260181353114426), 4326) LIMIT 1
    )
    SELECT seq, path_seq, node, edge, cost, agg_cost, geom
    FROM pgr_astar(
    'SELECT gid AS id, source, target, length AS cost, reverse_cost, 
    COALESCE(ST_X(ST_StartPoint(geom)), 0) AS x1, COALESCE(ST_Y(ST_StartPoint(geom)), 0) AS y1, 
    COALESCE(ST_X(ST_EndPoint(geom)), 0) AS x2, COALESCE(ST_Y(ST_EndPoint(geom)), 0) AS y2 
    FROM whrd7
    WHERE geom IS NOT NULL AND (ST_GeometryType(geom) = ''ST_LineString'' OR ST_GeometryType(geom) = ''ST_MultiLineString'')',
    (SELECT id FROM start_vertex), (SELECT id FROM end_vertex), directed := true
    ) AS route
    JOIN whrd7 ON route.edge = whrd7.gid;
    ```
    + 目前只是简单搭建，这个路径规划的限制条件未增加，后面估计要结合眩光更改
***
## 恭喜完成项目部署！可以开始愉快coding了！祝你好运！