class GameObject {
    constructor(x, y, width, height, anim) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
  
      this.anim = anim;
    }
  
    setup() {
  
    }
  
    update() {
      this.anim.update();
    }
  
    draw() { // p5js
      this.anim.drawAnimation(this.x, this.y, this.width, this.height);
    }
  }
  