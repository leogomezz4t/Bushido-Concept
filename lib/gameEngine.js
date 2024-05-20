class GameEngine {
    // Define properties
    // Scene variables
    scenes = [];
    currentSceneIndex = 0;
    // image paths
    animationPaths = {};
    // animation properties
    animationDelays = {};
    // image loading references;
    requiredImages = new Set();
    requiredAnimations = new Set();
    loadedImages = {};
    // instantiate animations
    animations = {};
    // Image loading methods
    requireImages(animationPath) {
        const [sprite, animation] = animationPath.split("/");
        for (const ani in this.animationPaths[sprite]) {
            for (const img in this.animationPaths[sprite][ani])
                this.requiredImages.add(this.animationPaths[sprite][ani][img]);
        }
    }
    requireAnimation(animationPath) {
        this.requiredAnimations.add(animationPath);
    }
    // End loading methods
    // Scene methods
    addScene(scene) {
        scene.game = this;
        this.scenes.push(scene);
    }
    get currentScene() {
        return this.scenes[this.currentSceneIndex];
    }
    // End scene methods
    // P5 js required functions
    preload() {
        this.animationDelays = loadJSON("data/animationDelays.json");
        this.animationPaths = loadJSON("data/animationPaths.json", () => {
            // Instantiate all sprite animations
            for (const sprite in this.animationPaths) {
                this.animations[sprite] = {};
                for (const animation in this.animationPaths[sprite]) {
                    this.animations[sprite][animation] = new SpriteAnimation(`${sprite}/${animation}`, this);
                }
            }
            // Require all images from the animations
            for (const anim of this.requiredAnimations) {
                this.requireImages(anim);
            }
            // Load images logic
            for (const img of this.requiredImages) {
                this.loadedImages[img] = loadImage(img);
            }
            // DEBUGGING
            console.log("IMAGES AND JSON LOADED...");
            console.log(this.animations);
        });
    }
    setup() {
        this.currentScene.setup();
    }
    loopPrelude() {
        noSmooth();
    }
    drawCurrentScene() {
        this.currentScene.update();
    }
}
