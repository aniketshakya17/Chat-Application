const mongoose=require("mongoose");
const Chat = require("./models/chat.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main()
.then((res)=>{
    console.log("connection successfull");
})
.catch((err)=>{
    console.log(err)
});

let allChats=[
    {
        from:"neha",
        to:"sudeep",
        message:"Bring some fruits",
        created_at:new Date(),
    },
    {
        from:"Wonk",
        to:"wack",
        message:"Hey! Whatapp",
        created_at:new Date(),
    },
    {
        from:"Uine",
        to:"wed",
        message:"U are good enough",
        created_at:new Date(),
    },
    {
        from:"Whic",
        to:"iuw",
        message:"Be quick",
        created_at:new Date(),
    },
    {
        from:"iole",
        to:"uwis",
        message:"Read this sentence",
        created_at:new Date(),
    },
];

Chat.insertMany(allChats);