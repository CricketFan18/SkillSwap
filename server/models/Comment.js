import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
      index: true,
    },
    text: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 1000,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({ profileId: 1, createdAt: -1 });

export default mongoose.model("Comment", commentSchema);
