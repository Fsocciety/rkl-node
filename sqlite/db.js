const excel = require('./excel.js');
const sqlite = require('sqlite3').verbose();

let res = excel.read('./sqlite/23.05.2023.xlsx', 2);

const db = new sqlite.Database('./sqlite/baza.db', (error) => {
    if(error) console.log(error);
    else {
        console.log('Database connected');
        createTableFile();
        createTableIzvestaj();
    }
});

function createTableFile() {
    db.run(`
        CREATE TABLE IF NOT EXISTS file
        (
            "id"        INTEGER NOT NULL UNIQUE,
            "name"      TEXT    NOT NULL UNIQUE,
            "upload_dt" TEXT    NOT NULL,
            PRIMARY KEY ("id" AUTOINCREMENT)
        );
    `, (error) => {
        if(error) console.log(error);
        else console.log('Table file created successfuly!')
    });
}

function createTableIzvestaj() {
    db.run(`
        CREATE TABLE izvestaj
        (
            "id"           INTEGER NOT NULL UNIQUE,
            "broj"         INTEGER NOT NULL,
            "datum"        TEXT    NOT NULL,
            "vreme"        TEXT    NOT NULL,
            "posiljalac"   TEXT    NOT NULL,
            "porucilac"    TEXT    NOT NULL,
            "primalac"     TEXT    NOT NULL,
            "artikal"      TEXT    NOT NULL,
            "prevoznik"    TEXT    NOT NULL,
            "registracija" TEXT    NOT NULL,
            "vozac"        TEXT    NOT NULL,
            "bruto"        REAL    NOT NULL,
            "tara"         REAL    NOT NULL,
            "neto"         REAL    NOT NULL,
            "file_id"      INTEGER NOT NULL,
            PRIMARY KEY ("id" AUTOINCREMENT),
            FOREIGN KEY ("file_id") REFERENCES "file"
        );`,   
    (error) => {
        if (error) console.log(error.message);
        else console.log('Table izvestaj created successfuly');
    })
}

module.exports.insertFileIntoDb = async function (fileName) {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM file', (error, rows) => {
                if (error) reject(error);
                else resolve(rows);
            })
        });
        let temp = ['blabla'];
        rows.forEach(row => {
            temp.push(row.name);
        })
        console.log(fileName);
        if (temp.includes(fileName)) {
            console.log('Data already exists')
        } else {
            let time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            let sql = `INSERT INTO file(name, upload_dt)
                    VALUES (?, ?)`;
            db.run(sql, [fileName, time], error => {
                if (error) console.log(error.message);
                else console.log(`Inserted a row with the ID: ${this.lastID}`)
            })
            insertIzvestajIntoDb(res);
        }
    } catch (error) {
        console.error(error)
    }
    
}


this.insertFileIntoDb('23.05.2023.xlsx');


module.exports.insertIzvestajIntoDb = function (data) {
    data.forEach(element => {
        db.run(`INSERT INTO izvestaj 
            (broj, datum, vreme, posiljalac,
            porucilac, primalac, artikal,
            prevoznik, registracija, vozac,
            bruto, tara, neto, file_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, Object.values(element), (error) => error ? console.log(error.message) : console.log(`Row was added at: ${this.lastID}`))
    })
}
