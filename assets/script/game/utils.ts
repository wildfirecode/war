import { Draggable } from "../../lib/Draggable";
import { loadImage } from "../../utils/loadImage";
import { loadModel } from "../../utils/loadModel";
import { Weapon } from "./Weapon";

/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-22 14:11:32
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-22 14:19:10
 * @FilePath: \war\assets\script\game\utils.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
export const createHero = () => {
    const hero = loadModel('model/hero');
    hero.addComponent(Draggable);
    const weapon = hero.addComponent(Weapon);
    return hero
}

export const createBackground = () => {
    const url = 'ui/background';
    const image = loadImage(url);
    return image;
}