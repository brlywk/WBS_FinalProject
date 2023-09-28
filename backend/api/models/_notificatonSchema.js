import mongoose from "mongoose";
import Subscription from "./_subscriptionSchema.js";

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, default: "usage", enum: ["usage", "cancel"] }, // usage, cancel?
    active: { type: Boolean, default: true },
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: Subscription,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
