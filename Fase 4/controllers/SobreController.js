/**
 * Created by ISEL on 12-06-2014.
 */

module.exports = function()
{
    function about(request,response){
        response.type('text/html');
        response.status(200);
        response.render('sobre', {page:'sobre'});
    };

    return {sobre: about};
};