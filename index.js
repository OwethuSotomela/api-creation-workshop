// add code in here to create an API with ExpressJS
const express = require('express');
const app = express();

app.use(express.static('public'))

const PORT = process.env.PORT || 4017;
app.listen(PORT, function () {
    console.log(`App started at port: ${PORT}`)
});