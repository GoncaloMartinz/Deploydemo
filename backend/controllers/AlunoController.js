const Aluno = require('../models/Aluno');

// GET /api/alunos
exports.listar = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar alunos' });
  }
};

// POST /api/alunos
exports.criar = async (req, res) => {
  try {
    const novoAluno = await Aluno.create(req.body);
    res.status(201).json(novoAluno);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar aluno' });
  }
};

// DELETE /api/alunos/:id
exports.apagar = async (req, res) => {
  try {
    const alunoRemovido = await Aluno.findByIdAndDelete(req.params.id);
    if (!alunoRemovido) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json(alunoRemovido);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao apagar aluno' });
  }
};
