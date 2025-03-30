const express = require('express');
const { updateStaffStore, createStore, createAddress, createStaff, listStaff, listStores, listAddresses } = require('./functions');

const app = express();
const PORT = 3000;

app.use(express.static('public')); // Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.json());
app.post('/staff', async (req, res) => {
    try {
        const {address, district, city_id, phone, location, postal_code, first_name, last_name, address_store, district_store, city_id_store, phone_store, location_store, postal_code_store} = req.body;
        console.log(address, district, city_id, phone, location, postal_code, first_name, last_name, address_store, district_store, city_id_store, phone_store, location_store, postal_code_store);
        if (!address || !district || !city_id || !phone || !location || !postal_code || !first_name || !last_name || !address_store || !district_store || !city_id_store || !phone_store || !location_store || !postal_code_store){
            return res.status(500).send("faltam parametros obrigatorios");
        }
        const manager_address = await createAddress(address, district, city_id, phone, location, postal_code);
        const store_address = await createAddress(address_store, district_store, city_id_store, phone_store, location_store, postal_code_store);
        const staff = await createStaff(manager_address.address_id, first_name, last_name, 1);
        const store = await createStore(store_address.address_id, staff.staff_id);
        const update = await updateStaffStore(staff.staff_id,store.store_id);
        console.log(update);
        if (staff.lenght === 0){
            return res.status(500).send("falha SQL");
        }
        res.json(await listStaff(staff.staff_id));
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro ao criar funcionario");
    }
});

app.get('/staff', async (req, res) => {
    try {
        id = req.body.id ? req.body.id : null
        const staff = await listStaff(id);
        if (staff.lenght === 0){
            return res.status(500).send("falha SQL");
        }
        res.json(staff);
    } catch (error) {
        res.status(500).send("Erro ao obter funcionarios");
    }
});

app.post('/store', async (req, res) => {
    try {
        const {address, district, city_id, phone, location, postal_code, first_name, last_name, address_manager, district_manager, city_id_manager, phone_manager, location_manager, postal_code_manager} = req.body;
        console.log(address, district, city_id, phone, location, postal_code, first_name, last_name, address_manager, district_manager, city_id_manager, phone_manager, location_manager, postal_code_manager);
        if (!address || !district || !city_id || !phone || !location || !postal_code || !first_name || !last_name || !address_manager || !district_manager || !city_id_manager || !phone_manager || !location_manager || !postal_code_manager){
            return res.status(500).send("faltam parametros obrigatorios");
        }
        const store_address = await createAddress(address, district, city_id, phone, location, postal_code);
        const manager_address = await createAddress(address_manager, district_manager, city_id_manager, phone_manager, location_manager, postal_code_manager);
        console.log(store_address, manager_address, store_address.address_id, manager_address.address_id);
        const staff = await createStaff(manager_address.address_id, first_name, last_name,1);
        const new_store = await createStore(store_address.address_id, staff.staff_id);
        const update = await updateStaffStore(staff.staff_id, new_store.store_id);
        console.log(update);
        if (new_store.lenght === 0){
            return res.status(500).send("falha SQL");
        }
        res.json(await listStores(new_store.store_id));
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro ao criar funcionario");
    }
});

app.get('/store', async (req, res) => {
    try {
        id = req.body.id ? req.body.id : null
        const stores = await listStores(id);
        res.json(stores);
    } catch (error) {
        res.status(500).send("Erro ao obter lojas");
    }
});

app.post('/address', async (req, res) => {
    try {
        const {address, district, city_id, phone, location, postal_code} = req.body;
        console.log(address, district, city_id, phone, location, postal_code);
        if (!address || !district || !city_id || !phone || !location || !postal_code){
            return res.status(500).send("faltam parametros obrigatorios");
        }
        const myaddress = await createAddress(address, district, city_id, phone, location, postal_code);
        if (myaddress.lenght === 0){
            return res.status(500).send("falha SQL");
        }
        res.json(await listAddresses(myaddress.address_id));
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro ao criar endereco");
    }
});

app.get('/address', async (req, res) => {
    try {
        id = req.body.id ? req.body.id : null
        const addresses = await listAddresses(id);
        res.json(addresses);
    } catch (error) {
        res.status(500).send("Erro ao obter endereços");
    }
});

app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));
