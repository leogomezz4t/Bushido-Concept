// Basic types
class Vector2 {
    public x: number;
    public y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Static methods
    public static add(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }

    public static subtract(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }

    public static multiply(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    }

    public static divide(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x / v2.x, v1.y / v2.y);
    }

    public static dist(v1: Vector2, v2: Vector2) {
        const xLen = Math.abs(v1.x - v2.x);
        const yLen = Math.abs(v1.y - v2.y);
        
        return Math.sqrt(
            Math.pow(xLen, 2) + Math.pow(yLen, 2)
        );
    }

    // Instance methods
    public add(v: Vector2) {
        return Vector2.add(this, v);
    }

    public subtract(v: Vector2) {
        return Vector2.subtract(this, v);
    }

    public multiply(v: Vector2) {
        return Vector2.multiply(this, v);
    }

    public divide(v: Vector2) {
        return Vector2.divide(this, v);
    }

    public setTo(v: Vector2) {
        this.x = v.x;
        this.y = v.y;
    }
}

type Controls = {
    LEFT: number,
    RIGHT: number,
    UP: number,
    DOWN: number,
    SIDE_ATTACK: number,
    DOWN_ATTACK: number,
    UP_ATTACK: number,
    SPECIAL_ATTACK: number,
    DEFEND: number,
    DASH: number
}

type AnimationParams = {
    framesPath: string,
    game: GameEngine
}