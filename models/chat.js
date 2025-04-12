const mongoose=require("mongoose");

const chatScheme=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        required:true
    }
});

const Chat=mongoose.model("Chat",chatScheme);

module.exports=Chat;