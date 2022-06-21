/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-21 14:26:58
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-21 14:33:08
 * @FilePath: \war\assets\utils\loadImage.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */

import { Layers, Node, resources, Sprite, SpriteFrame } from 'cc';
export const loadImage = (url:string) => {
    const image = new Node();
    url += '/spriteFrame'
    const sprite = image.addComponent(Sprite);
    image.layer = Layers.Enum.UI_2D;

    resources.load(url, SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame
    })

    return image;
}
