/**
 * Created by ISEL on 05-07-2014.
 */
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