const users = require("../Models/userSchema");

exports.register = async(req,res)=>{
    // console.log("inside register controller function");
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
       
        if (existingUser){
            res.status(406).json("Account already exist, Please Login...")
            
        }
        else
        {   
            const newUser = new users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)   
        }
    
    }
    catch(err){
        res.status(401).json(`${err}`);
        
    }
}
exports.login = async(req,res)=>{
    // console.log("inside login controller function");
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        // const allUser = await users.find()
        // console.log(allUser);
        if (existingUser!== null && existingUser !== undefined){
            // const token = jwt.sign({userid:existingUser._id},"ss9876")
            // res.status(200).json({existingUser,token})
            res.status(200).json(existingUser)
            
        }else{
            res.status(404).json(`incorrect Email / password`)
        }
    }
    catch(err){
        res.status(401).json(`error:${err}`);
        
    }
}