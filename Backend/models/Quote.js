
import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  businessName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  deliveryLocation: { type: String, required: true },
  specialInstructions: { type: String },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;
