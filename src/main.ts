import * as CF from 'colfio';
import { Config } from './config/Config';
import { GameManager } from './systems/GameManager';
import { Assets } from '@pixi/assets';
import { sound } from '@pixi/sound';

class Game {
    engine: CF.Engine;

    constructor() {
        this.engine = new CF.Engine();
        let canvas = (document.getElementById('gameCanvas') as HTMLCanvasElement);

        this.engine.init(canvas, {
            backgroundColor: 0xFFFFFF,
            resizeToScreen: Config.AUTO_RESIZE,
            width: Config.SCREEN_WIDTH,
            height: Config.SCREEN_HEIGHT,
            resolution: 1,
            speed: 1
        });
        this.engine.ticker!.maxFPS = Config.MAX_FPS;

        Assets.loader.reset();
        Assets.loader
            .load(Config.ASSETS)
            .then(() => this.loadSounds())
            .then(() => this.onAssetsLoaded());
    }

    loadSounds(): void {
        Config.SOUNDS.forEach(s => sound.add(s[0], s[1]));
    }

    onAssetsLoaded(): void {
        let scene = this.engine.scene!!;
        
        const graphics = new CF.Graphics();
        scene.stage.addChild(graphics);

        const loadingScreen = <HTMLDivElement>document.getElementById('loadingScreen');
        loadingScreen.style.display = 'none';

        scene.addGlobalComponent(new GameManager(scene));
    }
}

export default new Game()