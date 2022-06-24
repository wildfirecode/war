/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-20 20:05:11
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-20 21:06:23
 * @FilePath: \war\assets\utils\loadRemoteImage.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { assetManager, ImageAsset, SpriteFrame, Layers, Node, Sprite } from 'cc';
import { IFrameAnimationOptions } from './IFrameAnimationOptions';
export const loadRemoteImage = (remoteUrl, options: IFrameAnimationOptions = {}) => {
    const image = new Node();
    const sprite = image.addComponent(Sprite);
    image.layer = Layers.Enum.UI_2D;

    assetManager.loadRemote<ImageAsset>(remoteUrl, (err, asset) => {
        sprite.spriteFrame = SpriteFrame.createWithImage(asset)
    })

    return image;
}
