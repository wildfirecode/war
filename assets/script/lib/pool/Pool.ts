import { Component,Node } from "cc";

/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-22 20:34:43
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-22 20:34:55
 * @FilePath: \war\assets\lib\Pool.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
export interface IPoolItem extends Component {
    reuse();
    unuse();
}
export class Pool {
    componentList: any[];
    creator: Function;
    list: Node[];
    constructor(creator: Function, componentList: any[] = []) {
        this.componentList = componentList;
        this.creator = creator;
        this.list = [];
    }

    put(node) {
        const index = this.list.indexOf(node);
        if (index == -1) {
            this.list.push(node);
            for (let index = 0; index < this.componentList.length; index++) {
                const component = this.componentList[index];
                const instance = node.getComponent(component) as IPoolItem;
                instance.unuse();
            }
        }
    }

    get() {
        if (this.list.length > 0) {
            const node = this.list.pop();
            for (let index = 0; index < this.componentList.length; index++) {
                const component = this.componentList[index];
                const instance = node.getComponent(component) as IPoolItem;
                instance.reuse();
            }
            return node;
        }
        return this.creator();
    }
}