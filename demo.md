# demo-15 ESLint 检查

### 流行的 ESLint 规范

- Airbnb
    - eslint-config-airbnb, eslint-config-airbnb-base

- alloyteam 团队
    - eslint-config-alloy
- ivweb 团队
    - eslint-config-ivweb

### 如何使 ESLint 落地到项目中

- 和 CI/CD 系统集成
- 和 webpack 集成

### 使用 eslint-config-airbnb

按照这个[地址](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)下载依赖

添加相关依赖： 
```shell
npm i eslint eslint-plugin-import eslint-plugin-react  eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-airbnb -D
```

添加 loader `npm i eslint-loader -D`

添加 parser `npm i babel-eslint -D`

修改webpack配置
```js
{
    test: /\.js$/,
    use: ['babel-loader','eslint-loader']
}
```

新建 .eslintrc.js
```js
module.exports = {
    'parser': 'babel-eslint',
    'extends': 'eslint-config-airbnb',
    'env': {
        "browser": true, 
        "node": true
    },
    "rules": {

    }
}
```
`env` 属性用来指定特定的一些环境，比如 `document` 和 `window` 是属于浏览器的变量，如果不指定 `"browser": true` 那么 `eslint` 会报错不认识。

如何自定义规则？

以修改 indent 为例，由于我的编辑器配置的 indent 是 4 个空格，eslint-config-airbnb 推荐的配置是 2 个空格，所以一大片报错。下面来修改这个规则接受 4 个空格。
```js
// 修改 .eslintrc.js
"rules": {
    "indent": ["error", 4]
}
```
具体的规则配置都可以去 eslint 的[网站规则](https://eslint.org/docs/rules/) 查找。