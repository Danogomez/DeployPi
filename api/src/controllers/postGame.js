const { Videogame, Genres } = require("../db");

const gamePost = async (req,res) => {
    try {
        const { name, apellido, description, platforms, background_image, released, rating, genre } = req.body;
        // console.log(req.body);
        if(
            !name ||
            !description ||
            !platforms ||
            !released ||
            !rating  ||
            !genre
        ) {
            res.status(404).json({message: 'Debe ingresar todos los campos'})
        }  else {
            const [newGameForm, created] = await Videogame.findOrCreate({
                where:{name:name},
                defaults:{name,
                    description,
                    platforms,
                    background_image,
                    released,
                    rating,
                } 
                },
                ); 
                // console.log(newGameForm);
                genre.forEach(async element => {
                    let genresDbFound = await Genres.findAll({where: {name: element}})
                    
                    await newGameForm.addGenres(genresDbFound);
                });
                // console.log(newGameForm);
                if(created) {
                    return res.status(200).json({message: 'VIDEOGAME CREATED SUCCESSFULLY'});
                } else {
                    if (!created) {
                        res.status(200).json({message: 'VIDEOGAME ALREADY EXIST'});
                    }
                }
            }
                // console.log(newGameForm);
                return res.status(200).json(newGameForm)
                
            } catch (error) {
            res.status(404).send('not game posted')
    }
};

module.exports = gamePost