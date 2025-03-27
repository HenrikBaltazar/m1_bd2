const { Sequelize, DataTypes } = require('sequelize');

const MYSQL_IP = "localhost";
const MYSQL_LOGIN = "root";
const MYSQL_PASSWORD = "root";
const DATABASE = "sakila";

const sequelize = new Sequelize(DATABASE, MYSQL_LOGIN, MYSQL_PASSWORD, {
    host: MYSQL_IP,
    dialect: "mysql"
});

const Store = sequelize.define('Store', {
    store_id: { type: DataTypes.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    manager_staff_id: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, unique: true },
    address_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false }
}, { tableName: 'store', timestamps: false });

const Manager = sequelize.define('Manager', {
    staff_id: { type: DataTypes.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    address_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false  },
    first_name: { type: DataTypes.STRING, allowNull: false  },
    last_name: { type: DataTypes.STRING, allowNull: false  },
    picture: { type: DataTypes.BLOB, allowNull: true, defaultValue: null  },
    store_id: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:true  },
    email: { type: DataTypes.STRING, allowNull: true, defaultValue: null  },
    username: { type: DataTypes.STRING, allowNull: false  },
    password: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
}, { tableName: 'staff', timestamps: false });

const Address = sequelize.define('Address', {
    address_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    address: { type: DataTypes.STRING },
    postal_code: { type: DataTypes.STRING, allowNull: false },
    district: { type: DataTypes.STRING }
}, { tableName: 'address', timestamps: false });

Store.hasOne(Address, { foreignKey: 'address_id' });
Store.hasOne(Manager, { foreignKey: 'manager_staff_id' });

Manager.hasOne(Store, { foreignKey: 'store_id' });
Manager.hasOne(Address, { foreignKey: 'address_id' });

module.exports = { sequelize, Store, Manager, Address };
