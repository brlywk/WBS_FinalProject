import mongoose from "mongoose";

const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
  // TODO: Implement once we need this
});

export default mongoose.model("Preference", preferenceSchema);
