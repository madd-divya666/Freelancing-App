import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    clientName: String,
    clientEmail: String,

    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    freelancerName: String,
    freelancerEmail: String,

    freelancerSkills: {
      type: [String],
      default: [],
    },

    title: String,
    description: String,

    budget: Number,

    requiredSkills: {
      type: [String],
      default: [],
    },

    proposal: String,

    bidAmount: Number,
    estimatedTime: Number,

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Application", applicationSchema);
