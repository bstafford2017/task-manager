module.exports = {
  entry: [
    './src/lambdas/auth.ts',
    './src/lambdas/tasks.ts',
    './src/lambdas/users.ts'
  ],
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
}
