class GameObject {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      // Game Engine reference: will be assigned when scene is added to the game engine
      this.game = null;
      // Scene reference will be assigned on addGameObject
      this.scene = null;
      // default hitbox
      this.hitbox = new Hitbox(0, 0, width, height, this); 
    }
    colliding(go) {
      return this.hitbox.colliding(go.hitbox);
    }

    boxCast(deltaX, deltaY) {
      // modify the game object
      this.x += deltaX;
      this.y += deltaY;
      // test for overlap
      for (const go of this.scene.gameObjects) {
        if (this === go) {
          continue;
        }

        if (this.colliding(go)) {
          // Reset the game object
          this.x -= deltaX;
          this.y -= deltaY;
          return go;
        }
      }
      // Reset the game object
      this.x -= deltaX;
      this.y -= deltaY;
      return false;
    }
    setup() {
  
    }
  
    update() {

    }
  
    draw() { // p5js
      noStroke();
      fill("red");
      rect(this.x, this.y, this.width, this.height);
    }
  }
  