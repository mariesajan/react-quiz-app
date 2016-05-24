module.exports = {
  context: __dirname,
  entry: './jsx/client.jsx',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['react-html-attrs']
      }
    }]
  },
  output: {
    pathname: __dirname,
    filename: 'client.min.js'
  }
}
