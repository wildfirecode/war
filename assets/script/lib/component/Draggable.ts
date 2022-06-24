/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-21 11:39:55
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-21 16:28:20
 * @FilePath: \war\assets\lib\Draggable.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Component, _decorator, input, Input, EventTouch, Vec2, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Draggable')
export class Draggable extends Component {
    start() {
        const node = this.node;
        const vec3 = new Vec3();
        node.on(Input.EventType.TOUCH_MOVE, (event: EventTouch) => {
            const offsetX = event.getDeltaX();
            const offsetY = event.getDeltaY();
            const posx = offsetX / view.getScaleX() + node.position.x;
            const posy = offsetY / view.getScaleX() + node.position.y;
            node.setPosition(vec3.set(posx, posy, 0));
        }, this);

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
    }

}
