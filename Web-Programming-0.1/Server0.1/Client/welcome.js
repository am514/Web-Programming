document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5001/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    console.log(data);
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='2'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    let inc = 0;
    data.forEach(function ({username, score}) {
        tableHtml += "<tr>";
        tableHtml += "<td>" + data[inc].username + "</td>";
        tableHtml += "<td>" + data[inc].score + "</td>";
        tableHtml += "</tr>";
        inc++
    });

    table.innerHTML += tableHtml;
}