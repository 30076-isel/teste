/**
 * Created by ISEL on 12-06-2014.
 */
var fs = require('fs');
var file = './database/database.json';
var jsonData;


module.exports = function()
{
    var elems = [];

    function GetAll()
    {
        return elems;
    }

    function GetById(id)
    {
        for(var i in elems)
        {
            if(elems[i]["id"] == id)
                return elems[i];
        }
    }

    function Add(obj)
    {

        obj.id = elems.length + 1;
        elems.push(obj);
    }

    function Remove(id) {

        for (var i = 0; i < elems.length; ++i) {
            if (elems[i]["id"] == id)
                return elems.splice(i, 1);
        }
    }

    function Update(obj)
    {
        for(var elem in elems)
        {
            if(elems[elem]["id"] == obj.id)
                elems[elem] = obj;
        }
    }

    return {
        GetAll:GetAll,
        GetById:GetById,
        Add:Add,
        Remove:Remove,
        Update:Update
    };
}
