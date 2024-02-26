import * as CF from "colfio";
import { BULLET_HIT_ENEMY, ENEMY_DIED, ENEMY_PATH_UPDATE_INFO } from "../../config/Messages";
import { AnimatedNotifier } from "../../utils/AnimatedNotifier";
import { GridUtility } from "../../utils/GridUtility";
import Enemy from "../../containers/Enemies/Enemy";

export class EnemyHPComponent extends CF.Component {

    private enemy: Enemy;

    constructor(scene: CF.Scene) {
        super()
        this.scene = scene
    }

    onInit(): void {
        this.subscribe(BULLET_HIT_ENEMY);

        this.enemy = this.owner as Enemy;
    }

    onMessage(msg: CF.Message) {
        if (msg.action === BULLET_HIT_ENEMY) {
            if (msg.data.enemy !== this.owner.id) {
                return
            }

            this.enemy.decreaseHP();
            AnimatedNotifier.printRedMessage('minusEnemyHp', '-1', this.owner.position, this.scene);

            if (this.enemy.HP <= 0) {
                AnimatedNotifier.printGreenMessage('addMoney', '+50 💵', this.owner.position, this.scene, 18);
                this.scene.stage.removeChild(this.owner);
                this.sendMessage(ENEMY_DIED, this.owner.id);
                this.sendMessage(ENEMY_PATH_UPDATE_INFO, GridUtility.getIsoTilePosFromAbsolutePos(this.owner.position));
            }
        }
    }
}