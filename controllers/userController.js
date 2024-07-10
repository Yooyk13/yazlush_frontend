const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (email === "yooyu@gmail.com" && password === "831027") {
      const token = jwt.sign(
        { userId: "hardcoded-user-id" }, // You can use any identifier here
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ message: "Login successful", token });
    } else {
      return res.status(400).json({ error: "Email or password is incorrect" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { loginUser };
