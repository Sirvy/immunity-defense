import { Scene, Text } from "colfio";
import { Position } from "./GridUtility";
import { Config } from "../config/Config";
import { GreenTextAnimationComponent } from "../components/Animations/GreenTextAnimationComponent";
import { RedTextAnimationComponent } from "../components/Animations/RedTextAnimationComponent";

export class AnimatedNotifier {

    public static printGreenMessage(name: string, text: string, position: Position, scene: Scene, fontSize: number = 15) {
        const message = new Text(name, text);
        message.style.fontSize = fontSize;
        message.zIndex = Config.X_TILES + Config.Y_TILES;
        message.anchor.set(0.5);
        message.position.set(position.x, position.y);
        message.addComponent(new GreenTextAnimationComponent(scene));
        scene.stage.addChild(message);
    }

    public static printRedMessage(name: string, text: string, position: Position, scene: Scene, fontSize: number = 15) {
        const message = new Text(name, text);
        message.style.fontSize = fontSize;
        message.zIndex = Config.X_TILES + Config.Y_TILES;
        message.anchor.set(0.5);
        message.position.set(position.x, position.y);
        message.addComponent(new RedTextAnimationComponent(scene));
        scene.stage.addChild(message);
    }
}