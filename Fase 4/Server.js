/**
 * Created by Paulo Coelho on 12-06-2014.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var pjson = require('./package.json');

var bodyParser = require('body-parser')
var routes = require('./routes/start');

var app = express();

var SobreControllerModule  = require('./controllers/SobreController');
var InicioControllerModule = require('./controllers/InicioController');
var AnuncioControllerModule = require('./controllers/AnuncioController');
var PessoaControllerModule = require('./controllers/PessoaController');
var ErrosControllerModule = require('./controllers/ErrosController');

var BusinessStandPISELModule = require("./BL/BusinessStandPISEL");

var BusinessStandPISEL = BusinessStandPISELModule();

var SobreController = SobreControllerModule();
var InicioController = InicioControllerModule();
var AnuncioController = AnuncioControllerModule(BusinessStandPISEL,pjson);
var PessoaController = PessoaControllerModule(BusinessStandPISEL);
var ErrosController = ErrosControllerModule();

/*Indica o porto onde vai correr o servidor*/
app.set('port', process.env.PORT || 4000);
/*Indica que vamos trabalhar com ficheiros ejs*/
app.set('view engine', 'ejs');
/*Indica onde se encontram as views*/
app.set('views', __dirname + '/views');
/*Vai buscar os ficheiros css e js para adicionar ao projecto*/
app.use(express.static(path.join(__dirname)));
// parse application/json and application/x-www-form-urlencoded
app.use(bodyParser({keepExtensions: true}));

app.use(cookieParser(""));
app.use(session({secret: 'test'}))

app.use(function loadCurrentUserIntoRequest(request, response, next) {

	response.locals.isLogged = false;
	response.locals.username = undefined;
	response.locals.email = undefined;
    if(request.session && request.session.user) {
        response.locals.isLogged = true;
        response.locals.username = request.session.user["id"];
        response.locals.email = request.session.user["email"];
    }

    return next();
});
app.param('id', function(request,response, next, id){
    request.id = id;
    next();
});

routes.routesStart(app,[InicioController,SobreController,AnuncioController,PessoaController,ErrosController]);

Date.prototype.subbDays = function(days)
{
    this.setDate(this.getDate()-days);
}


http.createServer(app).listen(app.get('port'), function(){
    console.log('Server Running on http://127.0.0.1:' + app.get('port'));
});