// ----------------------------------------------
// Importation du module router de express
// ----------------------------------------------
const router = require('express').Router();

// ----------------------------------------------
// Définition de l'enssembles des constantes utilisant le controller
// ----------------------------------------------
const {
    getAllAnimes,
    getAnimeById,
    getAnimeByName,
    createAnime,
    updateAnimeById,
    deleteAnimeById
} = require('../controllers/anime.controller');

// ----------------------------------------------
// ------------ Définition des routes -----------
// ----------------------------------------------

router.get('/', getAllAnimes); // GET localhost:8081/api/v1/animes

router.get('/:id', getAnimeById); // GET localhost:8081/api/v1/animes/:id

router.get('/filter/:nom', getAnimeByName); // GET localhost:8081/api/v1/animes/filter/:nom

router.post('/', createAnime); // POST localhost:8081/api/v1/animes

router.patch('/:id', updateAnimeById); // PATCH localhost:8081/api/v1/animes/:id

router.delete('/:id', deleteAnimeById); // DELETE localhost:8081/api/v1/animes/:id

module.exports = router;