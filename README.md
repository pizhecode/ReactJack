# ReactJack

React18 + js + craco

> node 18.20
>

```
npm start
```

```
npm run build
```

项目本地预览

1. 全局安装本地服务包 `npm i -g serve`  该包提供了serve命令，用来启动本地服务器
2. 在项目根目录中执行命令 `serve -s ./build`  在build目录中开启服务器
3. 在浏览器中访问：`http://localhost:3000/` 预览项目

打包分析：`npm i source-map-explorer`

运行分析命令：`npm run analyze`

```json
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'",
}
```
