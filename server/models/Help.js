import mongoose from "mongoose";

const helpSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: { type: [String], default: [] },
    category: { type: String, trim: true },
    tags: { type: [String], default: [] },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: "Comment", default: [] },
  },
  {
    timestamps: true,
  }
);

helpSchema.index({ category: 1 });

export default mongoose.model("Help", helpSchema);
