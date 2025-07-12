import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  profilePic: { type: String },
  provider: {
    type: String,   // 👈 You had a full object here before, which caused the cast error
    default: 'credentials',
    required: false,
  },
  password: {
    type: String,
    required: false, // ✅ Make password optional for OAuth users
    default: 'credentials',
  },
});

const User = mongoose.models.User || mongoose.model("user", userSchema);
export default User;
