const sqlite = require('sqlite3').verbose();
const fs = require('fs');

function createDbConnection() {
    if(fs.existsSync('./baza.db')) {
        return new sqlite.Database('./baza.db');
    } else {
        const db = new sqlite.Database('./baza.db', (error) => {
            if (error) {
                return console.error(error.message);
            }
            createTable(db);
        });
        console.log("Connection with SQLite has been established");
        return db;
    }  
}

function createTable(db) {
    db.exec(`
    CREATE TABLE izvestaj(
        Broj INTEGER,
        datum VARCHAR(12),
        posiljalac VARCHAR(30),
        porucilac VARCHAR(30),
        primalac VARCHAR(30),
        artikal VARCHAR(30),
        prevoznik VARCHAR(30),
        registracija VARCHAR(30),
        vozac VARCHAR(30),
        bruto INTEGER,
        tara INTEGER,
        neto INTEGER)`);
}

module.exports = createDbConnection();

