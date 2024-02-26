import { Container } from "colfio"
import { Position } from "../utils/GridUtility";
import GameObject from "./GameObject";
import { NullMapObject } from "./NullMapObject";
import ItemOfProtection from "./ItemOfProtection";
import EnemyCreationItem from "./EnemyCreationItem";

export default class GameMap extends Container {
    private map: GameObject[][] = [];
    private size_x: number;
    private size_y: number;
    private _itemOfProtection: ItemOfProtection;
    private _enemyCreationItem: EnemyCreationItem;

    constructor(size_x: number, size_y: number, itemOfProtection: ItemOfProtection, enemyCreationItem: EnemyCreationItem) {
        super("GameMap");
        this.size_x = size_x;
        this.size_y = size_y;
        this._itemOfProtection = itemOfProtection;
        this._enemyCreationItem = enemyCreationItem;

        this.initMapWithNullObjects();
        this.addGameObjectToMap(this._itemOfProtection)
        this.addGameObjectToMap(this._enemyCreationItem)
    }

    get sizeX(): number {
        return this.size_x
    }

    get sizeY(): number {
        return this.size_y
    }

    get itemOfProtection(): ItemOfProtection {
        return this._itemOfProtection;
    }

    get enemyCreationItem(): EnemyCreationItem {
        return this._enemyCreationItem;
    }

    getMap(): GameObject[][] {
        return this.map;
    }

    initMapWithNullObjects(): void {
        for (let i = 0; i < this.size_x; i++) {
            this.map[i] = []
            for (let j = 0; j < this.size_y; j++) {
                this.map[i][j] = new NullMapObject({x: i, y: j});
            }
        }
    }

    addGameObjectToMap(gameObject: GameObject): void {
        if (gameObject.getTilePosition().x >= this.size_x || gameObject.getTilePosition().y >= this.size_y) {
            return;
        }

        this.map[gameObject.getTilePosition().x][gameObject.getTilePosition().y] = gameObject;
    }

    getTileObject(position: Position): GameObject | null {
        if (position.x >= this.size_x || position.y >= this.size_y || position.x < 0 || position.y < 0) {
            return null;
        }

        return this.map[position.x][position.y];
    }

}