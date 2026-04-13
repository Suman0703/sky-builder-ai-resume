import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personal:   { type: Object, default: {} },
  summary:    { type: String, default: '' },
  education:  { type: Array,  default: [] },
  experience: { type: Array,  default: [] },
  skills:     { type: Array,  default: [] },
  projects:   { type: Array,  default: [] },
}, { timestamps: true })

export default mongoose.model('Resume', resumeSchema)