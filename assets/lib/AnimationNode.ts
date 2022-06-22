import { Node, SpriteAtlas } from 'cc';

export class AnimationNode extends Node {
    static SPRITE_ATLAS_LOAD_COMPLETE = 'SPRITE_ATLAS_LOAD_COMPLETE'
    private _atlas: SpriteAtlas;
    set atlas(val: SpriteAtlas) {
        this._atlas = val;
        this.emit(AnimationNode.SPRITE_ATLAS_LOAD_COMPLETE);
    }
    get atlas() { return this._atlas }

    get spriteFrameWidth(){
        const frame = this._atlas?.getSpriteFrames()[0];
        if(frame){
            return frame.originalSize.width;
        }
        return 0
    }
    get spriteFrameHeight(){
        const frame = this._atlas?.getSpriteFrames()[0];
        if(frame){
            return frame.originalSize.height;
        }
        return 0
    }
}