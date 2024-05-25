// Basic types
class Vector2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // Static methods
    static add(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
    static subtract(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }
    static multiply(v1, v2) {
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    }
    static divide(v1, v2) {
        return new Vector2(v1.x / v2.x, v1.y / v2.y);
    }
    static dist(v1, v2) {
        const xLen = Math.abs(v1.x - v2.x);
        const yLen = Math.abs(v1.y - v2.y);
        return Math.sqrt(Math.pow(xLen, 2) + Math.pow(yLen, 2));
    }
    // Instance methods
    add(v) {
        return Vector2.add(this, v);
    }
    subtract(v) {
        return Vector2.subtract(this, v);
    }
    multiply(v) {
        return Vector2.multiply(this, v);
    }
    divide(v) {
        return Vector2.divide(this, v);
    }
    setTo(v) {
        this.x = v.x;
        this.y = v.y;
    }
}
