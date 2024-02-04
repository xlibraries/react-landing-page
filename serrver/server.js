const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRoute = require('./routes/Auth');
const taskRoute = require('./routes/TaskAPI');
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.log('MongoDB connection error: ' + err));


app.use('/api/user', authRoute);

app.use('/api/task', taskRoute);
app.use(cors());
