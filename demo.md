# demo-16 webpack 打包一个大整数加法库

## 需求
- 打包出压缩版和非压缩版
- 支持 CommonJS / ES module / AMD 模块导入， script 标签引入

```js
// ES module
import * as largeNumber from 'large-number'
largeNumber.add('999','1')
```

```js
// CommonJS
const largeNumber = require('large-number')
largeNumber.add('999','1')
```

```js
// AMD
require('large-number', function(largeNumber){
    largeNumber.add('999','1')
})
```
```html
<!-- script 标签引入 -->
<script src="cdn/to/large-number.min.js"></script>
<script>
    // 全局变量
    largeNumber.add('999','1')
    // window 对象的属性
    window.largeNumber.add('999','1')
</script>
```


