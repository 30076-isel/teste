/**
 * Created by ISEL on 12-06-2014.
 */

    module.exports = function()
    {
        var elems = [];

        function GetAll()
        {
            return elems;
        }

        function GetById(id)
        {
            var retElem = undefined;
            elems.forEach(function(elem){
                if(elem.id == id)
                    retElem = elem;
            });
            return retElem;
        }

        function Add(obj)
        {
            try {
                obj.id = obj.id==undefined? elems.length + 1:obj.id;
                elems.push(obj);
            }
            catch(err)
            {
                console.log(err);
                return false;
            }
            return true;
        }

        function Remove(id) {

            for (var i = 0; i < elems.length; ++i) {
                if (elems[i]["id"] == id) {
                    var elem = elems.splice(i, 1)[0];
                    return elem;
                }
            }
        }

        function Update(obj)
        {
            /*elems.forEach(function(elem){
                if(elem.id == obj.id)
                    elem = obj;
            });*/

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
