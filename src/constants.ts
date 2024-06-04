const KBM_CONTROLS: Controls = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SIDE_ATTACK: 65,
    DOWN_ATTACK: 83,
    UP_ATTACK: 68,
    SPECIAL_ATTACK: 70,
    DEFEND: 87,
    DASH: 16
}
// Player values
const PLAYER_WIDTH = 300;
const PLAYER_HEIGHT = 300;
// Debugs
const SHOW_HITBOXES = false;
const SHOW_OVERLAPPING_HITBOXES = false;
const SHOW_COLLIDING_HITBOXES = false;
const SHOW_WEAPON_HITBOXES = false;

const SHOW_ORIGINS = false;

const EDITOR_MODE = false;
// Orientation
enum Orientation {
    Left = -1,
    Right = 1
}
// Canvas
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;
// Gravity
const GRAVITY_DELTA = 1;
// Animation
const FRAME_DELAY = 100;
// Hitboxes
enum CollisionType {
    Colliding,
    Overlapping
}
// draw layers
const MAX_LAYER = 5;