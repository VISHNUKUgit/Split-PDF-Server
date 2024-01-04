const express = require('express')
const { register, login } = require('../Controller/userController')
const multerConfig = require('../Middleware/multer')
const { addFile, getUserPdfController } = require('../Controller/fileController')
const { generateNewPDF, downLoadRearrangePDF } = require('../Controller/generatePDFcontroller')
const router  = new express.Router()

// API endpoint for user registration
router.post('/user/register',register)

// API endpoint for user login
router.post('/user/login',login)

// API endpoint for uploading a PDF file with multer middleware configuration
router.post('/upload',multerConfig.single('file'),addFile)

// API endpoint for getting a user's PDF
router.post('/get_pdf',getUserPdfController)

// API endpoint for generating a new PDF
router.post('/create-new-pdf',generateNewPDF)

// API endpoint for rearranging and downloading a PDF
router.post('/rearrange-download-pdf',downLoadRearrangePDF)


module.exports = router