/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-22 14:11:32
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-22 16:36:25
 * @FilePath: \war\assets\script\game\utils.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Vec2 } from "cc";
import { AnimationNode } from "../../lib/AnimationNode";
import { Draggable } from "../../lib/Draggable";
import { Movable } from "../../lib/Movable";
import { loadImage } from "../../utils/loadImage";
import { loadModel } from "../../utils/loadModel";
import { getHalfStageHeight, getHalfStageWidth } from "../../utils/stage";
import { Weapon } from "./Weapon";

export const createEnemy = () => {
    const enemy = loadModel('model/enemy3');
    const movable = enemy.addComponent(Movable);
    movable.velocityY = -10;
    enemy.once(AnimationNode.SPRITE_ATLAS_LOAD_COMPLETE, () => {
        enemy.setPosition(-getHalfStageWidth(), getHalfStageHeight() - enemy.spriteFrameHeight / 2, 0)
    }, this);
    return enemy
}

export const createHero = () => {
    const hero = loadModel('model/hero');
    hero.addComponent(Draggable);
    hero.once(AnimationNode.SPRITE_ATLAS_LOAD_COMPLETE, () => {
        const weapon = hero.addComponent(Weapon);
        weapon.firePiontOffset = new Vec2(0, hero.spriteFrameHeight / 2);
        hero.setPosition(-getHalfStageWidth(), -getHalfStageHeight() + hero.spriteFrameHeight / 2, 0)
        // hero.setPosition(0, -getHalfStageHeight() + hero.spriteFrameHeight / 2, 0)
    }, this);
    return hero
}

export const createBackground = () => {
    const url = 'ui/background';
    const image = loadImage(url);
    return image;
}