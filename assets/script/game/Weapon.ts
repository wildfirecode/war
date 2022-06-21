/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-21 20:51:03
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-21 21:13:09
 * @FilePath: \war\assets\script\game\Weapon.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */

import { Component, _decorator } from 'cc';
import { Movable } from '../../lib/Movable';
import { loadImage } from '../../utils/loadImage';

const { ccclass, property } = _decorator;

@ccclass('Weapon')
export class Weapon extends Component {
    bulletModel = 'ui/bullet1';
    bulletVelocityY = 5;
    shootInterval: number = .1;//时间秒
    private _intervalCounter: number = 0;

    update(dt: number) {
        if (this._intervalCounter > this.shootInterval) {

            const bullet = loadImage(this.bulletModel);
            this.node.parent.addChild(bullet);
            const movable = bullet.addComponent(Movable);
            movable.velocityY = this.bulletVelocityY;
            bullet.setPosition(this.node.position.x, this.node.position.y, 0);

            this._intervalCounter = 0;
        } else {
            this._intervalCounter += dt;
        }

    }
}

