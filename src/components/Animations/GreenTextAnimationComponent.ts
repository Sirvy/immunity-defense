import { Component, Scene } from "colfio";

export class GreenTextAnimationComponent extends Component {
    private ctr: number
    private alpha: number = 1

    constructor(scene: Scene) {
        super()
        this.scene = scene
        this.ctr = 0
    }

    onUpdate(delta: number, absolute: number): void {
        this.owner.position.y--;
        //this.owner.asText().style.fill = `rgba(30, 150, 50, ${this.alpha})`;
        this.owner.asText().style.fill = `rgba(255, 255, 255, ${this.alpha})`;
        this.owner.asText().style.dropShadow = true;
        this.owner.asText().style.dropShadowColor = `rgba(0, 255, 0, ${this.alpha})`;
        this.owner.asText().style.dropShadowDistance = 0;
        this.owner.asText().style.dropShadowBlur = 5;

        this.alpha -= 0.01;
        if (this.alpha <= 0.1) {
            this.scene.stage.removeChild(this.owner);
        }
    }
}