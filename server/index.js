const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const postRoutes = require('./routes/posts');

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors()); 
app.use('/posts', postRoutes);

app.get('/', (req, res) => res.send('Hello! Welcome to Memories API'));

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(process.env.PORT || 5000, () => console.log(`App started on Port ${PORT}`)))
.catch(error => console.log(`Some error occured ${error.message}`))

mongoose.set('useFindAndModify', false);