
const {Videogame} = require('../db')


const delById = async (req, res) => {
    try {
    const {idVideogame} = req.params;

    const getId = await Videogame.findByPk(idVideogame);

    if(getId) {
        await getId.destroy();
        res.status(200).send("DELETED");
    } else {
        res.status(404).send("NOT VIDEOGAME FOUND");
    }
} catch (error) {
    res.status(404).send(error.message)
}
};

module.exports = delById;