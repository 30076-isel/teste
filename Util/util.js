/**
 * Created by ISEL on 17-06-2014.
 */

var mkdirp = require("mkdirp");
var fs = require('fs');
var pjson = require('./../package.json');
var nodemailer = require("nodemailer");

const numElementsPagina = 4;
function numerodePaginas(Anuncios)
{
    for (var i = 1; ; ++i)
    {
        if (Anuncios.length <= (numElementsPagina * i))
            return i;
    }
}

function pagination(anuncios, pagina, NumOfElements)
{
    var count = 0;
    var min = numElementsPagina * pagina - numElementsPagina;
    var max = numElementsPagina * pagina - 1;
    var elems = [];
    var index = 0;
    for(var elem in anuncios)
    {
        if (count > max) break;
        if (count >= min && count <= max)
            elems[index++] = anuncios[elem];
        count++;
    }

    return elems;
}

function savePicture(file,propertyId)
{
    var serverPath = "./imagens/Anuncio/"+propertyId;


    var extension = getExtension(file.name);

    mkdirp(serverPath,function(err){
        if(err)
            console.log(err);
        else
        {
            if(file.size>0) {
                var name = fs.readdirSync(serverPath).length + 1;
                serverPath += "/" + name + extension;
                fs.rename(file.path, serverPath, function (error) {
                    if (error)
                        console.log(error);
                    else
                        console.log("file Written Successfully");
                });
            }
        }
    });
}

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

function isEmpty(obj)
{
    for(var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

function SendEmail(from,to,anuncio,comentario,fullUrl)
{
    console.log(pjson.configuration.email);
    var smtpTransport = nodemailer.createTransport("SMTP",pjson.configuration.email);

    var html = "" +
        "<html>" +
            "<head>" +
                "<title>Coment&#225;rio</title>" +
                "<link href='/css/StandPISEL.css' rel='stylesheet'>"+
            "</head>" +
            "<body>" +
                "<div class='jumbotron'>"+
                    "<div class='container'>"+
                        "<h1>Coment&#225;rio</h1>"+
                    "</div>"+
                "</div>"+
                "<div class='container'>"+
                    "<h2>Coment&#225;rio ao Anuncio com o Id: <a href="+fullUrl+">"+anuncio.id+"</a></h2>" +
                    "<h3>T&#237;tulo:</h3>" +
                    "<p>"+anuncio.titulo+"</p>"+
                    "<h3>Coment&#225;rio:</h3>"+
                    "<p>"+comentario.texto+"</p>"+
                    "imagem: <img src="+anuncio.imagem+">"+
                "</div>"+
            "</body>" +
        "</html>";

    smtpTransport.sendMail({
        from: comentario.username+"<"+from+">", // sender address
        to: anuncio.anunciante+"<"+to+">", // comma separated list of receivers
        subject: "Comentario Novo ✔", // Subject line
        html: html
    }, function(error, response){
        if(error)
        {
            console.log(error);
            return false;
        }
        else
        {
            console.log("Message sent: " + response.message);
            return true;
        }
    });
}

exports.numerodePaginas = numerodePaginas;

exports.pagination = pagination;

exports.savePicture = savePicture;

exports.isEmpty = isEmpty;

exports.sendEmail = SendEmail;