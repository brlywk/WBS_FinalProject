import mongoose from "mongoose";
import Subscription from "./_subscriptionSchema.js";

const Schema = mongoose.Schema;

const usageSchema = new Schema(
  {
    userId: { type: String, required: true },
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: Subscription,
      required: true,
    },
    // TODO: Check if this is the best way or come up with something better...
    score: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Usage", usageSchema);
