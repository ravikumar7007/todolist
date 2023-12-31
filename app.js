//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const _ = require("lodash");
dotenv.config();

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.fby6xhd.mongodb.net/todoListDB?retryWrites=true&w=majority`
  );
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

const listSchema = new mongoose.Schema({
  name: String,
  list: [todoSchema],
});
const List = mongoose.model("List", listSchema);

const item1 = new Item({
  name: "Welcome to Todo List",
});
const item2 = new Item({
  name: "Press + to add in the list",
});
const item3 = new Item({
  name: "<-- Click here to delete",
});
const defaultItem = [item1, item2, item3];

app.get("/", async (req, res) => {
  const today = date.getDate();

  let items = await Item.find({}).exec();

  if (items.length === 0) {
    await Item.insertMany(defaultItem).then((res) => {
      console.log("Success ");
    });
    res.redirect("/");
  } else {
    res.render("list", { listTitle: today, itemList: items });
  }
});

app.post("/", async (req, res) => {
  const today = date.getDate();
  const title = req.body.submit;
  const newItem = req.body.newItem;
  const item = new Item({
    name: newItem,
  });
  if (title === today) {
    item.save();
    res.redirect("/");
  } else {
    let foundList = await List.findOne({ name: title }).exec();

    foundList.list.push(item);
    foundList.save();
    res.redirect("/" + title);
  }
});
app.post("/delete", async (req, res) => {
  const today = date.getDate();
  const title = req.body.listName;
  console.log(req.body);
  if (title === today) {
    const del = await Item.findByIdAndRemove(req.body.checkbox);
    console.log(del);
    res.redirect("/");
  } else {
    let del = await List.findOneAndUpdate(
      { name: title },
      { $pull: { list: { _id: req.body.checkbox } } }
    );
    console.log("del:" + del);
    res.redirect("/" + title);
  }
});

app.get("/:listName", async (req, res) => {
  const listName = _.capitalize(req.params.listName);
  let alreadyList = await List.findOne({ name: listName }).exec();
  if (alreadyList === null) {
    const newlist = new List({
      name: listName,
      list: defaultItem,
    });
    newlist.save();
    alreadyList = newlist;
  }
  res.render("list", {
    listTitle: alreadyList.name,
    itemList: alreadyList.list,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port 3000");
});
