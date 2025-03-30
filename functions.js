const { Store, Staff, Address } = require('./database');

const createStore = async (address_id, manager_staff_id) => {
    try{
        const newStore = await Store.create({
            address_id,
            manager_staff_id
        });
        return newStore;
    } catch (error) {
        console.error("Erro ao criar o staff:", error);
        throw new Error("Erro ao adicionar funcionário.");
    }
}

const createAddress = async (address, district, city_id, phone, location, postal_code) => {
    try{
        const newAddress = await Address.create({
            address,
            district,
            city_id,
            postal_code,
            phone,
            location
        });
        return newAddress;
    } catch (error) {
        console.error("Erro ao criar o staff:", error);
        throw new Error("Erro ao adicionar funcionário.");
    }
}

const createStaff = async (address_id, first_name, last_name, store_id) => {
    try {
        let email = first_name+"."+last_name+"@store.com";
        let username = first_name+"."+last_name;
        console.log(address_id, first_name, last_name, store_id);
        const newStaff = await Staff.create({
            address_id,
            first_name,
            last_name,
            store_id,
            email,
            username
        });

        // Retorna o novo staff, incluindo informações do endereço
        return newStaff;
    } catch (error) {
        console.error("Erro ao criar o staff:", error);
        throw new Error("Erro ao adicionar funcionário.");
    }
};

const updateStaffStore = async (id, store_id) => {
    console.log("FIX STAFF ID: "+id+" WHERE STORE: "+store_id);
    return await Staff.update(
        { store_id: store_id },
        { where: { staff_id: id } }
    );
}

const listStaff = async (id) => {
    try {
        let staff;
        if (id){
            staff = await Staff.findByPk(id);
            staff = [staff]
        }
        else{
            staff = await Staff.findAll();
        }
        console.log("FUNCIONARIO",staff);
        console.log(JSON.stringify(staff));

        const staffData = await Promise.all(staff.map(async (s) => {
            const address = await Address.findByPk(s.address_id);
            const store = await Store.findByPk (s.store_id);
            const store_address = await Address.findByPk(store.address_id);
            return {
                id: s.staff_id,
                nome: `${s.first_name} ${s.last_name}`,
                email: s.email,
                address: address,
                store: {
                    id: store.store_id,
                    address: store_address
                }
            };
        }));

        return staffData;
    } catch (error) {
        console.error("Erro ao buscar funcionario:", error);
        return [];
    }
};

const listStores = async (id) => {
    try {

        let stores;
        if (id){
            stores = await Store.findByPk(id);
            stores = [stores];
        }else{
            stores = await Store.findAll();
        }
        console.log(stores);
        const storeData = await Promise.all(stores.map(async (s) => {
            const address = await Address.findByPk(s.address_id);
            const manager = await Staff.findByPk (s.manager_staff_id);
            const manager_address = await Address.findByPk(manager.address_id);
            
            return {
                id: s.store_id,
                address: address,
                gerente: {
                    staff_id: manager.staff_id,
                    name: manager.first_name+" "+manager.last_name,
                    email: manager.email,
                    username: manager.username,
                    active: manager.active,
                    address: manager_address
                }
            };
        }));
        return storeData;
    } catch (error) {
        console.error("Erro ao buscar lojas:", error);
        return [];
    }
};

const listAddresses = async (id) => {
    try {
        let addresses;
        if (id){
            addresses = await Address.findByPk(id);
            addresses = [addresses];
        }
        else{
            addresses = await Address.findAll();
        }

        return addresses;
    } catch (error) {
        console.error("Erro ao buscar endereços:", error);
        return [];
    }
};

module.exports = { updateStaffStore, createStore, createAddress, createStaff, listStaff, listStores, listAddresses };
