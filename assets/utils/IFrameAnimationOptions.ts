export interface IFrameAnimationOptions {
    fps?: number;
    /**
     * 1 一遍
     * 2 循环
     */
    wrapMode?:number;
    finished?:Function;
    thisobj?:any;
}