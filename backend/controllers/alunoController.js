const Aluno = require('../models/Aluno');
exports.listar = async (req, res) => res.json(await Aluno.find());
exports.criar = async (req, res) => res.json(await Aluno.create(req.body));
exports.apagar = async (req, res) => res.json(await Aluno.findByIdAndDelete(req.params.id));
