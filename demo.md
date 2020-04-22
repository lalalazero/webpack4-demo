# demo-12 Tree-Shaking 和 DCE

## Tree-shaking 优化
tree-shaking: 只把用到的代码打包到 bundle 中去，其他没用到的在 uglify 阶段自动擦除。

原理：利用 ES 模块的特点做静态分析。

- import 语句只能作为顶层语句出现
- import 的模块名只能是字符串常量
- import 和 export 的 binding 必须是不可变的。(见 ruanyf 老师 es6 关于模块化的文章)
    - 不能写类似 `import x  from 'someModule'; x = yyy ` 这种东西

因此对于 ES 模块可以通过静态分析，找出使用的方法，然后擦除没有用到的方法。
由于 CommonJS 的导入导出是动态的，所以没法针对 CJS 做 tree-shaking 优化。


## DCE 优化 

DCE = Dead Code Elimination

- 不可执行的代码
    ```js
    if(false){
        console.log('永远不会打印')
    }
    ```


webpack4 在 `production` 模式下默认开启 tree-shaking 优化和 DCE 优化

## 查看效果

- 只 import 但是没有使用的方法
- 没有被 import 到的方法

```js
// tree-shaking.js
export function a() {
    return 'This is function A'
}

export function b(){
    return 'This is function B'
}
```
```js
// search.js 引用 a 方法但是不使用
import { a } from '../tree-shaking'
```

设置 `mode:'none'` 不开启 tree-shaking 和 DCE 优化，实际打包出来的代码。（为了方便截图，开启了 `devtool: 'source-map'`)。可以看到 tree-shaking.js 被完整的打包出来了

![image](https://user-images.githubusercontent.com/20458239/79958783-ec804e00-84b5-11ea-9dfa-a6c31551c49e.png)

设置 `mode: 'production'` 开启自动优化后，打包出来的代码根本搜不到 `This is function A` 和 `This is function B`，也就是都被擦除掉了。

- DCE 代码优化
```js
render(){
    if (false) {
        console.log('永远不会执行')
    }
}
```
实践证明，即便 `mode: 'none'`， webpack 也会在打包的时候进行 DEC 优化，打包出来的代码搜不到`永远不会执行`。

稍微改写一下，webpack 就没有那么智能了。

```js
render(){
    const f = false
    if (f) {
        console.log('永远不会执行')
    }
}

```

![image](https://user-images.githubusercontent.com/20458239/79960606-2c483500-84b8-11ea-9dda-ff22d6255a35.png)

开启 `mode: 'production'` 优化试一下，打包出来的代码被 DCE 了。看来 `production` 模式是要强一点。