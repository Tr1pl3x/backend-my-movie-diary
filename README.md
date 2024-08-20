# Backend-My-Movie-Diary

This is a simple imeplementation for the backend of the "[my-movie-diary](https://movies-diary-pyae.online)" application, which provides a RESTful API for managing a personal movie diary. It allows users to add, view, update, and delete movies they've watched, including storing details such as movie titles, release dates, ratings, and personal notes.

--- 
## Table of Contents
1. [Introduction](#1-introduction)
2. [Features](#2-features)
    -   [Add New Movies to the Diary](#21-add-new-movies-to-the-diary)
    -   [Retrieve a List of All Movies](#22-retrieve-a-list-of-all-movies)
    -   [Update Movie Details](#23-update-movie-details)
    -   [Delete Movies from the Diary](#24-delete-movies-from-the-diary)
    -   [Rate and Comment on Movies](#25-rate-and-comment-on-movies)
    -   [Error Handling and Validation](#26-error-handling-and-validation)
3. [Installation](#3-installation)
4. [Usage](#4-usage)
5. [Movie Model](#5-movie-model)
    - [Schema Structure](#schema-structure)
6. [API Endpoints](#6-api-endpoints)
7. [Contributing](#7-contributing)
8. [Contact](#8-contact)

---
## 1. Introduction
Greetings 🤠 I hope you are having a great day! <br>I have implemented this simple backend service so my front end can connect via deployement. The aim of this backend is create advantage for me to edit or add the movies that I have watched on the go rather than editing the code base and deploying the front end. The repo for the [frontend](https://github.com/Tr1pl3x/my-movie-diary) is here if you want to check it out!

---
##  2. Features
When the frontend of the Movie Diary application sends a request to the backend, the backend processes it by first matching the request to the appropriate route based on the URL and HTTP method. The backend then validates the incoming data, interacts with the MongoDB database using Mongoose, and executes the requested operation, such as retrieving, adding, or deleting a movie. Throughout this process, the backend ensures that any errors are caught and handled gracefully, providing meaningful responses to the frontend. Finally, the backend sends back a response to the frontend, which could be the requested data or an acknowledgment of a successful operation, ensuring smooth and efficient communication between the two.

### 2.1: Add New Movies to the Diary
- **Purpose**: Users can add new movies they have watched to their personal diary. 
- **Details**: 
  - Users provide details such as the movie title, release date, watched date, a poster URL, a personal rating (out of 10), and additional notes or comments.
  - The backend creates a new entry in the MongoDB database with a unique movie ID generated for each movie.
  - The movie is then stored in the database, making it accessible for future retrieval, updates, or deletion.

### 2.2: Retrieve a List of All Movies
- **Purpose**: Users can retrieve a list of all the movies they have added to their diary.
- **Details**:
  - The backend provides an endpoint that returns all movies stored in the database.
  - Movies can be sorted by various criteria such as watched date, release date, or rating.
  - The returned data includes all details about each movie, including title, release date, watched date, rating, notes, and poster URL.

### 2.3: Update Movie Details
- **Purpose**: Users can update the details of a movie they have already added to their diary.
- **Details**:
  - Users can modify any detail of a movie, such as changing the rating, updating the watched date, or editing notes.
  - The backend identifies the movie by its unique movie ID and updates the relevant fields in the database.
  - The changes are saved and can be retrieved in future requests.

### 2.4: Delete Movies from the Diary
- **Purpose**: Users can delete movies from their diary when they no longer want to keep them in the list.
- **Details**:
  - The backend provides an endpoint that allows users to delete a movie by its unique movie ID.
  - Once a movie is deleted, it is permanently removed from the database, and it will no longer appear in the user's movie list.

### 2.5: Rate and Comment on Movies
- **Purpose**: Users can rate movies and add personal notes or comments about them.
- **Details**:
  - Each movie entry includes a `rating` field where users can score the movie out of 10 based on their personal experience.
  - A `notes` field allows users to write down any comments, thoughts, or reviews they may have about the movie.
  - Both the rating and notes can be updated or deleted if the user changes their mind.

### 2.6: Error Handling and Validation
- **Purpose**: The backend includes robust error handling and validation to ensure data integrity and smooth user experience.
- **Details**:
  - All input data is validated before being saved to the database, ensuring that fields like title, poster URL, and dates are correctly formatted and required fields are present.
  - The backend provides meaningful error messages if something goes wrong, such as attempting to add a movie without a title or trying to delete a movie that doesn't exist.
  - Errors are logged for debugging and can be handled appropriately depending on the environment (development vs. production).
---
## 3. Installation

1. Clone the repository:
2. Install dependencies:
```bash
npm install
```
3. Set up environment varaibles:
    - Create a **'.env'** file in the root directory and add the following:
```makefile
MONGO_URI=your-mongodb-connection-string
PORT=5000
```

- ***<u>Note</u>***: You will have to sign up for monogdb atlas [here](https://www.mongodb.com/products/platform/atlas-database) if you want to use online cloud database service for the usage. 

4. Start the server:
```bash
npm start
```
---

## 4. Usage 
Start the development server:
```bash
npm run dev
```
The server will run at `http:localhost:500` by default.

## 5. Movie Model

The `Movie` model is a key component of the backend for the Movie Diary application. It defines the structure of movie data within the MongoDB database, ensuring consistency and integrity across all movie entries. The model is defined using Mongoose, a popular MongoDB object modeling tool for Node.js.

### Schema Structure

You can find the following implementation in `./model/Movie.js`:

```javascript
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
```


The `Movie` model schema consists of the following fields:

- **movieId** (`String`, required, unique): 
  - A unique identifier for each movie, generated using UUID (Universally Unique Identifier). This ID ensures that each movie entry can be individually accessed, updated, or deleted.

- **title** (`String`, required): 
  - The title of the movie. This field is mandatory and stores the name of the movie.

- **poster** (`String`, required): 
  - A URL pointing to the movie's poster image. This field is used to visually represent the movie in the frontend.

- **releaseDate** (`String`, required): 
  - The release date of the movie. This date indicates when the movie was originally released to the public.

- **watchedDate** (`String`, required): 
  - The date when the user watched the movie. This helps users keep track of when they viewed each movie.

- **rating** (`Number`, required): 
  - A numerical rating given by the user, typically on a scale from 1 to 10. This allows users to rate movies based on their personal preferences.

- **notes** (`String`, required): 
  - Additional notes or comments about the movie. Users can use this field to write reviews, thoughts, or any other information related to the movie.



## 6. API Endpoints
- `GET /movies`: Retrieves a list of all movies.
- `POST /movies`: Adds a new movie.

- Request body:
```json
{
  "title": "Inception",
  "poster": "http://image.url",
  "releaseDate": "2010-07-16",
  "watchedDate": "2024-08-20",
  "rating": 9,
  "notes": "Great movie!"
}
```
- `DELETE /movies/:movieID`: Deletes a movie by its ID.



## 7. Contributing
Contributions are always welcome! 😁 Please open an issue or submit a pull request with your changes.

## 8 .Contact
- Maintainer: Pyae Sone Oo
- Email: pyaesoneoo54321@gmail.com
- GitHub: [Tr1pl3x](https://github.com/Tr1pl3x)