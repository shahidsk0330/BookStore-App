import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
//option-1 Allow all the origins with Default of Cors(*)
app.use(cors());
//option-2 Allow Custom Origins
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Mern stack project");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is lisenting to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
