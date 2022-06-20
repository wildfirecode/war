import { Component, director, _decorator } from 'cc';
import { loadRemoteModel } from '../utils/loadRemoteModel';
const { ccclass, property } = _decorator;

@ccclass('loading')
export class loading extends Component {
    onAnimationFinished() {
        director.loadScene('game')
    }
    start() {
        const remoteUrl = 'http://10.42.0.244:8080/model/game_loading';
        const animationNode = loadRemoteModel(remoteUrl, {
            fps: 4, wrapMode: 1,
            finished: this.onAnimationFinished,
            thisobj: this
        });
        this.node.addChild(animationNode);
    }
}