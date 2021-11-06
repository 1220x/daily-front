# webpack

## 为什么需要webpack构建工具？
- 转换ES6语法
- 转换JSX
- CSS前缀补全/预处理器
- 压缩混淆
- 图片压缩

## 初识webpack
- 配置文件：默认配置文件 `webpack.config.js`。可通过webpack --config指定配置文件。
    ```
    // 开发环境
    webpack --config webpack.dev.config.js
    // 生产环境
    webpack --config webpack.product.config.js
    ```
- webpack配置组成
    ```
    module.export = {
        entry: './src/index.js',                        -----------打包的入口文件
        output: './dist/main.js',                       -----------打包的输出
        mode: 'production',                             -----------环境
        module: {
            rules: [                                    -----------loader配置，在这个rules数组里面配置
                { test: /\.txt$/, use: 'raw-loader' }
            ]
        },
        plugins: [                                      -----------插件配置，在这个plugins数组里面配置
            new HtmlwebpackPlugin({
                template: './src/index.html'
            })
        ]
    }
    ```
- 零配置的webpack：webpack4.0中的零配置，包含了entry和output的配置

## 安装webpack
### 环境搭建
- 安装node和npm
- [安装nvm](https://github.com/nvm-sh/nvm)
    - nvm - Node.js Version Manager - 也就是Node.js的包管理器。可以通过它方便安装和切换不同的node.js版本。
    - 通过curl安装：`curl -o- https://raw.githubusercontent.com/nvm/v0.34.0/install.sh | bash` - IOS / Linux安装方式
    - 通过wget安装：``
    - window安装：`https://github.com/coreybutler/nvm-windows`
- 安装webpack、webpack-cli（webpack4.0以后，将webpack和webpack-cli进行分离，安装时，要两个一起安装）
    - 创建空目录和package.json
        ```
        mkdir my-project
        cd my-project
        npm init -y         ----- npm init 初始化  -y 默认所有选项都选择 yes
        ```
    - 安装webpack和webpack-cli
        ```
        npm install webpack webpack-cli --save-dev  ----- 将依赖安装到devDependencies里面
        ```
        - tips: **`devDependencies` 和 `dependencies`**
            - devDependencies：用于本地环境开发时候，只会在开发环境下以依赖的模块，生产环境不会被打入包内 `--save-dev`  `-D`
            - dependencies：用户发布环境。不仅在开发环境能使用，生产环境也能使用    `--save`  `-S`
    - 检查是否安装成功
        ```
        // 可以在 git bash 中运行成功，windows的cmd中会报错
        ./node_modules/.bin/webpack -v
        ```

### 栗子
- 直接运行打包：不指定webpack配置文件的名称，默认的就是webpack.config.js
    ```
    ./node_modules/.bin/webpack -v
    ```
- 通过npm script运行webpack
    ```

    ```
    - 通过运行npm run build运行构建
    - 原理：模块局部安装如果有创建一些命令的话，会在node_modules/.bin目录创建软连接。package.json可以默认读取到.bin目录下这些命令。所以可以再package.json增加scripts，在scripts增加webpack