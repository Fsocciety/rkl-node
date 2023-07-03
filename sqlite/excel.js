const excel = require('exceljs');
const fs = require('fs');
// const workbook = new excel.Workbook();
// workbook.xlsx.readFile('./sqlite/24.05.2023.xlsx').then(() => {
//     let sheet = workbook.getWorksheet('Sheet1');
//     let data = [];
//     let obj = {}
    
//     sheet.eachRow((row, rowNumber) => {
//         console.log(row.values, rowNumber);
//     });
//     console.log(data);
// });



let data = null;


async function excelRead() {
    
    const workbook = new excel.Workbook();
    // use readFile for testing purpose
    // await workbook.xlsx.load(objDescExcel.buffer);
    console.log('dsaaaaaaaaaaa')
    await workbook.xlsx.readFile('./sqlite/24.05.2023.xlsx');
    let jsonData = [];
     
    workbook.worksheets.forEach(function(sheet) {
        // read first row as data keys
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
        jsonData = jsonData.map(obj => JSON.stringify(obj)).join('\n');
    });


    // Write the string to a file
    fs.writeFile('output.json', jsonData, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Data exported to output.json');
        }
    });

};
excelRead()
  .then(jsonData => {
    console.log(jsonData);
  })
  .catch(error => {
    console.error(error);
  });
