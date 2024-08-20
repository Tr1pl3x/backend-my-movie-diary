const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { v4: uuidv4 } = require('uuid');

// Get all movies
/**
 * GET /movies
 * Retrieves all movies from the database.
 * Returns a JSON array of movie objects.
 * If there is an error during retrieval, returns a 500 status code with an error message.
 */
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * POST /movies
 * Adds a new movie to the database.
 * The movie details (title, poster, releaseDate, watchedDate, rating, notes) are provided in the request body.
 * A unique movieId is generated for the movie using UUID.
 * If the movie is successfully added, returns the newly created movie as JSON with a 201 status code.
 * If there is an error during saving, returns a 400 status code with an error message.
 */
router.post('/', async (req, res) => {
    const { title, poster, releaseDate, watchedDate, rating, notes } = req.body;

    const movie = new Movie({
        movieId: uuidv4(), // Generate a unique ID
        title,
        poster,
        releaseDate,
        watchedDate,
        rating,
        notes,
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);

        const allMovies = await Movie.find();
        console.log('Current movie list:', allMovies);
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * DELETE /movies/:movieId
 * Deletes a movie from the database based on the provided movieId in the URL.
 * If the movie is found and successfully deleted, returns a confirmation message as JSON.
 * If the movie is not found, returns a 404 status code with an error message.
 * If there is an error during deletion, returns a 500 status code with an error message.
 */
router.delete('/:movieId', async (req, res) => {
    try {
        const movie = await Movie.findOne({ movieId: req.params.movieId });
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        await Movie.deleteOne({ movieId: req.params.movieId }); // Use deleteOne instead of remove
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        console.error('Error deleting movie:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Export the module
module.exports = router;


