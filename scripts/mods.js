
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Showing a random mod from the array 
function use_modlist(data) {
  let mod_array = Object.values(data);
  let temp = getRandomInt(mod_array.length);
  // @ts-ignore
  document.getElementById("mod_list").innerHTML = mod_array[temp].split('\n').join('<br/>');
}

//document.querySelector("search_input").addEventListener("input", filterList)

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

function search2() {
  let input = document.getElementById("search_input").value;
  input = input.toLowerCase();
  let td; 
  let tr = document.getElementsByTagName("TR");

for (let i = 0; i < tr.length; i++) {
  td = tr[i].getElementsByTagName("TD")[0];
  if (!td.innerHTML.toLowerCase().includes(input)) {
    tr[i].style.display = "none";
  } else tr[i].style.display = "";
}

  console.log("Search event");
}  