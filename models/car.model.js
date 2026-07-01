const mongoose = require("mongoose");
const User = require("../models/user.models");
const carSchema = mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String },
    year: { type: String, required: true },
    mileage: { type: Number, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, enum: ["Manual", "Automatic"], required: true },
    engineCapacity: { type: String, required: true },
    bodyType: {
        type: String, enum: [
            "Sedan",
            "Hatchback",
            "SUV",
            "Crossover",
            "Coupe",
            "Convertible",
            "Van",
            "Pickup",
        ],
    },
    color: { type: String, required: true },
    assembly: { type: String, enum: ["Local", "Imported"], required: true },
    registeredIn: { type: String, required: true },
    city:{type:String,required:true},
    address:{type:String},
    phone:{type:String},
    featured:{type:Boolean},
    status:{type:String,enum:["Pending", "Approved", "Rejected", "Sold"],default:"Pending"},
    

},{timestamps:true});



const Car=mongoose.model("Car",carSchema);

module.exports=Car;