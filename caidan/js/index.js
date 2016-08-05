/**
 * Created by ymz on 16/8/2.
 */
function showsubmenu(li){
    var subMenu=li.getElementsByTagName("ul")[0];
    subMenu.style.display="block";
}

function hidesubmenu(li){
    var subMenu=li.getElementsByTagName("ul")[0];
    subMenu.style.display="none";
}