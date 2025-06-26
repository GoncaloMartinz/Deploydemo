require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro na conexão com MongoDB:', err));

// Schemas
const cursoSchema = new mongoose.Schema({
  nomeDoCurso: {
    type: String,
    required: true,
    unique: true
  }
});

const alunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  apelido: {
    type: String,
    required: true
  },
  curso: {
    type: String,
    required: true
  },
  anoCurricular: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

// Models
const Curso = mongoose.model('Curso', cursoSchema);
const Aluno = mongoose.model('Aluno', alunoSchema);

// Rotas para Cursos
app.get('/cursos', async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/cursos', async (req, res) => {
  const curso = new Curso({
    nomeDoCurso: req.body.nomeDoCurso
  });

  try {
    const novoCurso = await curso.save();
    res.status(201).json(novoCurso);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rotas para Alunos
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/alunos/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/alunos', async (req, res) => {
  const aluno = new Aluno({
    nome: req.body.nome,
    apelido: req.body.apelido,
    curso: req.body.curso,
    anoCurricular: req.body.anoCurricular
  });

  try {
    const novoAluno = await aluno.save();
    res.status(201).json(novoAluno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/alunos/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(
      req.params.id,
      {
        nome: req.body.nome,
        apelido: req.body.apelido,
        curso: req.body.curso,
        anoCurricular: req.body.anoCurricular
      },
      { new: true }
    );

    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/alunos/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json({ message: 'Aluno removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});