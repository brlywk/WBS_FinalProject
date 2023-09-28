import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { DB_USER, DB_PASSWORD } = process.env;

const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@bootcamp.jkrxi1d.mongodb.net/subzero`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db;
