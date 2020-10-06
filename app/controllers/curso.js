
module.exports = function(app){
	var Curso = app.models.curso;
	var controller = {};
	controller.listaCursos = function(req, res){
		Curso.find().exec().then(
			function(cursos){
				res.json(cursos);
			},
			function(erro){
				console.error(erro)
				res.status(500).json(erro);
			});
	};
	
	controller.obtemCurso = function(req, res){
		var _id = req.params.id;
		Curso.findById(_id).exec().then(
		function(curso){
			if(!curso) throw new Error("Curso não encontrado");
			res.json(curso)
		},
		function(erro){
			console.log(erro);
			res.status(404).json(erro)
		});
	};
	
	controller.removeCurso = function(req, res){
		var _id = req.params.id;
		Curso.deleteOne({"_id": _id}).exec().then(
		function(){
			res.end();
		},
		function(erro){
			return console.error(erro);
		});
	};
	
		controller.salvaCurso = function(req, res){
		var _id = req.body._id;
		if(_id){
			Curso.findByIdAndUpdate(_id, req.body).exec().then(
			function(curso){
			res.json(curso);
			},
			function(erro){
				console.error(erro)
				res.status(500).json(erro);
			});
		}else{
			Curso.create(req.body).then(
				function(curso){
					res.status(201).json(curso);
				},
				function(erro){
					console.log(erro);
					res.status(500).json(erro);
			});
		}
	};
	
	return controller;
	
};

//////////////////////////////////////////

// module.exports = function() {
//     var controller = {};
//     controller.listaCursos = function(req, res) {
//         res.json(cursos);
//     };
//     controller.obtemCurso = function(req, res) {
//         console.log('Selecionou o curso: ' + req.params.id);
//         var idCurso = req.params.id;
//         var curso = cursos.filter(function(curso) {
//             return curso._id == idCurso;
//         })[0];
//         curso ? res.json(curso) : res.status(404).sendStatus('Curso não encontrado!');
//     };
//     controller.removeCurso = function(req, res) {
//         var idCurso = req.params.id;
//         cursos = cursos.filter(function(curso) {
//             return curso._id != idCurso;
//         });
//         res.sendStatus(204).end();
//     };

//     controller.salvaCurso = function(req, res) {
//         var curso = req.body;
//         curso = curso._id ? atualiza(curso) : adiciona(curso);
//         res.json(curso);
//     };

//     function adiciona(cursoNovo) {
//         cursoNovo._id = ++ID_CURSO_INC;;
//         cursos.push(cursoNovo);
//         return cursoNovo;
//     }

//     function atualiza(cursoAlterar) {
//         cursos = cursos.map(function(curso) {
//             if (curso._id == cursoAlterar._id) {
//                 curso = cursoAlterar;
//             }
//             return curso;
//         });
//         return cursoAlterar;
//     }

//     return controller;
// };