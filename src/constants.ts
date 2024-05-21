const KBM_CONTROLS: Controls = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SIDE_ATTACK: 65,
    DOWN_ATTACK: 83,
    UP_ATTACK: 68,
    DEFEND: 87,
    DASH: 16
}
// Player values
const PLAYER_WIDTH = 300;
const PLAYER_HEIGHT = 300;
// Debugs
const SHOW_HITBOXES = false;
const SHOW_OVERLAPPING_HITBOXES = false || SHOW_HITBOXES;
const SHOW_COLLIDING_HITBOXES = false || SHOW_HITBOXES;

const SHOW_ORIGINS = true;

const SHOW_CAMERA_TRACKER = true;
// Orientation
enum Orientation {
    Left = -1,
    Right = 1
}
// Canvas
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 300;
// Gravity
const GRAVITY_DELTA = 1;
// Animation
const FRAME_DELAY = 100;
// Hitboxes
enum CollisionType {
    Colliding,
    Overlapping
}
