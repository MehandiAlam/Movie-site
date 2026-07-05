import express from "express";
import User from "./models/User.js";
import Favorite from "./models/Favorite.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.json({
      message: "User saved successfully"
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/favorites", async (req, res) => {
  try {
    const { userId, movieId, movieTitle } = req.body;

    const newFavorite = new Favorite({
      userId,
      movieId,
      movieTitle
    });

    await newFavorite.save();

    res.json({
      message: "Favorite saved successfully"
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required"
    });
  }

  res.status(200).json({
    message: "Login successful"
  });
});

export default router;