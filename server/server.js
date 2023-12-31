const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const nodemailer = require('nodemailer');
const emailAuth = require('./email_auth.json')
const readline = require('readline');




// Parse form data
app.use(bodyParser.json());


//set the origin of were the data can come from
app.use(cors({
  origin: 'https://bluemancards.com'
}));


//Email Credentials
var transporter = nodemailer.createTransport({
  host: 'mail.bluemancards.com',
  port: 465, 
  secure: true, 
  auth: {
    user: emailAuth.user,
    pass: emailAuth.pass
  }
});


var htmlContent;
// Specify the path to your HTML file
const filePath = './email.html';

// Read the HTML file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return;
  }

  // The content of the HTML file is stored in the htmlcontent variable
  htmlContent = data;
});


// Handle add user to email list form submission
app.post('/submit', (req, res) => {
  const formData = req.body;

  // Process the form data save to csv
  console.log("submited")
  let user = formData.email + '\n'

  fs.appendFile('emails.csv', user, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });


  //Send Confirmation Email
  var mailOptions = {
    from: 'noreply@bluemancards.com',
    to: `${formData.email}`,
    subject: 'Sending Email using Node.js',
    html: `${htmlContent}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  //respond to web
  res.status(200).json({ message: 'Form submitted successfully' });
});



//handle remove user from email list form submitions
app.delete('/submit', (req,res) => {
  const formData = req.body;

  // Process the form data save to csv
  console.log("Removed")
  let user = formData.email
  let filePath = "./emails.csv"

  const readStream = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  });

  var tempFile = ""

  readStream.on('line', (line) => {
    // Compare each line to email
    if (line !== user) {
      tempFile += (line + '\n');
    }
  });

  // When the readStream ends, close the writeStream
  readStream.on('close', () => {
    fs.writeFile(filePath, tempFile, function (err) {
      if (err) throw err;
      console.log('Replaced!');
    });

});

    //respond to web
    res.status(200).json({ message: 'Form submitted successfully' });

});





//handle contact form 
app.post('/contactForm', (req,res) => {
  const formData = req.body;

  //Send Confirmation Email
  var mailOptions = {
    from: 'noreply@bluemancards.com',
    to: "hunter.scott848@gmail.com",
    subject: 'Contact form',
    html: `<h1>${formData.name}</h1><h1>${formData.email}</h1><h1>${formData.reason}</h1><p>${formData.message}</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


    //respond to web
    res.status(200).json({ message: 'Form submitted successfully' });

});








// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



