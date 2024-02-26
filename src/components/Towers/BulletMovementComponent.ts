import * as CF from "colfio";
import { GridUtility, Position } from "../../utils/GridUtility";
import { BULLET_HIT_ENEMY } from "../../config/Messages";

export class BulletMovementComponent extends CF.Component {

    private speed: number = 7;
    private delta: number = 5;
    private goalPosition: Position;
    private goalAbsolutePosition: Position;
    private enemyId: number;
    private angle: number;
    private enemyLastPosition: Position;

    constructor(scene: CF.Scene, goalPosition: Position, enemyId: number) {
        super();
        this.scene = scene;
        this.goalPosition = goalPosition;
        this.goalAbsolutePosition = GridUtility.getAbsolutePosFromIsoTilePos(this.goalPosition);
        this.enemyId = enemyId;
    }

    onInit(): void {
        this.angle = Math.atan2(this.goalAbsolutePosition.y - this.owner.position.y, this.goalAbsolutePosition.x - this.owner.position.x);
        this.enemyLastPosition = this.goalAbsolutePosition;
    }

    onUpdate(delta: number, absolute: number): void {
        const enemy = this.scene.findObjectById(this.enemyId);
        if (enemy != null) {
            this.enemyLastPosition = enemy.position;
        } 
        
        this.angle = Math.atan2((this.enemyLastPosition.y - 16) - this.owner.position.y, this.enemyLastPosition.x - this.owner.position.x);

        this.owner.position.x += this.speed * Math.cos(this.angle);
        this.owner.position.y += this.speed * Math.sin(this.angle);

        if (Math.abs(this.owner.position.x - this.enemyLastPosition.x) <= this.delta && Math.abs(this.owner.position.y - (this.enemyLastPosition.y - 16)) <= this.delta) {
            this.sendMessage(BULLET_HIT_ENEMY, {
                bullet: this.owner.id,
                enemy: this.enemyId
            })
            this.scene.stage.removeChild(this.owner);
        }
    }
}