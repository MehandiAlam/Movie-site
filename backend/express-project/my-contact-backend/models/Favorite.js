import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: Number,
  movieId: Number,
  movieTitle: String
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;