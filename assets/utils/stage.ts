import { view } from 'cc';

export const getStageWidth = () => {
    const designWidth = view.getDesignResolutionSize().width;
    return designWidth;
}

export const getHalfStageWidth = () => {
    return getStageWidth() / 2
}

export const getStageHeight = () => {
    return getStageWidth() / view.getFrameSize().width * view.getFrameSize().height;
}
export const getHalfStageHeight = () => {
    return getStageHeight() / 2
}