import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  profilePic: { type: String },
  provider: {
    type: String,
    default: 'credentials',
    required: false,
  },
  password: {
    type: String,
    required: false,
    default: 'credentials',
  },
  plan: { type: String, required: true }
});

// Prevent OverwriteModelError by checking for existing model
const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;
