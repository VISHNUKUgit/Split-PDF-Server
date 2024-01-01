const express = require('express')
const { register, login } = require('../Controller/userController')
const multerConfig = require('../Middleware/multer')
const { addFile, getUserPdfController } = require('../Controller/fileController')
const { generateNewPDF } = require('../Controller/generatePDFcontroller')
const router  = new express.Router()

//register API
router.post('/user/register',register)

//login API
router.post('/user/login',login)

//Upload PDF
router.post('/upload',multerConfig.single('file'),addFile)

//Get User PDF
router.post('/get_pdf',getUserPdfController)

//Generate new PDF
router.post('/create-new-pdf',generateNewPDF)


module.exports = router