// Basic types
class Vector2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    subtract(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    multiply(v) {
        return new Vector2(this.x * v.x, this.y * v.y);
    }
    divide(v) {
        return new Vector2(this.x * v.x, this.y * v.y);
    }
}
