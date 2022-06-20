import { Component, resources, Sprite, SpriteFrame, _decorator, Node, Layers, ImageAsset, assetManager } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loading')
export class loading extends Component {
    start() {

        const pic = new Node();
        pic.addComponent(Sprite);
        pic.layer = Layers.Enum.UI_2D;
        this.node.addChild(pic);
        const sprite = pic.getComponent(Sprite);

        const url = 'background/spriteFrame';
        resources.load(url, SpriteFrame, (err: any, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
        });

        // const remoteUrl = 'http://192.168.5.134:9972/icon/tool/100004.png';

        // assetManager.loadRemote<ImageAsset>(remoteUrl, function (err, imageAsset) {
        //     sprite.spriteFrame = SpriteFrame.createWithImage(imageAsset)
        // });

    }

    update(deltaTime: number) {

    }
}

