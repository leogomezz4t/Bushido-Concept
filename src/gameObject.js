class GameObject {
    constructor(x, y, width, height, useDefaultHitbox=true) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      // Game Engine reference: will be assigned when scene is added to the game engine
      this.game = null;
      // Scene reference will be assigned on addGameObject
      this.scene = null;
      // default hitbox
      this.hitboxes = [];
      if (useDefaultHitbox) {
        this.hitboxes.push(
          new Hitbox(0, 0, width, height, COLLIDING_TYPE, this)
        );
      }
      // movement variables
      this.deltaX = 0;
      this.deltaY = 0;
    }

    colliding(go) {
      const myCollidingHitboxes = this.hitboxes.filter(hb => hb.type === COLLIDING_TYPE);
      const theirCollidingHitboxes = go.hitboxes.filter(hb => hb.type === COLLIDING_TYPE);
      for (const mch of myCollidingHitboxes) {      
        for (const tch of theirCollidingHitboxes) {
          if (mch.overlapping(tch)) {
            return true;
          }
        }
      }

      return false;
    }

    overlapping(go) {
      const myOverlappingHitboxes = this.hitboxes.filter(hb => hb.type === OVERLAPPING_TYPE);
      for (const moh of myOverlappingHitboxes) {
        for (const hb of go.hitboxes) {
          if (moh.overlapping(hb)) {
            return true;
          }
        }
      }

      return false;
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
          return true;
        }
      }
      // Reset the game object
      this.x -= deltaX;
      this.y -= deltaY;
      return false;
    }

   
    touchingFloor() {
        if (this.deltaY === 0) {
            return this.boxCast(0, GRAVITY_DELTA);
        } else {
            return this.boxCast(0, this.deltaY);
        }
    }

    move(horizontalChange, verticalChange) { 
      // Reset delta
      this.deltaX = 0;
      if (this.touchingFloor()) {
          this.deltaY = 0;
      }

      // Gravity
      if (!this.touchingFloor()) {
            this.deltaY += GRAVITY_DELTA;
      }
      // Move  
      this.deltaX += horizontalChange;

      // Apply
      if (!this.boxCast(this.deltaX, 0)) {
          this.x += this.deltaX;
      }
      if (!this.boxCast(0, this.deltaY)) {
          this.y += this.deltaY;
      }
    }
    
    flip() {
        this.orientation *= -1;
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
  