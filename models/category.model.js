const { default: mongoose, model } = require("mongoose");

const categorySchema = mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean }
});


const Category = mongoose.model("Category", categorySchema);
module.exports = Category;