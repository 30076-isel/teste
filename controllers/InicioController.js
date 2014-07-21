/**
 * Created by ISEL on 12-06-2014.
 */
var fs = require('fs');

module.exports = function()
{
    function inicio(request,response){

        fs.readFile("./Imagens/Inicio/Porsche.jpg", function(err, data)
        {
            if(err)
            {
                console.log(err);
                return;
            }
            var picture = new Buffer(data).toString('base64');
            var src="data:image/jpeg;base64,"+ picture;

            response.type('text/html');
            response.status(200);
            response.render('Inicio', {page:'inicio',image:src});
        }
        );
    };

    return {inicio: inicio};
};