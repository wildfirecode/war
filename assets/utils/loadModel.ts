/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-21 10:36:41
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-23 14:47:10
 * @FilePath: \war\assets\utils\loadModel.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Animation, AnimationClip, Layers, Node, resources, Sprite, SpriteAtlas } from 'cc';
import { AnimationModel } from '../lib/AnimationNode';
import { IFrameAnimationOptions } from './IFrameAnimationOptions';
export const loadModel = (resourcesUrl: string, action:string, animationNode?: AnimationModel, options?: IFrameAnimationOptions) => {
    // animationNode = animationNode || new AnimationModel();
    // animationNode.name = resourcesUrl.replace('\/', '-');
    // animationNode.addComponent(Sprite);
    // animationNode.layer = Layers.Enum.UI_2D;

    // options = options || {};

    // resources.load(resourcesUrl, SpriteAtlas, (err, atlas) => {
    //     animationNode.atlas = atlas;
    //     const frames = atlas.getSpriteFrames();
    //     const fps = options.fps || 10;

    //     const clip = AnimationClip.createWithSpriteFrames(frames, fps);
    //     clip.name = action;
    //     clip.wrapMode = options.wrapMode || 2;//循环 WrapMode.Loop

    //     const animation = animationNode.addComponent(Animation);
    //     animation.addClip(clip);
    //     animation.play(action);

    //     if (options.finished) {
    //         // @ts-ignore
    //         animation.once('finished', options.finished, options.thisobj);
    //     }
    // });
    // return animationNode;
}