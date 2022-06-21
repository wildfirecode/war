/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-20 09:28:13
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-21 17:43:49
 * @FilePath: \war\assets\script\game.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Component, EventTouch, input, Input, Vec2, Vec3, view, _decorator } from 'cc';
import { loadImage } from '../utils/loadImage';
import { loadModel } from '../utils/loadModel';
import { getHalfStageWidth, getStageHeight, getStageWidth } from '../utils/stage';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    start() {

        // this.createBackground();

        const hero = loadModel('model/hero');
        this.node.addChild(hero);

        console.log('node name:', this.node.name, getHalfStageWidth());
        
        
        const vec3 = new Vec3();
        input.on(Input.EventType.TOUCH_MOVE, (event: EventTouch) => {
            const offsetX = event.getDeltaX() ;
            const offsetY = event.getDeltaY() ;
            const posx = offsetX / view.getScaleX() + hero.position.x;
            const posy = offsetY / view.getScaleX() + hero.position.y;
            hero.setPosition(vec3.set(posx, posy, 0));
        }, this)



        // let startX,startY;
        // let originX,originY;
        // input.on(Input.EventType.TOUCH_START, (event: EventTouch) => {
        //     originX = hero.position.x;
        //     originY = hero.position.y;
        //     startX = event.getLocationX();
        //     startY = event.getLocationY();
        // }, this)
        // input.on(Input.EventType.TOUCH_END, (event: EventTouch) => {
        //     startX = 0;
        //     startY = 0;
        // }, this)
        // input.on(Input.EventType.TOUCH_MOVE, (event: EventTouch) => {
        //     const offsetX = event.getLocationX() - startX;
        //     const offsetY = event.getLocationY() - startY;
        //     const posx = offsetX / view.getScaleX() + originX;
        //     const posy = offsetY / view.getScaleX() + originY;
        //     hero.setPosition(vec3.set(posx, posy, 0));
        // }, this)



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

