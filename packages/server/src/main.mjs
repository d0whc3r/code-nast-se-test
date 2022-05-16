import express from 'express'
import cors from 'cors'
import { newsByTopic, latestNews } from './routes/news.mjs'

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())

app.get('/api/news', latestNews)
app.get('/api/news/:q', newsByTopic)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[!] Server started at 0.0.0.0:${PORT}`)
})
