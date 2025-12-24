import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  clientId: String,
  clientName: String,
  clientEmail: String,
  title: String,
  description: String,
  budget: Number,
  skills: Array,
  bids: { type: Array, default: [] },
  bidAmounts: { type: Array, default: [] },
  postedDate: Date,
  status: { type: String, default: "Available" },
  freelancerId: String,
  freelancerName: String,
  submission: { type: Boolean, default: false },
  submissionAccepted: { type: Boolean, default: false },
  projectLink: String,
  manualLink: String,
  submissionDescription: String
});

export default mongoose.model("projects", projectSchema);
