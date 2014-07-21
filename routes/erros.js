/**
 * Created by ISEL on 28-06-2014.
 */

function init(app,ErrosController) {
    app.get('*',ErrosController.defaultError);
    app.use(ErrosController.handlingErrors);
    app.use(ErrosController.internalError);
}

exports.init = init;
