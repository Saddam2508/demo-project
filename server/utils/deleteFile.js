const fs = require('fs');
const path = require('path');

/**
 * Delete a file from local storage
 * @param {string} filePath - relative path from project root
 */
const deleteFile = (filePath) => {
  try {
    if (!filePath) return;
   
    // Absolute path তৈরি করা
    const fullPath = path.join(process.cwd(), filePath);
    

    // যদি file থাকে
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`File deleted: ${fullPath}`);
    } else {
      console.warn(`File not found: ${fullPath}`);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

module.exports = deleteFile;
