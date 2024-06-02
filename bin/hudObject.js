class HUDObject {
    position;
    width;
    height;
    game;
    scene;
    isActive = true;
    constructor(x, y, width, height) {
        this.position = new Vector2(x, y);
        this.width = width;
        this.height = height;
    }
    preload() {
    }
    update() {
    }
    draw() {
    }
}
