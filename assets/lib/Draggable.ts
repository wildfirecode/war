/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-21 11:39:55
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-21 13:30:37
 * @FilePath: \war\assets\lib\Draggable.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Component, _decorator, input, Input, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Draggable')
export class Draggable extends Component {

    onLoad() {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onDestroy() {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(event: EventTouch) {
        console.log(event.getLocation());  // Location on screen space
        console.log(event.getUILocation());  // Location on UI space
        // console.log(this.node.position);

    }

}

