/**
 * Created by Paulo on 01-02-2014.
 */

var inicio = require("./inicio.js"),
    sobre = require("./sobre.js"),
    anuncio = require("./anuncio.js"),
    pessoa = require("./pessoa.js"),
    erros = require("./erros.js");


function checkAuth(request, response, next) {

    var auth = request.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
    console.log("Authorization Header is: ", auth);
    //if(!auth)
    //if (request.session == undefined || request.session.user == undefined) {
    if (!request.session || !request.session.user)
    {
        request.session.pre_url = request.originalUrl;
        var err = new Error();
        err.status = 401;
        next(err);
    } else {
      /*  var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part

        var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
        var plain_auth = buf.toString();        // read it back out as a string

        console.log("Decoded Authorization ", plain_auth);
        var creds = plain_auth.split(':');      // split on a ':'
        var username = creds[0];
        var password = creds[1];
        request.session.user = username;*/
        next();
    }
}

function routesStart(app,ArrController) {
    inicio.init(app,ArrController[0]);
    sobre.init(app,ArrController[1]);
    anuncio.init(app,checkAuth,ArrController[2]);
    pessoa.init(app,checkAuth,ArrController[3]);
    erros.init(app,ArrController[4]);
}

module.exports.routesStart = routesStart;