import mongoose from "mongoose";

const helpSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
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
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

helpSchema.index({ createdAt: -1 });
helpSchema.index({ category: 1 });
helpSchema.index({ title: "text", description: "text", tags: "text" });

export default mongoose.models.Help || mongoose.model("Help", helpSchema);
