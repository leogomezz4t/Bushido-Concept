class HUDObject {
    public position: Vector2;
    public width: number;
    public height: number;
    public game: GameEngine;
    public scene: Scene;
    public isActive: boolean = true;

    constructor (x: number, y: number, width: number, height: number) {
        this.position = new Vector2(x, y);
        this.width = width;
        this.height = height;
    }

    public preload() {

    }

    public update() {

    }

    public draw() {

    }
}