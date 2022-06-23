/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-22 14:11:32
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-23 15:09:09
 * @FilePath: \war\assets\script\game\utils.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Vec2 } from "cc";
import { AnimationModel } from "../../lib/AnimationNode";
import { Draggable } from "../../lib/Draggable";
import { Movable } from "../../lib/Movable";
import { Pool } from "../../lib/Pool";
import { loadImage } from "../../utils/loadImage";
import { loadModel } from "../../utils/loadModel";
import { getHalfStageHeight, getHalfStageWidth } from "../../utils/stage";
import { Enemy } from "./Enemy";
import { Weapon } from "./Weapon";

export const createBullet = () => {
    const bullet = loadImage('ui/bullet1');
    bullet.addComponent(Movable);
    return bullet;
}

export const bulletPool = new Pool(createBullet, [Movable]);

export const createEnemyNode = () => {
    // const enemyNode = loadModel('model/enemy3');
    // enemyNode.once(AnimationModel.SPRITE_ATLAS_LOAD_COMPLETE, () => {
    //     const movable = enemyNode.addComponent(Movable);
    //     enemyNode.addComponent(Enemy);
    //     movable.velocityY = -2;
    //     enemyNode.setPosition(0, getHalfStageHeight() - enemyNode.spriteFrameHeight / 2, 0)
    // }, this);
    // return enemyNode
}

export const createHero = (onBlowUpFinish,thisobj) => {
    // const hero = loadModel('model/hero_blowup');
    // hero.addComponent(Draggable);
    // hero.once(AnimationModel.SPRITE_ATLAS_LOAD_COMPLETE, () => {
    //     // const weapon = hero.addComponent(Weapon);
    //     // weapon.firePiontOffset = new Vec2(0, hero.spriteFrameHeight / 2);
    //     hero.setPosition(0, 0, 0)
    //     // hero.setPosition(0, -getHalfStageHeight() + hero.spriteFrameHeight / 2, 0)
    // }, this);
    // return hero

    const hero  = new AnimationModel();
    hero.addDefaultAction('standby', 'model/hero', { wrapMode: 2 });
    hero.addAction('blowup', 'model/hero_blowup', { wrapMode: 1, finished: onBlowUpFinish, thisobj: thisobj });
    return hero
}

export const createBackground = () => {
    const url = 'ui/background';
    const image = loadImage(url);
    return image;
}