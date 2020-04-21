# demo-10

## 使用 source map

阮一峰老师 sourcemap 科普文
http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html

source map 关键字
- eval eval包裹模块代码
- source-map 产生 .map 文件
- cheap 不包含列信息
- inline 将 .map 文件作为 DataURI 嵌入，不单独生成 .map 文件
- module 包含 loader 的 sourcemap

source map 类型
![image](https://user-images.githubusercontent.com/20458239/79780880-314d9d00-836f-11ea-9228-12d8b6b5ca6f.png)

- `devtool:'eval'`eval 格式的 source-map。eval 包裹打包出来的代码。
![image](https://user-images.githubusercontent.com/20458239/79781196-b0db6c00-836f-11ea-8bc0-e4de7456130e.png)

- `devtool:'source-map'`  格式的 source-map单独分离的 .map 文件
![image](https://user-images.githubusercontent.com/20458239/79832537-38f75b00-83dc-11ea-89cc-bbb9841956e3.png)

- `devtool: 'inline-source-map'` 格式的 source-map，没有 .map 文件，直接内联
![image](https://user-images.githubusercontent.com/20458239/79834490-bcff1200-83df-11ea-89bc-208cdd262686.png)

- development 模式开发的时候，不开启 source-map 的时候调试代码
![image](https://user-images.githubusercontent.com/20458239/79851164-86cd8c80-83f7-11ea-8367-24404aa8c08b.png)

- 开启 `devtool:'source-map'` 调试代码
![image](https://user-images.githubusercontent.com/20458239/79851384-d01ddc00-83f7-11ea-9a46-743532c4b863.png)