const express = require('express');

const app = express();

const port = process.env.SPA_PORT || 5000;

app.get('/ping', (request, response) => {
  response.status(200).json('pong');
});

// The only supported route is /dob/gender
// Example: http://localhost:5000/1960-05-10/F
app.use('/:dateOfBirth/:gender', require('./src/request-state-pension-date'));

// Start listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
