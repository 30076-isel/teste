/**
 * Created by ISEL on 12-06-2014.
 */
var fs = require('fs');
var gravatar = require('gravatar');

module.exports = function(BusinessStandPISEL)
{
    var distritos = BusinessStandPISEL.GetAllDistritos();
    var concelhos = [];
    var marcas = BusinessStandPISEL.GetAllMarcas();
    var modelos = [];
    var combustiveis = BusinessStandPISEL.GetAllCombustiveis();

    function genericGetPage200(response,name,obj)
    {
        response.type('text/html');
        response.status(200);
        response.render(name,obj);
        return;
    }

    function genericRedirectPage(response,status,path)
    {
        response.type('text/html');
        response.status(status);
        response.redirect(path);
    }

    function PaginaAdicionar(request,response)
    {
            genericGetPage200(response,'adicionar',{page:"adicionar",anuncios:[]
                        ,distritos:distritos,concelhos:concelhos,
                        marcas:marcas,modelos:modelos,combustiveis:combustiveis});
    }

    function Paginapesquisar(request,response)
    {
        if(BusinessStandPISEL.isEmpty(request.query))
            searchPage(request,response);
        else
            advancedSearch(request,response);
    }

    var comentarios = [];
    var numeroPaginasComments;
    var anuncio;
    function PaginaDetalhe(request,response,next)
    {
        var id = request.params.id;

        anuncio = BusinessStandPISEL.GetAnuncioDetails(id);
        if(anuncio == undefined)
        {
            var err = new Error();
            err.status = 404;
            next(err);
        }
        else
        {
            var imagens = [];
            var serverPath = "./imagens/Anuncio/"+id;
            fs.readdir(serverPath,function(err,files){
                if (err) console.log(err);
                if(files!= undefined) {
                    files.forEach(function (file) {
                        var data = fs.readFileSync(serverPath + "/" + file);
                        var picture = new Buffer(data).toString('base64');
                        var src = "data:image/jpeg;base64," + picture;
                        imagens.push(src);
                    });
                }
                var page = 1;

                comentarios = BusinessStandPISEL.ComentariosAnuncio(id);

                var totalComentarios = comentarios.length;

                numeroPaginasComments = BusinessStandPISEL.numeroPaginas(comentarios);

                var comentariosSpecific = BusinessStandPISEL.ComentariosDePagina(comentarios,page,numeroPaginasComments);

                var canComment = BusinessStandPISEL.CanComment(anuncio);

                var classificacaoMedia = BusinessStandPISEL.ClassificacaoMedia(id);


                genericGetPage200(response,'Anuncio', {page: "anuncio", anuncio: anuncio,comentarios:comentariosSpecific,
                                            gravatar:gravatar,numeroPaginas:numeroPaginasComments,
                                            pagina:page,totalComentarios:totalComentarios,imagens:imagens,
                                            classificacaoMedia:classificacaoMedia,canComment:canComment});
            });
        }
    }

    function paginationComentarios(request,response)
    {
        var page = request.params.pagina;
        console.log("Comments page: "+page);
        console.log("Comments numeroPaginas: "+numeroPaginasComments);
        var comentariosSpecific = BusinessStandPISEL.ComentariosDePagina(comentarios,page,numeroPaginasComments);
        console.log(comentariosSpecific);
        genericGetPage200(response,'Comentarios',{comentarios:comentariosSpecific,pagina:page,numeroPaginas:numeroPaginasComments,gravatar:gravatar
        ,anuncio:anuncio});
    }

	function comentarGet(request,response)
	{
		var id = request.params.id;
        genericGetPage200(response,'Comentar',{page:'comentar',idAnuncio:id});
	}
	
	function ComentarPost(request,response)
	{
		var comentario = request.body.comentario;
		
		comentario.anuncio = request.params.id;
		comentario.username = request.session.user["id"];
        comentario.email = request.session.user["email"];
		comentario.dataRegisto = new Date();

        var fullUrl = request.protocol + '://' + request.get('host') + "/Anuncio/Detalhe/"+request.params.id;

		BusinessStandPISEL.SaveComentario(comentario,fullUrl);

        genericRedirectPage(response,200,'/Anuncio/Detalhe/'+request.params.id);
	}
	
    function ComentarioDelete(request,response,next)
    {
        var id = request.params.id;

        var comentario = BusinessStandPISEL.GetComentario(id);

        if(comentario == undefined)
        {
            var err = new Error();
            err.status = 404;
            next(err);
        }
        else
        if(comentario.username != request.session.user["id"])
        {
            var err = new Error();
            err.status = 403;
            next(err);
        }
        else
        {
            var status;
            if(comentario == undefined)
                status = 204;
            else
            {
                BusinessStandPISEL.RemoverComentario(id);
                status = 200;
            }
            genericRedirectPage(response,status,'/Anuncio/Detalhe/'+comentario.anuncio);
        }
    }

    function guardarAnuncio(request,response)
    {
        var anuncio = request.body.anuncio;
        anuncio.anunciante = request.session.user["id"];
        var id = request.params.id;
        if(id == undefined)
            BusinessStandPISEL.AddAnuncio(anuncio);
        else {
            anuncio.id = id;
            BusinessStandPISEL.UpdateAnuncio(anuncio);
        }
        if(request.files.anuncio.file.size != 0)
            BusinessStandPISEL.AddImagem(request.files["anuncio"]["file"],anuncio.id);

        genericRedirectPage(response,201,request.originalUrl);
    }

    function editarAnuncio(request,response,next)
    {
        var id = request.params.id;
        var anuncio = BusinessStandPISEL.GetAnuncio(id);
        if(anuncio == undefined )
        {
            var err = new Error();
            err.status = 404;
            next(err);
        }
        else
        if(anuncio.anunciante != request.session.user["id"])
        {
            var err = new Error();
            err.status = 403;
            next(err);
        }
        else
            genericGetPage200(response,'Editar',{page:'editar',anuncio:anuncio
                ,distritos:distritos,concelhos:concelhos,
                marcas:marcas,modelos:modelos,combustiveis:combustiveis});
    }

    function removerAnuncio(request,response,next)
    {
        var id = request.params.id;

        var anuncio = BusinessStandPISEL.GetAnuncio(id);

		if(anuncio!= undefined && anuncio.anunciante != request.session.user["id"])
		{
			var err = new Error();
			err.status = 403;
			next(err);
		}
		else
		{
            var status;
			if(anuncio == undefined)
				status = 204;
			else
            {
				status = 200;
                BusinessStandPISEL.RemoveAnuncio(id);
            }
            genericRedirectPage(response,status,'/Pessoa/Perfil/'+request.session.user["id"]);
		}
    }


    function searchPage(request,response)
    {
        genericGetPage200(response,'pesquisa',{page:'pesquisa',anuncios:[]});
    }

    function classificar(request,response)
    {
        var classi = request.body.classificacao;
        classificacao = new Object();
        classificacao.classificacao = classi;
        classificacao.username = request.session.user["id"];
        var id = request.params.id;
        classificacao.anuncio = id;

        BusinessStandPISEL.Classificar(classificacao);
        var classificacaoMedia = BusinessStandPISEL.ClassificacaoMedia(id);
   
        genericGetPage200(response,'RatingMedia',{classificacaoMedia:classificacaoMedia});
    }

    var anunciosSpecific =  [];
    var numeroPaginas;
    function advancedSearch(request,response)
    {
        var property;
        var value;
        var page;

        for(var prop in request.query)
        {
            if(prop=="type")
                property = request.query[prop].toString();
            else
            if(prop=="value")
                value = request.query[prop]

        }

        anunciosSpecific = BusinessStandPISEL.searchFilter(property,value);
        anunciosSpecific = BusinessStandPISEL.FilterAnunciosbyN(anunciosSpecific);
        numeroPaginas = BusinessStandPISEL.numeroPaginas(anunciosSpecific);

        page = 1;
        var anunciosPerPage = BusinessStandPISEL.AnunciosdePagina(anunciosSpecific,page,numeroPaginas);
        BusinessStandPISEL.ImagensdeAnuncio(anunciosPerPage);
        
        genericGetPage200(response,'Pesquisa',{page:'pesquisa',anuncios:anunciosPerPage,numeroPaginas:numeroPaginas,pagina:page});
    }

    function pagination(request,response)
    {
        var page = request.params.pagina;
        console.log("page: "+page);
        console.log("numeroPaginas: "+numeroPaginas);
        var anunciosPerPage = BusinessStandPISEL.AnunciosdePagina(anunciosSpecific,page,numeroPaginas);

        BusinessStandPISEL.ImagensdeAnuncio(anunciosPerPage);
        genericGetPage200(response,'ResultadoPesquisa',{page:'pesquisa',anuncios:anunciosPerPage,numeroPaginas:numeroPaginas,pagina:page});
    }

    function ModelosGet(request,response)
    {
        var idMarca = request.params.idmarca;
        var modelos = BusinessStandPISEL.GetModelosByMarca(idMarca);
        response.type('apllication/json');
        response.status(200);
        response.send(modelos);
        //genericGetPage200(response,'ResultadoPesquisa',{page:'pesquisa',anuncios:anunciosPerPage,numeroPaginas:numeroPaginas,pagina:page});
    }

    function ConcelhosGet(request,response)
    {
        var idDistrito = request.params.iddistrito;
        console.log(idDistrito);
        var concelhos = BusinessStandPISEL.GetConcelhosByDistrito(idDistrito);
        console.log(concelhos);
        
        response.type('apllication/json');
        response.status(200);
        response.send(concelhos);
        //genericGetPage200(response,'Concelhos',{concelhos:concelhos});
    }
		
	function TerminarAnuncio(request,response)
	{
		var id = request.params.id;
		
		var Anuncio = BusinessStandPISEL.GetAnuncio(id);

        Anuncio.terminado = true;
        Anuncio.validade = new Date();

		BusinessStandPISEL.UpdateAnuncio(Anuncio);

        response.type('apllication/json');
        response.status(200);
        response.send([{}]);
	}
	
    return {adicionarGet:PaginaAdicionar,pesquisar:Paginapesquisar,detalhe:PaginaDetalhe,
            adicionarPost:guardarAnuncio,editar:editarAnuncio,remover:removerAnuncio,
			comentarGet:comentarGet,ComentarPost:ComentarPost,ComentarioDelete:ComentarioDelete,
            Classificar:classificar,Pagination:pagination,ModelosGet:ModelosGet,
            ConcelhosGet:ConcelhosGet,paginationComentarios:paginationComentarios,
			TerminarAnuncio:TerminarAnuncio};
};


