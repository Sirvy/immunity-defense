import * as CF from 'colfio';
import * as PIXI from 'pixi.js';
import { GridUtility, Position } from '../../utils/GridUtility';
import GameMap from '../../containers/GameMap';
import { TOWER_BOUGHT, TOWER_SOLD } from '../../config/Messages';
import { NullMapObject } from '../../containers/NullMapObject';
import { MenuComponent } from './MenuComponent';
import Tower from '../../containers/Towers/Tower';
import { BACKGROUND_ZINDEX, HIGHLIGHT_ZINDEX } from '../../config/Globals';

export class GridSelectionComponent extends CF.Component {

    private redTileSprite: PIXI.Sprite | null;
    private selectedTilePos: Position | null = null;
    private map: GameMap;
    private menuComponent: MenuComponent;

    constructor(scene: CF.Scene) {
        super();
        this.scene = scene;
        this.redTileSprite = new CF.Sprite('iso_tile_red', PIXI.Texture.from('iso_tile_red.png'));
        this.redTileSprite.zIndex = HIGHLIGHT_ZINDEX;
        this.redTileSprite.anchor.set(0.5);
    }

    onInit(): void {
        this.subscribe(CF.PointerMessages.POINTER_TAP);
        this.subscribe(TOWER_SOLD);
        this.subscribe(TOWER_BOUGHT);

        this.map = this.scene.findObjectByName('GameMap') as GameMap;
        this.menuComponent = this.scene.findGlobalComponentByName(MenuComponent.name) as MenuComponent;
    }

    onMessage(msg: CF.Message) {
        if (msg.action === CF.PointerMessages.POINTER_TAP) {
            this.selectedTilePos = GridUtility.getIsoTilePosFromAbsolutePos({x: msg.data.mousePos.posX, y: msg.data.mousePos.posY });

            if (!this.tileIsSelectable(this.selectedTilePos)) {
                this.clearSelection();
                return;
            }

            this.highlightTile(this.selectedTilePos);

            this.menuComponent.drawPurchaseListMenu(this.selectedTilePos);
            return;
        }

        if (msg.action === TOWER_SOLD) {
            this.clearSelection();
            return;
        }

        if (msg.action === TOWER_BOUGHT) {
            this.clearSelection();
            return;
        }
    }

    highlightTile(position: Position): void {
        const pos: Position = GridUtility.getAbsolutePosFromIsoTilePos(position);
        this.redTileSprite!.zIndex = HIGHLIGHT_ZINDEX;
        this.redTileSprite!.position.set(pos.x, pos.y);
        this.scene.stage.addChild(this.redTileSprite!);
        this.scene.stage.sortChildren();
    }

    tileIsSelectable(position: Position): boolean {
        return (this.map.getTileObject(position) instanceof NullMapObject) || (this.map.getTileObject(position) instanceof Tower)
    }

    clearSelection(): void {
        this.selectedTilePos = null;
        this.redTileSprite!.zIndex = BACKGROUND_ZINDEX;
        this.scene.stage.sortChildren();
        this.menuComponent.clearMenu();
    }
}