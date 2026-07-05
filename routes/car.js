const express = require("express");
const { carAdd, carFindAll, carFindById, carFindByIdAndUpdate, carFindByIdAndDelete, carFindByTitle, getCarByCategory } = require("../controllers/car.controller");
const authMiddleware = require("../middleware/auth");
const cars = require("../middleware/cars");

const router = express.Router();

router.post("/add",authMiddleware,cars.single("image"), carAdd);
router.get("/findAll",carFindAll);
router.get("/find/:id",carFindById);
router.get("/category/:category",getCarByCategory);
router.put("/update/:id",cars.single("image"),carFindByIdAndUpdate);
router.delete("/delete/:id",carFindByIdAndDelete);
router.get("/search",carFindByTitle)


module.exports=router;