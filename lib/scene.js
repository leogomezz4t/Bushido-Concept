class Scene {
    gameObjects = [];
    game;
    // camera
    currentCamera;
    cameras = [];
    constructor(gameEngine) {
        this.game = gameEngine;
        // Call add scene on self
        this.game.addScene(this);
    }
    // Camera methods
    addCamera(c) {
        this.cameras.push(c);
    }
    setCurrentCamera(c) {
        // Check if camera exists
        if (!this.cameras.includes(c)) {
            throw new Error("Tried to set non existent camera");
        }
        this.currentCamera = c;
    }
    // End camera methods
    // Game Object methods
    addGameObject(go) {
        go.game = this.game;
        go.scene = this;
        go.onGameEngineDefined();
        this.gameObjects.push(go);
    }
    preload() {
        for (const go of this.gameObjects) {
            go.preload();
        }
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
        // Update all cameras
        for (const c of this.cameras) {
            c.update();
        }
        // update all game objects
        for (const go of this.gameObjects) {
            go.update();
            this.currentCamera.render(go);
        }
        // draw hitboxes
        for (const go of this.gameObjects) {
            for (const hb of go.hitboxes) {
                this.currentCamera.render(hb);
            }
        }
    }
}
