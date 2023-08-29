//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

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

  res.render("list", { listTitle: today, itemList: items });
});
app.post("/", (req, res) => {
  let newItem = req.body.newItem;
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
