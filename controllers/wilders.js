const WilderModel = require("../models/Wilder");
const createError = require('http-errors')

//CRUD
module.exports = {
    create: async(req, res) => {
            await WilderModel.init();
            const wilder = new WilderModel(req.body); //instanciation du modèle selon le corps de la requête
            const result = await wilder.save();
            if (!result) throw createError(404, `Bad request`);
            res.status(200).json({ success: true, result: result});
    },

    read: async(req, res) => {
            const result = await WilderModel.find()
            // Throws error if user not found
            if (!result) throw createError(500, `Data not found`);
            res.status(200).json({ success: true, result: result})
    },
    
    update: async(req, res) => {
            await WilderModel.findOneAndUpdate({ "name": req.body.name } , { "name": req.body.newName })
            res.status(200).json({ success: true});
    },

    delete: async(req, res, next) => {
        try{
            await WilderModel.findOneAndRemove({'name': req.body.name})
            res.status(200).json({ success: true});
        } catch(err) {
            next(err)
        };
    }
};