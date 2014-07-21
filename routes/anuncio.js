    /**
 * Created by ISEL on 12-06-2014.
 */
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

function init(app,checkAuth,AnuncioController) {
    app.get('/Anuncio/Adicionar',checkAuth,AnuncioController.adicionarGet);
    app.post('/Anuncio/Adicionar',multipartMiddleware,AnuncioController.adicionarPost);
    app.get('/Anuncio/Editar/:id',checkAuth,AnuncioController.editar);
    app.post('/Anuncio/Editar/:id',multipartMiddleware,AnuncioController.adicionarPost);
    app.post('/Anuncio/Remover/:id',checkAuth,AnuncioController.remover);
    app.get('/Anuncio/Detalhe/:id',AnuncioController.detalhe);
    app.get('/Anuncio/Comentar/:id',checkAuth,AnuncioController.comentarGet);
    app.post('/Anuncio/Comentar/:id',checkAuth,AnuncioController.ComentarPost);
    app.post('/Anuncio/Comentar/Remover/:id',checkAuth,AnuncioController.ComentarioDelete);
    app.get('/Anuncio/Pesquisa',AnuncioController.pesquisar);
    app.post('/Anuncio/Terminar/:id',checkAuth,AnuncioController.TerminarAnuncio);


    app.post('/Anuncio/Detalhe/:id/Classificar',checkAuth,AnuncioController.Classificar);
    app.get('/Anuncio/Pesquisa/Pagina/:pagina',AnuncioController.Pagination);
    app.get('/Anuncio/Detalhe/Pagina/:pagina',AnuncioController.paginationComentarios);
    app.get("/Anuncio/Adicionar/Modelos/:idmarca",AnuncioController.ModelosGet);
    app.get("/Anuncio/Adicionar/Concelhos/:iddistrito",AnuncioController.ConcelhosGet);
}

exports.init = init;