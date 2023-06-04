document.addEventListener("DOMContentLoaded",()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const tile_size = urlParams.get("tile_size");
    const tlimit = urlParams.get("tlimit");
    console.log("ts: " + tile_size);console.log("tl: " + tlimit);
    let time;
    let time_counter;
    var table = document.getElementById("tabulka");
    var selected = [];
    var found_counter = 0;
    var isTimeUp = false;
    var ctverecky = ["img/car_yellow.png","img/car_yellow.png",
                    "img/f_blue.png","img/f_blue.png",
                    "img/g_purple.png","img/g_purple.png",
                    "img/k_weird.png", "img/k_weird.png",
                    "img/l_brown.png","img/l_brown.png",
                    "img/p_red.png","img/p_red.png",
                    "img/q_cyan.png","img/q_cyan.png",
                    "img/tort_green.png","img/tort_green.png"];

    var pozice = ["piece00","piece01","piece02","piece03",
                  "piece10","piece11","piece12","piece13",
                  "piece20","piece21","piece22","piece23",
                  "piece30","piece31","piece32","piece33"]; 
    var poz = pozice; //used purely for removingListeners after you find all pieces
    if(tile_size == "undefined" || tlimit == "undefined"){
        document.write("You know you have to pick option from each settings right?</br><a href='select_screen.html'>Back</a>");
    }
    else{
        switch(tlimit){
            case "none":
                time = 0;
                time_counter = setInterval(()=>{
                    time++;
                    if(time >= 60){
                        var minutes = Math.floor(time / 60);
                        document.getElementById("counter").innerHTML = "Time: " + minutes + " minutes and " + Math.floor(time - minutes * 60) + " seconds";
                        //console.log(time);
                    }
                    else{
                        document.getElementById("counter").innerHTML = "Time: " + time + " seconds";
                    }
                }, 1000);
                break;
            case "thirty":
                time = 30;
                time_counter = setInterval(()=>{
                    time--;
                    document.getElementById("counter").innerHTML = "Time: " + time + " seconds";
                    if(time == 0){
                        isTimeUp = true;
                        document.getElementById("error").innerHTML = "Time limit is up!";
                        document.getElementById("error").style.marginLeft = "1em";
                        document.getElementById("again").style.display = "inline";
                        document.getElementById("back2menu").style.display = "inline";
                        clearInterval(time_counter);
                    }
                }, 100);
                break;
            case "sixty":
                break;
            case "ninety":
                break;            
        }
    }  
    //Estabilishing a grid
    for(let i = 0; i < 4; i++){
    let tr = document.createElement("tr");
    table.append(tr);
    for(let j = 0; j < 4; j++){
        let td = document.createElement("td");
        td.classList.add("piece" + i + j);
        function clickOnPiece(e){
            //td has class, img inside has id. We want to apply click event on IMG
            if(isTimeUp == true){
                //No reaction after time is up
            }
            else{
                if(e.target.id != ""){
                if(selected.length == 2){
                    if(e.target.id != "selected"){
                        document.getElementById("error").innerHTML = "You can not select more than two pieces!"
                        setTimeout(()=>{
                            document.getElementById("error").innerHTML = "";
                        }, 1000);
                    }
                    else{
                        e.target.id = "piece" + i + j;
                        selected.pop(e.target);
                    }
                }
                else{
                    if(e.target.id != "selected"){
                        if(e.target.id == "found"){
                            document.getElementById("error").innerHTML="You already found this one!";
                            setTimeout(()=>{document.getElementById("error").innerHTML = "";}, 1000);
                            e.target.id = "found";
                        }
                        else{
                            e.target.id = "selected";
                            selected.push(e.target);
                            if(selected.length == 2 && selected[0].src == selected[1].src){
                                selected[0].id = "found";selected[1].id = "found";
                                selected.splice(0,2);
                                found_counter += 2;
                                if(found_counter == 16){
                                    document.getElementById("error").innerHTML = "You have found all pieces!";
                                    document.getElementById("error").style.marginLeft = "1em";
                                    document.getElementById("again").style.display = "inline";
                                    document.getElementById("back2menu").style.display = "inline";
                                    clearInterval(time_counter);
                                }
                            }
                            if(selected.length == 2 && selected[0].src != selected[1].src){
                                pozice.forEach(element => {
                                    element.removeEventListener("click",function(){});
                                });
                                setTimeout(()=>{
                                    selected[0].id = "piece" + i + j;selected[1].id = "piece" + i + j;
                                selected.splice(0,2);
                                }, 500);
                            }
                        }
                    }
                    else{
                        //In older version, you could show piece and hide it and cheat. This is not possible now :P
                    }
                }
            }
            }
           
            console.log(selected)
        }
        td.addEventListener("click", clickOnPiece);
        tr.append(td);
        }
    }
    //Filling the grid with pexeso
    ctverecky.forEach(element => {
        let randompos = Math.floor(Math.random() * pozice.length);
        let targetElement = document.querySelector("." + pozice[randompos]);
        if (targetElement) {
            targetElement.innerHTML = "<img src='" + element + "' id='" + "img" + pozice[randompos] +  "' draggable='false'>"
            pozice.splice(randompos, 1);
            }
        });
    });