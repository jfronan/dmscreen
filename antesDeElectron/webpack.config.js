const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: ['babel-polyfill', "./src/index.js"],
  output: {
    path: __dirname + '/dev/front',
    filename: 'index.js'
  },
  module: {
    rules: [
      {test: /\.png$/, use: 'url-loader?mimetype=image/png'},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    contentBase: "./dev/front",
    compress: true,
    port: 9000
  },
  plugins: [htmlWebpackPlugin]
};