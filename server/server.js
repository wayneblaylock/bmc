const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Handle form submission
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    // Process the form data here (e.g., save to a database)
    console.log("submited")
    let user = name + ',' + email + '\n'

    fs.appendFile('emails.csv', user, function (err) {
    if (err) throw err;
    console.log('Saved!');
    });

  // Redirect or render a response
  res.redirect('http://localhost:8080/');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


