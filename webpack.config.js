const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // or "production"
  module: {
    rules: [
      // if you want your code to be backwards compatible from older browser
      // you can use babel or SWC as a code transpiler.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // loader: "babel-loader",
          loader: "swc-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hritik App",
      filename: "index.html",
      template: "public/index.html",
    }),
  ],
};
