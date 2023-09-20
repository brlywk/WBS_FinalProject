import mongoose from "mongoose";
import Category from "./_categorySchema.js";

const Schema = mongoose.Schema;

const serviceLinkSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const serviceSchema = new Schema({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: Category, required: true },
  image: { type: String },
  links: [serviceLinkSchema],
});

export default mongoose.model("Service", serviceSchema);
