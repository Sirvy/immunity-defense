import { Component, Message, Scene } from "colfio";
import { ENEMY_DIED, ENEMY_MOVED, ENEMY_TOUCHED_ITEM_OF_PROTECTION } from "../../config/Messages";
import { GridUtility, Position } from "../../utils/GridUtility";
import { BulletMovementComponent } from "./BulletMovementComponent";
import { Config } from "../../config/Config";
import Bullet from "../../containers/Bullet";
import { sound } from "@pixi/sound";
import Tower from "../../containers/Towers/Tower";

export class TowerShootingComponent extends Component {
    private lastShotTimestamp: Date | null
    private enemyPositions: Map<number, Position>
    private ownerPosition: Position
    private tower: Tower;

    constructor(scene: Scene) {
        super()
        this.scene = scene
        this.lastShotTimestamp = new Date()
        this.enemyPositions = new Map()
    }

    onInit(): void {
        this.subscribe(ENEMY_MOVED)
        this.subscribe(ENEMY_DIED)
        this.subscribe(ENEMY_TOUCHED_ITEM_OF_PROTECTION)

        this.tower = this.owner as Tower;
        this.ownerPosition = GridUtility.getIsoTilePosFromAbsolutePos({x: this.owner.position.x, y: this.owner.position.y})
    }

    onMessage(msg: Message) {
        if (msg.action === ENEMY_MOVED) {
            const tilePos = GridUtility.getIsoTilePosFromAbsolutePos(msg.data.position)
            this.enemyPositions.set(msg.data.enemy, tilePos);
        }

        if (msg.action === ENEMY_DIED) {
            this.enemyPositions.delete(msg.data);
        }

        if (msg.action === ENEMY_TOUCHED_ITEM_OF_PROTECTION) {
            this.enemyPositions.delete(msg.data.id);
        }
    }

    onUpdate(delta: number, absolute: number): void {
        if (this.lastShotTimestamp === null) {
            return
        }

        if (((new Date()).getTime()) <= (this.lastShotTimestamp.getTime()) + this.tower.intervalBetweenShots) {
            return
        }        

        this.lastShotTimestamp = new Date()

        for (let [enemyId, position] of this.enemyPositions) {
            if (!(Math.abs(position.x - this.ownerPosition.x) + Math.abs(position.y - this.ownerPosition.y) <= this.tower.range)) {
                continue
            }
            this.createBullet(position, enemyId);
            return
        }
    }

    createBullet(position: Position, enemyId: number): void {
        const bullet = new Bullet({x: this.ownerPosition.x - 1, y: this.ownerPosition.y - 1});
        bullet.addComponent(new BulletMovementComponent(this.scene, position, enemyId));
        bullet.zIndex = Config.X_TILES + Config.Y_TILES;
        this.scene.stage.addChild(bullet);
        sound.play('punch');
    }
}