class Scene {
    constructor(gameEngine) {
      this.gameObjects = [];
      this.game = gameEngine;

      // Call add scene on self
      this.game.addScene(this);
      
    }
  
    // Game Object methods
    addGameObject(go) {
      go.game = this.game;
      go.scene = this;
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
      // draw hitboxes
      if (SHOW_HITBOXES) {
        for (const go of this.gameObjects) {
          go.hitbox.drawHitbox();
        }
      }
    }
  }