class Scene {
    constructor() {
      this.gameObjects = [];
    }
  
    // Game Object methods
    addGameObject(go) {
      this.gameObjects.push(go);
    }
  
    setup() { // p5js function
      for (const go of this.gameObjects) {
        go.setup();
      }
    }
  
    update() { // p5js function
      // update all game objects
      for (const go of this.gameObjects) {
        go.update();
        go.draw();
      }
    }
  }