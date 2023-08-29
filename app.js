//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ urlencoded: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let today = new Date();
  let currentDay = today.getDay();
  day = "";
  if (currentDay == 0 || currentDay === 6) {
    day = "Weekend";
  } else {
    day = "Weekday";
  }
  res.render("list", { kindOfDay: day });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
