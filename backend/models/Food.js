import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,   // Cloudinary URL
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles'],
  },
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);
export default Food;