

const userSchema=require("../model/userModel")
const backupuser=require("../model/backupUser")


const generateEmpCode = async () => {
  let empCode;
  let existingUser;
  
  do {
      empCode = "EMP" + Math.floor(100000 + Math.random() * 900000); 
      existingUser = await userSchema.findOne({ empCode });
  } while (existingUser); // Ensure empCode is unique

  return empCode;
};


const createUser=(async(req,res)=>{


  try {
    const { name, email, phone } = req.body;

   
    const existingUser = await userSchema.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
        return res.status(400).json({ message: "Email or phone already exists" });
    }
    const empCode = await generateEmpCode();

    const user = new userSchema({ name, email, phone, empCode});
    await user.save();

    const backupUser = new backupuser({ name, email, phone,empCode });
    await backupUser.save();

    res.status(201).json({ message: "User created successfully", user });
} catch (err) {
  console.log(err)
    res.status(500).json({ error: err.message });
}

})


const getAllusers=(async(req,res)=>{
  try {
    const users = await userSchema.find();
    await backupuser.deleteMany({});
    await backupuser.insertMany(users);

    res.status(200).json({ users });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
})



const updateUser=(async(req,res)=>{
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const updatedUser = await userSchema.findOneAndUpdate({empCode:id},{ name, email,phone  }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    await backupuser.findOneAndUpdate({empCode:id}, { name, email, phone   }, { new: true });

    res.status(200).json({ message: "User updated successfully", updatedUser });
    
  } catch (error) {
    console.log(error)
    res.status(500).send({message:"somthing went wrong"})
  }
})

const deleteuser=(async(req,res)=>{
  try {
    try {
      const { id } = req.params;
      const user = await userSchema.findOneAndDelete({empCode:id});
      if (!user) return res.status(404).json({ message: "User not found" });

      await backupuser.findOneAndDelete({ empCode: id });

      res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
    
  } catch (error) {
    console.log(error)
    res.status(500).send({message:"somthing went worng"})
  }
})


module.exports={
  createUser,
  getAllusers,
  updateUser,
  deleteuser

}