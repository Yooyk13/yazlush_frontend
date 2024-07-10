const blogModel = require("../models/blog");

const createBlog = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a file" });
  }

  const {
    title,
    description,
    orginalPrice,
    discountPrice,
    discountOff,
    ratings,
    productDetails,
    tags,
  } = req.body;

  // Construct the cover image URL
  const coverImageURL = `http://localhost:4000/${req.file.path}`;

  // Create a new blog instance with the provided data
  const newBlog = new blogModel({
    title,
    description,
    coverImage: coverImageURL,
    orginalPrice,
    discountPrice,
    discountOff,
    ratings,
    productDetails,
    tags,
    link,
  });

  try {
    // Save the new blog to the database
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: err.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const { tags } = req.query;

    let filter = {};
    if (tags) {
      filter.tags = { $in: tags.split(",") }; // Split tags into an array and use $in to filter
    }

    const blogs = await blogModel.find(filter).sort({ createdAt: -1 }); // Sort by creation date in descending order

    res.send(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getBlogs };

const findBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await blogModel.findById({ _id: id });
    console.log("blg", blog);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.send({ blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  findBlog,
};
