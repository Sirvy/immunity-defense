import { GridUtility, Position } from "../../utils/GridUtility";
import * as PIXI from 'pixi.js'
import * as CF from 'colfio'
import { Config } from "../../config/Config";
import { TOWER_SOLD } from "../../config/Messages";
import { MenuComponent } from "../Player/MenuComponent";
import Tower from "../../containers/Towers/Tower";
import { HIGHLIGHT_ZINDEX } from "../../config/Globals";

export class TowerSelectionComponent extends CF.Component {

    private tower: Tower;
    private greenTiles: PIXI.Sprite[] = [];
    private menuComponent: MenuComponent;

    constructor(scene: CF.Scene) {
        super();
        this.scene = scene;
    }

    onInit(): void {
        this.subscribe(CF.PointerMessages.POINTER_TAP);
        this.subscribe(TOWER_SOLD);
        this.tower = this.owner as Tower;
        this.menuComponent = this.scene.findGlobalComponentByName(MenuComponent.name) as MenuComponent;
    }

    onMessage(msg: CF.Message) {
        if (msg.action === CF.PointerMessages.POINTER_TAP) {

            this.clearGreenTiles();
            
            const selectedTilePos = GridUtility.getIsoTilePosFromAbsolutePos({x: msg.data.mousePos.posX, y: msg.data.mousePos.posY });

            if (!GridUtility.tilePositionEquals(selectedTilePos, this.tower.getTilePosition())) {
                return;
            }

            this.highlightTowerRange();
            this.menuComponent.drawTowerDetailMenu(this.tower);
            return;
        }

        if (msg.action === TOWER_SOLD) {
            if (msg.data !== this.tower) {
                return;
            }

            this.clearGreenTiles();
        }
    }

    clearGreenTiles(): void {
        this.greenTiles.forEach(tile => this.scene.stage.removeChild(tile));
        this.greenTiles = [];
    }

    highlightTowerRange(): void {
        for (let i = -this.tower.range; i <= this.tower.range; i++) {
            for (let j = -this.tower.range; j <= this.tower.range; j++) {
                if (Math.abs(i) + Math.abs(j) > this.tower.range) {
                    continue;
                }

                const green = new CF.Sprite('iso_tile_green', PIXI.Texture.from('iso_tile_green.png'));
                const tilePos = {x: this.tower.getTilePosition().x + i, y: this.tower.getTilePosition().y + j};

                if (tilePos.x < 0 || tilePos.y < 0 || tilePos.x >= Config.X_TILES || tilePos.y >= Config.Y_TILES) {
                    continue;
                }

                const pos: Position = GridUtility.getAbsolutePosFromIsoTilePos(tilePos);
                green.zIndex = HIGHLIGHT_ZINDEX;
                green.anchor.set(0.5);
                green.position.set(pos.x, pos.y);
                this.scene.stage.addChild(green);
                this.greenTiles.push(green);
            }
        }
        this.scene.stage.sortChildren()
    }
}