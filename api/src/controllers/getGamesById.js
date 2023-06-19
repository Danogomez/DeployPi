require('dotenv').config();
const axios = require('axios');
const {getGameDb} = require('./getGamesAll');
const {API_KEY} = process.env
// d53a115df3bf4bbdb04cb002cc630585
const getGameParams = async (req,res) => {
    const {idVideogame} = req.params
    try {
        const idstring = idVideogame.toString();
        
        // console.log(idstring);
        if (idVideogame.length > 7 && typeof idVideogame === "string") {
            const fromDB = await getGameDb();
            const gameDbParams = fromDB.filter(game => game.id === idVideogame)
            res.status(200).json(gameDbParams[0])
        } else {            
            let URL_BASE =`https://api.rawg.io/api/games/${idVideogame}?key=d53a115df3bf4bbdb04cb002cc630585`
            
            const allGamesParams = await axios.get(URL_BASE);
            // console.log(allGamesParams.data);
            // console.log(idVideogame);
            
            const oneGame = {
                id: allGamesParams.data.id,
                name: allGamesParams.data.name,
                description: allGamesParams.data.description,
                platforms: allGamesParams.data.platforms.map(p=>p.platform.name),
                background_image: allGamesParams.data.background_image,
                genres: allGamesParams.data.genres.map(g=>g.name),
                rating: allGamesParams.data.rating,
                released: allGamesParams.data.released,
            }
            // console.log(oneGame)
            return res.status(200).json(oneGame)
    
        }
    } catch (error) {
         return res.status(404).send('Game not found')
    }
};

module.exports = getGameParams