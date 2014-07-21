/**
 * Created by ISEL on 14-06-2014.
 */

var Pessoa = require("../AL/Pessoa");
var Anuncio = require("../AL/Anuncio");
var Marca = require("../AL/Marca");
var Modelo = require("../AL/Modelo");
var Distrito = require("../AL/Distrito");
var Concelho = require("../AL/Concelho");
var Combustivel = require("../AL/Combustivel");
var Comentario = require("../AL/Comentario");

module.exports = function createInitialData()
{
    var pessoas = [];
    var paulo = new Pessoa("PC","Paulo","Coelho","pdpcoelho@gmail.com","12");
    var ines = new Pessoa("IF","Ines","Fernandes","30076@alunos.isel.ipl.pt","12");
    var rafael = new Pessoa("RF","Rafael","Fernandes","30076@alunos.isel.pt","12")

    pessoas.push(paulo);
    pessoas.push(ines);
    pessoas.push(rafael);

    function getAllPessoas()
    {
        return pessoas;
    }


    var anuncios = [];

    var anuncio1 = new Anuncio(1,"Carro de PI",4/*"ISEL"*/,7/*"PI"*/,1,2013,15000,1/*"Diesel"*/,1/*"Lisboa"*/,2/*"Mafra"*/,"PC",1500,"Não",new Date('2014-07-05'),false);

    var anuncio2 = new Anuncio(2,"Carro de PI2",1/*"Honda"*/,2/*"Accord"*/,3,2014,20000,1/*"Diesel"*/,1/*"Lisboa"*/,3/*"Loures"*/,"PC",700,"Sim",new Date('2014-07-8'),true);

    var anuncio3 = new Anuncio(3,"Carro de PI3",1/*"Honda"*/,1/*"Civic"*/,3,2014,20000,1/*"Diesel"*/,2/*"Porto"*/,1/*"Amarante"*/,"PC",7000,"Sim",new Date('2014-07-13'),false);

    var anuncio4 = new Anuncio(4,"Carro de PI4",3/*"Opel"*/,5/*"Corsa"*/,3,2014,20000,2/*"Gasolina"*/,3/*"Faro"*/,2/*"Portimão"*/,"PC",800,"Sim",new Date('2014-07-14'),false);

    var anuncio5 = new Anuncio(5,"Carro de PI5",2/*"Renault"*/,3/*"Megane"*/,3,2014,20000,3/*"GPL"*/,3/*"Faro"*/,1/*"Albufeira"*/,"PC",1500,"Não",new Date('2014-07-15'),false);


    anuncios.push(anuncio1);
    anuncios.push(anuncio2);
    anuncios.push(anuncio3);
    anuncios.push(anuncio4);
    anuncios.push(anuncio5);

    function getAllAnuncios()
    {
        return anuncios;
    }
	
	var comentarios = [];
	var comentario1 = new Comentario(1,1,"IF","30076@alunos.isel.ipl.pt","teste","slb");
	var comentario2 = new Comentario(2,1,"IF","30076@alunos.isel.ipl.pt","slb","glorioso");
	var comentario3 = new Comentario(3,1,"RF","30076@alunos.isel.pt","33","33");
	var comentario4 = new Comentario(4,1,"RF","30076@alunos.isel.pt","teste2","slbGlorioso");
	var comentario5 = new Comentario(5,1,"IF","30076@alunos.isel.ipl.pt","teste3","souBenfica");
	var comentario6 = new Comentario(6,1,"RF","30076@alunos.isel.pt","teste4","bom anuncio");
				
    comentarios.push(comentario1);
    comentarios.push(comentario2);
    comentarios.push(comentario3);
    comentarios.push(comentario4);
    comentarios.push(comentario5);
    comentarios.push(comentario6);

	function getAllComentarios()
	{
		return comentarios;
	}
	
    var marcas = [];
    var honda = new Marca(1,"Honda");
    var renault = new Marca(2,"Renault");
    var opel = new Marca(3,"Opel");
    var isel = new Marca(4,"ISEL");

    marcas.push(honda);
    marcas.push(renault);
    marcas.push(opel);
    marcas.push(isel);

    function getAllMarcas()
    {
        return marcas;
    }

    var modelos = [];

    var civic = new Modelo(1,"Civic",1);
    var accord = new Modelo(2,"Accord",1);
    var megane = new Modelo(3,"Megane",2);
    var twingo = new Modelo(4,"Twingo",2)
    var corsa = new Modelo(5,"Corsa",3)
    var astra = new Modelo(6,"Astra",3);
    var pi = new Modelo(7,"PI",4);

    modelos = [civic,accord,megane,twingo,corsa,astra,pi];

    function getAllModelos()
    {
        return modelos;
    }

    var distritos = [];

    var lisboa = new Distrito(1,"Lisboa");
    var porto = new Distrito(2,"Porto");
    var faro = new Distrito(3,"Faro");

    distritos.push(lisboa);
    distritos.push(porto);
    distritos.push(faro);

    function getAllDistritos()
    {
        return distritos;
    }

    var concelhos = [];

    var lisboa2 = new Concelho(1,"Lisboa",1);
    var mafra = new Concelho(2,"Mafra",1);
    var loures = new Concelho(3,"Loures",1);

    var amarante = new Concelho(1,"Amarante",2);
    var gondomar = new Concelho(2,"Gondomar",2);

    var albufeita = new Concelho(1,"Albufeira",3);
    var portimao = new Concelho(2,"Portimão",3);

    concelhos = [lisboa2,mafra,loures,amarante,gondomar,albufeita,portimao];

    function getAllConcelhos()
    {
        return concelhos;
    }

    var diesel = new Combustivel(1,'Diesel');
    var gasolina = new Combustivel(2,'Gasolina');
    var gpl = new Combustivel(3,'GPL');

    var combustiveis = [diesel,gasolina,gpl];

    function getAllCombustiveis()
    {
        return combustiveis;
    }

    console.log("Default Data created!");

    return {
        getAllPessoas:getAllPessoas,
        getAllAnuncios:getAllAnuncios,
        getAllMarcas:getAllMarcas,
        getAllModelos:getAllModelos,
        getAllDistritos:getAllDistritos,
        getAllConcelhos:getAllConcelhos,
        getAllCombustiveis:getAllCombustiveis,
		getAllComentarios:getAllComentarios
    };
}

