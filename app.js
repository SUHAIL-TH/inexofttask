const express =require("express")
const app=express()

const path = require("path")
const userRoutes=require("./router/user")

const dbconnect=require("./config/config")
const morgan=require("morgan")



dbconnect.dbconnect()



app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use(morgan("dev"))
app.use("/api",userRoutes)





app.listen(3000,()=>{
    console.log("server started to listing port 3000 ")
})