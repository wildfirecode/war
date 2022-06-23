/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-22 14:07:49
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-23 16:58:10
 * @FilePath: \war\assets\script\game\Army.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */

import { _decorator } from 'cc';
import { Firable } from '../../lib/Firable';
import { createEnemyNode } from './utils';

const { ccclass, property } = _decorator;

@ccclass('Army')
export class Army extends Firable {

    protected start() {
        super.start();
        this._fireInterval = 100;
    }

    protected fire() {
        const enemy = this.data = createEnemyNode();
        const gamescene = this.node;
        gamescene.addChild(enemy);
        super.fire();
    }
}

