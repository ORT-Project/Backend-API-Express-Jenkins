// ----------------------------------------------
// Importation de la connexion à la bdd
// ----------------------------------------------
const dataBase = require('../db/db_connect');


// ----------------------------------------------
// Création d'un constructeur pour la création et la mise à jour des enregistrements
// ----------------------------------------------
const AnimeConstructor = function (anime) {
    this.ref_auteur_id = anime.ref_auteur_id;
    this.titre = anime.titre;
    this.nb_saisons = anime.nb_saisons;
    this.nb_episodes = anime.nb_episodes;
    this.description = anime.description;
};


// ----------------------------------------------
// Récupérer l'ensembles des animes
// ----------------------------------------------
getAllAnimes = result_bdd_request => {
    dataBase.query("SELECT * FROM anime", (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        // Le premier null représente les erreurs
        result_bdd_request(null, response);
    });
};


// ----------------------------------------------
// Récupérer un anime par son ID
// ----------------------------------------------
getAnimeById = (selectedID, result_bdd_request) => {
    dataBase.query(`SELECT * FROM anime WHERE id = ${selectedID}`, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        if (response.length) {
            result_bdd_request(null, response);
            return; // Très important pour indiquer à node que l'on doit quitter la condition ! Dans une condition, node ne quitte pas de lui même sauf si c'est une erreur !!!
        }
        // Si jamais l'id renseigné n'existe pas je bind un nom qui sera utilisé dans le controller
        result_bdd_request({ kind: "index_not_found" });
    });
};


// ----------------------------------------------
// Récupérer un anime par son nom
// ----------------------------------------------
getAnimeByName = (selectedName, result_bdd_request) => {
    dataBase.query(`SELECT * FROM anime WHERE titre = '${selectedName}'`, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        if (response.length) {
            result_bdd_request(null, response);
            return;
        }
        result_bdd_request({ kind: "name_not_found" });
    });
};


// ----------------------------------------------
// Créer un nouvel enregistrement en BDD
// ----------------------------------------------
createAnime = (newAnime, result_bdd_request) => {
    dataBase.query('INSERT INTO anime SET ref_auteur_id = ?, titre = ?, nb_saisons = ?, nb_episodes = ?, description = ?', [newAnime.ref_auteur_id, newAnime.titre, newAnime.nb_saisons, newAnime.nb_episodes, newAnime.description],
        (error, response) => {
            if (error) {
                result_bdd_request(error);
            }
            result_bdd_request(null, { id: response.insertId, ...newAnime });
        });
};


// ----------------------------------------------
// Mettre à jour un anime par son ID
// ----------------------------------------------
updateAnimeById = (selectedID, selectedAnime, result_bdd_request) => {
    dataBase.query(
        "UPDATE anime SET ref_auteur_id = ?, titre = ?, nb_saisons = ?, nb_episodes = ?, description = ? WHERE id = ?",
        [selectedAnime.ref_auteur_id, selectedAnime.titre, selectedAnime.nb_saisons, selectedAnime.nb_episodes, selectedAnime.description, selectedID],
        (error, response) => {
            if (error) {
                result_bdd_request(error);
            }
            if (response.affectedRows == 0) {
                result_bdd_request({ kind: "selected_anime_not_found" });
                return;
            }
            result_bdd_request(null, { id: selectedID, ...selectedAnime });
        }
    );
};


// ----------------------------------------------
// Supprimer un anime par son ID
// ----------------------------------------------
deleteAnimeById = (selectedID, result_bdd_request) => {
    dataBase.query("DELETE FROM anime WHERE id = ?", selectedID, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        if (response.affectedRows == 0) {
            result_bdd_request({ kind: "index_not_found" });
            return;
        }
        result_bdd_request(null, response);
    });
};


// ----------------------------------------------
// ----------------------------------------------
module.exports = {
    AnimeConstructor,
    getAllAnimes,
    getAnimeById,
    getAnimeByName,
    createAnime,
    updateAnimeById,
    deleteAnimeById
};