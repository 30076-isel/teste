/**
 * Created by ISEL on 03-07-2014.
 */
 
 module.exports =
    function Comentario(id,anuncio,username,email,titulo,texto)
    {
		this.id = id;
        this.anuncio = anuncio;
        this.email = email;
        this.username = username;
		this.titulo = titulo;
		this.texto = texto;
		this.dataRegisto = new Date();
    }