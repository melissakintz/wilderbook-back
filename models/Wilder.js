//define a schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WilderSchema = new Schema({
    name: {type: String, unique: true},
    description: String,
    skills: [{
        name: String,
        votes: Number,
    }]
});

module.exports = mongoose.model("wilder", WilderSchema);

