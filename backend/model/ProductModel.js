const mongoose = require("mongoose");

const productSchemaRules = {
  title: {
    type: String,
    required: [true, "Kindly pass the title"],
    //unique: [true, "Product title should be unique"],
    maxlength: [40, "Your product length is more than 40 characters"],
  },
  price: {
    type: Number,
    required: [true, "Kindly pass the price"],
    validate: {
      validator: function () {
        return this.price > 0;
      },
      message: "Price cant be negetives",
    },
    maxlength: "Price cant be negetives",
  },
  description: {
    type: String,
    required: [true, "Kindly pass the description"],
    maxlength: [255, "Your product description is more than 255 characters"],
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
  },
  rating: {
    rate: Number,
    count: Number
  } 
};

const productSchema = new mongoose.Schema(productSchemaRules);

const validCategories = ["breakfast", "lunch", "dinner"];

productSchema.pre("save", function (next) {
  const isPresent = validCategories.includes(this.category);
  if (!isPresent) {
    next(new Error("Invalid category"));
  } else {
    next();
  }
});

const ProductModel = mongoose.model("productModel", productSchema);

module.exports = ProductModel;
