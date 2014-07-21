/**
 * Created by ISEL on 06-07-2014.
 */

var RepositoryModule = require('../DAL/Repository');

module.exports = function() {
    var PessoaRepository = new RepositoryModule();


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

}