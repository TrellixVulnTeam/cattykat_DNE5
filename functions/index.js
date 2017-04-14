var functions = require('firebase-functions');

// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');

// Your Google Cloud Platform project ID
const projectId = 'cattykat-f3941';

// Instantiates a client
const visionClient = Vision({
  projectId: projectId
});


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.getData = functions.https.onRequest((request, response) => {
 response.send("get data endpoint");
});

// exports.getImageLabel = functions.https.onRequest((req, res) => {
exports.getImageLabelV2 = functions.storage.object().onChange(event => {

    const filePath = event.data.name;
    console.log(filePath);
    // The name of the image file to annotate
    // const fileName = 'http://artforcatssake.org/clients/20295/images/slideshows/63748/16c_vet_home_slide02.jpg';
        // Performs label detection on the image file
    visionClient.detectLabels(filePath)
    .then((results) => {
        const labels = results[0];
        console.log(labels);

        // console.log('Labels:');
        // labels.forEach((label) => console.log(label));
        // res.send(labels);
    });
});