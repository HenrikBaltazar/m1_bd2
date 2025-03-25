const { Sequelize, DataTypes } = require('sequelize');

const MYSQL_IP = "localhost";
const MYSQL_LOGIN = "root";
const MYSQL_PASSWORD = "root";
const DATABASE = "sakila";

const sequelize = new Sequelize(DATABASE, MYSQL_LOGIN, MYSQL_PASSWORD, {
    host: MYSQL_IP,
    dialect: "mysql"
});

const Customer = sequelize.define('Customer', {
    customer_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    address_id: { type: DataTypes.INTEGER }
}, { tableName: 'customer', timestamps: false });

const Address = sequelize.define('Address', {
    address_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    address: { type: DataTypes.STRING },
    postal_code: { type: DataTypes.STRING, allowNull: false },
    district: { type: DataTypes.STRING }
}, { tableName: 'address', timestamps: false });

Customer.hasOne(Address, { foreignKey: 'address_id' });

module.exports = { sequelize, Customer, Address };
