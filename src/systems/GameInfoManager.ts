import { Component, Message, Scene } from "colfio";
import { ENEMY_DIED, ENEMY_TOUCHED_ITEM_OF_PROTECTION, GAME_OVER, GAME_VICTORY, TOWER_BOUGHT, TOWER_SOLD } from "../config/Messages";
import Stats from "../containers/Stats";
import { Config } from "../config/Config";
import Tower from "../containers/Towers/Tower";

export default class GameInfoManager extends Component {

    private stats: Stats;

    constructor(scene: Scene) {
        super();
        this.scene = scene;
        this.stats = new Stats(Config.INIT_HP, Config.INIT_MONEY, Config.INIT_SCORE);

        this.scene.stage.addChild(this.stats);
    }

    onInit(): void {
        this.subscribe(ENEMY_DIED);
        this.subscribe(ENEMY_TOUCHED_ITEM_OF_PROTECTION);
        this.subscribe(TOWER_BOUGHT);
        this.subscribe(TOWER_SOLD);

        this.renderHP();
        this.renderScore();
        this.renderMoney();
    }

    onMessage(msg: Message) {
        if (msg.action === ENEMY_DIED) {
            this.stats.score += 10;
            this.stats.money += 50;
            this.renderMoney();
            this.renderScore();
            if (this.scene.findObjectByName('enemy_a') === null && this.scene.findObjectByName('enemy_b') === null && this.stats.score >= Config.VICTORY_SCORE) {
                this.sendMessage(GAME_VICTORY, this.stats.score);
            }
            return;
        }

        if (msg.action === ENEMY_TOUCHED_ITEM_OF_PROTECTION) {
            this.stats.hp--;
            this.renderHP();
            if (this.stats.hp <= 0) {
                this.sendMessage(GAME_OVER, this.stats.score);
            }
            return;
        }

        if (msg.action === TOWER_BOUGHT) {
            this.stats.money -= (msg.data as Tower).cost;
            this.renderMoney();
            return;
        }

        if (msg.action === TOWER_SOLD) {
            this.stats.money += (msg.data as Tower).cost;
            this.renderMoney();
            return;
        }
    }

    renderHP(): void {
        const hpSpan = (document.getElementById('hp') as HTMLSpanElement)
        hpSpan.innerHTML = `❤️ ${this.stats.hp.toString()}`;
    }

    renderMoney(): void {
        const moneySpan = (document.getElementById('money') as HTMLSpanElement)
        moneySpan.innerHTML = `💵 ${this.stats.money.toString()}`;
    }

    renderScore(): void {
        const scoreSpan = (document.getElementById('score') as HTMLSpanElement)
        scoreSpan.innerHTML = `⭐ ${this.stats.score.toString()}`;
    }
}