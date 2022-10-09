export class Helper {
  static customFileName(req, file, cb) {
    let customFileName = file.originalname.split('.')[0];
    console.log(file.mimetype);
    let fileExtension = '';
    if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = '.jpg';
    } else if (file.mimetype.indexOf('png') > -1) {
      fileExtension = '.png';
    } else if (file.mimetype.indexOf('gif') > -1) {
      fileExtension = '.gif';
    } else if (file.mimetype.indexOf('text/plain') > -1) {
      fileExtension = '.txt';
    } else if (file.mimetype.indexOf('pdf') > -1) {
      fileExtension = '.pdf';
    } else if (file.mimetype.indexOf('document') > -1) {
      fileExtension = '.docx';
    } else if (file.mimetype.indexOf('csv') > -1) {
      fileExtension = '.csv';
    } else if (file.mimetype.indexOf('msword') > -1) {
      fileExtension = '.doc';
    } else if (file.mimetype.indexOf('vnd.ms-excel') > -1) {
      fileExtension = '.xls';
    }
    customFileName = customFileName + fileExtension;
    console.log(customFileName);
    cb(null, customFileName);
  }
  static filePath(req, file, cb) {
    cb(null, './files/');
  }
}
