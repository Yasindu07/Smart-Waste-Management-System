import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['done', 'notdone'],
    default: 'notdone',
  },
  code: {
    type: String,
    required: true,
    match: /^\d{6}$/, // Regex to match a 6-digit code
  },
  garbageCollectorId: {
    type: String, // Can be adjusted to ObjectId if you have a separate garbage collector model
    default: null, // Default to null if not provided
  },
  weight: {
    type: Number, // Can store weight as a number (e.g., in kilograms)
    default: null, // Default to null if not provided
  },
  type: {
    type: String, // Type of garbage (e.g., organic, recyclable, etc.)
    default: null, // Default to null if not provided
  },
  special: {
    type: Boolean,
    default: false, // Defaults to false unless explicitly set to true
  },
}, {
  timestamps: true,
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

export default Schedule;