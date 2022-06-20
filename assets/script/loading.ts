import { Component, resources, Sprite, SpriteFrame, _decorator, Node, Layers, ImageAsset, assetManager, SpriteAtlas, Asset } from 'cc';
import FrameAnimation from '../lib/frameAnimation';
import { loadAtlas } from '../utils/loadAtlas';
const { ccclass, property } = _decorator;

@ccclass('loading')
export class loading extends Component {
    start() {

        const animNode = new Node();
        animNode.addComponent(Sprite);
        animNode.layer = Layers.Enum.UI_2D;
        this.node.addChild(animNode);
        animNode.addComponent(FrameAnimation);

        // 加载 SpriteAtlas（图集），并且获取其中的一个 SpriteFrame
        // 注意 atlas 资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下, 所以需要在第二个参数指定资源类型
        // resources.load("hero", SpriteAtlas, (err, atlas) => {
        //     const frameAnimation = animNode.getComponent(FrameAnimation);
        //     frameAnimation.setFrameArray(atlas.getSpriteFrames());
        //     frameAnimation.play(!!1);
        // });

        const remoteUrl = 'http://127.0.0.1:8080/hero';
        loadAtlas(remoteUrl).then((atlas) => {
            const frameAnimation = animNode.getComponent(FrameAnimation);
            frameAnimation.setFrameArray(atlas.getSpriteFrames());
            frameAnimation.play(!!1);
        });


        // const pic = new Node();
        // pic.addComponent(Sprite);
        // pic.layer = Layers.Enum.UI_2D;
        // this.node.addChild(pic);
        // const sprite = pic.getComponent(Sprite);

        // // const url = 'background/spriteFrame';
        // // resources.load(url, SpriteFrame, (err: any, spriteFrame) => {
        // //     sprite.spriteFrame = spriteFrame;
        // // });

        // const remoteUrl = 'http://127.0.0.1:8080/hero.png';
        // assetManager.loadRemote<ImageAsset>(remoteUrl, function (err, imageAsset) {
        //     sprite.spriteFrame = SpriteFrame.createWithImage(imageAsset)
        // });

    }

    update(deltaTime: number) {

    }
}

