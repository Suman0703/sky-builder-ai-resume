import express from 'express'
import protect from '../middleware/auth.js'

const router = express.Router()
router.use(protect)

router.post('/summary', async (req, res) => {
  try {
    const { firstName, jobTitle, skills } = req.body

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
      return res.status(400).json({ message: 'GROQ_API_KEY not set in server/.env' })
    }

    const prompt = `Generate exactly 3 professional resume summary options for a person named ${firstName || 'a student'} applying for ${jobTitle || 'a tech role'} with skills: ${skills || 'various technical skills'}. Each should be 2-3 sentences, confident and suitable for a fresher or early-career candidate. Return ONLY a JSON array of 3 strings. No markdown, no explanation. Just: ["summary1", "summary2", "summary3"]`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
        temperature: 0.7
      })
    })

    const data = await response.json()
    console.log('Groq response status:', response.status)

    if (!response.ok) {
      console.error('Groq error:', data)
      return res.status(500).json({ message: data.error?.message || 'Groq API error' })
    }

    const text = data.choices?.[0]?.message?.content || '[]'
    console.log('Raw text from Groq:', text)

    let parsed = []
    try {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim()
      parsed = JSON.parse(clean)
    } catch {
      parsed = text
        .split(/\n\d+\.\s+/)
        .filter(s => s.trim().length > 20)
        .slice(0, 3)
        .map(s => s.trim().replace(/^["'\-\s]+|["'\s]+$/g, ''))
    }

    res.json({ suggestions: Array.isArray(parsed) ? parsed.slice(0, 3) : [] })

  } catch (err) {
    console.error('AI route error:', err.message)
    res.status(500).json({ message: err.message })
  }
})

export default router