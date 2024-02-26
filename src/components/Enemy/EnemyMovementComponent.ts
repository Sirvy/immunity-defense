import { Component, Message } from "colfio";
import { GridUtility, Position } from "../../utils/GridUtility";
import { ENEMY_PATH_UPDATE_INFO, ENEMY_TOUCHED_ITEM_OF_PROTECTION, OBSTACLE_ADDED } from "../../config/Messages";
import GameMap from "../../containers/GameMap";
import { VirtualPathFinder } from "../../utils/VirtualPathFinder";
import Enemy from "../../containers/Enemies/Enemy";
import Tower from "../../containers/Towers/Tower";
import Obstacle from "../../containers/Obstacles/Obstacle";


export class EnemyMovementComponent extends Component {

    private newTilePosition: Position;
    private goalPosition: Position;
    private map: GameMap;
    private virutalMap: number[][] = [];
    private myPath: [number, number][] | null = [];
    private delta: number = 0;
    private enemy: Enemy;

    constructor(goal: Position, map: GameMap) {
        super();
        this.goalPosition = goal;
        this.map = map;
        this.fixedFrequency = 120;
    }

    onInit(): void {
        this.subscribe(OBSTACLE_ADDED);
        this.subscribe(ENEMY_PATH_UPDATE_INFO);

        this.enemy = this.owner as Enemy;

        const currentTilePosition = GridUtility.getIsoTilePosFromAbsolutePos({
            x: this.owner.position.x,
            y: this.owner.position.y
        });

        this.newTilePosition = currentTilePosition;

        this.initVirtualPath();
        this.findPath();
    }

    onFixedUpdate(delta: number, absolute: number): void {
        const newAbsolutePosition = GridUtility.getAbsolutePosFromIsoTilePos(this.newTilePosition);

        let currentTilePosition = GridUtility.getIsoTilePosFromAbsolutePosNoRound({
            x: this.owner.position.x,
            y: this.owner.position.y
        });

        this.owner.zIndex = ((currentTilePosition.x + this.newTilePosition.x) / 2) + ((currentTilePosition.y + this.newTilePosition.y) / 2);

        if (this.owner.position.x - newAbsolutePosition.x < this.delta && this.owner.position.y - newAbsolutePosition.y < this.delta) {
            this.owner.position.x += 1 * this.enemy.speed;
            this.owner.position.y += 0.5 * this.enemy.speed;
            return;
        }

        if (this.owner.position.x - newAbsolutePosition.x > this.delta && this.owner.position.y - newAbsolutePosition.y > this.delta) {
            this.owner.position.x -= 1 * this.enemy.speed;
            this.owner.position.y -= 0.5 * this.enemy.speed;
            return;
        }

        if (this.owner.position.x - newAbsolutePosition.x > this.delta && this.owner.position.y - newAbsolutePosition.y < this.delta) {
            this.owner.position.x -= 1 * this.enemy.speed;
            this.owner.position.y += 0.5 * this.enemy.speed;
            return;
        }

        if (this.owner.position.x - newAbsolutePosition.x < this.delta && this.owner.position.y - newAbsolutePosition.y > this.delta) {
            this.owner.position.x += 1 * this.enemy.speed;
            this.owner.position.y -= 0.5 * this.enemy.speed;
            return;
        }

        currentTilePosition = GridUtility.getIsoTilePosFromAbsolutePos({
            x: this.owner.position.x,
            y: this.owner.position.y
        });

        if (currentTilePosition.x == this.goalPosition.x && currentTilePosition.y == this.goalPosition.y) {
            this.sendMessage(ENEMY_TOUCHED_ITEM_OF_PROTECTION, this.owner);
            return;
        }


        if (this.myPath == null || this.myPath.length === 0) {
            return;
        }

        const nextTile: [number, number] | undefined = this.myPath[this.myPath.length - 1];
        if (nextTile === undefined) {
            return;
        }

        const rand = Math.floor(Math.random() * 2);
        if (rand === 0) {
            this.newTilePosition.x = nextTile[0];
        } else {
            this.newTilePosition.y = nextTile[1];
        }

        if (this.newTilePosition.x === nextTile[0] && this.newTilePosition.y === nextTile[1]) {
            this.myPath.pop();
        }
    }

    onMessage(msg: Message) {
        if (msg.action === OBSTACLE_ADDED) {
            this.myPath = null;
            this.initVirtualPath();
            this.findPath();
        }

        if (msg.action === ENEMY_PATH_UPDATE_INFO) {
            this.virutalMap[msg.data.x][msg.data.y] = 0;
            this.findPath();
        }
    }

    initVirtualPath(): void {
        for (let i = 0; i < this.map.getMap().length; i++) {
            this.virutalMap[i] = [];
            for (let j = 0; j < this.map.getMap()[0].length; j++) {
                if ((this.map.getTileObject({x: i, y: j}) instanceof Tower) ||
                    (this.map.getTileObject({x: i, y: j}) instanceof Obstacle)
                ) {
                    this.virutalMap[i][j] = 0;
                } else {
                    this.virutalMap[i][j] = 1;
                }
            }
        }
    }

    findPath(): void {
        const start: [number, number] = [this.newTilePosition.x, this.newTilePosition.y]
        const end: [number, number] = [this.goalPosition.x, this.goalPosition.y]

        const pathFinder = new VirtualPathFinder(this.virutalMap);
        this.myPath = pathFinder.findPath(start, end);
        if (this.myPath === null) {
            this.initVirtualPath();
            const pathFinder = new VirtualPathFinder(this.virutalMap);
            this.myPath = pathFinder.findPath(start, end);
        }

        this.myPath = this.myPath!.reverse();
    }

}
