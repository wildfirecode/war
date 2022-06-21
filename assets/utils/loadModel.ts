/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-21 09:17:13
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-21 09:27:02
 * @FilePath: \war\assets\utils\loadModel.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Animation, AnimationClip, Layers, Node, resources, Sprite, SpriteAtlas } from 'cc';
import { IFrameAnimationOptions } from './IFrameAnimationOptions';
export const loadModel = (resourcesUrl, options: IFrameAnimationOptions = {}) => {
    const animationNode = new Node();
    animationNode.addComponent(Sprite);
    animationNode.layer = Layers.Enum.UI_2D;
    const animation = animationNode.addComponent(Animation);

    if (options.finished) {
        // @ts-ignore
        animation.once('finished', options.finished, options.thisobj);
    }

    resources.load(resourcesUrl, SpriteAtlas, (err, atlas) => {
        const frames = atlas.getSpriteFrames();
        const fps = options.fps || 10;
        const clip = AnimationClip.createWithSpriteFrames(frames, fps);
        clip.name = 'standby';
        clip.wrapMode = options.wrapMode || 2;//循环 WrapMode.Loop
        const animation = animationNode.getComponent(Animation);
        animation.defaultClip = clip;
        animation.play('standby');
    });
    return animationNode;
}
