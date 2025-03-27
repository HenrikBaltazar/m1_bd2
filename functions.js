const { Store, Staff, Address } = require('./database');

const listStaff = async () => {
    try {
        let staff = await Staff.findAll({
            attributes: ['staff_id', 'first_name', 'last_name', 'email', 'store_id', 'address_id']
        });
        console.log(staff);
        console.log(JSON.stringify(staff));

        // Agora, buscamos o endereço com o address_id
        const staffData = await Promise.all(staff.map(async (s) => {
            const address = await Address.findByPk(s.address_id); // Buscar o endereço completo

            return {
                id: s.staff_id,
                nome: `${s.first_name} ${s.last_name}`,
                email: s.email,
                store_id: s.store_id,
                endereco: address ? address.address : 'Endereço não encontrado', // Exibir o endereço completo
            };
        }));

        return staffData;
    } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
        return [];
    }
};

const listStores = async () => {
    try {
        let stores = await Store.findAll({
            attributes: ['store_id', 'manager_staff_id', 'address_id']
        });

        return stores.map(s => ({
            id: s.store_id,
            gerente: s.manager_staff_id,
            endereco: s.address_id
        }));
    } catch (error) {
        console.error("Erro ao buscar lojas:", error);
        return [];
    }
};

const listAddresses = async () => {
    try {
        let addresses = await Address.findAll({
            attributes: ['address_id', 'address', 'district', 'postal_code', 'phone']
        });

        return addresses.map(a => ({
            id: a.address_id,
            endereco: a.address,
            distrito: a.district,
            cep: a.postal_code,
            telefone: a.phone
        }));
    } catch (error) {
        console.error("Erro ao buscar endereços:", error);
        return [];
    }
};

module.exports = { listStaff, listStores, listAddresses };
