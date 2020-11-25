document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5001/getAll')
    .then(response => response.json())
    .then(response => loadHTMLTable(response));
    
});

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    console.log(data);
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='2'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    
    data.forEach(function ({username, score}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${username}</td>`;
        tableHtml += `<td>${score}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML += tableHtml;
}