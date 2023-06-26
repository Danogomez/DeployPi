require("dotenv").config();
const axios = require("axios");
// const API_KEY = process.env;
const {Videogame, Genres} = require('../db');



const getGameApi = async (req, res) => {
    try {
        const games = [];
       
        let URL_BASE =`https://api.rawg.io/api/games?key=d53a115df3bf4bbdb04cb002cc630585`;

        for(let i = 0; i < 5; i++) {
            let currentPage = await axios .get(URL_BASE);
            currentPage.data?.results.forEach(game => {
                games.push({
                    id: game.id,
                    name: game.name,
                    platform: game.platforms.map(plat => plat.platform.name),
                    background_image: game.background_image,
                    released: game.released,
                    rating: game.rating,
                    genres: game.genres.map(g =>g.name),
                    created: false,           
                })
            });


            URL_BASE = currentPage.data.next
        }

        // console.log(games);
        return games;
        
    } catch (error) {
        console.log(error.message)
        // return res.status(404).send("no entre")
    }
};



const getGameDb = async (req,res) => {
    try {
        const allGames = await Videogame.findAll({
            include: {
                model: Genres,
                attributes: ["name"],
                through: {
                  attributes: [],
                },
              },
        })

        const allDbGames = allGames.map(g=> {
            return {
                id: g.id,
                name: g.name,
                rating: g.rating,
                background_image: g.background_image,
                genres: g.genres.map(gender=> gender.name),
                description: g.description,
                released: g.released,
                platforms: g.platforms,
                created: g.created,
            };
        });
        
        // return res.status(200).json(allDbGames);        
        return allDbGames;
    } catch (error) {
        console.log(error.message)
    }
};


// acá concatenamos los 2 resultados!

const getAllGames = ()=> {
    const allInfo = Promise.all([getGameDb(),getGameApi()]).then(
        respuesta =>{
            return [...respuesta[0], ...respuesta[1]];
        }
    );
    return allInfo;
}

module.exports ={ getAllGames, getGameDb }
