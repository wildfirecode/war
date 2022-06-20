import { _decorator, Component, Node, Layers, Sprite, Animation, assetManager, resources, SpriteFrame, ImageAsset } from 'cc';
import { loadRemoteImage } from '../utils/loadRemoteImage';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    start() {
        
        const remoteUrl = 'http://10.42.0.244:8080/ui/background.png';
        const image = loadRemoteImage(remoteUrl)
        this.node.addChild(image);
    }

    update(deltaTime: number) {

    }
}

