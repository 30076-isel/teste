/**
 * Created by ISEL on 05-07-2014.
 */
function addAnchorListener()
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