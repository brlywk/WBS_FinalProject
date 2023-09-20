import mongoose from "mongoose";
import Subscription from "./_subscriptionSchema.js";

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true }, // usage, cancel?
    sent: { type: Boolean, required: true, default: false },
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: Subscription,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
