import { Component, _decorator } from 'cc';
import { loadRemoteImage } from '../utils/loadRemoteImage';
import { loadRemoteModel } from '../utils/loadRemoteModel';
import { getHalfStageWidth } from '../utils/stage';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    start() {

        this.createBackground();

        const hero = loadRemoteModel('http://10.42.0.244:8080/model/hero');
        this.node.addChild(hero);
        hero.position.set(-getHalfStageWidth(), 0, 0);

        // const getpos = () => {
        //     const pos = 300;
        //     const x = (Math.random() * pos * 2 - pos);
        //     const y = (Math.random() * pos * 2 - pos);
        //     return { x, y }
        // }
        // const loadremote = location.href.indexOf('loadremote') != -1;
        // //load远程资源
        // if (loadremote) {
        //     const resourcesUrl = 'http://10.42.0.244:8080/model/enemy3_down';
        //     for (let index = 0; index < 100; index++) {
        //         const model = loadRemoteModel(resourcesUrl);
        //         this.node.addChild(model);
        //         const pos = getpos();
        //         model.position.set(pos.x, pos.y, 0);
        //     }
        // } else {
        //     const resourcesUrl = 'model/enemy3_down';
        //     //load本地资源
        //     for (let index = 0; index < 100; index++) {
        //         const model = loadModel(resourcesUrl);
        //         this.node.addChild(model);
        //         const pos = getpos();
        //         model.position.set(pos.x, pos.y, 0);
        //     }
        // }
    }

    private createBackground() {
        const remoteUrl = 'http://10.42.0.244:8080/ui/background.png';
        const image = loadRemoteImage(remoteUrl);
        this.node.addChild(image);
    }
}

