/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-20 09:28:13
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-21 14:32:03
 * @FilePath: \war\assets\script\game.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Component, input,Input, _decorator } from 'cc';
import { loadImage } from '../utils/loadImage';
import { loadModel } from '../utils/loadModel';
import { loadRemoteImage } from '../utils/loadRemoteImage';
import { loadRemoteModel } from '../utils/loadRemoteModel';
import { getHalfStageWidth } from '../utils/stage';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    start() {

        this.createBackground();

        const hero = loadModel('model/hero');
        this.node.addChild(hero);

        input.on(Input.EventType.MOUSE_DOWN,()=>{
            console.log('MOUSE_DOWN');
        },this)

        input.on(Input.EventType.MOUSE_UP,()=>{
            console.log('MOUSE_UP');
        },this)

        input.on(Input.EventType.MOUSE_MOVE,()=>{
            console.log('MOUSE_MOVE');
        },this)
        input.on(Input.EventType.MOUSE_DOWN,()=>{
            console.log('MOUSE_MOVE');
        },this)
        // hero.position.set(-getHalfStageWidth(), 0, 0);

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
        const url = 'ui/background';
        const image = loadImage(url);
        this.node.addChild(image);
    }
}

