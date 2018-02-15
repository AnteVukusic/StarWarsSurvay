var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');

var app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json());;
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));



//JSON content

var contents=require('./public/contents.json');
app.locals.contents=contents;

app.get('/',function(req,res){
    res.render('index');
});

app.post('/ODGOVORI', function(req,res){
         var strAnswers=req.body.name;
         answers=JSON.parse(strAnswers);
         console.log(calculate(answers));
         res.end(calculate(answers));
         
});
function calculate(answers){
    var Jedi=0;
    var Sith=0;
    
    Object.keys(answers).forEach(function(key,i) {
        
        answers[key].forEach(function(element,j){
           Jedi+=contents[i].anwsers[element].jediPoints;
           Sith+=contents[i].anwsers[element].sithPoints;
        });
    });
    if(Jedi-Sith<0){
        return "Sith";
        console.log("Sith");
    }else if(Jedi-Sith>0){
        console.log("Jedi");
        return "Jedi";
    }else{
        console.log("White sabers?");
        return "White sabers? You should side with ashoka";
    }
} ;

app.listen(3000,function(){
    console.log('Server started on port 3000');
});