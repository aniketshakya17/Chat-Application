const express=require("express");
const app=express();
const port=8000;
const path=require("path");
const mongoose=require("mongoose");
const methodOverride=require("method-override")
const Chat = require("./models/chat.js");
const ExpressError=require("./ExpressError.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main()  
.then((res)=>{
    console.log("Connection successfull");
})
.catch((err)=>{
    console.log(err);
})
// let chat1=new Chat({
//     from:"ram",
//     to:"aniket",
//     message:"Work hard",
//     created_at:new Date(),
// })

// chat1.save()
// .then((res)=>{
//     console.log(res)
// })
// .catch((err)=>{
//     console.log(err)
// });
function wrapasync(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
}
app.get("/chats",wrapasync(async(req,res,next)=>{
    
    let chats=await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
    
    
}));
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/chats",wrapasync(async(req,res,next)=>{
        let{from,message,to}=req.body;
        let newChat= new Chat({
            from:from,
            message:message,
            to:to,
            created_at:new Date(),
        });
        await newChat.save();
        console.log(newChat);
        res.redirect("/chats");
  

}));

app.get("/chats/:id/edit",wrapasync(async(req,res,next)=>{
    
        let {id}=req.params;
        let chats=await Chat.findById(id);
        res.render("edit.ejs",{chats});
   

}));

app.put("/chats/:id",wrapasync(async(req,res,next)=>{
        let {id}=req.params;

        let {message:newMessage}=req.body;
        let chat=await Chat.findByIdAndUpdate(id,{message:newMessage},{runValidators:true, new:true});
    
        console.log(chat);
        res.redirect("/chats");
 

}));
app.get("/chats/:id",wrapasync(async(req,res,next)=>{
        let{id}=req.params;
        let chats=await Chat.findById(id);
        if(!chats){
            next(new ExpressError(404,"No message"));
        }
        res.render("show.ejs",{chats});
 
 
}));
app.delete("/chats/:id",wrapasync(async(req,res,next)=>{
        let {id}=req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");

    
}));
app.get("/",(req,res)=>{
    res.send("Working Well")
});
const handleValidationErr=(err)=>{
    console.log("Validation error occured.Kindly follow rules");
    console.dir(err.message);
    return err;
}
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name==="ValidationError"){
        err=handleValidationErr(err);
    }
    next(err);
})
app.use((err,req,res,next)=>{
    let {status=500,message="Not Found"}=err;
    res.status(status).send(message);
})

app.listen(port,()=>{
    console.log(`Server is Working on port${port}`);
});