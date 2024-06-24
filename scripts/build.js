const webpack = require('webpack')
const config = require('../webpack.prod.js')

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err || stats.toJson().errors)
    return
  }
  console.log(
    stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true // Shows colors in the console
    })
  )
})
