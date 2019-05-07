const express = require('express');
const picturesRouter = express.Router();


let aws_access_key_id = process.env.AWS_ACCESS_KEY;
let aws_secret_access_key = process.env.AWS_SECRET_KEY;
let region = process.env.AWS_REGION;
let BUCKETNAME = 'hectorgarcia-assets';

picturesRouter.get('/fromS3', (req, res) => {
  res.send('hello');
  let awsS3 = new AWS.S3({apiVersion: '2006-03-01', accessKeyId: aws_access_key_id, secretAccessKey: aws_secret_access_key, region: region});
  let bucketPromise = awsS3.listObjects({Bucket: BUCKETNAME}).promise();
  console.log('got here');
  bucketPromise.then((data) => {
    // let links = data.Contents.filter((o) => o.Key.endsWith('.html')).map((l) => l.Key);
    // res.send({links: links});
    console.log(data);
  });
});

module.exports = {picturesRouter};
