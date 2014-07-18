/**
 * Created by ISEL on 14-06-2014.
 */
module.exports=
function Pessoa(id,primNome,UltNome,email,password)
{
    this.id = id;
    this.firstname = primNome;
    this.lastname = UltNome;
    this.email = email;
    this.password = password;

    //var currentDate = new Date();
    this.dataRegisto = new Date();//currentDate.getDay()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear();
}

