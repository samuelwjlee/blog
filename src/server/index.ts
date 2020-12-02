const express = require('express')
const app = express()
const PORT = 8000

app.get('/', (req, res) => res.send('Hello Word!'))

app.listen(PORT, () => {
  console.log(`⚡️ Server is running at https://localhost:${PORT}`)
})

export default app
