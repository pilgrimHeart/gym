import * as mongoose from "mongoose";
import { model } from "mongoose";

const registerSchema = new mongoose.Schema({
  fullName: { type: String, },
   phone: { type: String, },
  OTP: { type: Number, }
});

export default model("merchent", registerSchema)