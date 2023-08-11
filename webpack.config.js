const path = require("path");

module.exports = {
  mode: "development",
  entry: "./app/app.jsx", // входная точка - исходный файл
  output: {
    path: path.resolve(__dirname, "./public"), // путь к каталогу выходных файлов - папка public
    publicPath: "/public/",
    filename: "bundle.js", // название создаваемого файла
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "/"),
    },
    port: 8081,
    open: true,
  },
  module: {
    rules: [
      // Загрузчики для обработки CSS модулей
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]', // Настройки имен классов
              },
            },
          },
        ],
      },
      // Загрузчик для обработки jsx
      {
        test: /\.jsx?$/, // определяем тип файлов
        exclude: /(node_modules)/, // исключаем из обработки папку node_modules
        loader: "babel-loader", // определяем загрузчик
        options: {
          presets: ["@babel/preset-react"], // используемые плагины
        },
      },
    ],
  },
  devtool: "eval-source-map",
};
