// ----------------------------------------------
// Importantion du modèle pour la table anime
// ----------------------------------------------
const animeModel = require('../models/anime.model');


// ----------------------------------------------
// Récupérer l'enssembles des animes
// ----------------------------------------------
getAllAnimes = (request, response) => {
    animeModel.getAllAnimes((error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Une erreur est survenue en essayant de récupérer la table anime."
            });
        else response.send(data);
    });
};


// ----------------------------------------------
// Récupérer un anime par son ID
// ----------------------------------------------
getAnimeById = (request, response) => {
    animeModel.getAnimeById(request.params.id, (error, data) => {
        if (error) {
            if (error.kind === "index_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table anime n'a pas était trouvé.`
                });
            } else {
                response.status(500).send({
                    message: `L'id ${request.params.id} de la table anime n'a pas était trouvé.`
                });
            }
        } else response.send(data);
    });
};



// ----------------------------------------------
// Récupérer un anime par son nom
// ----------------------------------------------
getAnimeByName = (request, response) => {
    animeModel.getAnimeByName(request.params.nom, (error, data) => {
        if (error) {
            if (error.kind === "name_not_found") {
                response.status(404).send({
                    message: `${request.params.nom} n'a pas était trouvé. Les espaces sont possibles et une majuscule à chaque mot est nécéssaire ! exemple : */filter/One Piece`
                });
            } else {
                response.status(500).send({
                    message: `${request.params.nom} n'a pas était trouvé. Les espaces sont possibles et une majuscule à chaque mot est nécéssaire ! exemple : */filter/One Piece`
                });
            }
        } else response.send(data);
    });
};


// ----------------------------------------------
// Créer un nouvel enregistrement en BDD
// ----------------------------------------------
createAnime = (request, response) => {
    // Vérification si la requette est complété (le JSON)
    // le request.body permet de récupérer le contenue de la requette
    if (!request.body) {
        response.status(400).send({
            message: "Le contenue ne peut être vide !"
        });
    }

    // Sauvegarde du nouvel enregistrement dans le BDD
    animeModel.createAnime(new animeModel.AnimeConstructor(request.body), (error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Des erreurs sont apparues en créant le nouvel anime."
            });
        else response.send(data);
    });
};


// ----------------------------------------------
// Mettre à jour un anime par son ID
// ----------------------------------------------
updateAnimeById = (request, response) => {
    if (!request.body) {
        response.status(400).send({
            message: "Le contenue ne peut être vide !"
        });
    }

    animeModel.updateAnimeById(request.params.id, new animeModel.AnimeConstructor(request.body), (error, data) => {
        if (error) {
            if (error.kind === "selected_anime_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table anime n'a pas était trouvé.`
                });
            } else {
                response.status(500).send({
                    message: "Error lors de la mise à jour de la table pour l'id " + request.params.id
                });
            }
        } else response.send(data);
    }
    );
};


// ----------------------------------------------
// Supprimer un anime par son ID
// ----------------------------------------------
deleteAnimeById = (request, response) => {
    animeModel.deleteAnimeById(request.params.id, (error, data) => {
        if (error) {
            if (error.kind === "index_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table anime n'a pas était trouvé.`
                });
            } else {
                response.status(500).send({
                    message: "Impossible de supprimer l'enregistrement de la table anime avec l'id " + request.params.id
                });
            }
        } else response.send({ message: `L'enregistrement de la table anime à bien était supprimé` });
    });
};


// ----------------------------------------------
// ----------------------------------------------
module.exports = {
    getAllAnimes,
    getAnimeById,
    getAnimeByName,
    createAnime,
    updateAnimeById,
    deleteAnimeById
}