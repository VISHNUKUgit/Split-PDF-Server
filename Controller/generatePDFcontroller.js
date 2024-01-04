const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;

// Generates a new PDF by copying specified pages from an existing PDF file.
exports.generateNewPDF = async (req, res) => {
  const { fileName, pageNumber } = req.body;

// Function to copy pages from source to target PDF document
  const copyPages = async (sourcePdfDoc, targetPdfDoc, pageNumbers) => {
    pageNumbers.forEach(async (pageNumber) => {
      const [copiedPage] = await targetPdfDoc.copyPages(sourcePdfDoc, [pageNumber - 1]);
      targetPdfDoc.addPage(copiedPage);
    });
  };

  try {
    // Read existing PDF file
    const existingPdfBytes = await fs.readFile(`./files/${fileName}`);
    const sourcePdfDoc = await PDFDocument.load(existingPdfBytes);

    // Create a new PDF document
    const targetPdfDoc = await PDFDocument.create();

    // Copy specified pages to the new PDF
    await copyPages(sourcePdfDoc, targetPdfDoc, pageNumber);

    // Save the modified PDF document
    await targetPdfDoc.save();

    // Remove the first page from the result, which may contain a blank page at the beginning.
    // This ensures that the output is free from any undesired initial blank pages.
    if (targetPdfDoc.getPageCount() > 0) {

      targetPdfDoc.removePage(0);
    }

    // const modifiedPdfBytes = await targetPdfDoc.save();

    // Generate a unique modified file name with a timestamp
    const timestamp = new Date().getTime();
    const modifiedFileName = `modified_${timestamp}_${fileName}`;

    // Write the modified PDF to a new file
    await fs.writeFile(`./modified_files/${modifiedFileName}`, await targetPdfDoc.save());

    // Send the modified file name as a response
    res.status(200).json({ fileName: modifiedFileName });


  } catch (error) {
    console.error('Error during PDF modification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

// Downloads a rearranged version of a previously modified PDF file.
exports.downLoadRearrangePDF = async (req, res) => {

  const { fileName, pageNumber } = req.body;

  // Function to copy pages from source to target PDF document
  const copyPages = async (sourcePdfDoc, targetPdfDoc, pageNumbers) => {
    pageNumbers.forEach(async (pageNumber) => {
      const [copiedPage] = await targetPdfDoc.copyPages(sourcePdfDoc, [pageNumber - 1]);
      targetPdfDoc.addPage(copiedPage);
    });
  };


  try {
    // Read the modified PDF file
    const existingPdfBytes = await fs.readFile(`./modified_files/${fileName}`);
    const sourcePdfDoc = await PDFDocument.load(existingPdfBytes);

    // Create a new PDF document
    const targetPdfDoc = await PDFDocument.create();

    // Copy specified pages to the new PDF
    await copyPages(sourcePdfDoc, targetPdfDoc, pageNumber);

    // Save the modified PDF document
    await targetPdfDoc.save();

    // Remove the first page if it exists
    if (targetPdfDoc.getPageCount() > 0) {

      targetPdfDoc.removePage(0);
    }

    // const modifiedPdfBytes = await targetPdfDoc.save();

    // Generate a unique modified file name with a timestamp
    const timestamp = new Date().getTime();
    const modifiedFileName = `${timestamp}${fileName}`;

    // Write the modified PDF to a new file
    await fs.writeFile(`./modified_files/${modifiedFileName}`, await targetPdfDoc.save());

    // Send the modified file name as a response
    res.status(200).json({ fileName: modifiedFileName });


  } catch (error) {
    console.error('Error during PDF modification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}


