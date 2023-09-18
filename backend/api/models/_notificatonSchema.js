import mongoose from "mongoose";
import Subscription from "./_subscriptionSchema.js";

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  // TODO: Implement
});

export default mongoose.model("Notification", notificationSchema);
