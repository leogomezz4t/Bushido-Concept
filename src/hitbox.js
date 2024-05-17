class Hitbox {
    constructor(xOffset, yOffset, width, height, type, parentObject, debug=false) {
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
        this.parentObject = parentObject;
        // depends whether this hitbox collides with game objects
        this.type = type;
        // Debug
        this.debug = debug;
    }

    get x() {
        if (this.parentObject.orientation === LEFT_ORIENTATION) {
            return this.parentObject.x - this.xOffset - this.width;
        } else {
            return this.parentObject.x + this.xOffset;
        }
        
    }

    get y() {
        return this.parentObject.y + this.yOffset;
    }  
    get debugColor() {
        if (this.type === COLLIDING_TYPE) {
            return "green";
        } else if (this.type === OVERLAPPING_TYPE) {
            return "red"
        }
    }
    
    overlapping(hb) {
        return (
        this.x + this.width > hb.x
        && this.x < hb.x + hb.width
        && this.y + this.height > hb.y
        && this.y < hb.y + hb.height
      );
    }

    _draw() {
        // hitbox
        noFill();
        stroke(this.debugColor);
        strokeWeight(3);
        rect(this.x, this.y, this.width, this.height); 

        // draw the origin
        fill("blue");
        strokeWeight(0);
        circle(this.x, this.y, 5);

    }

    drawHitbox() {
        if (SHOW_COLLIDING_HITBOXES && this.type === COLLIDING_TYPE) {
            this._draw();   
        } else if (SHOW_OVERLAPPING_HITBOXES && this.type === OVERLAPPING_TYPE) {
            this._draw();
        } else if (this.debug) {
            this._draw();
        }
    }
}