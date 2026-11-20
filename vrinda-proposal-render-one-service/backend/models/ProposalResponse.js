import mongoose from "mongoose";

const proposalResponseSchema = new mongoose.Schema(
  {
    response: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProposalResponse", proposalResponseSchema);
