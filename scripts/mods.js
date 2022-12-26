
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function search() {
  //const searchInput = document.querySelector("seach_input")
  let input = document.getElementById("search_input").value;
  input = input.toLowerCase();

  let x = document.getElementsByTagName("tr");
  for (let index = 0; index < x.length; index++) { // iterate rows 

    if (!x[index].innerHTML.toLowerCase().includes(input)) {
      x[index].style.display = "none";
    } else x[index].style.display = "table-row";
  }

  console.log("Search event");
}

function use_gem_data(data){
  let gems_array = Object.values(data); 
  console.log(gems_array); 

  var table = document.createElement("table"), row, cellA, cellB;
  document.getElementById("test").appendChild(table);
  
  for (let key in gems_array) {
      if( gems_array[key].active_skill != undefined && 
        gems_array[key].active_skill.display_name.length > 0){
        // (C2) ROWS & CELLS
        row = table.insertRow();
        cellA = row.insertCell();
        cellB = row.insertCell();

        // (C3) KEY & VALUE
        cellA.innerHTML = key; 
        cellB.innerHTML = gems_array[key].active_skill.display_name;
      }
  }
}

//JSON fetch gem data (local file) 
fetch('data/gems.json')
  .then((response) => response.json())
  .then((data) => {
    use_gem_data(data); 
});