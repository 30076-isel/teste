/**
 * Created by ISEL on 13-06-2014.
 */

function init(app,checkAuth,PessoaController) {
    app.get('/Pessoa/Autenticar',PessoaController.PaginaAutenticacao);
    app.post('/Pessoa/Autenticar',PessoaController.Autenticar);
    app.get('/Pessoa/Registar',PessoaController.PaginaRegistar);
    app.post('/Pessoa/Registar',PessoaController.Registar);
	app.get('/Pessoa/Perfil/Pagina/:pagina',PessoaController.Pagination);
    app.get('/Pessoa/Perfil/:id',checkAuth,PessoaController.PaginaPerfil);
    app.post('/Pessoa/Sair',PessoaController.Sair)
}

exports.init = init;