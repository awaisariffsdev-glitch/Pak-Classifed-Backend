const express = require("express");
const upload = require("../middleware/profile");
const { userSignUp, userLogIn, userFind, userUpdate, userDelete } = require("../controllers/user.controller");
const router = express.Router();

router.post("/signUp", upload.single("image"), userSignUp);
router.post("/logIn", userLogIn);
router.get("/find/:id", userFind);
router.put("/update/:id", upload.single("image"), userUpdate);
router.delete("/delete/:id", userDelete);


module.exports = router;