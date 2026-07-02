const express = require("express");
const { carAdd } = require("../controllers/car.controller");
const authMiddleware = require("../middleware/auth");
const cars = require("../middleware/cars");

const router = express.Router();

router.post("/add",authMiddleware,cars.single("image"), carAdd);



module.exports=router;