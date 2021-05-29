const express=require("express");
const morgan=require("morgan")
const bodyparser=require("body-parser");
const app=express();
const dotenv=require("dotenv")
const path=require("path")

const connectDB=require("./server/database/connection");

app.use(morgan("tiny"));

dotenv.config({path:'config.env'})
const PORT=process.env.PORT 
//mongodb connection
connectDB();

app.use(bodyparser.urlencoded({extended:true}))
app.set("view-engine","ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))
//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))


const port=3000
//load routets
app.use('/',require('./server/routes/router'))
app.listen(3000,()=>{console.log(`Server running at http://localhost:${port}`)});