const path = require('path');
const webpack = require('webpack');
const htmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, './dist'),    // 打包后的输出路径, 使用Node中的Path模块, 执行为绝对路径
        filename: 'js/[name]-[hash].js',
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]          // resolve.extensions自动解析确定的扩展, 能够使用户在引入模块时不带文件扩展名
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: path.resolve(__dirname, './node_modules'),
                include: path.resolve(__dirname, './src/styles'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../' // build出来后图片地址不显示, 应该需要配置下publicPath.
                        },
                    }, 'css-loader'],
            },
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),                   // 在打包很慢的时候, 展示打包的进度条.
        new cleanWebpackPlugin.CleanWebpackPlugin(),    // 使用cleanWebpackPlugin, 每次打包生成文件之前将上次构建的文件全部删除.
        new htmlWebPackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/styles/[name]-[hash:5].css' // 对输出的css文件进行重命名.  
        }),
        new OptimizeCssWebpackPlugin(),                   // 压缩css.
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,                                 // 开启gzip压缩.
        port: 3000,                                     // 指定本地启动的开发服务器的端口号.(启动后访问的地址是: localhost:3000/webpack5.html).
        open: true,                                     // 自动打开浏览器.
        hot: true,                                      // 表示开启HMR功能. 只对css文件的改动进行HMR(css文件天热支持HMR)      
    },
};