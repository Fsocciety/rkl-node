const XLSX = require('xlsx');

module.exports.read = function(filename) {
    const excel = XLSX.readFile(filename);
    return XLSX.utils.sheet_to_json(excel.Sheets[excel.SheetNames[0]])
        .map(json => Object.values(json))
        .filter(arr => arr[0] === 'O')
        .map(row => row.slice(1))
        .map(row => {
            let date = date2ms(row[1]);
            row[1] = date[0];
            row.splice(2, 0, date[1]);
            return row;
        });
        
}

function date2ms(d) {
    let date = new Date(Math.round((d - 25569) * 864e5));
    date.setMinutes(date.getMinutes());
    date = date.toISOString().replace(/T/, ".").split('.')
    tempDate = date[0].split('-');
    tempDate = tempDate[2] + '-' + tempDate[1] + '-' + tempDate[0];
    
    date[0] = tempDate;
    return date;
}
