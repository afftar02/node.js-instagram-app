const express = require('express');
const router = require('./routes/route');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});