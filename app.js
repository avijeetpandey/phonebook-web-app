require('dotenv').config();
const express=require('express');
const logger=require('morgan');
const bodyParser=require('body-parser');
const app=express();
const fs=require('fs');
const path=require('path');

const PORT=process.env.PORT;

// Routes
const contactRoutes=require("./routes/contact");

// database connectivity
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true});


//using middlewares
let bodyParserJSON=bodyParser.json();
let bodyURLEncoded=bodyParser.urlencoded({extended:true});
// writting stream for logs
const logStream=fs.createWriteStream(path.join(__dirname,'server.log'),{flags:'a'});

app.use(logger('dev'));
app.use(logger('combined', { stream: logStream }));
app.use(bodyParserJSON);
app.use(bodyURLEncoded);
app.use(express.static("public"));
app.set("view engine",'ejs');

//Routes
app.use("/",contactRoutes);

app.get('/',(req,res)=>{
    res.redirect('/contacts');
})

app.get('/about',(req,res)=>{
});

app.listen(PORT,(req,res)=>{
    console.log(`Server is up and running on port : ${PORT}`)
})
