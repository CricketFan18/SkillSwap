import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    text: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
