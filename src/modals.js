// creates the modal
function createModal(movie) {
    const root = document.getElementById("modal-container");
    let modalDefinition = document.createElement("div");
    modalDefinition.className = "modal fade";
    modalDefinition.id = movie.imdbID;
    modalDefinition.setAttribute("tabindex", "-1");
    modalDefinition.setAttribute("role", "dialog");
    modalDefinition.setAttribute("aria-labelledby", `${movie.imdbID}Label`);
    modalDefinition.setAttribute("aria-hidden", "true");

    let modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog modal-lg";
    modalDialog.setAttribute("role", "document");
    
    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    let modalHeader = createModalHeader(movie);  
    let modalContainer = createModalContainer(movie);  
    let modalFooter = createModalFooter();
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalContainer);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modalDefinition.appendChild(modalDialog)
    root.appendChild(modalDefinition);
}

function createModalHeader(movie) {
    let modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";

    let modalTitle = document.createElement("h5");
    modalTitle.className = "modal-title";
    modalTitle.setAttribute("id", `${movie.imdbID}Label`);
    modalTitle.innerText = movie.Title;

    let closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "close";
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    let closeButtonText = document.createElement("span");
    closeButtonText.setAttribute("aria-hidden", "true");
    closeButtonText.innerHTML = "&times;";
    closeButton.appendChild(closeButtonText);

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    return modalHeader;
}

// Creates a container which displays all information of the movie
function createModalContainer(movie) {
    let modalContainer = document.createElement("div");
    modalContainer.className = "modal-body container";

    let modalRow = document.createElement("div");
    modalRow.className = "row";

    let modalDescriptionLHS = createModalContainerLHS(movie);

    let modalDescriptionRHS = createModalContainerRHS(movie);

    modalRow.appendChild(modalDescriptionLHS);
    modalRow.appendChild(modalDescriptionRHS);
    modalContainer.appendChild(modalRow);
    return modalContainer;
}

// Creates the information on the LHS of a modal
function createModalContainerLHS(movie) {
    let modalDescriptionLHS = document.createElement("div");
    modalDescriptionLHS.className = "col";

    let poster = document.createElement("img");
    poster.src = movie.Poster;
    poster.className = "img-fluid mb-3";

    let director = document.createElement("h6");
    director.innerText = "Director"
    let directorText = document.createElement("p");
    directorText.innerText = movie.Director;

    let boxOffice = document.createElement("h6");
    boxOffice.innerText = "Box Office"
    let boxOfficeText = document.createElement("p");
    boxOfficeText.innerText = movie.BoxOffice;

    let prod = document.createElement("h6");
    prod.innerText = "Production"
    let prodText = document.createElement("p");
    prodText.innerText = movie.Production;

    let classification = document.createElement("h6");
    classification.innerText = "Classification"
    let classificationText = document.createElement("p");
    classificationText.innerText = movie.Rated;

    let runtime = document.createElement("h6");
    runtime.innerText = "Runtime"
    let runtimeText = document.createElement("p");
    runtimeText.innerText = movie.Runtime;

    let releaseDate = document.createElement("h6");
    releaseDate.innerText = "Release Date"
    let releaseDateText = document.createElement("p");

    releaseDateText.innerText = movie.Released;
    modalDescriptionLHS.appendChild(poster);
    modalDescriptionLHS.appendChild(prod);
    modalDescriptionLHS.appendChild(prodText);
    modalDescriptionLHS.appendChild(director);
    modalDescriptionLHS.appendChild(directorText);
    modalDescriptionLHS.appendChild(boxOffice);
    modalDescriptionLHS.appendChild(boxOfficeText);
    modalDescriptionLHS.appendChild(runtime);
    modalDescriptionLHS.appendChild(runtimeText);
    modalDescriptionLHS.appendChild(classification);
    modalDescriptionLHS.appendChild(classificationText);
    modalDescriptionLHS.appendChild(releaseDate);
    modalDescriptionLHS.appendChild(releaseDateText);
    return modalDescriptionLHS;
}
// Creates the information on the RHS of a modal
function createModalContainerRHS(movie) {
    let modalDescriptionRHS = document.createElement("div");
    modalDescriptionRHS.className = "col-8";

    let description = document.createElement("h5");
    description.innerText = "Description";
    let descriptionText = document.createElement("p");
    descriptionText.innerText = movie.Plot;

    let ratingsList = document.createElement("ul");
    ratingsList.className = "list-group mb-3";
    let ratingsTitle = document.createElement("li");
    ratingsTitle.className = "list-group-item active";
    ratingsTitle.innerText = "Ratings";
    ratingsList.appendChild(ratingsTitle);
    if (movie.Ratings[0]) {
        let imdbRating = document.createElement("li");
        imdbRating.className = "list-group-item";
        imdbRating.innerText = `IMDb: ${movie.Ratings[0].Value}`;
        ratingsList.appendChild(imdbRating);
    }
    if (movie.Ratings[1]) {
        let rtRating = document.createElement("li");
        rtRating.className = "list-group-item";
        rtRating.innerText = `Rotten Tomatoes: ${movie.Ratings[1].Value}`;
        ratingsList.appendChild(rtRating);
    }
    if (movie.Ratings[2]) {
        let mcRating = document.createElement("li");
        mcRating.className = "list-group-item";
        mcRating.innerText = `Metacritic: ${movie.Ratings[2].Value}`;
        ratingsList.appendChild(mcRating);
    }
    
    let genresList = createList("Genres", movie, "Genre"); 
    let writersList = createList("Writers", movie, "Writer");
    let starsList = createList("Stars", movie, "Actors");

    modalDescriptionRHS.appendChild(description);
    modalDescriptionRHS.appendChild(descriptionText);
    modalDescriptionRHS.appendChild(ratingsList);
    modalDescriptionRHS.appendChild(genresList);
    modalDescriptionRHS.appendChild(writersList);
    modalDescriptionRHS.appendChild(starsList);
    return modalDescriptionRHS;
}

function createList(title, movie, type) {
    let list = document.createElement("ul");
    list.className = "list-group mb-3";
    let listTitle = document.createElement("li");
    listTitle.className = "list-group-item active";
    listTitle.innerText = title;
    list.appendChild(listTitle);
    let listArray = movie[type].split(", ");
    for (let i of listArray) {
        let item = document.createElement("li");
        item.className = "list-group-item";
        item.innerText = i;
        list.appendChild(item);
    }
    return list;
}

// creates the footer of the modal
function createModalFooter() {
    let footer = document.createElement("div");
    footer.className = "modal-footer";
    let closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn btn-secondary";
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.innerText = "Close";
    footer.appendChild(closeButton);
    return footer;
}

export default createModal;