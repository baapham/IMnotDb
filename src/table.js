function initTable() {
    let root = document.getElementById("root");
    let responsiveTable = document.createElement("div");
    responsiveTable.className = "table-responsive";
    let rootTable = document.createElement("table");
    rootTable.className = "table table-hover table-bordered mx-auto mt-5";
    rootTable.style = "width: 900px;";
    let tableHead = createTableHead("thead-dark", ["Movie", "Date", "Ratings"]);
    let tableContent = createTableContent();
    rootTable.appendChild(tableHead);
    rootTable.appendChild(tableContent);
    root.appendChild(rootTable);
}

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

function createTableContent() {
    let body = document.createElement("tbody");
    fetch("../data/top100.json")
    .then((r) => r.json())
    .then((r) => {
        for (let movie of r) {
            console.log(movie);
            let movieRow = document.createElement("tr");
            let movieTitle = document.createElement("th");
            movieTitle.setAttribute("scope", "row");
            movieTitle.innerText = movie.Title;
            let movieDate = document.createElement("td");
            movieDate.innerText = movie.Released;
            let movieRating = document.createElement("td");
            let ratingString = '';
            for (let rating of movie.Ratings) {
                console.log(rating);
                ratingString = ratingString + `${rating.Source}: ${rating.Value} `
            }
            movieRating.innerText = movie.ratingString;

            movieRow.appendChild(movieTitle);
            movieRow.appendChild(movieDate);
            movieRow.appendChild(movieRating);
            body.appendChild(movieRow);
        }
    });
    return body;
}

export default initTable;