import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("user", userSchema);
