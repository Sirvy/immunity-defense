import { GridUtility, Position } from "../../utils/GridUtility";
import * as CF from 'colfio';
import { OBSTACLE_ADDED, TOWER_BOUGHT, TOWER_SOLD } from "../../config/Messages";
import GameMap from "../../containers/GameMap";
import { AnimatedNotifier } from "../../utils/AnimatedNotifier";
import { NullMapObject } from "../../containers/NullMapObject";
import Stats from "../../containers/Stats";
import { PathFinder } from "../../utils/PathFinder";
import Tower from "../../containers/Towers/Tower";
import TowerA from "../../containers/Towers/TowerA";
import TowerB from "../../containers/Towers/TowerB";
import TowerC from "../../containers/Towers/TowerC";
import { TowerShootingComponent } from "../Towers/TowerShootingComponent";
import { TowerSelectionComponent } from "../Towers/TowerSelectionComponent";

export class MenuComponent extends CF.Component {

    private map: GameMap;
    private menuDiv: HTMLDivElement;
    private itemsDiv: HTMLDivElement | null;

    constructor(scene: CF.Scene) {
        super();
        this.scene = scene;
    }

    onInit(): void {
        this.menuDiv = (document.getElementById('rightPanel') as HTMLDivElement);
        this.itemsDiv = this.menuDiv.querySelector<HTMLDivElement>('.items');
        this.map = this.scene.findObjectByName('GameMap') as GameMap;
    }

    clearMenu(): void {
        if (this.itemsDiv === null) {
            return
        }

        this.itemsDiv.innerHTML = '';
    }

    drawTowerDetailMenu(tower: Tower): void {
        if (this.itemsDiv === null) {
            return;
        }

        const towerDiv = this.createSellHtmlTowerItem(tower);

        this.itemsDiv.innerHTML = '';
        this.itemsDiv.appendChild(towerDiv);
    }

    drawPurchaseListMenu(position: Position): void {
        if (this.itemsDiv === null) {
            return;
        }

        const towerAItem = this.createPurchaseHtmlTowerItem(new TowerA(position));
        const towerBItem = this.createPurchaseHtmlTowerItem(new TowerB(position));
        const towerCItem = this.createPurchaseHtmlTowerItem(new TowerC(position));

        this.itemsDiv.innerHTML = '';
        this.itemsDiv.appendChild(towerAItem);
        this.itemsDiv.appendChild(towerBItem);
        this.itemsDiv.appendChild(towerCItem);
    }

    createSellHtmlTowerItem(tower: Tower): HTMLDivElement {
        const towerDiv = <HTMLDivElement>document.createElement('div');
        towerDiv.className = 'item';
        const title = <HTMLDivElement>document.createElement('div');
        title.innerHTML = tower.getInGameName();
        const range = <HTMLSpanElement>document.createElement('span');
        range.innerHTML = `Range: ${tower.range.toString()}`;
        const speed = <HTMLSpanElement>document.createElement('span');
        speed.innerHTML = `Speed: ${tower.intervalBetweenShots.toString()} ms`;
        const buildButton = <HTMLButtonElement>document.createElement('button')
        buildButton.textContent = `Sell (+${tower.cost}$)`;
        buildButton.onclick = () => this.sellTower(tower);
        towerDiv.appendChild(title);
        towerDiv.appendChild(range);
        towerDiv.appendChild(speed);
        towerDiv.appendChild(buildButton);
        return towerDiv;
    }

    createPurchaseHtmlTowerItem(tower: Tower): HTMLDivElement {
        const towerDiv = <HTMLDivElement>document.createElement('div');
        towerDiv.className = 'item';
        const title = <HTMLDivElement>document.createElement('div');
        title.innerHTML = tower.getInGameName();
        const range = <HTMLSpanElement>document.createElement('span');
        range.innerHTML = `Range: ${tower.range.toString()}`;
        const speed = <HTMLSpanElement>document.createElement('span');
        speed.innerHTML = `Speed: ${tower.intervalBetweenShots.toString()} ms`;
        const buildButton = <HTMLButtonElement>document.createElement('button')
        buildButton.textContent = `Build Here! (-${tower.cost}$)`;
        buildButton.onclick = () => this.buildTower(tower);
        towerDiv.appendChild(title);
        towerDiv.appendChild(range);
        towerDiv.appendChild(speed);
        towerDiv.appendChild(buildButton);
        return towerDiv;
    }

    sellTower(tower: Tower): void {
        this.sendMessage(TOWER_SOLD, tower);
        AnimatedNotifier.printGreenMessage('addMoney', `+${tower.cost} 💵`, GridUtility.getAbsolutePosFromIsoTilePos(tower.getTilePosition()), this.scene, 18);
        this.map.addGameObjectToMap(new NullMapObject(tower.getTilePosition()));
        this.scene.stage.removeChild(tower);
    }

    buildTower(tower: Tower): void {
        const stats: Stats = (this.scene.findObjectByName("Stats") as Stats)

        if (stats === null) {
            console.error('Stats not found!');
            return
        }

        if (stats.money < tower.cost) {
            AnimatedNotifier.printRedMessage('notEnoughMoney', 'Not enough money!', tower.position, this.scene);
            return
        }

        if (!this.isPositionSafe(tower.getTilePosition())) {
            AnimatedNotifier.printRedMessage('cantBuildHere', 'Can\'t build here!', tower.position, this.scene);
            return
        }

        tower.addComponent(new TowerShootingComponent(this.scene));
        tower.addComponent(new TowerSelectionComponent(this.scene));

        AnimatedNotifier.printRedMessage('minusMoney', `-${tower.cost} 💵`, tower.position, this.scene, 18);

        this.scene.stage.addChild(tower);
        this.map.addGameObjectToMap(tower);
        this.scene.stage.sortChildren();

        this.sendMessage(OBSTACLE_ADDED);
        this.sendMessage(TOWER_BOUGHT, tower);
    }

    isPositionSafe(position: Position): boolean {
        if (!(this.map.getTileObject(position) instanceof NullMapObject)) {
            return false;
        }

        const pathFinder = new PathFinder(this.map);
        const itemOfProtectionPos: [number, number] = [this.map.itemOfProtection.getTilePosition().x, this.map.itemOfProtection.getTilePosition().y];
        const enemyCreationItemPos: [number, number] = [this.map.enemyCreationItem.getTilePosition().x, this.map.enemyCreationItem.getTilePosition().y];

        const nullObject = this.map.getTileObject(position);
        this.map.addGameObjectToMap(new Tower(position));
        const pathExists = pathFinder.pathExistsDFS(enemyCreationItemPos, itemOfProtectionPos);
        this.map.addGameObjectToMap(nullObject!);

        return pathExists;
    }
}