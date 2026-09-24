const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "neha",
    to: "preeti",
    msg: "send me notes for the exam",
    created_at: new Date(),
  },
  {
    from: "rohit",
    to: "mohit",
    msg: "tech me js callback",
    created_at: new Date(),
  },
  {
    from: "amit",
    to: "sumit",
    msg: "all the best",
    created_at: new Date(),
  },
  {
    from: "sumit",
    to: "yashvindra",
    msg: "send me notes for the exam",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);