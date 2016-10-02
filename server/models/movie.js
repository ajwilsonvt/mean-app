/*this lets us interface with MongoDB & provide models that map
directly to the database*/
var mongoose = require("mongoose");

//create MovieSchema, defines properties for the object
var MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

/*Export the model Schema. Have to assign this to module.exports
so that we pass it back to whatever "requires" it*/
module.exports = MovieSchema;

/*this file is very thin, because mdoels are supposed to be thin.
We just define the schema for the database.*/
