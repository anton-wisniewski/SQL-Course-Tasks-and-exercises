/*  
    Sequelize - CRUD: create(), createBulk()
    Zadanie: 
    1. Napisz model opisujący samochód jako Automobile z polami
       id, brand, name z podstawową walidacją
       distanceTraveled - int jako ilość przejechanych km od 0 do 1000000, nie może być ujemna
       age - od 0 do 100
       productionDate - od 1950 do 2050
       color jeden z elementów tablicy: "red", "white", "blue", "green", "black", "orange", "yellow"
    2. Stwórz losowy samochód z funkcją getRandomAutomobile() i zapisz rekord z create()
    3. Utwórz tablicę 30 aut i zapisz je do bazy z bulkCreate()
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


const colorsArr = ["red", "white", "blue", "green", "black", "orange", "yellow"];

const Automobile = sequelize.define("Automobile", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: true
        }
    },
    brand: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [1, 16]
        }
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            len: [1, 32]
        }
    },
    distanceTraveled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 1000000,
            notNull: {
                msg: "Distance can't be null"
            },
            notBelowZero(v) {
                if (v < 0) {
                    throw new Error("Distance can't be negative");
                }
            }
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100,
            notNull: {
                msg: "Age can't be null"
            }
        }
    },
    productionDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
        validate: {
            isDate: true,
            isAfter: "1950-01-01",
            isBefore: "2050-01-01"
        }
    },
    color: {
        type: DataTypes.STRING(12),
        defaultValue: "red",
        validate: {
            isAlpha: true,
            notEmpty: true,
            isLowercase: true,
            isIn: [colorsArr]
        }
    }
});

await Automobile.sync({ force: true });

function getRandArrEl(arr) {
    return arr[ Math.floor(Math.random() * arr.length) ];
}

function getRandomAutomobile() {
    const brandArr = ["Ford", "GMC", "Citroen", "BMW", "Dodge", "Mercedes", "Nissan"];
    const nameArr = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const brand = getRandArrEl(brandArr);
    const name = getRandArrEl(nameArr);

    return {
        brand: brand,
        name: name,
        distanceTraveled: Math.floor(Math.random() * 10000),
        age: Math.floor(Math.random() * 50),
        productionDate: new Date( (new Date).getTime() 
                - Math.floor(Math.random() * 1000*60*60*24*365*10) ),
        color: getRandArrEl(colorsArr)
    };
}


try {
    const auto = getRandomAutomobile();
    await Automobile.create(auto);

    const autosArr = [];
    for (let i = 0; i < 30; i++) {
        autosArr.push( getRandomAutomobile() );
    }

    const carsDb = await Automobile.bulkCreate(
        autosArr,
        { validate: true }
    );

    for (const c of carsDb) {
        console.log( c.dataValues );
    }

} catch (err) {
    console.error(err);
}


await sequelize.close();





















