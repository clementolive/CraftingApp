
let resource = document.getElementById("resources"); 
let resource_logout = document.getElementById("resources_logout"); 

function increment(){
    resource.innerHTML = parseInt(resource.innerHTML) + 1; 
    resource_logout.value = resource.innerHTML; //used for storing resource on logout 
    console.log("incremented"); 
    setTimeout(increment, 1000); 
}

increment(); 

// JQUERY PART 
$(document).ready(function(){

    // jQuery methods go here...
    //$("p1").hide(); 
  
  });
