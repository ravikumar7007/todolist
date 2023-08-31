//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
}

const date = require(__dirname + "/date.js");

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const todoSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", todoSchema);

const item1 = new Item({
  name: "Welcome to Todo List",
});
const item2 = new Item({
  name: "Press + to add in the list",
});
const item3 = new Item({
  name: "Click here to delete",
});
const defaultItem = [item1, item2, item3];

app.get("/", async (req, res) => {
  const today = date.getDate();

  let items = await Item.find({}).exec();

  if (items.length === 0) {
    await Item.insertMany(defaultItem)
      .then((res) => {
        console.log("Success ");
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/");
  } else {
    res.render("list", { listTitle: today, itemList: items });
  }
});

app.post("/", (req, res) => {
  const newItem = req.body.newItem;
  const item = new Item({
    name: newItem,
  });
  item.save();
  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work", itemList: workItems });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
