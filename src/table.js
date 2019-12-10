function initTable() {
    let root = document.getElementById("root");
    let responsiveTable = document.createElement("div");
    responsiveTable.className = "table-responsive";
    let rootTable = document.createElement("table");
    rootTable.className = "table table-hover table-bordered mx-auto mt-5";
    rootTable.style = "width: 900px;";
    let tableHead = createTableHead("thead-dark", ["Movie", "Date", "Ratings", "Streaming Services"]);
    let tableContent = createTableContent();
    rootTable.appendChild(tableHead);
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
    
}

export default initTable;