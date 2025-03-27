const express = require('express');
const { listStaff, listStores, listAddresses } = require('./functions');

const app = express();
const PORT = 3000;

app.use(express.static('public')); // Servir arquivos estáticos (HTML, CSS, JS)

app.get('/staff', async (req, res) => {
    try {
        const staff = await listStaff();
        res.json(staff);
    } catch (error) {
        res.status(500).send("Erro ao obter funcionários");
    }
});

app.get('/store', async (req, res) => {
    try {
        const storeId = req.query.store_id;
        const stores = await listStores(storeId);
        res.json(stores);
    } catch (error) {
        res.status(500).send("Erro ao obter lojas");
    }
});

app.get('/address', async (req, res) => {
    try {
        const addressId = req.query.address_id;
        const addresses = await listAddresses(addressId);
        res.json(addresses);
    } catch (error) {
        res.status(500).send("Erro ao obter endereços");
    }
});

app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));
