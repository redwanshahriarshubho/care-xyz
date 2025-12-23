import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: String, required: true },
  serviceName: { type: String, required: true },
  duration: { type: Number, required: true },
  location: {
    division: String,
    district: String,
    area: String,
    address: String
  },
  totalCost: Number,
  status: { type: String, default: 'Pending' },
}, { timestamps: true })

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema)
