/**
 * Created by ISEL on 06-07-2014.
 */

module.exports = function() {
    var AnuncioRepository = new RepositoryModule();

    var ComentarioRepository = new RepositoryModule();

    var ClassificarRepository = new RepositoryModule();

    var Distritos = new RepositoryModule();

    var Concelhos = new RepositoryModule();

    var Marcas = new RepositoryModule();

    var Modelos = new RepositoryModule();

    var Combustiveis = new RepositoryModule();

    var defaultData = new data();

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
}