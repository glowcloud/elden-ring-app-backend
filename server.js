require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const buildRoutes = require("./routes/builds");
const userRoutes = require("./routes/users");

// express app
const app = express();

// middleware
app.use(express.json());

app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

/* app.use(express.urlencoded({ extended: true }));
 app.use((_, res, next) => {
  res.set('Access-Control-Allow-Origin', '*'); // or 'localhost:8888'
  res.set('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization'
  );
  return next();
}); // sets headers before routes
*/

// routes
app.use("/api/user", userRoutes);
app.use("/api/builds", buildRoutes);

// db connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // request listener
    app.listen(process.env.PORT || 3000, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
