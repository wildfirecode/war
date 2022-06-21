/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-21 11:39:55
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-21 16:28:20
 * @FilePath: \war\assets\lib\Draggable.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Component, _decorator, input, Input, EventTouch, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Draggable')
export class Draggable extends Component {

    protected dragThreshold: number = 1;

    /**
     * 触摸开始位置
     */
    protected touchStartPos: Vec2 = null;

    /**
     * 拖拽位置偏移
     */
    protected dragOffset: Vec2 = null;

    /**
     * 拖拽位置偏移
     */
    protected isDragging: boolean = false;

    /**
     * 拖拽事件
     */
    public static get EventType() {
        return EventType;
    }

    /**
     * 生命周期：加载
     */
    protected onLoad() {
        this.registerEvent();
    }

    /**
     * 生命周期：销毁
     */
    protected onDestroy() {
        this.unregisterEvent();
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    /**
     * 反注册事件
     */
    protected unregisterEvent() {
        this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    /**
     * 触摸开始回调
     * @param event 
     */
    protected onTouchStart(event: EventTouch) {
        // 记录开始位置
        this.touchStartPos = event.getLocation();
        // 记录中心偏移
        const touchPosInNode = null;
        // const touchPosInNode = this.node.getParent().convertToNodeSpaceAR(event.getLocation());
        this.dragOffset = touchPosInNode.sub(this.node.getPosition());
    }

    /**
     * 触摸移动回调
     * @param event 
     */
    protected onTouchMove(event: EventTouch) {
        if (!this.dragOffset) {
            return;
        }
        // 触摸位置
        const touchPosInWorld = event.getLocation();
        const touchPosInNode = null;
        // const touchPosInNode = this.node.getParent().convertToNodeSpaceAR(touchPosInWorld);
        // 触摸移动距离（判断是否触发拖拽）
        if (!this.isDragging && this.dragThreshold !== 0) {
            const distance = Vec2.distance(this.touchStartPos, touchPosInWorld);
            if (distance < this.dragThreshold) {
                return;
            }
            // 重新计算中心偏移
            this.dragOffset = touchPosInNode.sub(this.node.getPosition());
        }
        // 移动节点
        this.node.setPosition(touchPosInNode.sub(this.dragOffset));
        // 触发回调
        if (!this.isDragging) {
            this.isDragging = true;
            this.onDragStart();
        } else {
            this.onDragMove();
        }
    }

    /**
     * 触摸取消回调
     * @param event 
     */
    protected onTouchCancel(event: EventTouch) {
        this.onTouchEnd(event);
    }

    /**
     * 触摸结束回调
     * @param event 
     */
    protected onTouchEnd(event: EventTouch) {
        if (!this.dragOffset) {
            return;
        }
        // 重置标志
        this.touchStartPos = null;
        this.dragOffset = null;
        // 触发回调
        if (this.isDragging) {
            this.isDragging = false;
            this.onDragEnd();
        }
    }

    /**
     * 拖拽开始回调
     */
    protected onDragStart() {

    }

    /**
     * 拖拽移动回调
     */
    protected onDragMove() {

    }

    /**
     * 拖拽结束回调
     */
    protected onDragEnd() {

    }


}

/**
 * 拖拽事件
 */
enum EventType {
    /** 拖拽开始 */
    DRAG_START = 'drag-start',
    /** 拖拽移动 */
    DRAG_MOVE = 'drag-move',
    /** 拖拽结束 */
    DRAG_END = 'drag-end',
}
