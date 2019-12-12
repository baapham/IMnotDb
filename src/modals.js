function createModal(movie) {
    const root = document.getElementById("modal-container");
    let modalDefinition = document.createElement("div");
    modalDefinition.className = "modal fade";
    modalDefinition.id = movie.imdbID;
    modalDefinition.setAttribute("tabindex", "-1");
    modalDefinition.setAttribute("role", "dialog");
    modalDefinition.setAttribute("aria-labelledby", `${movie.imdbID}Label`);
    modalDefinition.setAttribute("aria-hidden", "true");
    root.appendChild(modalDefinition);
}

export default createModal;