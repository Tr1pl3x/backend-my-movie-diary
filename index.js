const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const movieRoutes = require('./routes/movies');

/**
 * This line loads environment variables from a `.env` file into `process.env`.
 * It's essential for keeping sensitive information like database connection strings
 * and API keys out of the source code and securely stored in environment variables.
 */
dotenv.config();

/**
 * Initialize the Express application:creates an instance of an Express application.
 * This `app` object will be used to configure routes, middleware, and handle requests.
 */
const app = express();

/**
 * CORS is a security feature implemented by browsers to control 
 * how resources on a web page can be requested from another domain. 
 * This line enables CORS for all routes in the application, allowing your frontend 
 * (which may be hosted on a different domain) to make API requests to your backend 
 * without being blocked.
 */
app.use(cors());

/**
 * This middleware automatically parses incoming JSON payloads in HTTP request bodies
 * and makes the data available under `req.body`. This is crucial for handling POST requests
 * where the client sends JSON data to the server.
 */
app.use(express.json());

// Test route to ensure server is running
/**
 * This is a basic GET route that serves as a test to ensure the server is running properly.
 * When a request is made to the root URL ('/'), it sends back a simple text response.
 */
app.get('/', (req, res) => {
    res.send('Movie Diary Backend is running');
});

/**
 * This line mounts the `movieRoutes` on the `/movies` path.
 * Any requests that start with `/movies` will be handled by the routes defined in the `movies.js` file.
 * This helps in organizing the code by separating the route definitions from the main server file.
 */
app.use('/movies', movieRoutes);


/**
 * This function connects the application to a MongoDB database using the connection string
 * stored in the `MONGO_URI` environment variable. The options `useNewUrlParser` and 
 * `useUnifiedTopology` are passed to avoid deprecation warnings and to ensure compatibility 
 * with the latest MongoDB drivers. If the connection is successful, a confirmation message 
 * is logged to the console. If it fails, an error message is logged.
 */
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

/**
 * Start the Server
 * 
 * The server will listen on a port specified in the environment variables (if available),
 * or default to port 5000 if not. This makes the application more flexible for different
 * deployment environments (like local development or production).
 * 
 * app.listen(PORT, ...):
 * This starts the server and makes it listen for incoming HTTP requests on the specified port.
 * A message is logged to the console indicating that the server is running and on which port.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
