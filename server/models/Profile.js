import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rollNumber: {
      type: Number,
      unique: true,
      index: true,
    },
    displayName: {
      type: String,
    },
    profilePicURL: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },
    branch: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user",
    },
    batch: Number,
    skills: {
      type: [String],
      default: [],
      validate: [(arr) => arr.length <= 15, "Only 15 skills are allowed"],
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    helpsAsked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Help" }],
    helpsGiven: [{ type: mongoose.Schema.Types.ObjectId, ref: "Help" }],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
