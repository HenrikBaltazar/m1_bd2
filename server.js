const express = require('express');
const { listCustomers } = require('./functions');

const app = express();
const PORT = 3000;

app.use(express.static('public')); // Servir arquivos estáticos (HTML, CSS, JS)

app.get('/list', async (req, res) => {
    try {
        const message = await listCustomers();
        res.json(message);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro ao obter dados");
    }
});

app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));
