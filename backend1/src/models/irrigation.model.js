import mongoose from "mongoose";

const irrigationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    cropType: {
      type: String,
      required: true,
      trim: true,
    },
    soilType: {
      type: String,
      required: true,
      enum: ["Loam", "Clay", "Sandy", "Silt"],
    },
    plantingDate: {
      type: String,
      default: null,
    },
    lastIrrigation: {
      type: String,
      default: null,
    },
    weatherData: {
      temp: {
        type: Number,
        default: null,
      },
      humidity: {
        type: Number,
        default: null,
      },
      wind: {
        type: Number,
        default: null,
      },
      precip: {
        type: Number,
        default: null,
      },
      condition: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        default: null,
      },
      forecast: {
        type: Array,
        default: [],
      },
    },
    advice: {
      irrigation: {
        type: String,
        required: true,
      },
      fertilization: {
        type: String,
        required: true,
      },
      pest_control: {
        type: String,
        required: true,
      },
      additional_tips: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
    processingTime: {
      type: Number, // in milliseconds
      default: 0,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

// Add indexes for better query performance
irrigationSchema.index({ userId: 1, createdAt: -1 });
irrigationSchema.index({ location: 1 });
irrigationSchema.index({ cropType: 1 });

// Virtual for getting formatted creation date
irrigationSchema.virtual("formattedDate").get(function () {
  return this.createdAt.toISOString();
});

// Method to get summary information
irrigationSchema.methods.getSummary = function () {
  return {
    id: this._id,
    location: this.location,
    cropType: this.cropType,
    soilType: this.soilType,
    createdAt: this.createdAt,
    status: this.status,
  };
};

// Static method to get user's irrigation history with pagination
irrigationSchema.statics.getUserHistory = async function (
  userId,
  page = 1,
  limit = 10
) {
  const skip = (page - 1) * limit;

  const [irrigations, total] = await Promise.all([
    this.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    this.countDocuments({ userId }),
  ]);

  return {
    irrigations,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };
};

// Static method to get user's irrigation statistics
irrigationSchema.statics.getUserStats = async function (userId) {
  const stats = await this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalRequests: { $sum: 1 },
        avgProcessingTime: { $avg: "$processingTime" },
        mostCommonCrop: { $first: "$cropType" },
        mostCommonSoil: { $first: "$soilType" },
        lastRequest: { $max: "$createdAt" },
      },
    },
    {
      $project: {
        _id: 0,
        totalRequests: 1,
        avgProcessingTime: { $round: ["$avgProcessingTime", 2] },
        mostCommonCrop: 1,
        mostCommonSoil: 1,
        lastRequest: 1,
      },
    },
  ]);

  return (
    stats[0] || {
      totalRequests: 0,
      avgProcessingTime: 0,
      mostCommonCrop: null,
      mostCommonSoil: null,
      lastRequest: null,
    }
  );
};

const Irrigation = mongoose.model("Irrigation", irrigationSchema);

export default Irrigation;
