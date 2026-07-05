import express from "express";
import Favorite from "./models/Favorite.js";

console.log("movieRoutes file loaded");

const router = express.Router();

router.post("/favorites", async (req, res) => {
  try {
    const { userId, movieId, movieTitle } = req.body;

    const newFavorite = new Favorite({
      userId,
      movieId,
      movieTitle
    });

    await newFavorite.save();

    res.status(201).json({
      message: "Favorite successfully saved",
      favorite: newFavorite
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error"
    });
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const favorites = await Favorite.find();

    res.status(200).json(favorites);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error"
    });
  }
});

export default router;