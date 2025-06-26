const Curso = require('../models/Curso');
exports.listar = async (req, res) => res.json(await Curso.find());
