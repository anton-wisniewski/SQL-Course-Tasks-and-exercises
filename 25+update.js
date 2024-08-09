/* 
    Sequelize - CRUD: update() - aktualizacja rekordów
*/

import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",   
  decimalNumbers: true
});


sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((error) => {
    console.error("Unable to connect to the database: ", error);
});


const colorsArr = ["light", "dark", "silver", "blue", "red"];

const WebShopCustomer = sequelize.define("WebShopCustomer", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: true
        }
    },
    name: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [1, 16]
        }
    },
    surname: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            len: [1, 32]
        }
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: [5, 128]
        }
    },
    shopPoints: {
        comment: "Points earned in the web shop",
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100000,
            notNull: {
                msg: "Points can't be null"
            },
            notBelowZero(value) {
                if (value < 0) {
                    throw new Error("Points can't be negative");
                }
            }
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 18,
            max: 100,
            notNull: {
                msg: "age can't be null"
            }
        }
    },
    registerDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
        validate: {
            isDate: true,
            isAfter: "2010-01-01",
            isBefore: "2055-01-01"
        }
    },
    themeColor: {
        type: DataTypes.STRING(12),
        defaultValue: "light",
        validate: {
            isAlpha: true,
            notEmpty: true,
            isLowercase: true,
            isIn: [colorsArr]
        }
    }
});



await WebShopCustomer.sync();

function getRandElFromArr(arr) {
    return arr[ Math.floor(Math.random() * arr.length) ];
}

function getRandomCustomer() {
    const namesArr = ["Ola", "Kasia", "Zuzia", "Ania", "Basia", "Karolina", "Agata", "Daria"];
    const surnameArr = ["Kowalska", "Adamska", "Barska", "Karolińska", "Darska"];
    const randNum = Math.floor(Math.random() * 100000);
    const name = getRandElFromArr(namesArr);
    const surname = getRandElFromArr(surnameArr);
    const email = name.toLowerCase() + "." + surname.toLowerCase() + randNum + "@gmail.com";
    
    return {
        name: name,
        surname: surname,
        email: email,
        shopPoints: Math.floor(Math.random() * 1000),
        age: 18 + Math.floor(Math.random() * 50),
        registerDate: new Date( (new Date).getTime() 
                - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 5) ),
        themeColor: getRandElFromArr(colorsArr)
    };
}

function logCustomer(c) {
    console.log(c.id, c.name, c.surname, c.email, c.shopPoints, c.age,
                c.registerDate, c.themeColor);
}

try {
 
    const updatedCustomer1 = await WebShopCustomer.update({
        name: "Patrycja",
        surname: "Kowalska"
    }, {
        where: {
            id: 30
        }
    });
    console.log("updatedCustomer1:", updatedCustomer1);
    

    const [upsertedData, upsertedCreatedFlag] = await WebShopCustomer.upsert({
        name: "Maria",
        surname: "Kowalska",
        email: "maria@example.com",
        age: 30,
        themeColor: "red"
    });
    console.log("\nupsertedData:", upsertedData);
    console.log("\nupsertedData, created?:", upsertedCreatedFlag); // true jeśli zwrócony nowy
                                                                   // rekord z bazy

    const [upsertedData2, upsertedCreatedFlag2] = await WebShopCustomer.upsert({
        id: 12 ,
        name: "Basia",
        surname: "Kowalska",
        email: "maria22@example.com",
        age: 32,
        themeColor: "red"
    });
    console.log("\nupsertedData2:", upsertedData2);
    console.log("\nupsertedData2, created?:", upsertedCreatedFlag2);



} catch (err) {
    console.log(err);
}

await sequelize.close();













































