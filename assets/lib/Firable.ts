/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-22 14:07:49
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-22 16:02:43
 * @FilePath: \war\assets\lib\Firable.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */

import { Component, _decorator } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('Firable')
export class Firable extends Component {
    static FIRE = 'FIRE'
    private _intervalCounter: number = 0;
    protected _fireInterval: number;//时间秒
    public data: any;

    protected start() {
        this._fireInterval = 2;
    }

    protected fire() {
        this.node.emit(Firable.FIRE, this.data);
    }

    update(dt: number) {
        if (this._intervalCounter > this._fireInterval) {

            this.fire();

            this._intervalCounter = 0;
        } else {
            this._intervalCounter += dt;
        }
    }
}

