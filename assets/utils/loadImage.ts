/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-21 14:26:58
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-22 15:12:59
 * @FilePath: \war\assets\utils\loadImage.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */

import { Layers, Node, resources, Sprite, SpriteFrame } from 'cc';
export const loadImage = (url:string) => {
    const image = new Node();
    image.name = url.replace('\/','-')
    url += '/spriteFrame'
    const sprite = image.addComponent(Sprite);
    image.layer = Layers.Enum.UI_2D;

    resources.load(url, SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame
    })

    return image;
}