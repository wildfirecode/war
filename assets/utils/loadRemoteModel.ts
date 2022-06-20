/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-20 20:05:11
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-20 20:15:22
 * @FilePath: \war\assets\utils\loadRemoteModel.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Animation, AnimationClip, Component, Layers, Node, Sprite, _decorator } from 'cc';
import { IFrameAnimationOptions } from './IFrameAnimationOptions';
import { loadAtlas } from './loadAtlas';
export const loadRemoteModel = (remoteUrl, options: IFrameAnimationOptions = {}) => {
    const animationNode = new Node();
    animationNode.addComponent(Sprite);
    animationNode.layer = Layers.Enum.UI_2D;
    animationNode.addComponent(Animation);

    // const remoteUrl = 'http://10.42.0.244:8080/hero';
    loadAtlas(remoteUrl).then((atlas) => {
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


// enum WrapMode {
//     /**
//      * 向 Animation Component 或者 AnimationClip 查找 wrapMode
//      */
//     Default = 0,
//     /**
//      * 动画只播放一遍
//      */
//     Normal = 1,
//     /**
//      * 从最后一帧或结束位置开始反向播放，到第一帧或开始位置停止
//      */
//     Reverse = 36,
//     /**
//      * 循环播放
//      */
//     Loop = 2,
//     /**
//      * 反向循环播放
//      */
//     LoopReverse = 38,
//     /**
//      * 从第一帧播放到最后一帧，然后反向播放回第一帧，到第一帧后再正向播放，如此循环
//      */
//     PingPong = 22,
//     /**
//      * 从最后一帧开始反向播放，其他同 PingPong
//      */
//     PingPongReverse = 54
// }