import express, { json } from "express";
import mongoose, { connect } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());
app.use(cookieParser());

//Import des routes
import adminRouter from "./routes/admin";
import stepRouter from "./routes/step";
import taskRouter from "./routes/task";

//Connexion à la base de données
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_CONFIG}@cluster0.27iaz.mongodb.net/sogeti?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Cors

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routage
app.use("/step", stepRouter);
app.use("/task", taskRouter);
app.use("/admin", adminRouter);

const public_path = path.join(__dirname, "./build");
app.use(express.static(public_path));
app.get("*", (_, res) => {
  res.sendFile(path.join(public_path, "index.html"));
});

//Export du module app
export default app;
