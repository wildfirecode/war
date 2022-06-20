/*
 * @Author: wildfirecode wildfirecode13@gmail.com
 * @Date: 2022-06-20 15:51:36
 * @LastEditors: wildfirecode wildfirecode13@gmail.com
 * @LastEditTime: 2022-06-20 16:52:16
 * @FilePath: \war\assets\utils\loadAtlas.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wildfirecode wildfirecode13@gmail.com, All Rights Reserved. 
 */
import { Asset, assetManager, path, Rect, Size, SpriteAtlas, SpriteFrame, Vec2,Texture2D } from 'cc';

const load = (remoteUrl) => {
    return new Promise((resolve) => {
        assetManager.loadRemote<Asset>(remoteUrl, function (err, asset) {
            resolve(asset);
        });
    });
}

const BRACE_REGEX = /[\{\}]/g;

function parseSize(sizeStr) {
    sizeStr = sizeStr.slice(1, -1);
    let arr = sizeStr.split(',');
    let width = parseFloat(arr[0]);
    let height = parseFloat(arr[1]);
    return new Size(width, height);
}

function parseVec2(vec2Str) {
    vec2Str = vec2Str.slice(1, -1);
    var arr = vec2Str.split(',');
    var x = parseFloat(arr[0]);
    var y = parseFloat(arr[1]);
    return new Vec2(x, y);
}

function parseTriangles(trianglesStr) {
    return trianglesStr.split(' ').map(parseFloat);
}

function parseVertices(verticesStr) {
    return verticesStr.split(' ').map(parseFloat);
}

function parseRect(rectStr) {
    rectStr = rectStr.replace(BRACE_REGEX, '');
    let arr = rectStr.split(',');
    return new Rect(
        parseFloat(arr[0] || 0),
        parseFloat(arr[1] || 0),
        parseFloat(arr[2] || 0),
        parseFloat(arr[3] || 0),
    );
}

const parsePlist = (plist, spriteFrame:SpriteFrame) => {
    let info = plist._file.metadata;
    let frames = plist._file.frames;

    let atlas = new SpriteAtlas();
    let spriteFrames = atlas.spriteFrames;

    for (let key in frames) {
        let frame = frames[key];
        let rotated = false, sourceSize, offsetStr, textureRect;
        // let trimmed = frame.trimmed;
        if (info.format === 0) {
            rotated = false;
            // trimmed = frame.trimmed;
            sourceSize = `{${frame.originalWidth},${frame.originalHeight}}`;
            offsetStr = `{${frame.offsetX},${frame.offsetY}}`;
            textureRect = `{{${frame.x},${frame.y}},{${frame.width},${frame.height}}}`;
        }
        else if (info.format === 1 || info.format === 2) {
            rotated = frame.rotated;
            // trimmed = frame.trimmed;
            sourceSize = frame.sourceSize;
            offsetStr = frame.offset;
            textureRect = frame.frame;
        }
        else if (info.format === 3) {
            rotated = frame.textureRotated;
            // trimmed = frame.trimmed;
            sourceSize = frame.spriteSourceSize;
            offsetStr = frame.spriteOffset;
            textureRect = frame.textureRect;
        }

        var sprite = new SpriteFrame();

        sprite.reset({
            originalSize: parseSize(sourceSize),
            rect: parseRect(textureRect),
            offset: parseVec2(offsetStr),
            isRotate: false,
            texture: spriteFrame.texture
        })

        let name = path.mainFileName(key);
        spriteFrames[name] = sprite;
    }

    return atlas;
}
export const loadAtlas = async (url: string) => {
    const plistUrl = url + '.plist';
    const imageAssetUrl = url + '.png';

    const [plist, imageAsset] = await Promise.all([
        load(plistUrl),
        load(imageAssetUrl)
    ]);
    return parsePlist(plist, SpriteFrame.createWithImage(imageAsset as any));
}