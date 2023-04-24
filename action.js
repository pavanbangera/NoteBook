let addTitle = document.getElementById("addTitle");
let addTxt = document.getElementById("addTxt");
let addBtn = document.getElementById("addBtn");
show();
time = new Date();
date = time.getDate();
month = time.getMonth();
year = time.getFullYear();
addTime = date + ":" + month + ":" + year;
// console.log(addTime);

addBtn.addEventListener("click", () => {
  noteTitle = addTitle.value;
  noteTxt = addTxt.value;
  if (noteTxt != "" && noteTitle != "") {
    let localnote = localStorage.getItem("notebook");

    if (localnote == null) {
      noteset = [];
    } else {
      noteset = JSON.parse(localnote);
    }

    myNote = { title: noteTitle, text: noteTxt, time: addTime };
    console.log(myNote);
    noteset.push(myNote);
    localStorage.setItem("notebook", JSON.stringify(noteset));
    addTitle.value = "";
    addTxt.value = "";
    addTxt.setAttribute("placeholder", "Add Your Note Here");
  } else {
    addTxt.setAttribute("placeholder", "Please Enter Note Here");
  }
  // console.log(noteset);
  show();
});
function show() {
  let localnote = localStorage.getItem("notebook");

  if (localnote == null) {
    noteset = [];
  } else {
    noteset = JSON.parse(localnote);
  }

  let html = "";
  noteset.forEach(function (element, index) {
    html += ` <div class="col-sm-3">
    <div
      class="card noteCard"
      
      style="min-width: 5rem; margin-bottom: 10px"
    >
      
     
                      <div class="card-body" style="position: relative;">
                      <h5 class="card-title">Note ${index + 1}-"${
      element.title
    }"</h5>
                      <h6 class="" style="font-size: 10px;position:absolute;right:15px;bottom:1px;"> ${
                        element.time
                      }</h6>
                      <p class="card-text">
                      ${element.text}.
                      </p>
                      <button id="${index}" onclick="deletenote(this.id)" class="btn btn-danger" >Delete</button>
                    </div>
                    </div>
                    </div>`;
  });
  let card = document.getElementById("card");
  if (noteset.length != 0) {
    card.innerHTML = html;
  } else {
    card.innerHTML = `<div class="alert alert-warning" role="alert">
     Not available Any Note At a Time " Please Add a Note" `;
  }
}
function deletenote(index) {
  // console.log(index);
  let localnote = localStorage.getItem("notebook");

  if (localnote == null) {
    noteset = [];
  } else {
    noteset = JSON.parse(localnote);
  }
  noteset.splice(index, 1);
  localStorage.setItem("notebook", JSON.stringify(noteset));
  show();
}

let search = document.getElementById("search");
let findNote = localStorage.getItem("notebook");
search.addEventListener("input", () => {
  searchTxt = search.value.toLowerCase();
  if (findNote == null) {
    findTxt = [];
  } else {
    findTxt = JSON.parse(findNote);
  }
  let card = document.getElementsByClassName("noteCard");
  Array.from(card).forEach((element) => {
    cardTxt = element.getElementsByTagName("p")[0];
    cardTitle = element.getElementsByTagName("h5")[0];
    console.log(cardTxt, cardTitle);
    cardTxt = cardTxt.innerText.toLowerCase();
    cardTitle = cardTitle.innerText.toLowerCase();
    if (cardTxt.includes(searchTxt) || cardTitle.includes(searchTxt)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
