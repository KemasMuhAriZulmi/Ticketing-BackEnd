require("dotenv").config();
const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// ! SETUP SERVER
app.get("/", (req, res) => {
    return res.status(200).send("<h1> API TICKETING (self) IS RUNNING <h1>");
});

// ! SURUTAN - Router Events, EventsPromos
const { eventRouter, ticketRouter, eventPromoRouter } = require("./routers");
app.use("/", eventRouter);
app.use("/", eventPromoRouter);
app.use("/", ticketRouter)

// ! RUN SERVER
app.listen(PORT, () => {
    console.log("API RRUNNING AT PORT", PORT);
});