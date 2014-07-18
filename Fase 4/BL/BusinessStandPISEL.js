/**
 * Created by ISEL on 12-06-2014.
 */

var RepositoryModule = require('../DAL/Repository');

var data = require("../Database/DefaultData");
var linq = require('linq');
var fs = require('fs');
var util = require('../Util/util');
var pjson = require('./../package.json');

module.exports = function()
{
    var AnuncioRepository = new RepositoryModule();

    var PessoaRepository = new RepositoryModule();

	var ComentarioRepository = new RepositoryModule();

    var ClassificarRepository = new RepositoryModule();
	
    var Distritos = new RepositoryModule();

    var Concelhos = new RepositoryModule();

    var Marcas = new RepositoryModule();

    var Modelos = new RepositoryModule();

    var Combustiveis = new RepositoryModule();

    var defaultData = new data();

    /*LoadDefaultData*/
    (function()
    {

        var pessoas = defaultData.getAllPessoas();
        for(var pessoa in pessoas)
            AddPessoa(pessoas[pessoa]);

        var anuncios = defaultData.getAllAnuncios();

        for(var anuncio in anuncios)
            AddAnuncio(anuncios[anuncio]);

        var marcas = defaultData.getAllMarcas();
        for(var marca in marcas)
            Marcas.Add(marcas[marca]);

        var modelos = defaultData.getAllModelos();
        for(var modelo in modelos)
            Modelos.Add(modelos[modelo]);

        var distritos = defaultData.getAllDistritos();
        for(var distrito in distritos)
            Distritos.Add(distritos[distrito]);

        var concelhos = defaultData.getAllConcelhos();
        for(var concelho in concelhos)
            Concelhos.Add(concelhos[concelho]);

        var combustiveis = defaultData.getAllCombustiveis();
        for(var combustivel in combustiveis)
            Combustiveis.Add(combustiveis[combustivel]);

        var comentarios = defaultData.getAllComentarios();
        for(var coment in comentarios)
            ComentarioRepository.Add(comentarios[coment]);

    })();

    /*Anuncio*/
    function GetAllAnuncio()
    {
        return AnuncioRepository.GetAll();
    }

    function AddAnuncio(anuncio)
    {
        AnuncioRepository.Add(anuncio);
    }

    function GetAnuncio(id)
    {
        var anuncio = AnuncioRepository.GetById(id);

        return anuncio;
    }

    function GetAnuncioDetails(id)
    {
        var anuncio = GetAnuncio(id);

        if(anuncio != undefined) {
            var marca = GetSpecificMarca(anuncio.marca);

            var modelo = GetSpecificModelo(anuncio.modelo);

            var combustivel = GetSpecificCombustivel(anuncio.combustivel);

            var distrito = GetSpecificDistrito(anuncio.distrito);

            var concelho = GetSpecificConcelho(anuncio.concelho);


            anuncio["marcaNome"] = marca!= undefined? marca.nome: "";
            anuncio["modeloNome"] = modelo!= undefined? modelo.nome: "";
            anuncio["combustivelNome"] = combustivel!= undefined? combustivel.nome: "";
            anuncio["distritoNome"] = distrito!= undefined?distrito.nome: "";
            anuncio["concelhoNome"] = distrito!= undefined?concelho.nome:"";
        }
        return anuncio;
    }

    function UpdateAnuncio(anuncio)
    {
        return AnuncioRepository.Update(anuncio);
    }

    function RemoveAnuncio(id)
    {
        return AnuncioRepository.Remove(id);
    }

    /*Imagem*/
    function AddImagem(file,id)
    {
        util.savePicture(file,id);
    }

    function ImagensdeAnuncio(anunciosPessoa)
    {
        anunciosPessoa.forEach(function(anuncio){
            var fileImage;
            try
            {
                fileImage = fs.readFileSync("./Imagens/Anuncio/" + anuncio["id"] + "/1.jpg");
            }
            catch(e)
            {
                fileImage = fs.readFileSync("./Imagens/Erros/404.jpg");
            }
            var picture = new Buffer(fileImage).toString('base64');

            anuncio["imagem"] = "data:image/jpeg;base64," + picture;
        });
    }

    /*Comentario*/
	function GetComentariosAnuncio(id)
	{
		var comentarios = ComentarioRepository.GetAll();
		
		var comentariosAnuncio = linq.from(comentarios).where("t=>t.anuncio=='"+id+"'").toArray();
		
		return comentariosAnuncio;
	}
	var json = require('./../package.json');
	function ComentarAnuncio(comentario,fullUrl)
	{
		ComentarioRepository.Add(comentario);
        var anuncio = AnuncioRepository.GetById(comentario.anuncio);
        var pessoa = PessoaRepository.GetById(anuncio.anunciante);
        console.log(json);
        return util.sendEmail(comentario.email,pessoa.email,anuncio,comentario,fullUrl);
	}
	
    function GetComentario(id)
    {
        return ComentarioRepository.GetById(id);
    }

	function ComentariosDePagina(comentarios, pagina, NumOfElements)
    {
        return util.pagination(comentarios, pagina, NumOfElements);
	}

    function FilterAnuncios(anuncios)
    {
        var today = new Date();
        var todaySubbN = new Date();
        var N = pjson.configuration.N;
        todaySubbN.subbDays(N);

        var anunciosFiltered = linq
            .from(anuncios)
            .where("t=>t.terminado == true")
            .where("t=>t.validade.toDateString()>='"+todaySubbN.toDateString()+"'")
            .toArray();

        var anunciosFinal = linq
        .from(anuncios)
        .where("t=>t.validade.toDateString()>='"+today.toDateString()+"'")
        .except(anunciosFiltered)
        .toArray();

        return anunciosFinal;
    }

    function CanComment(anuncio)
    {
        var todaySubbN = new Date();
        var N = pjson.configuration.N;
        todaySubbN.subbDays(N);
        return anuncio.validade.toDateString()<=todaySubbN.toDateString();
    }

    function RemoverComentario(id)
    {
        return ComentarioRepository.Remove(id);
    }

    /*Classificar*/
    function Classificar(classificacao)
    {
        var classific =
        linq.from(ClassificarRepository.GetAll()).where("t=>t.anuncio=='"+classificacao.anuncio+"'")
            .where("t=>t.username=='"+classificacao.username+"'").toArray();
            console.log(classificacao);
        if(classific.length == 0)
            ClassificarRepository.Add(classificacao);
        else {
            classificacao.id = classific[0].id
            ClassificarRepository.Update(classificacao);
        }
    }

    function ClassificacaoMedia(idAnuncio)
    {
        var classificacaoAnuncio=linq.from(ClassificarRepository.GetAll()).where("t=>t.anuncio=='"+idAnuncio+"'").toArray();
        var media = 0;
        classificacaoAnuncio.forEach(function(elem){
            if(elem!=undefined)
                media+=parseInt(elem.classificacao);
        });

        media = media!=0?media/classificacaoAnuncio.length:0;
        return media;
    }

    /*DefaultData*/
    function GetAllDistritos()
    {
        return Distritos.GetAll();
    }

    function GetSpecificDistrito(id)
    {
        return Distritos.GetById(id);
    }

    function GetAllConcelhos()
    {
        return Concelhos.GetAll();
    }

    function GetSpecificConcelho(id)
    {
        return Concelhos.GetById(id);
    }

    function GetConcelhosByDistrito(idDistrito)
    {
        if(idDistrito == 0 ) return [];
        var concelhos = GetAllConcelhos();
        var distrito = [GetSpecificDistrito(idDistrito)];
        var ConcelhosFiltered = linq
                    .from(concelhos)
                    .join(linq.from(distrito),"$.idDistrito","$.id")
                    .toArray();
        return ConcelhosFiltered;
    }

    function GetAllMarcas()
    {
        return Marcas.GetAll();
    }

    function GetSpecificMarca(id)
    {
        return Marcas.GetById(id);
    }

    function GetAllModelos()
    {
        return Modelos.GetAll();
    }

    function GetSpecificModelo(id)
    {
        return Modelos.GetById(id);
    }

    function GetModelosByMarca(idMarca)
    {
        if(idMarca == 0 ) return [];
        var modelos = GetAllModelos();
        var marcas = [GetSpecificMarca(idMarca)];
        var marcasFiltered = linq
                    .from(modelos)
                    .join(linq
                    .from(marcas),"$.idMarca","$.id")
                    .toArray();
        return marcasFiltered;
    }

    function GetAllCombustiveis()
    {
        return Combustiveis.GetAll();
    }

    function GetSpecificCombustivel(id)
    {
        return Combustiveis.GetById(id);
    }

	/*Pessoa*/
    function GetAllPessoa()
    {
        return PessoaRepository.GetAll();
    }

    function GetPessoa(id)
    {
        var pessoa = PessoaRepository.GetById(id);
        return pessoa;
    }
	
	function GetPessoaAnuncios(id)
	{
        var anunciosPessoa = linq.from(GetAllAnuncio()).where("t=>t.anunciante=='"+id+"'");
		return anunciosPessoa.toArray();
	}
	
    function AddPessoa(pessoa)
    {
        var pessoaExists = GetPessoa(pessoa.id);
        if(pessoaExists != undefined)
            return false;
        pessoa.dataRegisto = new Date();
        var sucesso = PessoaRepository.Add(pessoa);
        return RegisterReturnMessage(sucesso);
    }

    function RegisterReturnMessage(success)
    {
        if (success)
            return "Utilizador inserido com Sucesso";
        return "O Utilizador já existe";
    }

    function numeroPaginas(anuncios)
    {
        return util.numerodePaginas(anuncios);
    }

    function AnunciosdePagina(anuncios, pagina, NumOfElements)
    {
        return util.pagination(anuncios, pagina, NumOfElements);
    }

    function Login(email,password)
    {
        var pessoas = PessoaRepository.GetAll();
        var result = linq.from(pessoas).where("t=>t.email=='"+ email+"'").where("t=>t.password=='"+ password+"'");
        return result.toArray()[0];
    }

    /*Pesquisa*/
    function searchFilter(property,value)
    {
        var anunciosAll = GetAllAnuncio();
        var anunciosFiltered;
        if (value instanceof Array)
            anunciosFiltered = searchByArrayType(anunciosAll,property,value);
        else
            if(functions[property] !==undefined && 
                typeof functions[property].searchByType === 'function')
            {
                var elems = functions[property][property]();
                anunciosFiltered = functions[property].searchByType(anunciosAll,property,value,elems);
            }
            else
                anunciosFiltered =  searchByNormalMethod(anunciosAll,property,value);
        return anunciosFiltered;
    }

    function searchByArrayType(anuncios,property,value)
    {
        var anunciosFiltered =  linq
                            .from(anuncios)
                            .where("t=>t."+property+">="+value[0])
                            .where("t=>t."+property+"<="+value[1])
                            .toArray();

        return anunciosFiltered;
    }

    function searchByNormalMethod(anuncios,property,value)
    {
        var anunciosFiltered =  linq
                                .from(anuncios)
                                .where("t=>t."+property+"=='"+value+"'")
                                .toArray();
        return anunciosFiltered;
    }

    function searchByType(anuncios,property,value,other)
    {
        var marcasFiltered = linq
                    .from(anuncios)
                    .join(linq
                            .from(other),"$."+property,"$.id",function(a,b){
                                    var obj = new Object();
                                    for(var i in a)
                                        obj[i] = a[i];

                                    obj["nome"] = b["nome"];
                                    return obj;
                                }
                            )
                    .where("o=>o.nome=='"+value+"'");
    
        return marcasFiltered.toArray();
    }

    var functions = {};
    functions["marca"] = {searchByType:searchByType,marca:GetAllMarcas};
    functions["modelo"] = {searchByType:searchByType,modelo: GetAllModelos};
    functions["combustivel"] = {searchByType:searchByType,combustivel:GetAllCombustiveis};
    functions["localizacao"] = {searchByType:searchByType,localizacao:GetAllDistritos};
    

    function isEmpty(obj)
    {
        return util.isEmpty(obj);
    }


    return {
            GetAllAnuncio:GetAllAnuncio,
            AddAnuncio:AddAnuncio,
            GetAnuncio:GetAnuncio,
            RemoveAnuncio:RemoveAnuncio,
            UpdateAnuncio:UpdateAnuncio,
			SaveComentario:ComentarAnuncio,
			ComentariosAnuncio:GetComentariosAnuncio,
            GetComentario:GetComentario,
            RemoverComentario:RemoverComentario,
            GetAllPessoa:GetAllPessoa,
            GetPessoa:GetPessoa,
            AddPessoa:AddPessoa,
            GetAllDistritos:GetAllDistritos,
            GetAllConcelhos:GetAllConcelhos,
            GetAllMarcas:GetAllMarcas,
            GetAllModelos:GetAllModelos,
            GetAllCombustiveis:GetAllCombustiveis,
            Login:Login,
            numeroPaginas:numeroPaginas,
            AnunciosdePagina:AnunciosdePagina,
            GetPessoaAnuncios:GetPessoaAnuncios,
			ComentariosDePagina:ComentariosDePagina,
            AddImagem:AddImagem,
            Classificar:Classificar,
            ClassificacaoMedia:ClassificacaoMedia,
            searchFilter:searchFilter,
            ImagensdeAnuncio:ImagensdeAnuncio,
            isEmpty:isEmpty,
            GetAnuncioDetails:GetAnuncioDetails,
            GetConcelhosByDistrito:GetConcelhosByDistrito,
            GetModelosByMarca:GetModelosByMarca,
            FilterAnunciosbyN:FilterAnuncios,
            CanComment:CanComment
    };
};

