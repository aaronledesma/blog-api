require("./config/config");

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//Routes
app.use(require("./routes/index"));


mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false

    })
    .catch(err => {
        console.log("Error al conectar");
        console.log(err);
    });

app.listen(process.env.PORT, () => {
    console.log("Listening on port ", process.env.PORT);
});