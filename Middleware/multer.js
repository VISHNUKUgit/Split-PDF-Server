// Import the multer library for handling file uploads
const multer = require('multer')

// Configure multer storage settings
const storage = multer.diskStorage({
    
    // Define the destination where uploaded files will be stored
    destination:(req,file,callback)=>{
        // 1.The standard callback pattern:callback(error, result);
        // 3.Incorrect usage: Passing success message as the first argument
        // callback("This is a success message");
        //4. Correct usage: Passing null as the first argument for success
        // callback(null, "./files");


        // Set the destination directory for storing files
        callback(null,"./files")
        
    },
    // Define the filename for the uploaded file
    filename:(req,file,callback)=>{
        // Generate a unique filename using the current timestamp and the original filename
        const filename = `pdf_${Date.now()}_${file.originalname}`

        // Pass the generated filename to the callback
        callback(null,filename)
    }
})

// Define a file filter to restrict file types to only PDF files
const fileFilter = (req,file,callback)=>{
    // If the file is a PDF, allow it
    if (file.mimetype === 'application/pdf') {
        callback(null, true);
    } else {
        // If the file is not a PDF, reject it with an error message
        callback(new Error("Only PDF files are allowed!!!"), false);
    }
    

}
// Configure multer with the defined storage and file filter settings
const multerConfig  = multer({
    storage,fileFilter
})                          

module.exports = multerConfig