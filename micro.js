 

var btn=document.getElementById('heart-icon');

function Toggle(){


    if(btn.classList.contains("fa-regular")){
        console.log("add like");
        btn.classList.remove("fa-regular");
        btn.classList.add("fa-solid");
        

    }
    else{
        console.log("Remove like");
        btn.classList.remove("fa-solid");
        btn.classList.add("fa-regular");
        
    }
}
  
