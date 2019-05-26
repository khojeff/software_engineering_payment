// Import express
let express = require('express');

// Initialize app
let app = express();

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

// Import body parser
let bodyParser = require('body-parser');

// Import mongoose
let mongoose = require('mongoose');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Import routes
var config = require('./config/config');

// Set port
var port = config.port

let options = { 
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
}; 

// Set mongoose conection
mongoose.connect(config.mongoDBURL, options, {useNewUrlParser: true});

// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

// Import routes
let router = require("./routes")

// add middleware routes
app.use('/api/v1', router)
app.use('/docs/v1/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Listen spesific port
app.listen(port, function() {
    console.log('Running Express on port ' + port);
})