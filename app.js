const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
var texts=["Buy food","Cook food","Eat food"];
var workItems = [];
app.get("/",function(req,res){
    var today = new Date();
    var currDay = today.getDay();
    var options = {
        weekday: "long",
        day:"numeric",
        month:"long"
    };
    var day = today.toLocaleDateString("en-US",options);
    //list file has to exist inside views folder and it has to have an extension of .ejs
    //day is the variable in ejs file and dayType is the variable of this file
    //in render you pass the file name and js object which contains key value pairs
    res.render("list",{listTitle:day,newItem:texts});
});
app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"Work",newItem:workItems});
});


app.post("/",(req,res)=>{

    let text = req.body.item;
    if(req.body.list==="Work"){
        workItems.push(text);
        res.redirect("/work");
    }
    else{
        texts.push(text)
        res.redirect("/");
    }
});


app.listen(3000,function(){
    console.log("Server started on port 3000");
})