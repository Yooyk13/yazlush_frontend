const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: false,
    },
    orginalPrice: {
      type: Number,
      required: false,
    },
    discountPrice: {
      type: Number,
      required: false,
    },
    discountOff: {
      type: Number,
      required: false,
    },
    ratings: {
      type: Number,
      required: false,
      min: 0,
      max: 5,
    },
    productDetails: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    link: {
      type: [String],
      required: false,
    },
    createdAt: {
      type: String,
      default: () => {
        const date = new Date();
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
      },
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;
