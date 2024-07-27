--ALTER TABLE wuhanrd ADD COLUMN source integer;
--ALTER TABLE wuhanrd ADD COLUMN target integer;
--ALTER TABLE wuhanrd ADD COLUMN length double precision;
--SELECT pgr_createTopology('wuhanrd',0.0001, 'geom', 'gid');
--CREATE INDEX source_idx ON wuhanrd ("source");
--CREATE INDEX target_idx ON wuhanrd ("target");
--update wuhanrd set length =st_length(geom);
--ALTER TABLE wuhanrd ADD COLUMN reverse_cost double precision;
--UPDATE wuhanrd SET reverse_cost =length;

SELECT dijkstra.seq, dijkstra.path_seq, dijkstra.node, dijkstra.edge, dijkstra.cost, w.geom
FROM pgr_dijkstra(
    'SELECT gid AS id, source, target, length AS cost FROM wuhanrd',
    1695, -- 起点ID
    1680, -- 终点ID
    false -- directed graph (有向图或无向图)
) AS dijkstra
JOIN wuhanrd AS w ON dijkstra.edge = w.gid
WHERE dijkstra.edge > 0;

/*WITH start_point AS (
  SELECT id FROM wuhanrd_vertices_pgr
  ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(114.43,30.421), 4326) LIMIT 1
), end_point AS (
  SELECT id FROM wuhanrd_vertices_pgr
  ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(114.35,30.5232), 4326) LIMIT 1
)
SELECT dijkstra.seq, dijkstra.path_seq, dijkstra.node, dijkstra.edge, dijkstra.cost, w.geom
FROM pgr_dijkstra(
    'SELECT gid AS id, source, target, length AS cost FROM wuhanrd',
    (SELECT id FROM start_point), -- 起点ID
    (SELECT id FROM end_point), -- 终点ID
    false -- directed graph (有向图或无向图)
) AS dijkstra
JOIN wuhanrd AS w ON dijkstra.edge = w.gid
WHERE dijkstra.edge > 0;*/