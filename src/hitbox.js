class Hitbox {
    constructor(xOffset, yOffset, width, height, parentObject) {
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
        this.parentObject = parentObject;
    }

    get x() {
        if (this.parentObject.orientation == LEFT_ORIENTATION) {
            return this.parentObject.x - this.xOffset - this.width;
        } else {
            return this.parentObject.x + this.xOffset;
        }
        
    }

    get y() {
        return this.parentObject.y + this.yOffset;
    }  
    
    colliding(hb) {
        return (
        this.x + this.width > hb.x
        && this.x < hb.x + hb.width
        && this.y + this.height > hb.y
        && this.y < hb.y + hb.height
      );
    }

    drawHitbox() {
        noFill();
        stroke("green");
        strokeWeight(3);
        rect(this.x, this.y, this.width, this.height);
    }
}