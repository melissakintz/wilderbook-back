const express = require("express");
const mongoose = require("mongoose");
const wilderController = require("./controllers/wilders");
const app = express();
const port = process.env.port || 5000;
const asyncHandler = require('express-async-handler')


//connect database
mongoose
    .connect("mongodb+srv://melissa:melissa67@cluster0.5rjiu.mongodb.net/wilderdb?retryWrites=true&w=majority", {
        autoIndex: true,
    })
    .then(() => console.log("Connected to the db"))
    .catch((err) => console.log(err));

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

function runAsyncWrapper(callback){
    return function (req, res, next){
        callback(req, res, next).catch(next);
    }
}


//ROUTES
app.get('/', (req, res) =>{
    res.send("hello")
});

// CREATE
app.post("/api/wilder/create", runAsyncWrapper(wilderController.create));

//READ
app.get("/api/wilder/read", runAsyncWrapper(wilderController.read));

//UPDATE
app.post("/api/wilder/update", asyncHandler(wilderController.update));

//DELETE
app.delete("/api/wilder/delete", wilderController.delete);

//listen server
app.listen(port, () => console.log(`Server started on ${port}`));
