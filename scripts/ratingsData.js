const data = function(callback){
    let xhttp = new XMLHttpRequest();
    xhttp.overrideMimeType("application/json");
    xhttp.open("GET","temp/data.json", true);
    xhttp.onreadystatechange = function() {
        if(xhttp.status == "200" && xhttp.readyState === 4){
            callback(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.send();
};

async function populateKillerTable(json){
    let objs = json;
    let table = document.getElementById("killerTable");
    for(let i=0; i < objs.length; i++) {
        let obj = objs[i];
        let row = document.createElement("tr");
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
        let rating = document.createElement("td");
        let aRating = document.createElement("a");
        aRating.href = "#";
        aRating.setAttribute("data-toggle", "modal");
        aRating.setAttribute("data-target", "#ratingsModal");
        aRating.innerText = obj.rating;
        rating.appendChild(aRating);
        let reason = document.createElement("td");
        reason.innerText = obj.reason;
        row.appendChild(name);
        row.appendChild(rating);
        row.appendChild(reason);
        table.appendChild(row);
    }
}