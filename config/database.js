var mongoose = require('mongoose');

module.exports = function(uri){
	mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
	
	mongoose.connection.on('connected', function(){
		console.log('Mongoose conectado em: ' + uri);
	});
	
	mongoose.connection.on('disconnected', function(){
		console.log('Mongoose desconectado em: ' + uri);
	});
	
	mongoose.connection.on('error', function(erro){
		console.log('Mongoose erro na conexão: ' + uri);
	});
	
	process.on('SIGINT', function(){
		mongoose.connection.close(function(){
			console.log('Mongoose desconectado pelo término da aplicação ');
		});
	});
}