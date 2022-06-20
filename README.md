# war

## http-server 跨域
 http-server --cors='*' 
 
## 加载远程图集
- 考虑 https://github.com/zhefengzhang/load-remote-plist

## 命令打包图集
TexturePacker --sheet enemy1_down.png --data enemy1_down.plist --format cocos2d enemy1_down

## 动画事件
https://docs.cocos.com/creator/2.2/manual/zh/animation/scripting-animation.html
```ts
// @ts-ignore
animation.on('play', function name(params) {
    console.log('onPlay');
}, this);

// @ts-ignore
animation.on('stop', function name(params) {
    console.log('onStop');
}, this);

// @ts-ignore
animation.on('lastframe', function name(params) {
    console.log('onLastFrame');
}, this);

// @ts-ignore
animation.on('finished', function name(params) {
    console.log('onFinished');
}, this);

// @ts-ignore
animation.on('pause', function name(params) {
    console.log('onPause');
}, this);

// @ts-ignore
animation.on('resume', function name(params) {
    console.log('onResume');
}, this);
```