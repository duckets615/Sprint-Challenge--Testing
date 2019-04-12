const express = require('express');
const helmet = require('helmet');

const server = express(); // go go gadget server
server.use(express.json(), helmet()) // space saver ,

// data
let games = [
    {
        id : 0,
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      }
];

let id = 0;

// endpoints tests
// --- Test GET Endpoint ---
server.get('/testme/14', (req, res) => {
    res.status(200).json('One More Time');
});

// --- GET All Games Endpoint ---
server.get('/games', (req, res) => {
    res.status(200).json(games);
});

// --- GET Individual Game Endpoint ---
server.get('/games/:id', (req, res) => {
    // Extract URL Parameters
    const { id } = req.params;

    for ( i = 0; i < games.length; i++ ) {

        console.log("game:", games[i])
        if (Number(games[i].id) === Number(id)) {
            return res.status(200).json(games[i]);
        }
    }

    res.status(404).json({ errorMessage: "No game was found with an id matching the provided id." });
});

// --- POST Game Endpoint ---
server.post('/games', (req, res) => {
    let { title, genre, releaseYear } = req.body;

    if ( !title || !genre ) {
        return res.status(422).json({ errorMessage: 'You must provide a title and genre when adding a game.' })
    }

    for ( i = 0; i < games.length; i++ ) {
        if (games[i].title === title) {
            return res.status(405).json({ errorMessage: "A game with that title was already added. Titles must be unique." })
        }
    }

    if ( !releaseYear ) {
        releaseYear = '';
    }

    id++;

//    Game Construc
    const gameObject = { id: id, title: title, genre: genre, releaseYear: releaseYear }

    games.push(gameObject)

    res.status(201).json(gameObject);
});


// --- DELETE Game Endpoint ---
server.delete('/games/:id', (req, res) => {
    const gameId = req.params.id;
    let idExists = false;

    for (i = 0; i < games.length; i++) {
        if (Number(games[i].id) === Number(gameId)) {
            idExists = i;
        }
    }

    if (!idExists && idExists !== 0) {
        return res.status(404).json({errorMessage: "We were unable to delete the game with the provided id."})
    }

    games = games.slice(0, idExists).concat(games.slice(idExists + 1, games.length));
    res.status(200).json({ gameId });
});


module.exports = server;
