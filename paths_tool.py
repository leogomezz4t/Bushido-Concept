import os
import pathlib
import json
from pprint import pprint

dirpath = "./artwork/sprites/"

d = {}

basepath = "artwork/sprites/"
sprites = os.listdir(dirpath)

for s in sprites:
    spritepath = os.path.join(basepath, s)
    animations = os.listdir(spritepath)
    d[s] = {}
    for a in animations:
        animationpath = os.path.join(spritepath, a)
        frames = os.listdir(animationpath)
        d[s][a] = []
        for f in frames:
            if f.startswith('.'):
                continue
            
            if not f.endswith('.png'):
                print(f"File that's not a png present. Filepath: {f}")
                continue
            
            framespath = os.path.join(animationpath, f)
            d[s][a].append(framespath)
            

json_string = json.dumps(d, indent=4)
with open("./data/animationPaths.json", "w") as file:
    file.write(json_string)