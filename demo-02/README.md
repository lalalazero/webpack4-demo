# demo-02 Entry 和 Output

单入口
```javascript
module.exports = {
    entry: './path/to/entry/file.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    }
}
```

多入口
```javascript
module.exports = {
    entry: {
        app: './path/to/app.js',
        anotherApp: './path/to/anotherApp.js'
    },
    output: {
        filename: '[name].js', // [name] 占位符
        path: path.join(__dirname, 'dist'),
    }
}
```