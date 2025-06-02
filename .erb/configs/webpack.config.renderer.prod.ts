/**
 * Build config for electron renderer process
 */

import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { merge } from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";
import baseConfig from "./webpack.config.base";
import webpackPaths from "./webpack.paths";
import checkNodeEnv from "../scripts/check-node-env";
import deleteSourceMaps from "../scripts/delete-source-maps";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import fs from "fs";

checkNodeEnv("production");
deleteSourceMaps();

const entries = JSON.parse(
  fs.readFileSync(path.join(webpackPaths.srcPath, "data/entries.json"), "utf-8"),
) as Record<string, string>;

const initializeEntry = () => {
  return Object.keys(entries).reduce(
    (entryObject, entry) => {
      const windowName = entry.slice(0, entry.indexOf("Window"));
      entryObject[entries[entry]] = path.join(
        webpackPaths.srcRendererPath,
        "window",
        windowName,
        "index.tsx",
      );
      return entryObject;
    },
    {} as Record<string, string>,
  );
};

const initializeWebpackPlugin = () => {
  return Object.values(entries).map(
    (entry) =>
      new HtmlWebpackPlugin({
        filename: `${entry}.html`,
        template: path.join(
          webpackPaths.srcRendererPath,
          "templates",
          `${entry}.ejs`,
        ),
        minify: {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
        },
        chunks: [entry],
        templateParameters: {
          env: process.env.NODE_ENV,
          isDevelopment: process.env.NODE_ENV !== "production",
          entry,
        },
      }),
  );
};

const configuration: webpack.Configuration = {
  devtool: "source-map",
  mode: "production",
  target: "electron-renderer",
  entry: initializeEntry(),
  output: {
    path: webpackPaths.distRendererPath,
    publicPath: "./",
    filename: "[name].js",
    library: {
      type: "umd",
    },
  },
  module: {
    rules: [
      {
        test: /\.s?(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
            },
          },
        ],
        include: /\.module\.s?(c|a)ss$/,
      },
      {
        test: /\.s?(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
        exclude: /\.module\.s?(c|a)ss$/,
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      // Images
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      // SVG
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          "file-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      DEBUG_PROD: "false",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === "true" ? "server" : "disabled",
      analyzerPort: 8889,
    }),
    ...initializeWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.type": '"renderer"',
    }),
  ],
};

export default merge(baseConfig, configuration);
