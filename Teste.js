/**
 * Created by ISEL on 12-06-2014.
 */
/*
var BusinessStandPISELModule = require("./BL/BusinessStandPISEL");

var BusinessStandPISEL = BusinessStandPISELModule();
BusinessStandPISEL.AddAnuncio({nome:"Paulo"});

var anuncio = BusinessStandPISEL.GetAnuncio(1);

var pessoas = BusinessStandPISEL.GetAllPessoa();

console.log(pessoas);
console.log(BusinessStandPISEL.GetAllAnuncio());
*/
/*
var Pessoa = require("./AL/Pessoa");
var paulo = new Pessoa("PC","Paulo","Coelho","p@c.pt","12");
var ines = new Pessoa("IF","Ines","Fernandes","i@f.pt","12");
var rafael = new Pessoa("RF","Rafael","Fernandes","r@f.pt","12")
console.log(paulo);*/
//var x = new pessoa();
/*
var data = require("./Database/DefaultData");

var xpto = new data();
console.log(xpto.getAllPessoas());

var defaultData = new data();
var pessoas = defaultData.getAllPessoas();
for(var pessoa in pessoas)
{
    console.log(pessoas[pessoa]);
}*/
/*
var express = require('express');
var app = express();

// Authenticator
var auth = require('simple-auth');

app.get('/home', function(req, res) {
    res.send('Hello World');
});

app.listen(process.env.PORT || 8080);

console.log('Server Running on http://127.0.0.1:8080');*/
/*
var Enumerable = require('linq');

var jsonArray = [
    { "user": { "id": 100, "screen_name": "d_linq" }, "text": "to objects" },
    { "user": { "id": 130, "screen_name": "c_bill" }, "text": "g" },
    { "user": { "id": 155, "screen_name": "b_mskk" }, "text": "kabushiki kaisha" },
    { "user": { "id": 301, "screen_name": "a_xbox" }, "text": "halo reach" }
]
// ["b_mskk:kabushiki kaisha", "c_bill:g", "d_linq:to objects"]
var queryResult = Enumerable.from(jsonArray).where("t=>t.user.id>=100").where("t=>t.user.id<=155").toArray();
console.log(queryResult);*/
var data = require("./Database/DefaultData");
var linq = require('linq');
var defaultData = new data();
var RepositoryModule = require('./DAL/Repository');
/*var pessoas = defaultData.getAllPessoas();
var marcas = defaultData.getAllMarcas();
var anuncios = defaultData.getAllAnuncios();
*/
var Distritos = new RepositoryModule();

var Concelhos = new RepositoryModule();

var distritos = defaultData.getAllDistritos();
        for(var distrito in distritos)
            Distritos.Add(distritos[distrito]);

        var concelhos = defaultData.getAllConcelhos();
        for(var concelho in concelhos)
            Concelhos.Add(concelhos[concelho]);
var dist = [Distritos.GetById(1)];
var conc = Concelhos.GetAll();

var AnuncioRepository = new RepositoryModule();

var anunciosD = defaultData.getAllAnuncios();
for(var a in anunciosD)
    AnuncioRepository.Add(anunciosD[a]);

Date.prototype.subbDays = function(days)
{
    this.setDate(this.getDate()-days);
}

var anuncios = AnuncioRepository.GetAll();

var today = new Date();
var todaySubbN = new Date();
var N = 5;
todaySubbN.subbDays(N);

var anunciosFiltered = linq
    .from(anuncios)
    .where("t=>t.terminado == true")
    .where("t=>t.validade.toDateString()>='"+todaySubbN.toDateString()+"'")

    .toArray();


console.log(anunciosFiltered);
var anunciosValid = linq
    .from(anuncios)
    .where("t=>t.validade.toDateString()>='"+today.toDateString()+"'")
    .except(anunciosFiltered)
    .toArray();

console.log(anunciosValid);
//.where("t=>t.terminado == true and t.validade<="+todayPlusN)
//.toArray();



/*

var xpto = linq
            .from(conc)
    .where("t=>t.id==1")
    ;

var xpto2 =  linq
    .from(conc)
    .where("t=>t.id=="+1)
    .union(xpto)
    .toArray();
console.log(xpto2);
//console.log(dist);
//console.log(conc);
/*var marcasFiltered = linq
                    .from(conc)
                    .join(linq.from(dist),"$.idDistrito","$.id")
                    .toArray();

                    //console.log(marcasFiltered);
var ComentarioRepository = new RepositoryModule();

var comentarios = defaultData.getAllComentarios();
for(var coment in comentarios)
    ComentarioRepository.Add(comentarios[coment]);

console.log(comentarios);*/
/*console.log(marcas);
var joins = linq
            .from(anuncios)
            .join(linq
                    .from(marcas),"$.marca","$.id",function(a,b){

    var obj = new Object();

    for(var i in a)
        obj[i] = a[i];

    obj["nome"] = b["nome"];

    return obj;
}).where("o=>o.nome =='Honda'");*/
/*
var joinsPessoa = linq.from(joins.toArray()).join(linq.from(pessoas),"","",function(a,b)
{

});*/
//console.log(joins.toArray());

/*			
	var queryResult = Enumerable.from(pessoas).where("t=>t.id=='PC'");//.where("t=>t.user.id>=100").where("t=>t.user.id<=155").toArray();
console.log(queryResult.toArray()[0])*/
/*
    .Where(function (x) { return x.user.id < 200 })
    .OrderBy(function (x) { return x.user.screen_name })
    .Select(function (x) { return x.user.screen_name + ':' + x.text })
    .ToArray();
// shortcut! string lambda selector
var queryResult2 = Enumerable.From(jsonArray)
    .Where("$.user.id < 200")
    .OrderBy("$.user.screen_name")
    .Select("$.user.screen_name + ':' + $.text")
    .ToArray();*/

/*
var fs = require('fs');
var serverPath = "./imagens/Anuncio/5";
var mkdirp = require("mkdirp");

mkdirp(serverPath,function(err){
    if(err)
        console.log(err);
    else
        console.log("Path Created");
});
    fs.rename("C:/Users/ISEL/Documents/GitHub/1314v-LI51N-G22/Fase 3/imagens/ISEL.jpg",serverPath+"/1.jpg",function(error) {
        if(error)
            console.log(error);
        else
            console.log("file Written Successfully");
    }
);
console.log(fs.readdirSync(serverPath).length);*/


//console.log(process.env);


var pjson = require('./package.json');

console.log(pjson.configuration.email);