/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-21 19:33:22
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-22 20:35:45
 * @FilePath: \war\assets\lib\Movable.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */

import { Component, _decorator, input, Input, EventTouch, Vec2, Vec3, view, Sprite } from 'cc';
import { getHalfStageHeight, getHalfStageWidth } from '../utils/stage';
import { IPoolItem } from './Pool';
const { ccclass, property } = _decorator;

@ccclass('Movable')
export class Movable extends Component implements IPoolItem {
    static ON_DISAPPEAR = 'ON_DISAPPEAR';
    velocityX = 0;
    velocityY = 2;
    start() {
        // console.log('Movable start');
    }

    onLoad() {
        // console.log('Movable onLoad');
    }

    reuse(){
        // console.log('Movable reuse');
    }
    
    unuse(){
        // console.log('Movable unuse');
    }

    update(dt: number) {
        const move = dt * 60;
        const posx = this.node.position.x + this.velocityX * move;
        const posy = this.node.position.y + this.velocityY * move;
        this.node.setPosition(posx, posy, 0);

        const sprite = this.node.getComponent(Sprite);
        if (sprite?.spriteFrame) {
            const size = sprite.spriteFrame.originalSize;
            const topEdge = getHalfStageHeight() + size.height / 2;
            const bottomEdge = -getHalfStageHeight() - size.height / 2;
            const rightEdge = getHalfStageWidth() + size.width / 2;
            const leftEdge = -getHalfStageWidth() - size.width / 2;

            if (posy > topEdge || posy < bottomEdge || posx < leftEdge || posx > rightEdge) {
                this.node.emit(Movable.ON_DISAPPEAR, this.node);
            }
        }
    }

}
