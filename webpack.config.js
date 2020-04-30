const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



module.exports = {
  entry: {
    script: './js/_index.js',
    style: './css/_style.css'
  },

  output: {
    filename: `js/[name].js`,
    path: path.resolve(__dirname, 'public'),
  },

  plugins: [
    // Generating CSS
    new MiniCssExtractPlugin({ filename: `style.css` }),
  ],

  module: {
    rules: [
      // CSS
      {
        test: /\.css$/,
        use: [
          // Extract to external CSS file
          { loader: MiniCssExtractPlugin.loader },

          // Regular CSS
          {
            loader: require.resolve('css-loader'),
            options: { importLoaders: 1, url: false }
          }
        ]
      }
    ]
  },

  mode: 'development'
}
