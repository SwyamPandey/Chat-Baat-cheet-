const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/styles", express.static(path.join(__dirname, "/public/styles")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
main()
  .then(() => {
    console.log("connection succesful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/", async (req, res) => {
  let chats = await Chat.find();
  //console.log(chats);
  res.render("index.ejs", { chats });
});
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/chats/:id/edit", async (req, res) => {
  //edit route hae ye
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});
app.delete("/chats/:id", async (req, res) => {
  //del route hae ye
  let { id } = req.params;
  let deletechat = await Chat.findByIdAndDelete(id);
  console.log(deletechat);
  res.redirect("/");
});

app.put("/chats/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let newMsg = req.body.msg; // Assuming the input name is "msg"

    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { message: newMsg },
      { runValidators: true, new: true }
    );

    console.log(updatedChat);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/chats", (req, res) => {
  let newchat = new Chat({
    from: req.body.from,
    to: req.body.to,
    message: req.body.message,
    created_at: new Date(),
  });
  newchat
    .save()
    .then((res) => {
      console.log("new chat is saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
});
app.listen(8080, (req, res) => {
  console.log("servert has started on port 8080");
});
