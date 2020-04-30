const fs = require('fs')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')



const randomHash = Math.floor(Math.random() * 10000000)

const assetsManifest = JSON.stringify({
  style: `style.${randomHash}.css`,
  script: `js/script.${randomHash}.js`
})

fs.writeFileSync('./public/assets-manifest.json', assetsManifest)
console.log('Manifest file generated!')



module.exports = {
  entry: {
    script: './js/_index.js',
    style: './css/_style.css'
  },

  output: {
    filename: `js/[name].${randomHash}.js`,
    path: path.resolve(__dirname, 'public'),
  },

  plugins: [
    // Generating CSS
    new MiniCssExtractPlugin({ filename: `style.${randomHash}.css` }),

    // Remove generated files
    new RemovePlugin({
      before: {
        root: './public',
        test: [
          { folder: './js', method: absPath => new RegExp(/\.js$/).test(absPath) },
          { folder: '.', method: absPath => new RegExp(/\.css$/).test(absPath) },
        ]
      }
    })
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
