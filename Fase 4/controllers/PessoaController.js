/**
 * Created by ISEL on 12-06-2014.
 */

var gravatar = require('gravatar');

module.exports = function(BusinessStandPISEL)
{
    function genericGetPage200(response,name,obj)
    {
        response.type('text/html');
        response.status(200);
        response.render(name,obj);
        return;
    }

    function PaginaRegistar(request,response)
    {
        genericGetPage200(response,'Registar',{page:"registar",message:""});
    }

    var anunciosPessoa = [];
    var pessoa;
    var numeroPaginas;
    function PaginaPerfil(request,response,next)
    {
        var id = request.id;
        var page = 1;

		pessoa = BusinessStandPISEL.GetPessoa(id);

        if(pessoa == undefined)
        {
            var err = new Error();
            err.status = 404;
            next(err);
        }
        else
        {
            anunciosPessoa = BusinessStandPISEL.GetPessoaAnuncios(id);
            numeroPaginas = BusinessStandPISEL.numeroPaginas(anunciosPessoa);

            anunciosPerPage = BusinessStandPISEL.AnunciosdePagina(anunciosPessoa, page, numeroPaginas);
            BusinessStandPISEL.ImagensdeAnuncio(anunciosPerPage);

            genericGetPage200(response, 'Perfil', {page: "perfil", pessoa: pessoa, anuncios: anunciosPerPage,
                gravatar: gravatar, pagina: page, numeroPaginas: numeroPaginas});
        }
    }

    function pagination(request,response)
    {
        var page = request.params.pagina;
        anunciosPerPage = BusinessStandPISEL.AnunciosdePagina(anunciosPessoa,page,numeroPaginas);

        BusinessStandPISEL.ImagensdeAnuncio(anunciosPerPage);
        genericGetPage200(response,'ResultadoPesquisa',{page: "perfil", pessoa: pessoa, 
            anuncios: anunciosPerPage, gravatar: gravatar, pagina: page, 
            numeroPaginas: numeroPaginas});
    }

    function PaginaAutenticacao(request,response)
    {
        genericGetPage200(response,'Autenticar',{page:"autenticar",message:""});
    }

    function Autenticar(request,response)
    {
        var id = request.params.id;

        var pessoa = BusinessStandPISEL.Login(request.body.pessoa.email,request.body.pessoa.password);

        if(pessoa != undefined)
		{
            request.session.user = { id: pessoa["id"],email: pessoa["email"] };
            response.type('text/html');
            response.status(200);
            var redirectUri = (!request.session.pre_url || request.originalUrl == request.session.pre_url)?
                        "/Inicio":request.session.pre_url;
            response.redirect(redirectUri);
        }
		else
		{
            genericGetPage200(response,'Autenticar',{page:"autenticar",message:"Email\\Password inv&#225;lido"});
		}
    }

    function Sair(request,response)
    {
        request.session.user = undefined;
        request.session.pre_url = undefined;
        response.type('text/html');
        response.status(200);
        response.redirect('/Pessoa/Autenticar');
    }

    function Registar(request,response)
    {
        var pessoa = request.body.pessoa;
        var mensagem = BusinessStandPISEL.AddPessoa(pessoa);
        response.type('text/html');
        response.status(201);
        response.render('Registar',{page:"registar",message:mensagem});
    }

    return {
        PaginaRegistar:PaginaRegistar,
        PaginaPerfil:PaginaPerfil,
        Pagination:pagination,
        PaginaAutenticacao:PaginaAutenticacao,
        Autenticar:Autenticar,
        Registar:Registar,
        Sair:Sair
    };
};