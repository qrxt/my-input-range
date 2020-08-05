const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const CssExtractPlugin = require("mini-css-extract-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin: CleanPlugin } = require("clean-webpack-plugin");

// - const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (_, options) => {
  const isDev = options.mode === "development";
  const isProd = options.mode === "production";

  const getFileName = ext => isDev
    ? `[name].${ ext }`
    : `[name].[hash].${ ext }`;

  const styleLoaders = [
    {
      loader: CssExtractPlugin.loader,
      options: {
        hmr: true,
        reloadAll: true
      }
    },
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        plugins: [
          autoprefixer()
        ],
        sourceMap: isDev
      }
    }
  ];

  const conf = {
    context: path.resolve(__dirname, "src"),
    entry: {
      main: [
        "@babel/polyfill",
        "./index.ts"
      ]
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: getFileName("js")
    },

    resolve: {
      extensions: [
        ".ts", ".js",
        ".css"
      ],

      alias: {
        "@": path.join(__dirname, "src"),

        "@interfaces": path.resolve(__dirname, "src", "range", "ts", "interfaces"),
        "@type": path.resolve(__dirname, "src", "range", "ts", "type"),
        "@enums": path.resolve(__dirname, "src", "range", "ts", "enums"),

        "@elements": path.resolve(__dirname, "src", "range", "elements"),
        "@utils": path.resolve(__dirname, "src", "range", "utils"),

        "@tests": path.resolve(__dirname, "__tests__"),
        "@mocks": path.resolve(__dirname, "__mocks__")
      }
    },

    devServer: {
      overlay: true,
      compress: isProd,
      hot: isDev,
      port: 3000,
      // host: "192.168.1.60"
    },

    devtool: "sourcemap",

    module: {
      rules: [
        {
          test: /\.ts?$/u,
          use: "ts-loader",
          exclude: /node_modules/u
        },

        {
          test: /\.css$/u,
          loader: styleLoaders
        }
      ]
    },

    plugins: [
      new CleanPlugin(),

      new CssExtractPlugin({
        filename: getFileName("css")
      }),

      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),

      new HtmlPlugin({
        filename: "index.html",
        template: "index.html"
      }),

      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        ResizeObserver: "resize-observer-polyfill"
      })
    ]
  };

  return conf;
};
