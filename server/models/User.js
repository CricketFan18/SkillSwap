import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
    },
    email: {
      type: String,
      match: [/@kiit.ac.in$/, "Only KIIT students can login"], // Use regex, not string
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user",
    },
    skills: {
      type: [String],
      default: [],
    },
    batch: Number,
    helpsAsked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Help",
      },
    ],
    helpsGiven: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Help",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
