//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let current = new Date();
  let obj = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let today = current.toLocaleDateString("en-US", obj);

  res.render("list", { kindOfDay: today, itemList: items });
});
app.post("/", (req, res) => {
  let newItem = req.body.newItem;
  items.push(newItem);
  res.redirect("/");
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
