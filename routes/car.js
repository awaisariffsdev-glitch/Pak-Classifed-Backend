const express = require("express");
const { carAdd, carFindAll, carFindById, carFindByIdAndUpdate, carFindByIdAndDelete } = require("../controllers/car.controller");
const authMiddleware = require("../middleware/auth");
const cars = require("../middleware/cars");

const router = express.Router();

router.post("/add",authMiddleware,cars.single("image"), carAdd);
router.get("/findAll",carFindAll);
router.get("/find/:id",carFindById);
router.put("/update/:id",cars.single("image"),carFindByIdAndUpdate);
router.delete("/delete/:id",carFindByIdAndDelete)


module.exports=router;