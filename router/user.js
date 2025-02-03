const express=require("express")
const userRouter=express()
const userController=require("../controller/userController")



userRouter.post("/createuser",userController.createUser)
userRouter.get("/getallusers",userController.getAllusers)
userRouter.put("/updateuser/:id",userController.updateUser)
userRouter.delete("/deleteuser/:id",userController.deleteuser)


module.exports=userRouter   