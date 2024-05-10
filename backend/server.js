var express=require("express")
var bodyParser= require("body-parser")
var mongoose= require("mongoose")
const path = require('path')
const User = require('./model/userModell');
const app=express()

app.use(bodyParser.json())
app.use(express.static("./web"));
// app.use(express.static('SAILPROJECT'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/').then(()=>{
    console.log("Connection successfull")
}).catch((e)=>{
    console.log("Error is",e)
})
var db=mongoose.connection
db.on('error',()=>console.log("Error in Connecting to Database"))
db.once('open',()=>console.log("Connected to Database"))

app.get("/signupPage",(req,res)=>{
    return res.sendFile(path.join(__dirname, './web/html/index2.html'));
})

app.post("/sign_up", (req,res)=>{

   const {username,email,password} = req.body
    var data={
        "name": username,
        "email": email,
        "password": password
    }

    // User.create({name,email,password}).then(()=>{
    //     console.log("User created Successfully")
    // }).catch((err)=>{
    //     console.log('Error is ',err)
    // })
       
    db.collection('user').insertOne(data,(err,collection) =>{
     if(err){
        throw err;
     }
     console.log("Record Inserted Successfully")
    })
    return res.sendFile(path.join(__dirname, './web/html/index2.html'));
})


app.post("/details_page", (req,res)=>{

    const {fullname,staffnumber,location,newnumber,oldnumber,remark} = req.body
     var data={
         fullname,
         staffnumber,
         location,newnumber,oldnumber,remark
     }       
     db.collection('userdetails').insertOne(data,(err,collection) =>{
      if(err){
         throw err;
      }
      console.log("Record Inserted Successfully")
     })
     return res.send("File saved successfully")
 })


app.get("/",(req,res)=>{
    res.set({
      "Allow-acces-Allow-Origin":'*'  
    })
    // return res.sendFile('index.html')
    return res.sendFile(path.join(__dirname, './web/html/index.html'));
}).listen(4000);

console.log("Listening on port 4000")