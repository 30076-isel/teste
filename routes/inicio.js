/**
 * Created by ISEL on 12-06-2014.
 */

function init(app,InicioController) {
    app.get(/^\/$|\/Inicio\/?$/,InicioController.inicio);
}

exports.init = init;