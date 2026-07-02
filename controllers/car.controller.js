const Car = require("../models/car.model");

const carAdd = async (req, res) => {
    try {
        const {  title, description, price, brand, model, year, color, mileage, fuleType, city } = req.body;
        const imageNames = req.files.map(file => file.filename);
        if (!userId || !title || !description || !price || !brand || !model || !year || !color || !mileage || !fuleType || !city) {
            return res.status(400).json({
                message: "All Fields Are Required"
            })
        }

        const newCar = new Car({
            userId, title, description, price, brand, model, year, color, mileage, fuleType, city, image: imageNames
        });

        await newCar.save();

        return res.status(201).json({
            message: "Car Add Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}


module.exports = {
    carAdd
}