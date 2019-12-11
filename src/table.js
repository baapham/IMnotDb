import createModal from './modals';

function initTable() {
    let root = document.getElementById("root");
    let responsiveTable = document.createElement("div");
    responsiveTable.className = "table-responsive";
    let rootTable = document.createElement("table");
    rootTable.className = "table table-hover table-bordered mx-auto mt-5";
    rootTable.style = "width: 900px;";
    let tableHead = createTableHead("thead-dark", ["Movie", "Date", "Ratings"]);
    let tableBody = document.createElement("tbody");
    rootTable.appendChild(tableHead);
    rootTable.appendChild(tableBody);
    root.appendChild(rootTable);
    let i = 0;
    const perPage = 19;
    createTableContent(i, i + perPage, tableBody)
    // simulates infinite scroll
    window.onscroll = function() {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && i <= 80) {
            createTableContent(i, i + perPage, tableBody)
            i += 20;
        }
    };
    let modalContainer = document.createElement("div");
}

// creates the header of the table on the home page
function createTableHead(classType, columnNames) {
    let head = document.createElement("thead");
    head.className = classType;
    let row = document.createElement("tr");
    for (let i of columnNames) {
        let cell = document.createElement("th");
        cell.scope = "col";
        cell.innerText = i;
        row.appendChild(cell);
    }
    head.appendChild(row);
    return head;
}

// initialises the top 100 movies on the home page
// grabs this list from the json file in data folder
function createTableContent(start, end, body) { 
    fetch("../data/top100.json")
    .then((r) => r.json())
    .then((r) => {
        for (let i = start; i < end; i++) {
            const movie = r[i];
            let movieRow = document.createElement("tr");
            movieRow.setAttribute("style", "cursor: pointer");
            movieRow.setAttribute("data-toggle", "modal");
            movieRow.setAttribute("data-target", movie.imdbID);
            let movieTitle = document.createElement("th");
            movieTitle.setAttribute("scope", "row");
            movieTitle.innerText = movie.Title;
            let movieDate = document.createElement("td");
            movieDate.innerText = movie.Released;
            let movieRating = document.createElement("td");
            let ratingString = '';
            for (let rating of movie.Ratings) {
                ratingString = ratingString + `${rating.Source}: ${rating.Value}\n`
            }
            movieRating.innerText = ratingString;
            movieRow.appendChild(movieTitle);
            movieRow.appendChild(movieDate);
            movieRow.appendChild(movieRating);
            body.appendChild(movieRow);
        }
    });
}


export default initTable;