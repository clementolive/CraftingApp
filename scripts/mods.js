
// Showing a random mod from the array 
function use_modlist(data){
    let mod_array = Object.values(data); 
    let temp = getRandomInt(mod_array.length); 
    // @ts-ignore
    document.getElementById("mod_list").innerHTML = mod_array[temp].split('\n').join('<br/>'); 
}

//get mod list in JSON 
let res = fetch('data/flavour.json')
  .then((response) => response.json())
  .then((data) => {
    use_modlist(data); 
});

document.querySelector("search_input").addEventListener("input", filterList)

function filterList(){
  const searchInput = document.querySelector("seach_input")

}