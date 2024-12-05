import subprocess
import csv
from collections import defaultdict
from datetime import datetime

# 定义仓库路径
repo_path = 'E:/webgislocation/sun-glare-project'

# 初始化统计数据
print("正在统计代码贡献...")
author_stats = defaultdict(lambda: {'commits': 0, 'lines_added': 0, 'lines_deleted': 0, 'last_commit': None, 'lines_current': 0})
file_lines = defaultdict(lambda: defaultdict(lambda: {'added': 0, 'deleted': 0}))

# 获取所有作者的提交记录
print("获取所有作者的提交记录...")
authors = subprocess.check_output(['git', 'log', '--format=%aN'], cwd=repo_path).decode('utf-8').splitlines()
unique_authors = set(authors)

# 获取每个作者的增加和删除行数
for author in unique_authors:
    print(f"正在处理作者 {author} 的提交记录...")
    log_output = subprocess.check_output(
        f'git log --author="{author}" --pretty=tformat: --numstat',
        cwd=repo_path,
        shell=True
    ).decode('utf-8').splitlines()
    
    lines_added = 0
    lines_deleted = 0
    for line in log_output:
        if line:
            parts = line.split()
            if len(parts) == 3:
                added, deleted, file_path = parts
                if added.isdigit() and deleted.isdigit():
                    lines_added += int(added)
                    lines_deleted += int(deleted)
                    file_lines[file_path][author]['added'] += int(added)
                    file_lines[file_path][author]['deleted'] += int(deleted)
    
    author_stats[author]['lines_added'] = lines_added
    author_stats[author]['lines_deleted'] = lines_deleted

# 获取每个作者的提交次数和最后一次提交时间
commits = subprocess.check_output(['git', 'log', '--pretty=format:%H,%aN,%ct'], cwd=repo_path).decode('utf-8').splitlines()
for commit in commits:
    commit_hash, author, timestamp = commit.split(',')
    author_stats[author]['commits'] += 1
    author_stats[author]['last_commit'] = datetime.fromtimestamp(int(timestamp))

# 获取每个文件的当前行数
print("正在重新计算每个文件的当前行数...")
current_file_lines = defaultdict(int)
ls_files_output = subprocess.check_output(['git', 'ls-tree', '-r', 'HEAD', '--name-only'], cwd=repo_path).decode('utf-8').splitlines()
for file_path in ls_files_output:
    # 跳过 dist 目录和特定文件类型
    if file_path.startswith('dist/') or file_path.endswith(('.png', '.jpg', '.geojson', '.7z', '.zip', 'package-lock.json')):
        print(f"跳过文件 {file_path}...")
        continue

    try:
        # 计算每个文件的总行数
        file_content = subprocess.check_output(['git', 'show', f'HEAD:{file_path}'], cwd=repo_path, shell=True)
        try:
            total_lines = file_content.decode('utf-8').count('\n')
        except UnicodeDecodeError:
            print(f"无法解码文件 {file_path}，跳过...")
            continue
        current_file_lines[file_path] = total_lines
        print(f"文件 {file_path} 当前行数为 {current_file_lines[file_path]}")
    except subprocess.CalledProcessError:
        print(f"无法处理文件 {file_path}，跳过...")
        continue

# 分配当前行数给相应的作者
print("正在分配当前行数给相应的作者...")
for file_path, authors in file_lines.items():
    total_added = sum(lines['added'] for lines in authors.values())
    if total_added == 0:
        continue
    for author, lines in authors.items():
        contribution_ratio = lines['added'] / total_added
        author_stats[author]['lines_current'] += round(current_file_lines[file_path] * contribution_ratio, 2)
        print(f"作者 {author} 的当前行数为 {author_stats[author]['lines_current']}")

# 写入 CSV 文件
with open('author_stats.csv', mode='w', newline='') as file:
    print("正在写入 author_stats.csv...")
    writer = csv.writer(file)
    writer.writerow(['Author', 'Commits', 'Lines Added', 'Lines Deleted', 'Last Commit', 'Lines Currently in Repo', 'Performance Score'])

    for author, stats in author_stats.items():
        total_lines = stats['lines_added'] - stats['lines_deleted']
        performance_score = stats['lines_current'] / total_lines if total_lines != 0 else 0
        writer.writerow([
            author,
            stats['commits'],
            stats['lines_added'],
            stats['lines_deleted'],
            stats['last_commit'],
            round(stats['lines_current'], 2),
            f'{performance_score:.2f}'
        ])
        print(f"已写入作者 {author} 的统计数据, 总行数为 {total_lines}, 性能分数为 {performance_score:.2f}")
    print("统计结果已写入 author_stats.csv")

print("统计结果已写入 author_stats.csv")