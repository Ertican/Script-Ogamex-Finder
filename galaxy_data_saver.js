async function vectorsUpdate(coordsVector, playersVector){
  await chrome.storage.local.get(['coordsV', 'playersV'], function(result){
    coordsVector = result.coordsV;
    playersVector = result.playersV;

    clearStorage();

    let galaxyItems = document.getElementsByClassName("galaxy-info")[0].getElementsByClassName("galaxy-item");

    for (let i = 1; i < 16; i++){
      if(galaxyItems[i].getAttribute("class").indexOf("Empty") < 0){
        if (y != "1"){
          coord = x + ":" + (parseInt(y)-1).toString() + ":" + i.toString();
        } else {
          coord = (parseInt(x)-1).toString() + ":" + "499" + ":" + i.toString();
        }
        playerName = galaxyItems[i].getElementsByClassName("galaxy-col col-player")[0].getElementsByTagName("span")[0].innerHTML;
        coordsVector.push(coord);
        playersVector.push(playerName);
      }
    }

    saveVectors(coordsVector, playersVector);
  });
}
async function saveVectors(coordsVector, playersVector){
  await chrome.storage.local.set({coordsV: coordsVector, playersV: playersVector});
}
async function clearStorage(){
  await chrome.storage.local.clear();
}
function getUrlParameters(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams;
}

urlParameters = getUrlParameters();
var x = urlParameters.get("x");
var y = urlParameters.get("y");
var coord, playerName;
var coordsVector = [];
var playersVector = [];

if(!(x == "1" && y == "1")){
  vectorsUpdate(coordsVector, playersVector);
} else {
  clearStorage();
  let galaxyItems = document.getElementsByClassName("galaxy-info")[0].getElementsByClassName("galaxy-item");

  for (let i = 1; i < 16; i++){
    if(galaxyItems[i].getAttribute("class").indexOf("Empty") < 0){
      coord = x + ":" + y + ":" + i.toString();
      playerName = galaxyItems[i].getElementsByClassName("galaxy-col col-player")[0].getElementsByTagName("span")[0].innerHTML;
      coordsVector.push(coord);
      playersVector.push(playerName);
    }
  }
  saveVectors(coordsVector, playersVector);
}

if (y == "499"){
  x = (parseInt(x) + 1).toString();
  y = "1";
} else {
  y = (parseInt(y) + 1).toString();
}

if(x != "7"){
  window.location.href = "/galaxy/galaxydata?x=" + x + "&y=" + y;
} else {
  window.close();
}
