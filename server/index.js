import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes   from './routes/auth.js'
import resumeRoutes from './routes/resume.js'
import aiRoutes     from './routes/ai.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth',   authRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/ai',     aiRoutes)

app.get('/', (req, res) => res.json({ message: 'ResumeAI API running ✅' }))

app.use((err, req, res, next) => {
  console.error('Global error:', err.message)
  res.status(500).json({ message: err.message })
})

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resumeai')
  .then(() => {
    console.log('✅ MongoDB connected')
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })