const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const alunoRoutes = require('./routes/alunos');
const cursoRoutes = require('./routes/cursos');

const app = express();

// Configurações básicas
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB com sucesso'))
  .catch(err => console.error('Erro na conexão com MongoDB:', err));

// Rotas da API
app.use('/api/alunos', alunoRoutes);
app.use('/api/cursos', cursoRoutes);

// Rota básica de teste
app.get('/', (req, res) => {
  res.send('API Acadêmicos está funcionando!');
});

// Porta dinâmica para o Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Endpoints disponíveis:`);
  console.log(`- Alunos: http://localhost:${PORT}/api/alunos`);
  console.log(`- Cursos: http://localhost:${PORT}/api/cursos`);
});

