require('dotenv').config();
const express=require('express');
const logger=require('morgan')('dev');
const bodyParser=require('body-parser');
const path=require('path');
const app=express();

const PORT=process.env.PORT || 3000;

// Routes
const contactRoutes=require("./routes/contact");

// database connectivity
const mongoose=require('mongoose');
const uri="mongodb://localhost:27017/contactsDB";
mongoose.connect(process.env.MONGODB_URI || uri ,{useNewUrlParser:true,useUnifiedTopology:true});


//using middlewares
let bodyParserJSON=bodyParser.json();
let bodyURLEncoded=bodyParser.urlencoded({extended:true});

app.use(logger);
app.use(bodyParserJSON);
app.use(bodyURLEncoded);
app.use(express.static(path.join(__dirname,'public')));
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

module.exports=app;
