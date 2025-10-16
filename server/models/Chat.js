import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    helpID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Help",
      required: true,
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Profile",
      required: true,
      validate: [
        (arr) => arr.length === 2,
        "Conversation must have exactly 2 participants",
      ],
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ participants: 1, helpID: 1 }, { unique: true });

export default mongoose.model("Chat", chatSchema);
