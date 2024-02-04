const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Your existing code
const port = process.env.PORT || 5000;
require('dotenv').config();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.log('MongoDB connection error: ' + err));

const authRoute = require('./routes/Auth');

app.use('/api/user', authRoute);

const taskRoute = require('./routes/TaskAPI');

app.use('/api/task', taskRoute);
