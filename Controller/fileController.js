// Importing the fileSchema model
const files = require("../Models/fileSchema");

// Controller function to add a file to the database
exports.addFile= async(req,res)=>{
    // Controller function to add a file to the database
    const{ userId,title }=req.body
    
    // Extracting filename from the uploaded file (if exists)
    const uploadFile = req.file?req.file.filename:"";
    
    try {
         // Creating a new file instance using the fileSchema model
        const addFile = new files({ 
            uploderId:userId,
            title:title,
            files:uploadFile
        })

        // Saving the file instance to the database
        await addFile.save() 

        // Sending a successful response with the added file information
        res.status(200).json(addFile)
    
    } catch (error) {
        // Sending an error response if there's an issue with the database operation

        // Check if the error is a duplicate key error for the 'title' field
    if (error.code === 11000 && error.keyPattern && error.keyPattern.title) {
        // Sending a user-friendly error response for duplicate title
        res.status(401).json({ error: "Upload failed, title should be unique" });
    } else {
        // Sending a general error response for other types of errors
        res.status(401).json(error);
    }
    }
}

// Controller function to get all files uploaded by a specific user
exports.getUserPdfController = async(req,res)=>{
    // Extracting userId from the request body
    const userId = req.body.id;
    
    try {
        // Finding all files in the database that belong to the specified user
        const allFile = await files.find({uploderId:userId})

        // Sending a successful response with the list of files
        res.status(200).json(allFile)
        
    } catch (error) {
        // Sending an error response if there's an issue with the database operation
        res.status(401).json(error)
    }
}