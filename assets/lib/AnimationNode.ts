import { Animation, AnimationClip, AnimationState, Component, resources, SpriteAtlas, _decorator } from 'cc';
import { IFrameAnimationOptions } from '../utils/IFrameAnimationOptions';
const { ccclass, property } = _decorator;


@ccclass('AnimationModel')
export class AnimationModel extends Component {

    static SPRITE_ATLAS_LOAD_COMPLETE = 'SPRITE_ATLAS_LOAD_COMPLETE';
    private _optionMap: { [key: string]: IFrameAnimationOptions };
    private _atlasMap: { [key: string]: SpriteAtlas };

    start() {
        this._optionMap = {};
        this._atlasMap = {};

        const animation = this.addComponent(Animation);

        // @ts-ignore
        animation.on('finished', this.onAnimationFinished, this);

    }

    onAnimationFinished(type: string, state: AnimationState) {
        const options = this._optionMap[state.name];
        if (options?.finished) {
            options.finished.call(options.thisobj);
        }
    }

    private _currentAction: string;
    private _defaultAction: string;
    play(action: string) {
        this._currentAction = action;
        const animation = this.getComponent(Animation);
        const state = animation.getState(action);
        const clip = state?.clip;
        if (clip && !state?.isPlaying) {
            animation.play(action);
        }
    }

    stop(action?: string) {
        action = action || this._defaultAction;
        const animation = this.getComponent(Animation);
        const state = animation.getState(action);
        const clip = state?.clip;
        if (clip && state?.isPlaying) {
            state.stop();
        }
        if (this._currentAction == action) {
            this._currentAction = null;
        }
    }

    addDefaultAction(action: string, resourcesUrl: string, options?: IFrameAnimationOptions) {
        this._defaultAction = action;
        this.addAction(action, resourcesUrl, options)
        this.play(action);
    }

    addAction(action: string, resourcesUrl: string, options?: IFrameAnimationOptions) {
        options = options || {};
        this._optionMap[action] = options;

        resources.load(resourcesUrl, SpriteAtlas, (err, atlas) => {
            this.setAtlas(action, atlas);
            const frames = atlas.getSpriteFrames();
            const fps = options.fps || 10;
            const clip = AnimationClip.createWithSpriteFrames(frames, fps);
            clip.name = action;
            clip.wrapMode = options.wrapMode || 2;//循环 WrapMode.Loop

            const animation = this.getComponent(Animation);
            animation.addClip(clip);
            if (action == this._currentAction) {
                animation.play(action);
            }
        });
    }


    private setAtlas(action: string, val: SpriteAtlas) {
        this._atlasMap[action] = val;
        this.node.emit(AnimationModel.SPRITE_ATLAS_LOAD_COMPLETE, action);
    }

    getAtlas(action: string) {
        return this._atlasMap[action]
    }

    get defaultAtlas() {
        return this.getAtlas(this._defaultAction);
    }


    getSpriteFrameWidth(action: string) {
        const frame = this.getAtlas(action)?.getSpriteFrames()[0];
        if (frame) {
            return frame.originalSize.width;
        }
        return 0
    }
    getSpriteFrameHeight(action: string) {
        const frame = this.getAtlas(action)?.getSpriteFrames()[0];
        if (frame) {
            return frame.originalSize.height;
        }
        return 0
    }

    get spriteFrameWidth() {
        const frame = this.getAtlas(this._defaultAction)?.getSpriteFrames()[0];
        if (frame) {
            return frame.originalSize.width;
        }
        return 0
    }
    get spriteFrameHeight() {
        const frame = this.getAtlas(this._defaultAction)?.getSpriteFrames()[0];
        if (frame) {
            return frame.originalSize.height;
        }
        return 0
    }
}