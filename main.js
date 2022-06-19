csv_lib = [];
let csv_file_name = "dictionary.csv";
let request = new XMLHttpRequest();

COLUMN_JAPANESE = 0;
COLUMN_JAPANESE_KANA = 1;
COLUMN_JAPANESE_ROMAJI = 2;
COLUMN_ENGLISH = 3;
COLUMN_POSITION_URL = 4;

request = new XMLHttpRequest();
request.onload = function() {
    console.log(request.status);
    console.log(request.responseText);
    csv_lib = request.responseText.split('\n').map(r => r.split('\t'));
    csv_lib = csv_lib.filter(row => row.length >= 4);
};
request.open('GET', csv_file_name);
request.send();

function get_lib() {
    return csv_lib;
}

function update_table() {
    let rows = get_lib();
    let kw = document.getElementById('search_word').value;
    rows = rows.filter(row => row[COLUMN_JAPANESE].includes(kw) || row[COLUMN_JAPANESE_KANA].includes(kw) || row[COLUMN_JAPANESE_ROMAJI].includes(kw));

    let element_rows = [];
    rows.forEach(function(row) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        td1.appendChild(document.createTextNode(row[COLUMN_JAPANESE]));
        td2.appendChild(document.createTextNode(row[COLUMN_JAPANESE_KANA]));
        td3.appendChild(document.createTextNode(row[COLUMN_ENGLISH]));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        if (row.length > COLUMN_POSITION_URL && row[COLUMN_POSITION_URL]) {
            let pos_link = document.createElement('a');
            pos_link.setAttribute('href', row[COLUMN_POSITION_URL]);
            pos_link.setAttribute('target', '_blank');
            pos_link.setAttribute('rel', 'noopener noreferrer');
            pos_link.appendChild(document.createTextNode('局面図'));
            td4.appendChild(pos_link);
        }
        tr.appendChild(td4);

        element_rows.push(tr);
    });

    let tbody = document.getElementById('words_tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    element_rows.forEach(function(elem) {
        tbody.appendChild(elem);
    });

}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search_word').addEventListener('keyup', update_table);
});