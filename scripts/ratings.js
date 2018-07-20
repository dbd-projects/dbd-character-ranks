/**
 * Gets the data from the json file (will need to become a database rest call later)
 * @param {*} callback The function to be called and given the data
 */
function getData(callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.overrideMimeType("application/json");
    xhttp.open("GET","temp/data.json", true);
    xhttp.onreadystatechange = function() {
        if(xhttp.status == "200" && xhttp.readyState === 4){
            callback(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.send();
}

/**
 * This function populates the data from the function that called it into the killerTable
 * @param {Object} json The json object containing the killers' data
 */
function populateKillerTable(json) {
    let objs = json;
    let table = document.getElementById("killerTable");
    let headers = createHeaders('Killer','Rating','Reason');
    let headersRow = document.createElement('tr');
    headersRow.appendChild(headers.first);
    headersRow.appendChild(headers.second);
    headersRow.appendChild(headers.third);
    for(let i=0; i < objs.length; i++) {
        let obj = objs[i];
        let name = createCharacterColumn(obj);
        let rating = createRatingColumn(obj);
        let reason = createReasonColumn(obj);
        let row = document.createElement("tr");
        row.appendChild(name);
        row.appendChild(rating);
        row.appendChild(reason);
        table.appendChild(row);
    }
}

/**
 * Creates the header row for a table
 * @param first
 * @param second
 * @param third
 * @returns {Object} Returns the headers for a table in an object
 */
function createHeaders(first, second, third){
    let th1 = document.createElement("th");
    th1.innerText = first;
    let th2 = document.createElement("th");
    th2.innerText = second;
    let th3 = document.createElement("th");
    th3.innerText = third;

    return {
        first: th1,
        second: th2,
        third: th3
    };
}

/**
 * Create the character cell for a killer object
 * @param {Object} obj The killer object to insert into the table
 * @returns {Object} Returns the cell to insert into the killerTable
 */
function createCharacterColumn(obj) {
    let name = document.createElement("td");
    let img = document.createElement("img");
    let a = document.createElement("a");
    let nameText = document.createTextNode(obj.name);
    img.src = obj.img;
    a.href = obj.link;
    a.target = "_blank";
    a.appendChild(img);
    a.appendChild(nameText);
    name.appendChild(a);

    return name;
}

/**
 * Create the rating cell for a killer object
 * @param {Object} obj The killer object to insert into the table
 * @returns {Object} Returns the cell to insert into the killerTable
 */
function createRatingColumn(obj) {
    let rating = document.createElement("td");
    let aRating = document.createElement("a");
    aRating.href = "#";
    aRating.setAttribute("data-toggle", "modal");
    aRating.setAttribute("data-target", "#ratingsModal");
    aRating.innerText = obj.rating;
    rating.appendChild(aRating);

    return rating;
}

/**
 * Create the reason cell for a killer object
 * @param {Object} obj The killer object to insert into the table
 * @returns {Object} Returns the cell to insert into the killerTable
 */
function createReasonColumn(obj) {
    let reason = document.createElement("td");
    reason.innerText = obj.reason;

    return reason;
}

async function pageLoad(){
    getData(populateKillerTable);
    includeHTML();
}