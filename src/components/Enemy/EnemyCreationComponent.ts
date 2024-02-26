import * as CF from "colfio";
import { EnemyMovementComponent } from "./EnemyMovementComponent";
import { GridUtility, Position } from "../../utils/GridUtility";
import { ENEMY_TOUCHED_ITEM_OF_PROTECTION } from "../../config/Messages";
import GameMap from "../../containers/GameMap";
import { InformAboutMyLocationComponent } from "./InformAboutMyPositionComponent";
import { EnemyHPComponent } from "./EnemyHPComponent";
import Stats from "../../containers/Stats";
import { Config } from "../../config/Config";
import Enemy from "../../containers/Enemies/Enemy";
import EnemyB from "../../containers/Enemies/EnemyB";
import EnemyA from "../../containers/Enemies/EnemyA";

export class EnemyCreationComponent extends CF.Component {

    private lastEnemyTimestamp: number = 0;
    private initTilePos: Position;
    private intervalBetweenEnemeis = 3500;
    private bossProbability = 100; // 1 in N chance
    private enemyGoalPosition: Position;
    private map: GameMap;
    private stats: Stats;
    private counter = 0;

    constructor(scene: CF.Scene) {
        super();
        this.scene = scene;
        this.fixedFrequency = 30;
    }

    onInit(): void {
        this.subscribe(ENEMY_TOUCHED_ITEM_OF_PROTECTION)

        this.map = this.scene.findObjectByName('GameMap') as GameMap;
        this.stats = this.scene.findObjectByName('Stats') as Stats;
        this.enemyGoalPosition = this.map.itemOfProtection.getTilePosition();

        this.initTilePos = GridUtility.getIsoTilePosFromAbsolutePos({x: this.owner.position.x, y: this.owner.position.y});
    }

    onFixedUpdate(delta: number, absolute: number): void {
        if (this.counter++ < 120) {
            return;
        }

        this.counter = 0;

        // if (this.map === undefined) {
        //     return;
        // }

        // if (this.enemyGoalPosition == undefined) {
        //     return;
        // }

        // if (this.lastEnemyTimestamp == null) {
        //     return;
        // }
        
        // // if (((new Date()).getTime()) <= (this.lastEnemyTimestamp.getTime()) + this.intervalBetweenEnemeis) {
        // //     return;
        // // }

        // if (absolute <= this.lastEnemyTimestamp + this.intervalBetweenEnemeis) {
        //     return;
        // }

        // console.log(absolute)

        // this.lastEnemyTimestamp = absolute;

        this.createEnemy();
        this.updateDifficulty();
    }

    createEnemy(): void {
        let enemy: Enemy;

        if (Math.floor(Math.random() * this.bossProbability) <= 1) {
            enemy = new EnemyB(this.initTilePos);
        } else {
            enemy = new EnemyA(this.initTilePos);
        }

        enemy.addComponent(new EnemyMovementComponent(this.enemyGoalPosition, this.map));
        enemy.addComponent(new InformAboutMyLocationComponent());
        enemy.addComponent(new EnemyHPComponent(this.scene));
        this.scene.stage.addChild(enemy);
        this.scene.stage.sortChildren();
    }

    updateDifficulty(): void {
        if (this.stats.score >= 500) {
            this.intervalBetweenEnemeis = 2000;
            this.bossProbability = 20;
        } 
        
        if (this.stats.score >= 1000) {
            this.intervalBetweenEnemeis = 1000;
            this.bossProbability = 10;
        }

        if (this.stats.score >= 1500) {
            this.bossProbability = 2;
        }

        if (this.stats.score >= 2000) {
            this.intervalBetweenEnemeis = 500;
            this.bossProbability = 1;
        }

        if (this.stats.score >= Config.VICTORY_SCORE) {
            this.lastEnemyTimestamp = null;
        }
    }

    onMessage(msg: CF.Message) {
        if (msg.action === ENEMY_TOUCHED_ITEM_OF_PROTECTION) {
            this.scene.stage.removeChild(msg.data);
        }
    }
}