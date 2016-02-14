	var express =require('express');
var bodyParser=require('body-parser');
var morgan =require('morgan');
var config=require('./config');
var mongoose =require('mongoose');
var app=express();

mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	}else{
		console.log('Conectado a la base de datos USA tu reserva')
	}
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname+'/public/app/views'));

var api=require('./app/routes/api')(app,express);
app.use('/api',api);


app.get('*',function(req,res){
	res.sendFile(__dirname+'/public/app/views/index.html');
});

app.listen(config.port,function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Listening on port "+config.port);
	}
});