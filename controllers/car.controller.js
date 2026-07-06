const { default: mongoose } = require("mongoose");
const Car = require("../models/car.model");

const carAdd = async (req, res) => {
    try {
        const { userId, title, description, price, brand, model, year, color, mileage, fuelType, transmission, city, category } = req.body;
        // console.log(req.body);
        // const imageNames = req.files.map(file => file.filename);
        if (!userId || !title || !description || !price || !brand || !model || !year || !color || !mileage || !fuelType || !transmission || !city || !category) {
            return res.status(400).json({
                message: "All Fields Are Required"
            })
        }

        const newCar = new Car({
            userId, title, description, price, brand, model, year, color, mileage, fuelType, transmission, city, category, image: req.file ? req.file.path : null
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

const getCarByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const cars = await Car.find({ category });
        if (!cars) {
            return res.status(400).json({
                message: "Category Not found"
            })


        }
        return res.status(200).json({ cars });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


const carFindByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Id Is Required"
            })
        }


        const carFind = await Car.find({  userId }).sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Task Find Successfully",
            carFind
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const carFindAll = async (req, res) => {
    try {
        const findAll = await Car.find();
        return res.status(200).json({
            findAll
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const carFindById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Id Is Requried"
            })
        }


        const carFind = await Car.findById(id);
        return res.status(200).json({
            message: "Car Find Successfully",
            carFind
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const carFindByIdAndUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const { userId, title, description, price, brand, model, year, color, mileage, fuelType, transmission, city } = req.body;
        // console.log(req.body)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID Is Required"
            })
        }


        const carUpdate = await Car.findByIdAndUpdate(id, {
            userId, title, description, price, brand, model, year, color, mileage, fuelType, transmission, city, image: req.file ? req.file.path : null
        });

        return res.status(200).json({
            message: "Car Updated Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const carFindByIdAndDelete = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Id Is Required"
            })
        }

        const carFind = await Car.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Car Delete Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const carFindByTitle = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === "") {
            return res.status(400).json({
                message: "Search Query is required"
            })
        }

        const cars = await Car.find({
            title: { $regex: q.trim(), $options: "i" }
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Search Successfully",
            cars
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


module.exports = {
    carAdd, carFindAll, carFindById, carFindByIdAndUpdate, carFindByIdAndDelete, carFindByTitle, getCarByCategory, carFindByUser
}