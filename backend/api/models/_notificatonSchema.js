import mongoose from "mongoose";
import Subscription from "./_subscriptionSchema.js";

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true, enum: ["usage", "cancel"] }, // usage, cancel?
    sent: { type: Boolean, required: true, default: false },
    deliveries: { type: Number, default: 0 },
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: Subscription,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
