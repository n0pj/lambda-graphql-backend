import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 9325

const reportPath = path.join(__dirname, './reports/jest-html-report')

app.use(express.static(reportPath))

app.get('/', (req, res) => {
  const reportFilePath = path.join(reportPath, 'report.html')
  res.sendFile(reportFilePath)
})

app.listen(port, () => {
  console.log(`jest-html-reporters: http://localhost:${port}`)
})
