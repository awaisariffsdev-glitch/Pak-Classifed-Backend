const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    phone: { type: Number },
    city: { type: String, required: true },
    isVerified: { type: Boolean, default: false }

}, { timestamps: true });


const User = mongoose.model("User", userSchema);
module.exports = User;