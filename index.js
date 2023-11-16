require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const app = express();
const cors = require("cors");
const bearerToken = require("express-bearer-token");

app.use(bearerToken());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Hello World!");
});

// DEFINE ROUTER GIBRAN
const { promotorRouter, userRouter, refferalsRouter } = require("./router");
app.use("/user", userRouter);
app.use("/promotor", promotorRouter);
app.use("/refferals", refferalsRouter);

//DEFINE ROUTER GIBRAN

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
