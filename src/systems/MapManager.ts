import { Component, Scene } from "colfio";
import { Config } from "../config/Config";
import GameMap from "../containers/GameMap";
import { ObstacleComponent } from "../components/ObstacleComponent";
import ItemOfProtection from "../containers/ItemOfProtection";
import EnemyCreationItem from "../containers/EnemyCreationItem";
import { ItemOfProtectionComponent } from "../components/Player/ItemOfProtectionComponent";
import { EnemyCreationComponent } from "../components/Enemy/EnemyCreationComponent";
import { GridUtility } from "../utils/GridUtility";

export default class MapManager extends Component {

    private map: GameMap;
    private itemOfProtection: ItemOfProtection;
    private enemyCreationItem: EnemyCreationItem;

    constructor(scene: Scene) {
        super();
        this.scene = scene;
        this.enemyCreationItem = new EnemyCreationItem({x: 0, y: 0});
        this.itemOfProtection = new ItemOfProtection({x: Config.X_TILES - 5, y: Config.Y_TILES - 5});
        this.map = new GameMap(Config.X_TILES, Config.Y_TILES, this.itemOfProtection, this.enemyCreationItem);

        this.scene.stage.addChild(this.enemyCreationItem);
        this.scene.stage.addChild(this.itemOfProtection);
        this.scene.stage.addChild(this.map);
    }

    onInit(): void {
        this.enemyCreationItem.addComponent(new EnemyCreationComponent(this.scene));
        this.map.addComponent(new ObstacleComponent(this.scene));
        this.itemOfProtection.addComponent(new ItemOfProtectionComponent(this.scene));

        GridUtility.drawIsoGrid(this.scene, this.enemyCreationItem.getTilePosition());
    }
}