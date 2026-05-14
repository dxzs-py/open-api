# cw-vue-1.0

> cw-vue-1.0

## Build Setup

>建议使用淘宝镜像源 https://registry.npmjs.org

``` bash
npm config set registry http://registry.npm.taobao.org
```
>查看是否切换成功


``` bash
npm get registry
```
>或者使用cnpm代替npm来进行依赖安装

``` bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

``` bash
# 安装依赖
npm install

# 服务启动
npm run dev

# 生产环境build
npm run build

# 生产环境build以及文件分析
npm run build --report
```

如果想知道相关的[底层工作原理](http://vuejs-templates.github.io/webpack/) 和 [vue-loader 相关文档](http://vuejs.github.io/vue-loader).


## Build逻辑和后端入口 (npm run build)
### 一、前端build
#### 1.1、前端打包依据的HTML文件
``` bash
/templates/index.html
```

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>VUE框架</title>
    <link href="<%= htmlWebpackPlugin.options.staticUrl %>img/{{ APP_CODE }}.png" rel="shortcut icon" type="image/x-icon">
</head>
<body>
<script>
    if ('{{ RUN_MODE }}' === 'DEVELOP') {
        window.siteUrl = window.location.origin
    } else {
        window.siteUrl = '{{ BK_PLAT_HOST }}{{ SITE_URL }}'
    }
    window.APP_CODE = '{{ APP_CODE }}';
    window.CSRF_COOKIE_NAME = '{{ CSRF_COOKIE_NAME }}';
</script>
<div id="app"></div>
<script type=text/javascript src="<%= htmlWebpackPlugin.options.staticUrl %>dll/vendors.dll.js"></script>
<script type=text/javascript src="<%= htmlWebpackPlugin.options.staticUrl %>dll/jquery.dll.js"></script>
<script type=text/javascript src="<%= htmlWebpackPlugin.options.staticUrl %>dll/bkMagicVue.dll.js"></script>
<script type=text/javascript src="<%= htmlWebpackPlugin.options.staticUrl %>dll/antv.dll.js"></script>
<script type=text/javascript src="<%= htmlWebpackPlugin.options.staticUrl %>dll/echarts.dll.js"></script>
</body>
</html>
```
>其中<%= htmlWebpackPlugin.options.staticUrl %>为HtmlWebpackPlugin插件的变量（配置在 ui/build/webpack.prod.conf.js 135行）在build之后会替换成 '{{ STATIC_URL }}'（后端Django模板语法，包括index.html中的{{ RUN_MODE }}、{{ BK_PLAT_HOST }}、{{ SITE_URL }}、{{ APP_CODE }}、{{ CSRF_COOKIE_NAME }}都为Django变量，非Vue变量）

#### 1.2、webpack.prod.conf.js  HtmlWebpackPlugin配置

``` javascript
new HtmlWebpackPlugin({
    filename: config.build.index,
    template: '../templates/index.html',
    inject: true,
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    },
    sourceMap: true,
    chunksSortMode: 'dependency',
    staticUrl: '{{ STATIC_URL }}',
})
```
>如果看见项目代码的index.html中出现${SITE_URL}这种写法的变量则为Mako模板语法，Django和Mako的关系，就好比一个UI框架（Django）中没有用这个框架的表单组件，而使用了一个专门的Form表单组件（Mako），如果渲染模式要从Mako语法改成Django模板语法，后端需要修改渲染函数（render_mako => render）

#### 1.3、前端build结果
生成的html中会固定放置dll文件引用，这部分内容不会过webpack打包
生成/templates/index.prod.html 文件，该文件为后端入口文件：
``` html
<!DOCTYPE html>
<html>

<head>
    <meta charset=utf-8>
    <meta name=viewport content="width=device-width,initial-scale=1">
    <title>VUE框架</title>
    <link href="{{ STATIC_URL }}img/{{ APP_CODE }}.png" rel="shortcut icon" type=image/x-icon>
    <link href={{STATIC_URL}}dist/css/chunk-bk-magic-vue.e8983d1382613a58b07e.css rel=stylesheet>
    <link href={{STATIC_URL}}dist/css/app.fa55dd8e34e6d9f0e1b8.css rel=stylesheet>
</head>

<body>
    <script>if ('{{ RUN_MODE }}' === 'DEVELOP') {
            window.siteUrl = window.location.origin
        } else {
            window.siteUrl = '{{ BK_PLAT_HOST }}{{ SITE_URL }}'
        }
        window.APP_CODE = '{{ APP_CODE }}';
        window.CSRF_COOKIE_NAME = '{{ CSRF_COOKIE_NAME }}';</script>
    <div id=app></div>
    <script type=text/javascript src="{{ STATIC_URL }}dll/vendors.dll.js"></script>
    <script type=text/javascript src="{{ STATIC_URL }}dll/jquery.dll.js"></script>
    <script type=text/javascript src="{{ STATIC_URL }}dll/bkMagicVue.dll.js"></script>
    <script type=text/javascript src="{{ STATIC_URL }}dll/antv.dll.js"></script>
    <script type=text/javascript src="{{ STATIC_URL }}dll/echarts.dll.js"></script>
    <script type=text/javascript src={{STATIC_URL}}dist/js/manifest.js></script>
    <script type=text/javascript src={{STATIC_URL}}dist/js/chunk-bk-magic-vue.e8983d1382613a58b07e.js></script>
    <script type=text/javascript src={{STATIC_URL}}dist/js/vendors~app.d1c455a7b290a1f7cfd1.js></script>
    <script type=text/javascript src={{STATIC_URL}}dist/js/app.fa55dd8e34e6d9f0e1b8.js></script>
</body>

</html>
```
输出路径配置在ui/config/index.js  56行

``` javascript
    build: {
        index: path.resolve(__dirname, '../../templates/index.prod.html'),
        ....
    }
```
>打包后的基础路径替换插件，即在静态文件路径前增加{{STATIC_URL}}标识
位置：ui/build/replace-template-static-url-plugin.js
通过插件形式配置在：ui/build/webpack.prod.conf.js   13行（引入）、150行（使用）
作用就是遍历所有build文件找出index.prod.html把基础路径./static/手动替换成后端{{STATIC_URL}}标识

``` javascript
const path = require('path')

class ReplaceTemplateStaticUrlPlugin {
    apply(compiler, callback) {
        // emit: 在生成资源并输出到目录之前
        compiler.hooks.emit.tapAsync('ReplaceCSSStaticUrlPlugin', (compilation, callback) => {
            const assets = Object.keys(compilation.assets)
            const assetsLen = assets.length
            for (let i = 0; i < assetsLen; i++) {
                const fileName = assets[i]
                if (path.basename(fileName) === "index.prod.html") {
                    const asset = compilation.assets[fileName]
                    const minifyFileContent = asset.source().toString().replace(
                        /.\/static\//g,
                        () => '{{STATIC_URL}}'
                    )
                    // 设置输出资源
                    compilation.assets[fileName] = {
                        // 返回文件内容
                        source: () => minifyFileContent,
                        // 返回文件大小
                        size: () => Buffer.byteLength(minifyFileContent, 'utf8')
                    }
                }
            }

            callback()
        })
    }
}

module.exports = ReplaceTemplateStaticUrlPlugin
```
>也就是说如果你要改build文件的文件名（后端入口），你需要改build位置（ui/config/index.js）和文件替换逻辑（ui/build/replace-template-static-url-plugin.js）两处位置


### 二、后端入口
#### 2.1、home_application/views.py 后端服务HTML入口文件配置：

```python
# home_application/views.py  22行
def home(request):
    """
    首页
    """
    return render(request, "index.prod.html")
```

