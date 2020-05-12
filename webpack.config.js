const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/main.ts"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'nubule-loader')
    ]
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.nubu$/,
        use: "nubule-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "Hello Nebule",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      },
      filename: "index.html",
      template: "./static/index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    open: false,
    port: 8000,
  },
  devtool: "inline-source-map",
};