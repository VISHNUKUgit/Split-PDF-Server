const { PDFDocument } = require('pdf-lib');
const { log } = require('util');
const fs = require('fs').promises;

exports.generateNewPDF = async (req, res) => {
    const { fileName, pageNumber } = req.body;

    try {
        const existingPdfBytes = await fs.readFile(`./files/${fileName}`);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Asynchronously remove pages
        await removePages(pdfDoc, pageNumber);

        const modifiedPdfBytes = await pdfDoc.save();

         // Generate a unique modified file name with a timestamp
         const timestamp = new Date().getTime();
         const modifiedFileName = `modified_${timestamp}_${fileName}`;

        await fs.writeFile(`./modified_files/${modifiedFileName}`, modifiedPdfBytes);

        // Send the modified file name as a response
        res.status(200).json({ fileName: modifiedFileName });
    } catch (error) {
        console.error('Error modifying PDF:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removePages = async (pdfDoc, pageNumber) => {
    // Asynchronously remove pages
    await Promise.all(pageNumber.map(async (page,index) => {
        await pdfDoc.removePage(page - 1-index);
    }));
};



