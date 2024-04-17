const express = require("express");
const users = require("./controllers/users");
const products = require("./controllers/products");
/*
Four types of Asynchronous code:
    1. Node Style Callbacks
    2. Pipelining
    3. Promises
    4. Async/Await

*/

/**
 * @typedef {import('../client/src/model/transportTypes').DataEnvelope<null> } ErrorDataEnvelope
 * */

const app = express();
const PORT = 3000;

app.use(express.json()).use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});

app
  .get("/", (req, res) => {
    res.send("Hello New Paltz!");
  })
  .use("/api/v1/users", users)
  .use("/api/v1/products", products);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  /** @type {ErrorDataEnvelope } */
  const results = {
    isSuccess: false,
    message: err.message || "Internal Server Error",
    data: null,
  };
  res.status(500).send(results);
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
