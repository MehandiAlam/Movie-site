import express from "express";
import cors from "cors";
import authRoutes from "./authRoutes.js";
import movieRoutes from "./movieRoutes.js";
import connectedDB from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend connected successfully"
  });
});

app.use("/api/auth",authRoutes);
app.use("/api/movies", movieRoutes);
connectedDB();
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

