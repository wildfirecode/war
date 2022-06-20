import { Animation, AnimationClip, Component, Layers, Node, Sprite, _decorator } from 'cc';
import { loadAtlas } from '../utils/loadAtlas';
const { ccclass, property } = _decorator;

@ccclass('loading')
export class loading extends Component {
    start() {
        const animationNode = new Node();
        animationNode.addComponent(Sprite);
        animationNode.layer = Layers.Enum.UI_2D;
        this.node.addChild(animationNode);
        animationNode.addComponent(Animation);

        const remoteUrl = 'http://10.42.0.244:8080/hero';
        loadAtlas(remoteUrl).then((atlas) => {
            const frames = atlas.getSpriteFrames();
            const fps = 10;
            const clip = AnimationClip.createWithSpriteFrames(frames, fps);
            clip.name = 'standby';
            clip.wrapMode = 2;//循环
            const animation = animationNode.getComponent(Animation);
            animation.defaultClip = clip;
            animation.play('standby');
        });

    }
}

