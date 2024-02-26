export class Config {

    /** Configuration */
    public static MAX_FPS = 30

    public static X_TILES = 22
    public static Y_TILES = 22

    public static AUTO_RESIZE: boolean = true

    public static TILE_SIZE: number = 32 // Deprecated since isometric

    public static ISO_TILE_WIDTH: number = 64
    public static ISO_TILE_HEIGHT: number = 32
    
    public static SCREEN_WIDTH: number = this.ISO_TILE_WIDTH * this.X_TILES
    public static SCREEN_HEIGHT: number = this.ISO_TILE_HEIGHT * this.Y_TILES + (2 * this.ISO_TILE_HEIGHT)

    public static ISO_OFFSET_X: number = this.SCREEN_WIDTH / 2
    public static ISO_OFFSET_Y: number = 2 * this.ISO_TILE_HEIGHT

    public static MAX_OBSTACLES = 80


    /** Game Settings */
    public static INIT_MONEY = 1000;
    public static INIT_HP = 20;
    public static INIT_SCORE = 0;

    public static VICTORY_SCORE = 5000;


    /** Assets */
    public static ASSETS: string[] = [
        'enemy_creation_item.png',
        'enemy_a.png',
        'enemy_b.png',
        'iso_tile.png',
        'iso_tile_red.png',
        'iso_tile_green.png',
        'item_of_protection.png',
        'obstacle_a.png',
        'obstacle_b.png',
        'obstacle_c.png',
        'tower_a.png',
        'tower_b.png',
        'tower_c.png',
        'bullet.png',
        'iso_bg.png',
        'bgm.mp3',
        'pew.wav',
        'punch.wav',
    ]

    public static SOUNDS: [string, string][] = [
        ['bgm', 'bgm.mp3'],
        ['pew', 'pew.wav'],
        ['punch', 'punch.wav'],
    ]
}