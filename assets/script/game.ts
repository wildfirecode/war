/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-20 09:28:13
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-23 18:01:44
 * @FilePath: \war\assets\script\game.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Component, Node, _decorator } from 'cc';
import { Army } from './game/Army';
import { bulletPool, createBackground, createHero } from './game/utils';
import { AnimationModel } from './lib/component/AnimationNode';
import { Draggable } from './lib/component/Draggable';
import { Firable } from './lib/component/Firable';
import { Movable } from './lib/component/Movable';
import { getHalfStageWidth } from './lib/utils/stage';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    private _hero: Node;
    private _bullets: Node[];
    private _enemies: Node[];

    start() {
        this._enemies = this._enemies || [];
        this._bullets = this._bullets || [];

        const bg = createBackground();
        const hero = this._hero = createHero();

        this.node.addChild(bg);
        this.node.addChild(hero);

        this.node.addComponent(Army);

        this.node.on(Firable.FIRE, (enemy: Node) => {
            console.log('on game fire=>', enemy?.name, enemy);
            this._enemies.push(enemy);
            enemy.once(Movable.ON_DISAPPEAR, this.removeEnemy, this);
        }, this);

        this._hero.on(Firable.FIRE, (bullet: Node) => {
            // console.log('on hero fire', bullet.name,bullet);
            // this._bullets.push(bullet);
            // bullet.once(Movable.ON_DISAPPEAR, this.removeBullet, this);
        }, this);

        console.log('node name:', this.node.name, getHalfStageWidth());

        // const getpos = () => {
        //     const pos = 300;
        //     const x = (Math.random() * pos * 2 - pos);
        //     const y = (Math.random() * pos * 2 - pos);
        //     return { x, y }
        // }
        // const loadremote = location.href.indexOf('loadremote') != -1;
        // //load????????????
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
        //     //load????????????
        //     for (let index = 0; index < 100; index++) {
        //         const model = loadModel(resourcesUrl);
        //         this.node.addChild(model);
        //         const pos = getpos();
        //         model.position.set(pos.x, pos.y, 0);
        //     }
        // }
    }
    update(dt: number) {
        // console.log('bullets:'+this._bullets.length);
        // console.log('enemies:' + this._enemies.length);

        
        for (let index = 0; index < this._enemies.length; index++) {
            const enemy = this._enemies[index];
            const enemyModel = enemy.getComponent(AnimationModel);
            // if (!this._hero.defaultAtlas) {
            // console.log('hero default atlas ??????????????????'); 
            // }
            if (!enemyModel.defaultAtlas) {
                console.log('enemy default atlas ??????????????????');
                continue;  //??????????????????
            }
            const heroModel = this._hero.getComponent(AnimationModel);
            if (heroModel.defaultAtlas) {
                const x0 = Math.abs(enemy.position.x - this._hero.position.x);
                const y0 = Math.abs(enemy.position.y - this._hero.position.y);
                const x1 = enemyModel.spriteFrameWidth / 2 + heroModel.spriteFrameWidth / 2;
                const y1 = enemyModel.spriteFrameHeight / 2 + heroModel.spriteFrameHeight / 2;
                if (x0 < x1 && y0 < y1) {
                    console.log('ggggggggggggggggg');
                    this.enabled = false;
                    // this.destroy();
                    heroModel.play('blowup');
                    this._hero.getComponent(Draggable).destroy();
                    this.stop();
                    return;
                }
            }


            //     for (let j = 0; j < this._bullets.length; j++) {
            //         const bullet = this._bullets[j];
            //         const bulletSprite = bullet.getComponent(Sprite);
            //         if (!bulletSprite) {
            //             continue;
            //         }
            //         const x0 = Math.abs(enemy.position.x - bullet.position.x);
            //         const y0 = Math.abs(enemy.position.y - bullet.position.y);
            //         const x1 = enemy.spriteFrameWidth/2 + bulletSprite.spriteFrame.originalSize.width/2;
            //         const y1 = enemy.spriteFrameHeight/2 + bulletSprite.spriteFrame.originalSize.height/2;
            //         if (x0 < x1 && y0 < y1) {

            //         }
            //     }

        }
    }

    private stop() {
        //??????????????????
        for (let index = 0; index < this._enemies.length; index++) {
            const enemy = this._enemies[index];
            enemy.getComponent(AnimationModel).stop();
            const movable = enemy.getComponent(Movable);
            movable.enabled = false;
        }
    }
    private clear() {
        //????????????
    }

    private removeBullet(bullet: Node) {
        bulletPool.put(bullet);
        bullet.parent.removeChild(bullet);
        const index = this._bullets.indexOf(bullet);
        this._bullets.splice(index, 1);
        // console.log('bullets:'+this._bullets.length);

    }
    private removeEnemy(enemy: Node) {
        const index = this._enemies.indexOf(enemy);
        this._enemies.splice(index, 1);
        // console.log('enemies:'+this._enemies.length);
    }
}

