const express = require('express');
const initWebRoutes = require('./src/route/web');
const bodyParser = require('body-parser')


let app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

initWebRoutes(app);


let port = 8080; 

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
})