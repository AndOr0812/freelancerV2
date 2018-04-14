module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
        {
            /*exclude: /node_modules/,*/
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        },
/*
        { test: /\\.(gif|ttf|eot|svg|woff?)$/, use: 'url-loader?name=[name].[ext]'},]
*/
        {
            test: /\.(jpe?g|png|gif)$/,
            loaders: ["file"]
        },
      /*  {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        },*/
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
  ]},
  resolve: {
    extensions: ['', '.js', '.jsx','.css','.gif','.ttf','.eot','.svg','.woff']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
