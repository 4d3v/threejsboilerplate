const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dirApp = path.join(__dirname, 'app');
// const dirAssets = path.join(__dirname, 'assets');
const dirStyles = path.join(__dirname, 'styles');

const _htmlDirs = ['index.html'];

const htmlDirs = _htmlDirs.map(fileName => {
  return new HtmlWebpackPlugin({
    fileName,
    template: path.join(__dirname, './views/index.pug'),
  });
});

module.exports = {
  entry: [path.join(dirApp, 'index.js'), path.join(dirStyles, 'index.scss')],

  plugins: [
    ...htmlDirs,

    new CopyWebpackPlugin({
      patterns: [
        { from: './app/service-worker.js', to: '' },
        { from: './offline', to: 'offline' },
        { from: './assets', to: 'assets' },
        { from: './shared', to: '' },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  module: {
    rules: [
      // PUG
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },

      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      // CSS-SASS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },

      // Images
      {
        test: /\.(jpe?g|png|gif|svg|fnt|webp)$/,
        loader: 'file-loader',
      },

      // Models
      {
        test: /\.(glb|gltf|fbx|obj)$/,
        loader: 'file-loader',
      },

      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
    ],
  },
};
