import express from 'express'
import protect from '../middleware/auth.js'
import Resume from '../models/Resume.js'

const router = express.Router()
router.use(protect)

// GET all resumes for logged-in user
router.get('/', async (req, res) => {
  const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 })
  res.json(resumes)
})

// POST save new resume
router.post('/', async (req, res) => {
  try {
    const resume = await Resume.create({ user: req.user.id, ...req.body })
    res.status(201).json(resume)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT update resume
router.put('/:id', async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body, { new: true }
    )
    if (!resume) return res.status(404).json({ message: 'Not found' })
    res.json(resume)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE resume
router.delete('/:id', async (req, res) => {
  await Resume.findOneAndDelete({ _id: req.params.id, user: req.user.id })
  res.json({ message: 'Deleted' })
})

export default router