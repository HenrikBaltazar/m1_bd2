const { Customer } = require('./database');

const listCustomerAddress = async () => {
    try {
        let customer = await Customer.findByPk(1, { include: 'Address' });
        if (!customer) throw new Error("Cliente não encontrado");
        return {
            id: customer.customer_id,
            nome: `${customer.first_name} ${customer.last_name}`,
            email: customer.email,
            endereco: customer.Address ? customer.Address.address : "Endereço não encontrado"
        };
    } catch (error) {
        console.error("Erro:", error);
        return { erro: "Erro ao buscar cliente" };
    }
};

const listCustomers = async () => {
    try {
        let customers = await Customer.findAll({
            attributes: ['customer_id', 'first_name', 'last_name', 'email']
        });
        console.log(customers);
        return customers.map(customer => ({
            id: customer.customer_id,
            nome: `${customer.first_name} ${customer.last_name}`,
            email: customer.email
        }));
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        return [];
    }
};

module.exports = { listCustomerAddress, listCustomers };
