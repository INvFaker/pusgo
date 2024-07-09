// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = 4000;

try {
  await db.authenticate();
  console.log("Connection to the database has been established successfully.");
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

(async () => {
  await db.sync();
  console.log("Database Synced");
})();

const allowedOrigins = ["http://localhost:5173", "https://pusgo.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
