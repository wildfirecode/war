/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-20 09:28:13
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-22 16:37:07
 * @FilePath: \war\assets\script\game.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Component, Input, Node, _decorator, Event } from 'cc';
import { Firable } from '../lib/Firable';
import { Movable } from '../lib/Movable';
import { getHalfStageWidth } from '../utils/stage';
import { Army } from './game/Army';
import { createBackground, createHero } from './game/utils';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    private _hero: Node;
    private _army: Army;
    private _bullets: Node[];
    private _enemies: Node[];

    update(dt: number) {
        this._hero;
    }

    private removeBullet(bullet:Node) {
        const index = this._bullets.indexOf(bullet);
        this._bullets.splice(index, 1);
        // console.log('bullets:'+this._bullets.length);
        
    }
    private removeEnemy(enemy:Node) {
        const index = this._enemies.indexOf(enemy);
        this._enemies.splice(index, 1);
        console.log('enemies:'+this._enemies.length);
    }

    start() {
        const bg = createBackground();
        const hero = this._hero = createHero();
        this.node.addChild(bg);
        this.node.addChild(hero);

        this._army = this.node.addComponent(Army);

        this.node.on(Firable.FIRE, (enemy:Node) => {
            console.log('on game fire', enemy.name);
            this._enemies = this._enemies || [];
            this._enemies.push(enemy);
            enemy.once(Movable.ON_DISAPPEAR, this.removeEnemy, this);
        }, this);

        this._hero.on(Firable.FIRE, (bullet: Node) => {
            // console.log('on hero fire', bullet.name);
            this._bullets = this._bullets || [];
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

