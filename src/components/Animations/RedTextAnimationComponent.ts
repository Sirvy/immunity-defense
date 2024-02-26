import { Component, Scene } from "colfio";

export class RedTextAnimationComponent extends Component {
    private alpha: number = 1;

    constructor(scene: Scene) {
        super();
        this.scene = scene;
    }

    onUpdate(delta: number, absolute: number): void {
        this.owner.position.y--;
        this.owner.asText().style.fill = `rgba(0, 0, 0, ${this.alpha})`;
        this.owner.asText().style.dropShadow = true;
        this.owner.asText().style.dropShadowColor = 0xFF5050;
        this.owner.asText().style.dropShadowDistance = 0;
        this.owner.asText().style.dropShadowBlur = 5;

        this.owner.asText().style.dropShadowAlpha = this.alpha;
        

        this.alpha -= 0.01;
        if (this.alpha <= 0.1) {
            this.scene.stage.removeChild(this.owner);
        }
    }
}