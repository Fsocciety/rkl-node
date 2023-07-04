const db = require('./db');
const excel = require('exceljs');


async function excelRead() {
    
    const workbook = new excel.Workbook();

    await workbook.xlsx.readFile('./sqlite/24.05.2023.xlsx');
    let jsonData = [];
     
    workbook.worksheets.forEach(function(sheet) {
        let firstRow = sheet.getRow(13);
        if (!firstRow.cellCount) return;
        let keys = firstRow.values;
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber == 1) return;
            let values = row.values
            let obj = {};
            for (let i = 1; i < keys.length; i ++) {
                if(values[i] != 'O' && values[i] != undefined)
                    obj[keys[i]] = values[i];
            }
            jsonData.push(obj);
        })
        jsonData.shift();
        jsonData.shift();
        jsonData.shift();
        jsonData.shift();
        jsonData.pop(); 
        jsonData = JSON.parse(JSON.stringify(jsonData));
    });
    return jsonData;
};

excelRead()
  .then(jsonData => {
    insertRow(jsonData)
  })
  .catch(error => {
    console.error(error);
  });



function insertRow(data) {
    console.log(queryData(db, data))
    // if(queryData(db, data)) {
    //     console.log('Data already exists');
    // } else {
    //     console.log('nije isto')
    //     for (let item of data) {
    //         db.run(
    //         `INSERT INTO izvestaj(broj, datum, posiljalac, porucilac, primalac, artikal, prevoznik, registracija, vozac, bruto, tara, neto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, Object.values(item),
    //         function(error) {
    //             if (error) {
    //                 console.error(error.message);
    //             }
    //                 console.log(`Inserted a row with the ID: ${this.lastID}`);
    //             }
    //         )
    //     }
    // }
    
}

function queryData(db, data) {
    let b;
    db.all(`SELECT * FROM izvestaj`, [],(err, rows) => {
        if (err)
            console.log(err);
        else {
            data.forEach(element => {
                rows.forEach(row => {
                    if(element['broj'] == row['Broj']) {
                        b = true;
                    }
                })
            }) 
        }
    });
    db.close();
}

