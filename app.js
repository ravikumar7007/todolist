//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const today = date.getDate();
  res.render("list", { listTitle: today, itemList: items });
});
app.post("/", (req, res) => {
  const newItem = req.body.newItem;
  if (req.body.submit === "Work") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    items.push(newItem);
    res.redirect("/");
  }
});
app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work", itemList: workItems });
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
