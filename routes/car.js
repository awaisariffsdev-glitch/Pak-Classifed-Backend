const express = require("express");
const { carAdd, carFindAll, carFindById, carFindByIdAndUpdate, carFindByIdAndDelete, carFindByTitle, getCarByCategory, carFindByUser } = require("../controllers/car.controller");
const authMiddleware = require("../middleware/auth");
const cars = require("../middleware/cars");

const router = express.Router();

router.post("/add",authMiddleware,cars.single("image"), carAdd);
router.get("/findAll",carFindAll);
router.get("/search",carFindByTitle)
router.get("/find/:id",carFindById);
router.get("/find/user/:userId",carFindByUser);
router.get("/category/:category",getCarByCategory);
router.put("/update/:id",cars.single("image"),carFindByIdAndUpdate);
router.delete("/delete/:id",carFindByIdAndDelete);


module.exports=router;