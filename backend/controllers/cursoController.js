const Curso = require('../models/Curso');

// GET /api/cursos
exports.listar = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar cursos' });
  }
};
