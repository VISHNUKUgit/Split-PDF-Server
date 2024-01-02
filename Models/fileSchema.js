const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    uploderId:{type: String, required:true},
    title:{type:String, required:true, unique: true},
    files: { type: String, required: true } 
    
});

const files = mongoose.model('files', fileSchema);

module.exports = files;