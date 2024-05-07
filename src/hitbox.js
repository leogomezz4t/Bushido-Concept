class Hitbox {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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