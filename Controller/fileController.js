const files = require("../Models/fileSchema");

exports.addFile= async(req,res)=>{
    // console.log("inside Addfile function");
    
    const{
        userId,
        title
    }=req.body
    
    // console.log("1",req.file);
    const uploadFile = req.file?req.file.filename:"";
    // console.log("2",uploadFile)
   
    
    try {
        const addFile = new files({ 
            uploderId:userId,
            title:title,
            files:uploadFile})
        await addFile.save()
        res.status(200).json(addFile)
    
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getUserPdfController = async(req,res)=>{
    console.log("inside get-file function");
    const userId = req.body.id;
    // console.log(userId);
    try {
        const allFile = await files.find({uploderId:userId})
    res.status(200).json(allFile)
    // console.log(allFile);
    
    } catch (error) {
        res.status(401).json(error)
    }
}