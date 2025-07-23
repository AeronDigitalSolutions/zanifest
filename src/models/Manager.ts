// models/Manager.js
import mongoose from 'mongoose';
import Counter from './Counter';

const managerSchema = new mongoose.Schema({
 managerId: {
    type: String,
    required: true,
    unique: true, // now you enter 'NM1', 'SM2', etc. manually
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    district: { type: String },
    state: { type: String },
  },
  category: {
    type: String,
    enum: ['national', 'state', 'district'],
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager',
    default: null,
  },
}, {
  timestamps: true,
});

// Auto-increment middleware before saving
// managerSchema.pre('save', async function (next) {
//   if (this.isNew) {
//     const counter = await Counter.findByIdAndUpdate(
//       { _id: 'managerId' },
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true }
//     );
//     this.managerId = counter.seq;
//   }
//   next();
// });

const Manager = mongoose.models.Manager || mongoose.model('Manager', managerSchema);
export default Manager;
