import createModal from './modals.js';
import OMDB_API_KEY from '../.env.js';

function initTable() {
    let root = document.getElementById("root");
    let responsiveTable = document.createElement("div");
    responsiveTable.className = "table-responsive";
    let rootTable = document.createElement("table");
    rootTable.id = "rootTable";
    rootTable.className = "table table-hover table-bordered mx-auto mt-5";
    rootTable.style = "width: 900px;";
    let tableHead = createTableHead("thead-dark", ["Movie", "Date", "Ratings"]);
    let tableBody = document.createElement("tbody");
    tableBody.id = "tableBody"
    rootTable.appendChild(tableHead);
    rootTable.appendChild(tableBody);
    root.appendChild(rootTable);
    let modalContainer = document.createElement("div");
    modalContainer.id = "modal-container";
    root.appendChild(modalContainer);
    createTableContent(tableBody)
    
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
function createTableContent(body) { 
    if (body) {
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
    }
    let error = document.getElementById("noMovieError");
    if (error) {
        error.parentNode.removeChild(error);
    }
    fetch("../data/top100.json")
    .then((r) => r.json())
    .then((r) => {
        for (let movie of r) {
            createMovieRow(movie, body);
        }
    });
}

// initialises a search for the user's input
function createSearchTableContent(movieSearch) {
    // console.log(movieSearch);
    const body = document.getElementById("tableBody");
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
    const api = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;
    fetch(`${api}&s=${movieSearch}&type=movie`)
    .then((r) => r.json())
    .then((r) => {
        if (r.Response === "False") {
            let wrapper = document.createElement("div");
            wrapper.className = "d-flex justify-content-center";
            wrapper.id = "noMovieError"
            let noMovieError = document.createElement("div");
            noMovieError.className = "alert alert-danger";
            noMovieError.setAttribute("role", "alert");
            noMovieError.style = "width: 900px;";
            noMovieError.innerText = "There is no movie under that name, please try something else.";
            wrapper.appendChild(noMovieError);
            document.getElementById("root").appendChild(wrapper);
        }
        else {
            let error = document.getElementById("noMovieError");
            if (error) {
                error.parentNode.removeChild(error);
            }
            for (let movie of r.Search) {
                fetch(`${api}&i=${movie.imdbID}`)
                .then((r) => r.json())
                .then((r) => {
                    createMovieRow(r, body);
                })
            }
        }
    });
}

// this function is used in both the handlings of the table
// i.e. in a user inputted search and the top 100
function createMovieRow (movie, body) {
    let movieRow = document.createElement("tr");
    movieRow.setAttribute("style", "cursor: pointer");
    movieRow.setAttribute("data-toggle", "modal");
    movieRow.setAttribute("data-target", `#${movie.imdbID}`);
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
    createModal(movie);
}

export { initTable as default, createSearchTableContent, createTableContent };