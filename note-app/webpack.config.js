const path = require("path");

module.exports = {
  mode: "development", // or 'production' for production builds
  entry: "./src/index.js", // your main entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // CSS loader rule
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // Image handling rule
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", // This tells Webpack to handle the image as a resource
        generator: {
          filename: "images/[name][ext][query]", // Output images to the "images" folder
        },
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
