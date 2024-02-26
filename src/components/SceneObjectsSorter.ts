import { Component, Scene } from "colfio";

export class SceneObjectsSorter extends Component {
    private lastSort: Date;
    private intervalInMs = 500;

    constructor(scene: Scene) {
        super();
        this.scene = scene;
        this.lastSort = new Date();
    }

    onUpdate(delta: number, absolute: number): void {
        return; 
        
        if (((new Date()).getTime()) <= (this.lastSort.getTime()) + this.intervalInMs) {
            return;
        }

        this.lastSort = new Date();

        this.scene.stage.sortChildren();
    }
}