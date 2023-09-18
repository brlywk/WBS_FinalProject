import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  // TODO: Not necessary for now, but we need this later
  // userId: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String },
});

export default mongoose.model("Category", categorySchema);
