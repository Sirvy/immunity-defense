import * as CF from 'colfio';
import GameMap from '../containers/GameMap';
import { Config } from '../config/Config';
import { PathFinder } from '../utils/PathFinder';
import { NullMapObject } from '../containers/NullMapObject';
import Obstacle from '../containers/Obstacles/Obstacle';
import ObstacleA from '../containers/Obstacles/ObstacleA';
import ObstacleB from '../containers/Obstacles/ObstacleB';
import ObstacleC from '../containers/Obstacles/ObstacleC';
import { Position } from '../utils/GridUtility';

export class ObstacleComponent extends CF.Component {
    private map: GameMap;
    private maxRetry: number = 5;

    constructor(scene: CF.Scene) {
        super();
        this.scene = scene;
    }

    onInit(): void {
        this.map = this.owner as GameMap;

        for (let i = 0; i < Config.MAX_OBSTACLES; i++) {
            const position = {
                x: Math.floor(Math.random() * Config.X_TILES),
                y: Math.floor(Math.random() * Config.Y_TILES)
            }

            let retry = 0;
            while(!this.isPositionSafe(position)) {
                if (retry++ >= this.maxRetry) {
                    return;
                }
                position.x = Math.floor(Math.random() * Config.X_TILES);
                position.y = Math.floor(Math.random() * Config.Y_TILES);
            }

            this.createObstacle(position);
        }
    }

    isPositionSafe(position: Position): boolean {
        if (!(this.map.getTileObject(position) instanceof NullMapObject)) {
            return false;
        }

        const pathFinder = new PathFinder(this.map);
        const itemOfProtectionPos: [number, number] = [this.map.itemOfProtection.getTilePosition().x, this.map.itemOfProtection.getTilePosition().y];
        const enemyCreationItemPos: [number, number] = [this.map.enemyCreationItem.getTilePosition().x, this.map.enemyCreationItem.getTilePosition().y];

        const nullObject = this.map.getTileObject(position);
        this.map.addGameObjectToMap(new Obstacle(position));
        const pathExists = pathFinder.pathExistsDFS(enemyCreationItemPos, itemOfProtectionPos);
        this.map.addGameObjectToMap(nullObject!);

        return pathExists;
    }

    createObstacle(position: Position): void {
        const rnd = Math.floor(Math.random() * 90);
        let obstacle: Obstacle;
        if (rnd <= 30) {
            obstacle = new ObstacleA(position);
        } else if (rnd <= 60) {
            obstacle = new ObstacleB(position);
        } else {
            obstacle = new ObstacleC(position);
        }

        this.scene.stage.addChild(obstacle);
        this.map.addGameObjectToMap(obstacle);
        this.scene.stage.sortChildren();
    }
}