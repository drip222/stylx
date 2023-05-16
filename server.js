const express = require('express');
const app = express();
const fs = require('fs-extra');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para a raiz do servidor
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Rota para salvar a token
app.post('/save-token', (req, res) => {
  const token = req.body.token;

  // Lógica para salvar a token no arquivo config.json
  const configFile = __dirname + '/config.json';

  // Carrega o conteúdo atual do arquivo config.json (se existir)
  let config = {};
  if (fs.existsSync(configFile)) {
    config = fs.readJsonSync(configFile);
  }

  // Atualiza a propriedade 'token' no objeto de configuração
  config.token = token;

  // Salva o objeto de configuração atualizado no arquivo config.json
  fs.writeJsonSync(configFile, config);

  res.send('Token salvo com sucesso!');
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000');
});
