// Basic types
class Vector2 {
    public x: number;
    public y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector2) {
        return new Vector2(this.x + v.x, this.y + v.y)
    }

    subtract(v: Vector2) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    multiply(v: Vector2) {
        return new Vector2(this.x * v.x, this.y * v.y);
    }

    divide(v: Vector2) {
        return new Vector2(this.x * v.x, this.y * v.y);
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
    DEFEND: number,
    DASH: number
}

type AnimationParams = {
    framesPath: string,
    game: GameEngine
}