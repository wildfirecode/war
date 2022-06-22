/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-21 20:51:03
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-22 16:31:17
 * @FilePath: \war\assets\script\game\Weapon.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */

import { Vec2, _decorator } from 'cc';
import { Firable } from '../../lib/Firable';
import { Movable } from '../../lib/Movable';
import { loadImage } from '../../utils/loadImage';

const { ccclass, property } = _decorator;

@ccclass('Weapon')
export class Weapon extends Firable {
    firePiontOffset: Vec2;
    bulletModel = 'ui/bullet1';
    bulletVelocityY = 5;

    protected start() {
        this._fireInterval = .1;
    }
    protected fire() {
        this.data = this.creatBullet();
        super.fire();
    }

    private creatBullet() {
        const bullet = loadImage(this.bulletModel);
        const movable = bullet.addComponent(Movable);

        movable.velocityY = this.bulletVelocityY;

        bullet.setPosition(this.node.position.x + this.firePiontOffset.x, this.node.position.y + this.firePiontOffset.y, 0);

        const gamescene = this.node.parent;
        gamescene.addChild(bullet);
        return bullet;
    }
}

