# Gestão de Alunos - Trabalho PW

## Estrutura do Projeto

- `frontend/`: Interface web (HTML/CSS/JS)
- `backend/`: API RESTful com Node.js + MongoDB
- `mock-server/`: JSON-server configurado
- `mock-data/`: Base de dados JSON original
- `tests/`: Coleção de testes Postman

## Como Executar

### API Simulada (JSON-Server)
1. Navegue para `mock-server/`
2. Execute `npm install`
3. Execute `npm start`
4. Acesse `http://localhost:3000/alunos`

### Backend Real (Node.js + MongoDB)
1. Navegue para `backend/`
2. Execute `npm install`
3. Crie um arquivo `.env` com `MONGODB_URI=sua_string_de_conexao`
4. Execute `npm start`
5. Acesse `http://localhost:3001`

### Frontend
1. Abra `frontend/index.html` no navegador
2. Configure para usar a API desejada (mude a URL em app.js)

## Testes
Importe `tests/postman_collection.json` no Postman para testar os endpoints