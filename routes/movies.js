const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { v4: uuidv4 } = require('uuid');

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new movie
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

// Delete a movie by movieId
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

module.exports = router;


