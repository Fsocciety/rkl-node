const XLSX = require('xlsx');

module.exports.read = function(filename, fileId) {
    const excel = XLSX.readFile(filename);
    const naslovi = ['O','broj', 'datum', 'vreme', 'posiljalac', 'porucilac', 'primalac', 'artikal', 'prevoznik', 'registracija', 'vozac', 'bruto', 'tara', 'neto', 'file_id']
    return XLSX.utils.sheet_to_json(excel.Sheets[excel.SheetNames[0]], {header: naslovi})
        .filter(json => json['O'] == 'O' || json['broj'] == 'O')
        .map(json => {
            if (json['broj'] == 'O') {
                return {
                    'broj': json['datum'],
                    'datum': date2ms(json['vreme'])[0],
                    'vreme': date2ms(json['vreme'])[1],
                    'posiljalac': json['posiljalac'],
                    'porucilac': json['porucilac'],
                    'primalac': json['primalac'],
                    'artikal': json['artikal'],
                    'prevoznik': json['prevoznik'],
                    'registracija': json['registracija'],
                    'vozac': json['vozac'],
                    'bruto': json['bruto'],
                    'tara': json['tara'],
                    'neto': json['neto'],
                    'file_id': fileId
                }
            } else {
                delete json['O'];
                const date = json['datum'];
                json['datum'] = date2ms(date)[0];
                json['vreme'] = date2ms(date)[1];
                json['file_id'] = fileId;
                return json;
            }
           
        })
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
