import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const predictionResultSchema = new mongoose.Schema({
  disease: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  class_id: {
    type: Number,
    required: true
  }
});

const aiRecommendationSchema = new mongoose.Schema({
  treatment: {
    type: String,
    required: true
  },
  prevention: {
    type: String,
    required: true
  },
  fertilizers: [{
    type: String
  }],
  watering_schedule: {
    type: String
  },
  general_care: {
    type: String
  }
});

const diseaseDetectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  originalFilename: {
    type: String,
    required: true
  },
  predictions: [predictionResultSchema],
  topPrediction: {
    disease: String,
    confidence: Number,
    class_id: Number
  },
  aiRecommendation: aiRecommendationSchema,
  modelInfo: {
    classes: Number,
    input_size: String,
    model_version: {
      type: String,
      default: '1.0.0'
    }
  },
  processingTime: {
    type: Number, // in milliseconds
    default: 0
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add the paginate plugin
diseaseDetectionSchema.plugin(mongoosePaginate);

// Index for faster queries
diseaseDetectionSchema.index({ userId: 1, createdAt: -1 });
diseaseDetectionSchema.index({ status: 1 });

// Update the updatedAt field before saving
diseaseDetectionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for formatted creation date
diseaseDetectionSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Method to get success rate for a user
diseaseDetectionSchema.statics.getUserStats = function(userId) {
  return this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        avgConfidence: { $avg: '$topPrediction.confidence' }
      }
    }
  ]);
};

// Method to get recent predictions
diseaseDetectionSchema.statics.getRecentPredictions = function(userId, limit = 10) {
  return this.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('topPrediction createdAt status originalFilename');
};

const DiseaseDetection = mongoose.model('DiseaseDetection', diseaseDetectionSchema);

export default DiseaseDetection;