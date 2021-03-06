const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const images = require('./routes/api/images');
app.use('/api/images',images);

const id = require('./routes/api/name');
app.use('/api/name',id);

if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));
  
    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
  }

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server started on ${port}`));