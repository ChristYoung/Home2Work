const htmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                include: path.resolve(__dirname, './src'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../' // build出来后图片地址不显示, 应该需要配置下publicPath.
                        },
                    }, 'css-loader', 'postcss-loader'],
            },
        ]
    },
    plugins: [
        new htmlWebPackPlugin({
            template: "./src/index.html"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,                                 // 开启gzip压缩.
        port: 3000,                                     // 指定本地启动的开发服务器的端口号.(启动后访问的地址是: localhost:3000/webpack5.html).
        open: true,                                     // 自动打开浏览器.
        hot: true,                                      // 表示开启HMR功能. 只对css文件的改动进行HMR(css文件天热支持HMR)      
    },
};