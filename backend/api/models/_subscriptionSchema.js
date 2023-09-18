import mongoose from "mongoose";
import Category from "./_categorySchema.js";

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    interval: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      default: "65085704f18207c1481e6642", // Category "None"
    },
    billing_date: { type: Date, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Subscription", subscriptionSchema);
