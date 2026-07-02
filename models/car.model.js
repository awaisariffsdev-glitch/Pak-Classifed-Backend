const mongoose = require("mongoose");
const User = require("../models/user.models");
const carSchema = mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    color: { type: String, required: true },
    mileage: { type: Number, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, enum: ["Manual", "Automatic"], required: true, },
    city: { type: String, required: true },
    image: { type: String, required: true }




}, { timestamps: true });



const Car = mongoose.model("Car", carSchema);

module.exports = Car;