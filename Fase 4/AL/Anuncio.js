/**
 * Created by ISEL on 14-06-2014.
 */
module.exports=
    function Anuncio(id,titulo,marca,modelo,versao,ano,km,combustivel,distrito,concelho,anunciante,preco,negociavel,validade,terminado)
    {
        this.id = id;
        this.titulo = titulo;
        this.marca = marca;
        this.modelo = modelo;
        this.versao = versao;
        this.ano = ano;
        this.km = km;
        this.combustivel = combustivel;
        this.distrito = distrito;
        this.concelho = concelho;
        this.anunciante = anunciante;
        this.preco = preco;
        this.negociavel = negociavel;
        this.validade = validade;
		this.terminado = terminado;
    }