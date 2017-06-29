/*jshint esversion: 6 */

function numHits(weaponSkill,attacks) {
  return attacks*((7-weaponSkill)/6);
}
function perWounds(str,tough) {
  var ratio = tough/str;
  var rollneeded;
  if(ratio <= 0.5){
    rollneeded=2;
  }
  else if(ratio < 1){
    rollneeded=3;
  }
  else if(ratio == 1){
    rollneeded=4;
  }
  else if(ratio >= 2){
    rollneeded=6;
  }
  else if(ratio > 1){
    rollneeded=5;
  }
  return ((7-rollneeded)/6);
}
function armorSave(save,rend){
  var val = ((7-save-rend)/6);
  if (val < 0){
    return 1;
  } return 1-val;
}
function compareSheets(falchion,sword,stave, halberd){
  var array = [falchion,sword,stave, halberd];
  var index = array.indexOf(Math.max(array));
  switch (index){
    case 0:
      return "falchion";
    case 1:
      return "sword";
    case 2:
      return "stave";
    case 3:
      return "halberd";
    default:
      return index;
  }
}
function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  var i = 0;
  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');
    if(i === 0){
      row.className = "header";
    }
    var j = 0;
    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      if(j === 0){
        cell.className = "lefter";
      }
      row.appendChild(cell);
      j++;
    });

    tableBody.appendChild(row);
    i++;
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}
var sword = {name:"sword", str:0, rend:3};
var falchion = {name:"falchion", str:0, rend:2};
var halberd = {name:"halberd", str:1, rend:2};
var stave = {name:"stave", str:2, rend:1};

var Ws = 2;
var baseStr = 4;
var numAttacks = 3;

var swordArray = [];
for (i = 0; i < 10; i++){
  if (i===0){
    swordArray.push(["Save","Opp Toughness 1",2,3,4,5,6,7,8,9,10]);
  } else{
    var lateralArray = [i];
    for (j = 1; j < 11; j++){
      lateralArray.push(numHits(Ws,numAttacks) * perWounds(baseStr + sword.str,j) * armorSave(i,sword.rend));
    }

    swordArray.push(lateralArray);
  }

}
$(document.body).append('<div>Sword</div>');
createTable(swordArray);
$(document.body).append('<div>Falchion</div>');
var falchionArray = [];
for (i = 0; i < 10; i++){
  if (i===0){
    falchionArray.push(["Save","Opp Toughness 1",2,3,4,5,6,7,8,9,10]);
  } else{
    var lateralArray = [i];
    for (j = 1; j < 11; j++){
      lateralArray.push(numHits(Ws,numAttacks+1) * perWounds(baseStr + falchion.str,j) * armorSave(i,falchion.rend));
    }

    falchionArray.push(lateralArray);
  }

}
createTable(falchionArray);
$(document.body).append('<div>Halberd</div>');
var halberdArray = [];
for (i = 0; i < 10; i++){
  if (i===0){
    halberdArray.push(["Save","Opp Toughness 1",2,3,4,5,6,7,8,9,10]);
  } else{
    var lateralArray = [i];
    for (j = 1; j < 11; j++){
      lateralArray.push(numHits(Ws,numAttacks) * perWounds(baseStr + halberd.str,j) * armorSave(i,halberd.rend));
    }

    halberdArray.push(lateralArray);
  }

}
createTable(halberdArray);

$(document.body).append('<div>Stave</div>');
var staveArray = [];
for (i = 0; i < 10; i++){
  if (i===0){
    staveArray.push(["Save","Opp Toughness 1",2,3,4,5,6,7,8,9,10]);
  } else{
    var lateralArray = [i];
    for (j = 1; j < 11; j++){
      console.log(j);
      lateralArray.push(numHits(Ws,numAttacks) * perWounds(baseStr + stave.str,j) * armorSave(i,stave.rend));
    }

    staveArray.push(lateralArray);
  }
}
createTable(staveArray);

$(document.body).append('<div>Compare</div>');
compareArr = [["Save","Opp Toughness 1",2,3,4,5,6,7,8,9,10]];
for (i = 1; i < 10; i++){
  var lateralArray = [i];
  for (j = 1; j < 11; j++){
    allItems = [staveArray[i][j], halberdArray[i][j], swordArray[i][j], falchionArray[i][j]];
    var max = allItems.reduce(function(a, b) {
      return Math.max(a, b);
    });
    var topVal = '';


    if (staveArray[i][j] == max){
      topVal = topVal + "stave";

    } if (halberdArray[i][j] == max){
      topVal = topVal + "halberd";
    } if (swordArray[i][j] == max){
      topVal = topVal + "sword";
    } if (falchionArray[i][j] == max){
      topVal = topVal + "falchion";
    }
    lateralArray.push(topVal);
  }
  compareArr.push(lateralArray);
}
createTable(compareArr);
