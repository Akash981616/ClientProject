const mime = require("mime-types");
const bytes = require("bytes");
const path = require("path");

/**
 *@upload
 *
 *@param {Object} fileObj - eg:- req.files.filename.
 *@param {[]} [savePath] - eg:- ['to', 'the', 'path'] will result to 'path/to/the/path'.
 *@param {string} [fileLimit=2mb] - eg:- file limit for the file eg:-'2kb', '2mb', '2gb', '2tb'.
 *@param {[]} [allowedTypes=['jpeg', 'jpg', 'png']] - eg:- Pass extension in array format ['pdf', 'xls'].
 *@return {string} - path of file saved or throws error if any.
 */
exports.upload = (fileObj, allowedTypes = ["jpeg", "jpg", "png"]) => {
  return new Promise((resolve, reject) => {
    if (!fileObj) {
      return reject(new Error("File is Required"));
    }
    const { size, mimetype, md5 } = fileObj;

    const ext = mime.extension(mimetype);

    const uploadDate = new Date().toISOString().replace(/[^A-Za-z0-9]/g, "_");

    // const limit = bytes(fileLimit);

    // if (size > limit) {
    //   return reject(new Error('File Size is not allowed'));
    // }

    if (!allowedTypes.includes(ext)) {
      return reject(new Error("File Type Not Allowed"));
    }

    const fullPath = path.join(
      "uploads",
      "ppt_images",
      `${md5}_${uploadDate}.${ext}`
    );

    fileObj.mv(`${fullPath}`, function (err) {
      if (err) return reject(err);

      return resolve(fullPath);
    });
  });
};
