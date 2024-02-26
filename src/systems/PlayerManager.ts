import { Component, Scene } from "colfio";
import { GridSelectionComponent } from "../components/Player/GridSelectionComponent";
import { MenuComponent } from "../components/Player/MenuComponent";

export default class PlayerManager extends Component {

    private gridSelectionComponent: GridSelectionComponent;
    private menuComponent: MenuComponent;

    constructor(scene: Scene) {
        super();
        this.scene = scene;
        this.gridSelectionComponent = new GridSelectionComponent(this.scene);
        this.menuComponent = new MenuComponent(this.scene);
    }

    onInit(): void {
        this.scene.addGlobalComponent(this.menuComponent);
        this.scene.addGlobalComponent(this.gridSelectionComponent);
    }

    onFinish(): void {
        this.scene.removeGlobalComponent(this.gridSelectionComponent);
        this.scene.removeGlobalComponent(this.menuComponent);
    }
}