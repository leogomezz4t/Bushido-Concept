class Scene {
    gameObjects = [];
    game;
    // camera
    currentCamera;
    constructor(gameEngine) {
        this.game = gameEngine;
        // Call add scene on self
        this.game.addScene(this);
        // camera variables
        this.currentCamera = new Camera(0, 0, 1, "Main Camera");
    }
    // Game Object methods
    addGameObject(go) {
        go.game = this.game;
        go.scene = this;
        this.gameObjects.push(go);
    }
    setup() {
        for (const go of this.gameObjects) {
            go.setup();
        }
    }
    update() {
        // TODO remove
        if (keyIsDown(79)) {
            this.currentCamera.scale -= 0.01;
        }
        if (keyIsDown(80)) {
            this.currentCamera.scale += 0.01;
        }
        // update all game objects
        for (const go of this.gameObjects) {
            go.update();
            this.currentCamera.renderGameObject(go);
        }
        // draw hitboxes
        if ((SHOW_OVERLAPPING_HITBOXES || SHOW_COLLIDING_HITBOXES) || SHOW_HITBOXES) {
            for (const go of this.gameObjects) {
                for (const hb of go.hitboxes) {
                    this.currentCamera.renderGameObject(hb);
                }
            }
        }
    }
}
