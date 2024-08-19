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
