import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: [/@kiit.ac.in$/, "Only KIIT students can login"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      required: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    profileId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
