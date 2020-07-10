import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model("task", taskSchema);
