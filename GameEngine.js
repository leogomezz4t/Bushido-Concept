class GameEngine {
  constructor() {
    this.scenes = [];
    this.currentSceneIndex = 0;
  }

  // Scene methods

  addScene(scene) {
    this.scenes.push(scene);
  }

  get currentScene() {
    return this.scenes[this.currentSceneIndex];
  }

  loopPrelude() { // must be run in a p5js function
    noSmooth();
  }

  drawCurrentScene() {
    this.currentScene.update();
  }
}

class Scene {
  constructor() {
    this.gameObjects = [];
  }

  // Game Object methods
  addGameObject(go) {
    go.scene = this;
    this.gameObjects.push(go);
  }

  update() {
    // update all game objects
    for (const go of this.gameObjects) {
      go.update();
      go.draw();
    }
  }
}

class GameObject {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    //
    this.scene = null; // Defined in the scene addGameObject function.
  }

  update() {
    this.x += 0.1;
  }

  draw() { // p5js
    fill("red");
    rect(this.x, this.y, this.width, this.height);

  }
}

class Animation {
  /*
  * @param id: a unique string that labels the animation
  * @param frames: list of filepaths that correspond to the frames of the animation
  * @param delay: the millisecond delay between frames
  * @param 
  */
  constructor(id, frames, delay, loadedCallback) {
    this.id = id;
    this.frames = frames;
    this.delay = delay;

    // load images
    
  }

  
}