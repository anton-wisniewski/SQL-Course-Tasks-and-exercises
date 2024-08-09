/*
    Sequelize - typy danych
*/

import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', //|'sqlite'|'postgres'|'mssql'   
  decimalNumbers: true
});


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const Truck = sequelize.define("Truck", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vin: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    brand: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(24),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    horsePower: {
        type: DataTypes.DECIMAL(5, 2), // 123.45
        allowNull: true
    },
    topSpeed: {
        type: DataTypes.DECIMAL(5, 2), // 123.45
        allowNull: true
    },
    numDoors: {
        type: DataTypes.INTEGER(2),
        defaultValue: 2,
        allowNull: true
    },
    isElectric: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },
    color: {
        type: DataTypes.ENUM("white", "red", "blue", "green", "black", "yellow"),
        allowNull: false,
        defaultValue: "blue"
    },
    releaseDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
    },
    lastMechanicCheck: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    customOptions: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    underscored: true /* customOptions -> custom_options   snake_case */
});

 
 
await sequelize.sync().then(() => {
    console.log('Truck table created successfully!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});


await Truck.create({
    brand: "Kenworth",
    name: "T800",
    description: "Most popular truck in USA",
    horsePower: 305.56,
    topSpeed: 130.23,
    isElectric: false,
    releaseDate: new Date(2020, 1, 5, 17, 56, 23),
    lastMechanicCheck: new Date(2023, 2, 12),
    customOptions: JSON.stringify({
        leatherSeats: true,
        extendedCabin: true
    })
});


await sequelize.close();










