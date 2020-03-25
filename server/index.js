const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const images = require('./routes/api/images');
app.use('/api/images',images);

const id = require('./routes/api/name');
app.use('/api/name',id);


const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server started on ${port}`));