// Import the user schema from the Models directory
const users = require("../Models/userSchema");

// Controller function for user registration
exports.register = async(req,res)=>{
    // Destructure the username, email, and password from the request body
    const {username,email,password} = req.body

    try{
        // Check if a user with the provided email already exists in the database
        const existingUser = await users.findOne({email})
       
        if (existingUser){
            // If a user with the email already exists, return a status 406 (Not Acceptable)
            res.status(406).json("Account already exist, Please Login...")
            
        } else {
            // If the email is not in use, create a new user instance and save it to the database   
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()

            // Return a status 200 (OK) and the newly created user
            res.status(200).json(newUser)   
        }
    } catch(err) {
        // If an error occurs during the registration process, return a status 401 (Unauthorized) with the error message
        res.status(401).json(`${err}`);
        
    }
}

// Controller function for user login
exports.login = async(req,res)=>{
    // Destructure the email and password from the request body
    const {email,password} = req.body

    try{
        // Find a user with the provided email and password in the database
        const existingUser = await users.findOne({email,password})
        
        if (existingUser!== null && existingUser !== undefined){
             // If a matching user is found, return a status 200 (OK) with the user details
            res.status(200).json(existingUser)
            
        } else {
            // If no matching user is found, return a status 404 (Not Found) with an error message
            res.status(404).json(`incorrect Email / password`)
        }
    } catch(err) {
        // If an error occurs during the login process, return a status 401 (Unauthorized) with the error message
        res.status(401).json(`error:${err}`);
        
    }
}