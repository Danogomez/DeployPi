const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// const {getAllGames} = require("../controllers/getGamesAll");
const getGameQuery = require("../controllers/getGameByQuery");
const getGameParams = require('../controllers/getGamesById');
const gamePost = require('../controllers/postGame');
const getGenres = require('../controllers/getGenres');
const delById = require('../controllers/deleteGameById');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames',getGameQuery); // Query

router.get('/videogames/:idVideogame', getGameParams); // Params

router.get('/videogames/name?=',getGameQuery); // Query

router.post('/videogames',gamePost); // Body

router.get('/genres',getGenres); // Api

router.delete('/videogames/:idVideogame', delById)


module.exports = router;
