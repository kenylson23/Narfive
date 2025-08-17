import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;
const distPath = path.join(__dirname, 'dist', 'public');

// Servir arquivos estáticos
app.use(express.static(distPath));

// Rota para todas as outras requisições retornar o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.static.html'));
});

app.listen(port, () => {
  console.log(`Servidor estático rodando em http://localhost:${port}`);
});
