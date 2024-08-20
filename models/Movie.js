/**
 * This file defines the Mongoose schema and model for a Movie in the Movie Diary application.
 *
 * A schema in Mongoose is a structure that defines the shape of documents within a MongoDB collection.
 * In this case, the movieSchema is used to represent a movie document, outlining the specific fields 
 * and their respective data types that each movie should contain.
 *
 * The fields defined in this schema include:
 * - movieId: A custom, unique identifier for the movie (type: String).
 * - title: The title of the movie (type: String).
 * - poster: A URL to the movie's poster image (type: String).
 * - releaseDate: The date when the movie was originally released (type: String).
 * - watchedDate: The date when the user watched the movie (type: String).
 * - rating: A numerical rating given by the user (type: Number).
 * - notes: Additional comments or notes about the movie (type: String).
 *
 * Once the schema is defined, it is compiled into a Mongoose model called "Movie". 
 * This model serves as an interface for interacting with the movies collection in MongoDB, 
 * allowing you to perform various operations like creating, reading, updating, and deleting 
 * movie documents.
 *
 * Finally, the Movie model is exported for use in other parts of the application, 
 * particularly in the route handlers where movies are created, fetched, updated, or deleted.
 */

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieId: { type: String, required: true, unique: true }, // Custom ID field
    title: { type: String, required: true },
    poster: { type: String, required: true },
    releaseDate: { type: String, required: true },
    watchedDate: { type: String, required: true },
    rating: { type: Number, required: true },
    notes: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
