import os
import pathlib
import json
from pprint import pprint

dirpath = "./artwork/sprites/"

d = {}

basepath = "artwork\\sprites\\"
sprites = os.listdir(dirpath)

for s in sprites:
    spritepath = os.path.join(basepath, s)
    animations = os.listdir(spritepath)
    for a in animations:
        animationpath = os.path.join(spritepath, a)
        key = os.path.join(s, a)
        frames = os.listdir(animationpath)
        d[key] = []
        for f in frames:
            if f.startswith('.'):
                continue
            
            if not f.endswith('.png'):
                print(f"File that's not a png present. Filepath: {f}")
                continue
            
            framespath = os.path.join(animationpath, f)
            d[key].append(framespath)
            

json_string = json.dumps(d, indent=4)
with open("./data/animationPaths.json", "w") as file:
    file.write(json_string)