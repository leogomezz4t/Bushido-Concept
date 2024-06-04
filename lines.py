import os

dir_path = "./src"
files = os.listdir(dir_path)
total_lines = 0

for file in files:
    filepath = os.path.join(dir_path, file)
    with open(filepath, "r") as f:
        lines = f.readlines()
        total_lines += len(lines)

print(total_lines)