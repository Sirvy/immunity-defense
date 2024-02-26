import { Component } from "colfio";
import { ENEMY_MOVED } from "../../config/Messages";

export class InformAboutMyLocationComponent extends Component {
    private lastMessageSentAt: Date;
    private intervalBetweenMessages: number = 500;
    
    constructor() {
        super();
        this.lastMessageSentAt = new Date();
    }

    onUpdate(delta: number, absolute: number): void {
        if (((new Date()).getTime()) <= (this.lastMessageSentAt.getTime()) + this.intervalBetweenMessages) {
            return;
        }

        this.lastMessageSentAt = new Date();

        this.sendMessage(ENEMY_MOVED, {
            enemy: this.owner.id, 
            position: {
                x: this.owner.position.x
                , y: this.owner.position.y
            }
        });
    }
}