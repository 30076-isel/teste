/**
 * Created by ISEL on 12-06-2014.
 */

function init(app,SobreController)
{
    app.get('/Sobre',SobreController.sobre);
}

exports.init = init;