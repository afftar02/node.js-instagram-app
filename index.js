const express = require('express');
const router = require('./routes/route');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://afftar:5208381@cluster0.4vqrrcc.mongodb.net/twitter-clone?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});