const models = require("../models")

module.exports = {
    //Display All the Dishes In The DataBase
    findAll: async (req, res) => {
        const dishes = await models.dish.findAll()
        return res.status(200).json(dishes)
    }
}