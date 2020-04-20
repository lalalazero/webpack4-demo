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