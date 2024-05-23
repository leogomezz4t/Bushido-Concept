class Hitbox {
    offset;
    width;
    height;
    parentObject;
    type;
    debug;
    constructor(xOffset, yOffset, width, height, type, parentObject, debug = false) {
        this.offset = new Vector2(xOffset, yOffset);
        this.width = width;
        this.height = height;
        this.parentObject = parentObject;
        // depends whether this hitbox collides with game objects
        this.type = type;
        // Debug
        this.debug = debug;
    }
    get x() {
        if (this.parentObject.orientation === Orientation.Left) {
            return this.parentObject.position.x - this.offset.x - this.width;
        }
        else {
            return this.parentObject.position.x + this.offset.x;
        }
    }
    get y() {
        return this.parentObject.position.y + this.offset.y;
    }
    get position() {
        return new Vector2(this.x, this.y);
    }
    get debugColor() {
        if (this.type === CollisionType.Colliding) {
            return "green";
        }
        else if (this.type === CollisionType.Overlapping) {
            return "red";
        }
    }
    overlapping(hb) {
        return (this.x + this.width > hb.x
            && this.x < hb.x + hb.width
            && this.y + this.height > hb.y
            && this.y < hb.y + hb.height);
    }
    _draw(cameraX, cameraY) {
        // hitbox
        noFill();
        stroke(this.debugColor);
        strokeWeight(3);
        rect(cameraX, cameraY, this.width, this.height);
        // draw the origin
        fill("blue");
        strokeWeight(0);
        circle(cameraX, cameraY, 5);
    }
    draw(cameraX, cameraY) {
        if (SHOW_COLLIDING_HITBOXES && this.type === CollisionType.Colliding) {
            this._draw(cameraX, cameraY);
        }
        else if (SHOW_OVERLAPPING_HITBOXES && this.type === CollisionType.Overlapping) {
            this._draw(cameraX, cameraY);
        }
        else if (this.debug) {
            this._draw(cameraX, cameraY);
        }
    }
}
