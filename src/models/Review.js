import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  review: {
    type: String,
    required: [true, 'Please provide a review'],
    trim: true,
    maxlength: [1000, 'Review cannot be more than 1000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for better query performance
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ rating: 1 });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);