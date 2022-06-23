/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-21 14:26:58
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-23 17:38:31
 * @FilePath: \war\assets\utils\loadImage.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */

import { resources, Sprite, SpriteFrame } from 'cc';
import { createNode } from '../lib/createNode';
export const loadImage = (url:string) => {
    const image = createNode();
    image.name = url.replace('\/','-');
    url += '/spriteFrame';

    resources.load(url, SpriteFrame, (err, spriteFrame) => {
        image.getComponent(Sprite).spriteFrame = spriteFrame
    })

    return image;
}