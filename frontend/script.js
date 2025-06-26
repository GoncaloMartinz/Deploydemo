const apiUrl = 'http://localhost:3001/alunos';
const lista = document.getElementById('lista-alunos');
const form = document.getElementById('form-aluno');

function carregarAlunos() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      lista.innerHTML = '';
      data.forEach(aluno => {
        const li = document.createElement('li');
        li.textContent = `${aluno.nome} ${aluno.apelido} - ${aluno.curso} (${aluno.anoCurricular}º ano)`;

        const apagar = document.createElement('button');
        apagar.textContent = 'Apagar';
        apagar.onclick = () => {
          fetch(`${apiUrl}/${aluno.id}`, { method: 'DELETE' }).then(carregarAlunos);
        };

        li.appendChild(apagar);
        lista.appendChild(li);
      });
    });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const novoAluno = {
    nome: form.nome.value,
    apelido: form.apelido.value,
    curso: form.curso.value,
    anoCurricular: parseInt(form.ano.value)
  };
  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novoAluno)
  }).then(() => {
    form.reset();
    carregarAlunos();
  });
};

carregarAlunos();
