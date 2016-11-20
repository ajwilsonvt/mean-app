/*node-restful is a dependency that takes a mongoose model and converts
it to a REST API. It will build out the CRUD operations (create, read,
update, delete) are 4 basic operations of persistent storage.*/
var restful = require("node-restful");

module.exports = function(app, route) {
    //setup the controller for REST;
    var rest = restful.model(
        "video",
        app.models.video
    ).methods(["get", "put", "post", "delete"]);
        //provides these methods to the video model

    //register this API with the application
    rest.register(app, route);

    //return the middleware
    return function(req, res, next) {
        next();
    };
};
