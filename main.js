csv_lib = [];
let csv_file_name = "dictionary.csv";
let request = new XMLHttpRequest();
request = new XMLHttpRequest();
request.onload = function() {
    console.log(request.status);
    console.log(request.responseText);
    csv_lib = request.responseText.split('\n').map(r => r.split('\t'));
};
request.open('GET', csv_file_name);
request.send();

function get_lib() {
    return csv_lib;
}

function update_table() {
    var rows = get_lib();
    var kw = document.getElementById('search_word').value;
    rows = rows.filter(row => row[0].includes(kw) || row[1].includes(kw));

    var element_rows = []
    rows.forEach(function(row) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        td1.appendChild(document.createTextNode(row[0]))
        td2.appendChild(document.createTextNode(row[1]))
        td3.appendChild(document.createTextNode(row[2]))
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        element_rows.push(tr);
    });

    var tbody = document.getElementById('words_tbody');
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