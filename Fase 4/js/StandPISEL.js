/**
 * Created by ISEL on 14-06-2014.
 */
$(document).ready(function(){
    $('#BoxDataValidade').datepicker({dateFormat: 'dd-mm-yy'});
    $("#BoxDataValidade").keypress(function(event){event.preventDefault();});
    $('#page_effect').fadeIn(1000);
    //$('.glyphicon-warning-sign').blink();
});

window.onload = loadFeatures();

function loadFeatures()
{
    //http://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/
    console.log(window.location.pathname);
    var urlArray = window.location.pathname.split("/");
    console.log(urlArray[1]);
    clearAndDisableInput();
    StarsEvents();
    addAnchorListener();
    loadDependencies();

    /*var waningblick = document.getElementsByClassName("glyphicon-warning-sign");
     for(var i = 0;i<waningblick.length;++i)
     {
     setInterval(function(){waningblick[i].visible = waningblick.visible?false:true;},3000);
     }
     console.log(waningblick);
     console.log("aqui");*/
    var btnTerminar = document.getElementById("btnTerminar");
    console.log(btnTerminar);
    btnTerminar.addEventListener("click",function()
    {
        console.log(this.name);
        AjaxTerminate(this.name);
    });

}


function AjaxTerminate(anuncio)
{

    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            console.log('aqui!!!!!!');
            alert("Aqui");
        }
    }

    var urlArray = window.location.pathname.split("/");

    xmlhttp.open("POST","/Anuncio/Terminar/"+anuncio,true);
    xmlhttp.send();
}

/*Rating Stars*/
function StarsEvents()
{
    StarsOver();
    StarsClick();
}

function StarsOver()
{
    var stars = document.getElementsByName("rateStar");
    for(var i = 0;i< stars.length;++i)
    {
        stars[i].addEventListener("mouseover",function(){
            var found = false;
            for(var j=0;j<stars.length;++j)
            {
                if(!found)
                    document.getElementsByName("rateStar")[j].className="glyphicon glyphicon-star";
                else
                    document.getElementsByName("rateStar")[j].className="glyphicon glyphicon-star-empty";

                if(stars[j] === this)
                    found = true;
            }
        });
    }
}

function StarsClick()
{
    var stars = document.getElementsByName("rateStar");

    for(var i = 0;i< stars.length;++i)
    {
        stars[i].setAttribute("index",(i+1).toString());
        stars[i].addEventListener("click",function(){
            AjaxRating(this.getAttribute("index"));
        });
    }
}

/*Search radio enable disable*/
function clearAndDisableInput()
{
    try
    {
        var inputs = document.getElementById('AdvSearchForm').getElementsByTagName('input');
        var disabled = false;
        for(var i = 0 ;i< inputs.length;++i)
        {
            if(inputs[i].type === "radio")
            {
                addListener(inputs,i,disabled);

                disabled = true;
                if(inputs[i].checked)
                    disabled = false;
            }
            else
            {
                inputs[i].disabled =disabled;
                inputs[i].value="";
            }
        }
        return 0;
    }
    catch(err)
    {
        console.log(err);
        return -1;
    }
}

function addListener(inputs,i,disabled){
    inputs[i].addEventListener("click",function()
    {
        enableDisableTextInputRecursive(inputs,this,0,inputs.length,disabled);
    });
}

function enableDisableTextInputRecursive(InputTags,current,index,size,disable)
{
    if(index == size)
        return;
    if(InputTags[index].type == "radio")
    {

        disable = InputTags[index] !== current;
        enableDisableTextInputRecursive(InputTags,current,index+1,size,disable);
    }
    else
    {
        InputTags[index].disabled =disable;
        InputTags[index].value="";
        enableDisableTextInputRecursive(InputTags,current,index+1,size,disable);
    }
}


/*Page Details*/

function getAnuncioId()
{
    var urlArray = window.location.pathname.split("/");
    console.log(urlArray);
    return urlArray[urlArray.length-1];
}

function addAnchorListener()
{
    try
    {
        var anchors = document.getElementById("pager").getElementsByTagName("a");
        console.log("addAnchorListener");
        for(var i= 0;i<anchors.length;++i)
        {
            anchors[i].addEventListener("click",function(event){
                event.preventDefault();
                console.log(this.name);
                AjaxPagination(this.name);
            },false);
        }
    }
    catch(err)
    {
        console.log(err);
        return -1;
    }
}

function addPaginationAnchorListener()
{
    try
    {
        var anchors = document.getElementById("pager").getElementsByTagName("a");
        console.log(document.getElementById("pager"));
        for(var i= 0;i<anchors.length;++i)
        {
            anchors[i].addEventListener("click",function(event){
                event.preventDefault();
                AjaxPagination(this.name);
            },false);
        }
    }
    catch(err)
    {
        console.log(err);
        return -1;
    }
}


/*carregar as drops após se seleccionar uma outra drop*/
function loadDependencies()
{
    var marcas = document.getElementsByName("anuncio[marca]")[0];
    if(marcas !== undefined)
    {
        marcas.addEventListener("change",function(event){
            AjaxLoadMarcasDependencies(this.value);
        });
    }
    var distritos = document.getElementsByName("anuncio[distrito]")[0];
    if(distritos !== undefined) {
        distritos.addEventListener("change", function (event) {
            AjaxLoadDistritosDependencies(this.value);
        });
    }
}

/*AJAX*/

function AjaxLoadDistritosDependencies(value)
{
    var xmlhttp;
    var distritos = document.getElementById("selectConcelho");
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var elems = eval("("+xmlhttp.responseText+")");

            var option;

            option = document.createElement("option");
            option.text = "Select it!";
            option.value = 0;
            distritos.add(option);

            for(var i = 0;i<elems.length;++i)
            {
                option = document.createElement("option");
                option.text = elems[i].nome;
                option.value = elems[i].id;
                distritos.add(option);
            }
        }
    }
    while(distritos.firstChild)
    {
        distritos.removeChild(distritos.firstChild);
    }

    xmlhttp.open("GET","/Anuncio/Adicionar/Concelhos/"+value,true);
    xmlhttp.send();

}

function AjaxLoadMarcasDependencies(value)
{
    var xmlhttp;
    var distritos = document.getElementById("selectModelo");
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var elems = eval("("+xmlhttp.responseText+")");

            var option;

            option = document.createElement("option");
            option.text = "Select it!";
            option.value = 0;
            distritos.add(option);

            for(var i = 0;i<elems.length;++i)
            {
                option = document.createElement("option");
                option.text = elems[i].nome;
                option.value = elems[i].id;
                distritos.add(option);
            }
        }
    }
    while(distritos.firstChild)
    {
        distritos.removeChild(distritos.firstChild);
    }

    xmlhttp.open("GET","/Anuncio/Adicionar/Modelos/"+value,true);
    xmlhttp.send();


}

function AjaxPagination(pagina)
{

    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            console.log('aqui!!!!!!');
            document.getElementById("pagination").innerHTML=xmlhttp.responseText;
            addAnchorListener();
        }
    }

    var urlArray = window.location.pathname.split("/");
    console.log(urlArray);
    xmlhttp.open("GET","/"+urlArray[1]+"/"+urlArray[2]+"/Pagina/"+pagina,true);
    xmlhttp.send();
}

function AjaxRating(star)
{
    console.log("loadXMLDoc");
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            console.log(xmlhttp.responseText);
            document.getElementById("labelAverageRating").innerHTML=xmlhttp.responseText;
        }
    }
    var idAnuncio = getAnuncioId();

    xmlhttp.open("POST","/Anuncio/Detalhe/"+idAnuncio+"/Classificar",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("classificacao="+star);
}