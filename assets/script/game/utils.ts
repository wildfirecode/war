/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-22 14:11:32
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-23 18:02:46
 * @FilePath: \war\assets\script\game\utils.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Vec2 } from "cc";
import { AnimationModel } from "../../lib/AnimationNode";
import { createNode } from "../../lib/createNode";
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
    const enemyNode = createNode();
    enemyNode.name = 'enemy';
    const model = enemyNode.addComponent(AnimationModel);
    model.addDefaultActionInfo('standby', 'model/enemy3', { wrapMode: 2 });
    enemyNode.once(AnimationModel.SPRITE_ATLAS_LOAD_COMPLETE, (action) => {
        const movable = enemyNode.addComponent(Movable);
        movable.velocityY = -8;
        enemyNode.setPosition(0, getHalfStageHeight() - model.getSpriteFrameHeight(action) / 2, 0)
    }, this);
    return enemyNode;
}

export const createHero = () => {
    // hero.once(AnimationModel.SPRITE_ATLAS_LOAD_COMPLETE, () => {
    //     // const weapon = hero.addComponent(Weapon);
    //     // weapon.firePiontOffset = new Vec2(0, hero.spriteFrameHeight / 2);
    //     // hero.setPosition(0, -getHalfStageHeight() + hero.spriteFrameHeight / 2, 0)
    // }, this);
    // return hero

    const onBlowUpFinish = () => {
        console.log('onBlowUpFinish');
        hero.parent = null;
    }
    const hero = createNode();
    hero.addComponent(Draggable);
    const model = hero.addComponent(AnimationModel);
    model.addDefaultActionInfo('standby', 'model/hero', { wrapMode: 2 });
    model.addActionInfo('blowup', 'model/hero_blowup', { wrapMode: 1, finished: onBlowUpFinish, thisobj: this });
    hero.setPosition(0, 0, 0);
    hero.once(AnimationModel.SPRITE_ATLAS_LOAD_COMPLETE, (action) => {
        if (action == 'standby') {
            const weapon = hero.addComponent(Weapon);
            weapon.firePiontOffset = new Vec2(0, model.spriteFrameHeight / 2);
            hero.setPosition(0, -getHalfStageHeight() + model.spriteFrameHeight / 2, 0)
        }
    }, this);
    return hero
}

export const createBackground = () => {
    const url = 'ui/background';
    const image = loadImage(url);
    return image;
}