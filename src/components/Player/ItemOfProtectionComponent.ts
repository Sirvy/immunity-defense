import * as CF from "colfio";
import { ENEMY_TOUCHED_ITEM_OF_PROTECTION } from "../../config/Messages";
import ItemOfProtection from "../../containers/ItemOfProtection";
import { AnimatedNotifier } from "../../utils/AnimatedNotifier";
import { sound } from "@pixi/sound";

export class ItemOfProtectionComponent extends CF.Component {

    private itemOfProtection: ItemOfProtection;

    constructor(scene: CF.Scene) {
        super();
        this.scene = scene;
    }

    onInit(): void {
        this.itemOfProtection = this.owner as ItemOfProtection;
        this.subscribe(ENEMY_TOUCHED_ITEM_OF_PROTECTION);
    }

    onMessage(msg: CF.Message) {
        if (msg.action === ENEMY_TOUCHED_ITEM_OF_PROTECTION) {
            AnimatedNotifier.printRedMessage('minusHP', '- 1 ❤️', this.itemOfProtection.position, this.scene, 25);
            sound.play('pew');
        }
    }
}