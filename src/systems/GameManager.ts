import { Component, Message, PointerInputComponent, Scene, Text, TilingSprite } from "colfio";
import MapManager from "./MapManager";
import { SceneObjectsSorter } from "../components/SceneObjectsSorter";
import PlayerManager from "./PlayerManager";
import { GAME_OVER, GAME_VICTORY } from "../config/Messages";
import GameInfoManager from "./GameInfoManager";
import { Config } from "../config/Config";
import { GridUtility } from "../utils/GridUtility";
import * as PIXI from 'pixi.js'
import { sound } from "@pixi/sound";
import { BACKGROUND_ZINDEX } from "../config/Globals";

export class GameManager extends Component {

    private mapManager: MapManager;
    private playerManager: PlayerManager;
    private gameInfoManager: GameInfoManager;
    private pointerInputComponent: PointerInputComponent;

    constructor(scene: Scene) {
        super();

        this.scene = scene;
        this.playerManager = new PlayerManager(scene);
        this.mapManager = new MapManager(scene);
        this.gameInfoManager = new GameInfoManager(scene);
        this.pointerInputComponent = new PointerInputComponent({
            handleClick: true,
            handlePointerDown: false,
            handlePointerOver: false,
            handlePointerRelease: false,
        });

        this.scene.addGlobalComponent(this.mapManager);
        this.scene.addGlobalComponent(this.pointerInputComponent);
        this.scene.addGlobalComponent(new SceneObjectsSorter(this.scene))
        this.scene.addGlobalComponent(this.gameInfoManager);
        this.scene.addGlobalComponent(this.playerManager);
    }

    onInit(): void {
        this.subscribe(GAME_OVER);
        this.subscribe(GAME_VICTORY);

        //this.playMusic();

        this.drawBackgroundImage();
    }

    playMusic(): void {
        sound.play('bgm', () => this.playMusic());
    }

    onMessage(msg: Message) {
        if (msg.action === GAME_OVER) {
            this.clearGame();
            this.renderGameOverScreen(msg.data);
            return;
        }

        if (msg.action === GAME_VICTORY) {
            this.clearGame();
            this.renderVictoryScreen(msg.data);
            return;
        }
    }

    clearGame(): void {
        this.scene.removeGlobalComponent(this.pointerInputComponent);
        this.scene.removeGlobalComponent(this.mapManager);
        this.scene.removeGlobalComponent(this.gameInfoManager);
        this.scene.removeGlobalComponent(this.playerManager);
        this.scene.stage.removeChildren();
        this.removeUI();
    }

    renderGameOverScreen(score: number): void {
        const message = new Text('Game Over', `GAME OVER!`);
        message.style.fontSize = 50;
        message.anchor.set(0.5);
        message.position.set(Config.SCREEN_WIDTH / 2, Config.SCREEN_HEIGHT / 2);
        this.scene.stage.addChild(message)

        const message2 = new Text('High Score', `Your score was: ${score}`);
        message2.style.fontSize = 25;
        message2.anchor.set(0.5);
        message2.position.set(Config.SCREEN_WIDTH / 2, (Config.SCREEN_HEIGHT / 2) + 50);
        this.scene.stage.addChild(message2);
    }

    renderVictoryScreen(score: number): void {
        const message = new Text('Victory', `VICTORY!`);
        message.style.fontSize = 50;
        message.anchor.set(0.5);
        message.position.set(Config.SCREEN_WIDTH / 2, Config.SCREEN_HEIGHT / 2);
        this.scene.stage.addChild(message)

        const message2 = new Text('Congratulation', `Congratulations! You beat the game with high score of ${score}!`);
        message2.style.fontSize = 25;
        message2.anchor.set(0.5);
        message2.position.set(Config.SCREEN_WIDTH / 2, (Config.SCREEN_HEIGHT / 2) + 50);
        this.scene.stage.addChild(message2);
    }

    drawBackgroundImage(): void {
        const bg = new TilingSprite('iso_bg', PIXI.Texture.from('iso_bg.png'), Config.SCREEN_WIDTH, Config.SCREEN_HEIGHT);
        bg.zIndex = BACKGROUND_ZINDEX;
        this.scene.stage.addChild(bg);
        console.log('a');
    }

    removeUI(): void {
        const menuDiv = (document.getElementById('rightPanel') as HTMLDivElement);
        menuDiv.outerHTML = '';
        const infoDiv = (document.getElementById('leftPanel') as HTMLDivElement);
        infoDiv.outerHTML = '';
        const spanDiv = (document.getElementById('info') as HTMLDivElement);
        spanDiv.outerHTML = '';
    }
}