//Listens and waits for the page to load. This then sends a request to the 
//server, this data will be used to generate the leaderboard table
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5001/getAll')
    .then(response => response.json())
    .then(data => loadLeaderboard(data['data']));
    //^^Takes the response from the server and then calls loadHTMLTABLE^^
});
//Loads the html table
function loadLeaderboard(data) {
    //Makes the table, selecting the tables tbody from the page
    const table = document.querySelector('table tbody');

    //Check the returned data, if it is empty, i.e 0, then we
    //need to put something in the leaderboard.
    //console.log(data);
    if (data.length === 0) {
        table.tmpHTML = "<tr><td class='no-data' colspan='2'>No Data</td></tr>";
        return;
    }
    //Generate the table rows tableHTMl, tmpHtml is just that, and inc is just to tick through the data
    let tmpHtml = "";
    let inc = 0;
    //Creates a row, then fills it with the data
    //first the username, followed by score and then gamesplayed
    //lastly increment so the next value is used.
    data.forEach(function ({username, score}) {
        tmpHtml += "<tr>";
        tmpHtml += "<td>" + data[inc].username + "</td>";
        tmpHtml += "<td>" + data[inc].score + "</td>";
        tmpHtml += "<td>" + data[inc].gamesplayed + "</td>"
        tmpHtml += "</tr>";
        inc++
    });
    //add the tmp html to the table
    table.innerHTML += tmpHtml;
}