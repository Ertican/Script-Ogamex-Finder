async function getPlayerPlanets(coordsVector, playersVector, playerName){
  await chrome.storage.local.get(["coordsV", "playersV"], function(result){
    coordsVector = result.coordsV;
    playersVector = result.playersV;

    let myDiv = document.getElementById("myDiv");
    let splittedString;
    let linkString = "";
    let planetCounter = 0;

    for (i = 0; i < coordsVector.length; i++){
      if (playersVector[i].toLowerCase() == playerName.toLowerCase()){
        splittedString = coordsVector[i].split(":");
        linkString = "/galaxy?x=" + splittedString[0] + "&y=" + splittedString[1];
        myDiv.innerHTML += "<a href=" + linkString + " style='color: white' target='_blank'>" + coordsVector[i] + "</a><br>";
        planetCounter += 1;
      }
    }
    myDiv.innerHTML += playerName + ", found: " + planetCounter.toString() + " planets.<br>";
  });
}
function searchPlanets(){
  var playerName = document.getElementById("galaxy-search").value;
  if (playerName == ""){
    return -1;
  }
  if (playerName.length > 15){
    playerName = playerName.slice(0, 15) + "...";
  }
  getPlayerPlanets(coordsVector, playersVector, playerName);
}

var coordsVector = [];
var playersVector = [];

let menu = document.getElementById("left-menu-1");
menu.innerHTML += "<div id='myDiv'><a href='/galaxy/galaxydata?x=1&y=1' target='_blank' style='color: white'>Mapear Server</a><br><br><input type='text' placeholder='player name' id='galaxy-search'/><input type='button' id='btn-galaxy-extension' value='search'/><br></div>";

document.getElementById("btn-galaxy-extension").addEventListener("click", searchPlanets);
