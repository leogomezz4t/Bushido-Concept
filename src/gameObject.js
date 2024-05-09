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
      return (
        this.x + this.width > go.x
        && this.x < go.x + go.width
        && this.y + this.height > go.y
        && this.y < go.y + go.height
      )
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
  