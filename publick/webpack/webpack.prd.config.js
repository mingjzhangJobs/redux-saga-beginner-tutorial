const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const pathConfig = require("./webpack.path.config");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HappyPack = require("happypack");
const chalk = require("chalk");
const prdConfig = {
  mode: "production",
  entry: {
    app: pathConfig.dir("./src/index"),
    vendor: ["react", "react-dom", "react-router", "redux"]
  },
  output: {
    path: pathConfig.dir("./dist/webstatic"),
    publicPath: pathConfig.PUBLIC_PATH,
    filename: pathConfig.filenamep + "/[name]" + pathConfig.chunkhash + ".js",
    chunkFilename:
      pathConfig.filenamep + "/[name]" + pathConfig.chunkhash + ".js"
  },
  context: pathConfig.dir("./"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: pathConfig.dir("./src"),
        exclude: /node_modules/,
        use: "happypack/loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              localIdentName: "[local]_[hash:base64:8]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")()]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              localIdentName: "[local]_[hash:base64:8]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")()]
            }
          },
          { loader: "less-loader", options: { javascriptEnabled: true } }
        ],
        include: pathConfig.dir("./src")
      },
      {
        // .less 解析 (用于解析antd的LESS文件)
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")()]
            }
          },
          { loader: "less-loader", options: { javascriptEnabled: true } }
        ],
        include: pathConfig.dir("./node_modules")
      },
      {
        // 文件解析
        test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: pathConfig.dir("./src"),
        use: ["file-loader?name=fonts/[name].[ext]"]
      },
      {
        // 图片解析
        test: /\.(png|jpg|gif)$/,
        include: pathConfig.dir("./src"),
        use: ["url-loader?limit=8192&name=images/[name].[ext]"]
      }
    ]
  },

  plugins: [
    new HappyPack({
      loaders: ["babel-loader"]
    }),
    // 进度条
    new ProgressBarPlugin({
      format:
        "  build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)"
    }),
    /**
     * 在window环境中注入全局变量
     * 这里这么做是因为src/registerServiceWorker.js中有用到，为了配置PWA
     * **/
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        PUBLIC_URL: pathConfig.PUBLIC_PATH + pathConfig.filenamep
      }),
      __DEBUG__: false
    }),
    /**
     * 打包前删除上一次打包留下的旧代码
     * **/
    new CleanWebpackPlugin(["dist"], {
      root: pathConfig.dir("./")
    }),
    /**
     * 提取CSS等样式生成单独的CSS文件
     * **/
    new MiniCssExtractPlugin({
      filename:
        pathConfig.filenamep + "/[name]" + pathConfig.chunkhash + ".css",
      chunkFilename:
        pathConfig.filenamep + "/[name]" + pathConfig.chunkhash + ".css"
    }),

    /**
     * 自动生成HTML，并注入各参数
     * **/
    new HtmlWebpackPlugin({
      filename: "../index.html", //生成的html存放路径，相对于 output.path
      template: pathConfig.dir("./public/index.ejs"), //html模板路径
      chunks: ["commons", "vendor", "app"],
      templateParameters: {
        //   // 自动替换index.ejs中的参数
        dll: "",
        manifest: "<link rel='manifest' href='manifest.json'>"
      },
      // hash: true, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，这里设置为false)
      inject: true // 是否将js放在body的末尾
    }),
    /**
     * 文件复制
     * 这里是用于把manifest.json打包时复制到/dist下 （PWA）
     * **/
    new CopyWebpackPlugin([
      { from: "./public/manifest.json", to: "../manifest.json" }
    ])
  ],

  resolve: {
    extensions: ["*", ".js", ".jsx", ".less", ".css"], //后缀名自动补全
    alias: {
      src: pathConfig.dir("./src"),
      util: pathConfig.dir("./src/util"),
      store: pathConfig.dir("./src/store"),
      config: pathConfig.dir("./src/config"),
      view: pathConfig.dir("./src/view"),
      assets: pathConfig.dir("./src/assets"),
      components: pathConfig.dir("./src/components"),
      router: pathConfig.dir("./src/routers")
    }
  }
};

// 分析
if (process.argv.includes("--analysis")) {
  prdConfig.plugins.push(new BundleAnalyzerPlugin());
}

// 去除 console.log,等操作
if (process.argv.includes("--terserconfig")) {
  prdConfig.optimization = {
    minimizer: [
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          warnings: false,
          compress: {
            drop_console: true
          }
        }
      })
    ]
  };
}
module.exports = prdConfig;

