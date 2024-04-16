const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allchats = [
  {
    from: "neha",
    to: "priya",
    msg: "Send me your exam sheets",
    created_at: new Date(),
  },
  {
    from: "rohit",
    to: "mohit",
    msg: "teach me JS callbacks",
    created_at: new Date(),
  },
  {
    from: "amit",
    to: "sumit",
    msg: "all the best",
    created_at: new Date(),
  },
  {
    from: "amita",
    to: "ramesh",
    msg: "bring me some fruits",
    created_at: new Date(),
  },
  {
    from: "tony",
    to: "peter",
    msg: "love you 3000",
    created_at: new Date(),
  },
  


];

Chat.insertMany(allchats);