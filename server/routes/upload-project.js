const express = require('express');
const uploadProjectRouter = express.Router();
const {authenticate} = require('../middleware/authenticate');
// const {Project} = require('../models/project.model');
let multer = require('multer');
let util = require('util');
let fs = require('fs');
let AWS = require('aws-sdk');
let uuid = require('uuid');
let path = require('path');
let {multipleFileUploader} = require('../middleware/uploader');

let aws_access_key_id = process.env.AWS_ACCESS_KEY;
let aws_secret_access_key = process.env.AWS_SECRET_KEY;
let region = process.env.AWS_REGION;
let BUCKETNAME = 'hectorgarcia-projects'; // static bucket name hectorgarcia-projects assumed

uploadProjectRouter.get('/upload', authenticate, (req, res) => {
  console.log('user pinged');
  res.send({message: 'hey you!'});
});

uploadProjectRouter.get('/files', authenticate, (req, res) => {
  let awsS3 = new AWS.S3({apiVersion: '2006-03-01', accessKeyId: aws_access_key_id, secretAccessKey: aws_secret_access_key, region: region});
  let bucketPromise = awsS3.listObjects({Bucket: BUCKETNAME}).promise();

  bucketPromise.then((data) => {
    let links = data.Contents.filter((o) => o.Key.endsWith('.html')).map((l) => l.Key);
    res.send({links: links});
  });
});

uploadProjectRouter.post('/upload', [authenticate, multipleFileUploader], (req, res) => {

  // manage data received
  let project = JSON.parse(req.body.project);
  let url = project.topic.replace(/\s/g, '') + '-' + project.title.replace(/\s/g, '', '');
  console.log(req.files);
  console.log(project);
  console.log(url);

  // Upload to S3
  let awsS3 = new AWS.S3({
    apiVersion: "2006-03-01",
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
    region: region
  });
  let bucketPromise = awsS3.listObjects({Bucket: BUCKETNAME}).promise();

  bucketPromise.then((data) => {

    let hasTopicAndTitle = (d) => d.Key.split('/').length >= 2 && d.Key.split('/')[1].length > 0;
    let paths = data.Contents.filter(d => hasTopicAndTitle(d)).map(o => {
      let [topic, title] = o.Key.split('/');
      return {topic, title}
    });

    console.log('contents of Bucket ', data.Contents.map(d => d.Key));
    console.log('paths ', paths);

    let isTopicInBucketTopics = (topic) => paths.some(e => e.topic === topic);
    let isTitleInBucketTitles = (title) => paths.some(e => e.title === title);

    if (isTopicInBucketTopics(project.topic)) {

      if (isTitleInBucketTitles(project.title)) {
        // add to existing path topic/title
        console.log('add to existing topic & title');
        console.log('will add to topic:', project.topic, ' title: ', project.title);
      } else {
        // add to title/newTopic
        console.log('add new title to existing topic');
        console.log('will add to existing topic:', project.topic, ' new title: ', project.title);
      }
    } else {
      // add to newTitle/newTopic
      console.log('add new topic and title, no matches existing');
    }


    // // Create Bucket
    // let bucketname = url + uuid.v4();
    // let bucketPromise = awsS3.createBucket({Bucket: bucketname}).promise();
    //
    // bucketPromise.then((data) => {
    //
    //   let params = {Bucket: bucketname, Key: '', Body: '', ACL: 'public-read'};
    //
    //   let fileStream = fs.createReadStream('./temp/index.html');
    //   fileStream.on('error', function(err) {
    //     console.log('File Error', err);
    //   });
    //
    //   // upload file to bucket
    //   params.Body = fileStream;
    //   params.Key = path.basename('./temp/index.html');
    //
    //   let uploadPromise = awsS3.putObject(params).promise();
    //   uploadPromise.then((data) => {
    //     console.log('Successfully uploaded data to ' + bucketname + '/' + keyname)
    //   });
    //
    //   let staticHostParams = {
    //     Bucket: bucketname,
    //     WebsiteConfiguration: {
    //       ErrorDocument: {
    //         Key: 'error.html'
    //       },
    //       IndexDocument: {
    //         Suffix: 'index.html'
    //       },
    //     }
    //   };
    //
    //   // Applying website configuration to bucket
    //   staticHostParams.Bucket = bucketname;
    //   staticHostParams.WebsiteConfiguration.IndexDocument.Suffix = 'index.html';
    //   staticHostParams.WebsiteConfiguration.ErrorDocument.Key = 'error.html';
    //
    //   // Configure Bucket to be public static website
    //
    //   awsS3.putBucketWebsite(staticHostParams, function(err, data) {
    //     if (err) {
    //       // display error message
    //       console.log("Error", err);
    //     } else {
    //       // update the displayed policy for the selected bucket
    //       console.log("Success", data);
    //
    //       let bucketPolicyParams = {
    //         Bucket: bucketname,
    //         Policy: JSON.stringify({
    //           Version: "2012-10-17",
    //           Statement: [
    //             {
    //               Sid: "PublicReadGetObject",
    //               Effect: "Allow",
    //               Principal: "*",
    //               Action: "s3:GetObject",
    //               Resource: "arn:aws:s3:::" + bucketname + "/*"
    //             }
    //           ]
    //         })
    //       };
    //       awsS3.putBucketPolicy(bucketPolicyParams, function(err, data) {
    //         if (err) console.log(err, err.stack);
    //         else res.send({message: 'received'});
    //       });
    //     }
    //   });
    // }).catch((err) => {
    //   console.log(err, err.stack);
    //   res.send({message: 'error'});
    // });

  });
});
module.exports = {uploadProjectRouter};
