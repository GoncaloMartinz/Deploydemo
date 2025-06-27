// Configuração da API (funciona em ambos ambientes)
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:10000/api' 
  : 'https://academicos-api.onrender.com/api';

const ALUNOS_ENDPOINT = `${API_BASE_URL}/alunos`;

// Elementos DOM
const tabelaAlunos = document.querySelector('#tabelaAlunos tbody');
const formAluno = document.getElementById('formAluno');

// Função para carregar alunos
async function carregarAlunos() {
  try {
    const response = await fetch(ALUNOS_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    
    const alunos = await response.json();
    renderizarAlunos(alunos);
  } catch (error) {
    console.error('Erro ao carregar alunos:', error);
    mostrarNotificacao('Erro ao carregar alunos', false);
  }
}

// Função para renderizar alunos
function renderizarAlunos(alunos) {
  tabelaAlunos.innerHTML = alunos.length > 0 
    ? alunos.map(aluno => `
        <tr>
          <td>${aluno.nome}</td>
          <td>${aluno.apelido}</td>
          <td>${aluno.curso}</td>
          <td>${aluno.anoCurricular}</td>
          <td>
            <button class="delete-btn" data-id="${aluno._id}">Apagar</button>
          </td>
        </tr>
      `).join('')
    : `<tr><td colspan="5">Nenhum aluno cadastrado</td></tr>`;
}

// Evento para apagar alunos
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    if (!confirm('Tem certeza que deseja apagar este aluno?')) return;
    
    try {
      const id = e.target.dataset.id;
      const response = await fetch(`${ALUNOS_ENDPOINT}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Falha ao apagar');
      
      mostrarNotificacao('Aluno apagado com sucesso!');
      carregarAlunos();
    } catch (error) {
      console.error('Erro ao apagar:', error);
      mostrarNotificacao('Erro ao apagar aluno', false);
    }
  }
});

// Evento para cadastrar aluno
formAluno.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const novoAluno = {
      nome: formAluno.nome.value,
      apelido: formAluno.apelido.value,
      curso: formAluno.curso.value,
      anoCurricular: parseInt(formAluno.anoCurricular.value)
    };

    const response = await fetch(ALUNOS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoAluno)
    });

    if (!response.ok) throw new Error('Falha ao cadastrar');

    formAluno.reset();
    mostrarNotificacao('Aluno cadastrado com sucesso!');
    carregarAlunos();
  } catch (error) {
    console.error('Erro no cadastro:', error);
    mostrarNotificacao('Erro ao cadastrar aluno', false);
  }
});

// Sistema de notificações simplificado
function mostrarNotificacao(mensagem, sucesso = true) {
  const notificacao = document.createElement('div');
  notificacao.className = `notificacao ${sucesso ? 'sucesso' : 'erro'}`;
  notificacao.textContent = mensagem;
  document.body.appendChild(notificacao);

  setTimeout(() => {
    notificacao.style.opacity = '0';
    setTimeout(() => notificacao.remove(), 500);
  }, 3000);
}



// Inicia a aplicação
document.addEventListener('DOMContentLoaded', carregarAlunos);