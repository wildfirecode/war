/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-20 09:28:13
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-22 20:37:52
 * @FilePath: \war\assets\script\game.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Component, Node, _decorator } from 'cc';
import { AnimationNode } from '../lib/AnimationNode';
import { Firable } from '../lib/Firable';
import { Movable } from '../lib/Movable';
import { getHalfStageWidth } from '../utils/stage';
import { bulletPool, createBackground, createHeroNode } from './game/utils';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    private _hero: AnimationNode;
    private _bullets: Node[];
    private _enemies: AnimationNode[];

    update(dt: number) {
        // console.log('bullets:'+this._bullets.length);
        // console.log('enemies:' + this._enemies.length);
        // for (let index = 0; index < this._enemies.length; index++) {
        //     const enemy = this._enemies[index];
        //     if (!enemy.atlas) continue;//还没加载完成
        //     if (this._hero.atlas) {
        //         const x0 = Math.abs(enemy.position.x - this._hero.position.x);
        //         const y0 = Math.abs(enemy.position.y - this._hero.position.y);
        //         const x1 = enemy.spriteFrameWidth + this._hero.spriteFrameWidth;
        //         const y1 = enemy.spriteFrameHeight + this._hero.spriteFrameHeight;
        //         if (x0 < x1 && y0 < y1) {
        //             console.log('gg');
        //             // this.enabled = false;
        //             return;
        //         }
        //     }
        //     for (let j = 0; j < this._bullets.length; j++) {
        //         const bullet = this._bullets[j];
        //         const bulletSprite = bullet.getComponent(Sprite);
        //         if (!bulletSprite) {
        //             continue;
        //         }
        //         const x0 = Math.abs(enemy.position.x - bullet.position.x);
        //         const y0 = Math.abs(enemy.position.y - bullet.position.y);
        //         const x1 = enemy.spriteFrameWidth + bulletSprite.spriteFrame.originalSize.width;
        //         const y1 = enemy.spriteFrameHeight + bulletSprite.spriteFrame.originalSize.height;
        //         if (x0 < x1 && y0 < y1) {

        //         }
        //     }

        // }
    }

    private removeBullet(bullet: Node) {
        bulletPool.put(bullet);
        bullet.parent.removeChild(bullet);
        const index = this._bullets.indexOf(bullet);
        this._bullets.splice(index, 1);
        // console.log('bullets:'+this._bullets.length);

    }
    private removeEnemy(enemy: AnimationNode) {
        const index = this._enemies.indexOf(enemy);
        this._enemies.splice(index, 1);
        // console.log('enemies:'+this._enemies.length);
    }

    start() {
        this._enemies = this._enemies || [];
        this._bullets = this._bullets || [];

        const bg = createBackground();
        const hero = this._hero = createHeroNode();
        this.node.addChild(bg);
        this.node.addChild(hero);

        // this.node.addComponent(Army);

        this.node.on(Firable.FIRE, (enemy: AnimationNode) => {
            // console.log('on game fire', enemy.name, enemy);
            this._enemies.push(enemy);
            enemy.once(Movable.ON_DISAPPEAR, this.removeEnemy, this);
        }, this);

        this._hero.on(Firable.FIRE, (bullet: Node) => {
            // console.log('on hero fire', bullet.name,bullet);
            this._bullets.push(bullet);
            bullet.once(Movable.ON_DISAPPEAR, this.removeBullet, this);
        }, this);

        console.log('node name:', this.node.name, getHalfStageWidth());

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
}

