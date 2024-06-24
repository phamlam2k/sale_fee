const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 9000

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')))

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
