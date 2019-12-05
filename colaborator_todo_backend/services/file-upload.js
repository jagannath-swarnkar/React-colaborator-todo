const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv').config();
const {AWS_ACCESS_ID,AWS_SECRET_KEY,BUCKET,REGION} = require('../config').envdata;

 
aws.config.update({
    secretAccessKey: AWS_SECRET_KEY,
    accessKeyId: AWS_ACCESS_ID,
    region: REGION
})

const s3 = new aws.S3();

const fileFilter = (req, file, cb)=>{
  if(file.mimetype=== 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true)
  }else{
    cb(new Error('Invalid mime type, only jpeg and png'), false);
  }
}
 
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      console.log('file',file)
      cb(null, {fieldName: file.fieldname}); //file.fieldname
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;
