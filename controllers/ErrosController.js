/**
 * Created by ISEL on 28-06-2014.
 */
var fs = require('fs');

module.exports = function(){

    function defaultError(request, response, next)
    {
        var err = new Error();
        err.status = 400;
        next(err);
    }

    function handlingErrors(error, request, response, next) {

        var serverPath="./imagens/Erros/";
        if(error.status == 401){
            console.log(401);
            response.status(401);
            //response.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            response.render('Autenticar',{page:'autenticar',message:""});
        }
        else
		if(error.status == 400)
		{
            console.log(400);
            //console.error(error.stack);
			serverPath+="400_page.jpg";
            var data = fs.readFileSync(serverPath);
            var picture = new Buffer(data).toString('base64');
            var imagem="data:image/jpeg;base64,"+ picture;
            response.status(400);
            response.type('text/html');
            return response.render('BadRequest', {imagem:imagem});
		}
		else
        if(error.status == 403)
        {
            console.log(403);
            //console.error(error.stack);

            serverPath+="403_page.jpg";
            var data = fs.readFileSync(serverPath);
            var picture = new Buffer(data).toString('base64');
            var imagem="data:image/jpeg;base64,"+ picture;
            response.status(403);
            response.type('text/html');
            return response.render('Forbidden', {imagem:imagem});
        }
        else
        if(error.status == 404)
        {
            console.log(404);
            //console.error(error.stack);
            serverPath+="404_page.gif";
            var data = fs.readFileSync(serverPath);
            var picture = new Buffer(data).toString('base64');
            var imagem="data:image/jpeg;base64,"+ picture;
            response.status(404);
            response.type('text/html');
            response.render('NotFound', {imagem:imagem});
        }
        else
        {
            console.log('else');
            return next();
        }
    }

    function internalError(error, request, response, next)
    {
        console.error(error.stack);

        response.status(500);
        response.type('text/html');
        response.send(500, '500 - Internal Error!!');
    }

    return {defaultError:defaultError,handlingErrors:handlingErrors,internalError:internalError};
}
