require('dotenv').config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const { nextTick } = require("process");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

const dbUrl=process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) =>{
        console.log(err);
    })

async function main(){
    // await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    await mongoose.connect(dbUrl);
}

// let chat1 = new Chat({
//     from: "neha",
//     to: "priya",
//     msg: "Send me your exam sheets",
//     created_at: new Date(),
// });

// chat1.save().then((res) => {
//     console.log(res);
// })

//create Route
app.post("/chats", async (req, res, next)=>{
    try{
        let {from, msg, to }= req.body;
    let newChat= new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    
    await newChat.save();
    console.log("Chat was saved");
    res.redirect("/chats");
    }
    catch(err){
        next(err);
    }
    
});

//Destroy Route
app.delete("/chats/:id", async (req, res) =>{
    let {id} = req.params;
    let deletedChat  = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

//Update Route
app.put("/chats/:id", async (req, res) => {
    let {id}= req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg: newMsg},
        {runValidators: true, new: true} 
    )
    console.log(updatedChat);
    res.redirect("/chats");
})

// Edit route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

// New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Index Route
app.get("/chats", async (req, res) =>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
})

//New Route
app.get("/chats/new", (req, res) =>{
    res.render("new.ejs");
})

app.get("/", (req, res) =>{
    res.send("Connection Established");
})

app.use((err, req, res, next)=>{
    let {status=500, message="Some error occured"} = err;
    res.status(status).send(message);
});

//It is a server for listening request form client site. 
app.listen(3000, () =>{
    console.log("server is listening on port 3000");
})