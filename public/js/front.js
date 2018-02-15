


function KeepCount(id) {
    console.log(id);
    var current_form=Math.floor(Math.floor(id/10)*10);
    console.log(current_form);
            
    let checked=0;
    var children=document.getElementById(current_form).childElementCount;
    var max_answers=document.getElementById(current_form).childElementCount-1;
    for(let i=1;i<=children;i++){
        if(document.getElementById(current_form+i).checked){
            checked++;
        }
   
    }
    if(checked>max_answers){
        document.getElementById(id).checked=false;
        alert('You have selected maximum number of answers for that question');
    }

}



function CollectCheck(){
    var object = {
        "fav_mov": [],
        "fav_jedi": [],
        "fav_sith": [],
        "fav_planet": [],
        "force_select": []
    };


    var FormID=10;
    var numofchecked=0;
    var questions=5;
    for(let i=1;i<=questions;i++){
        let ans=document.getElementById(i*10).childElementCount;
        let name=Object.keys(object)[i-1];

        for(let j=1;j<=ans;j++)
        {   

            if(document.getElementById(i*10+j).checked){
                object[name].push(j-1);
            }
        }

    }
   
    var strObject = JSON.stringify(object);
    return strObject;
}




$('#buttonone').click(function(){

    var ans=CollectCheck();
   
    $.ajax({
        url: '/ODGOVORI',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({name:ans}),
        success:function(response){
            alert(response);
        }
    })
});