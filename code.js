/*jshint esversion: 6 */

var tabList = [];

$('#factionContainer').append('<div>Grey Knights</div>');
$('#factionContainer').append('<ul id="greyKnigtUnits" class="list-group"></ul>');
grey_knight_units.forEach(function(item, index){
  var element = units[item];
  var unitName = Array.isArray(element.name) ? element.name[0] : element.name;
  $("#greyKnigtUnits").append('<li class="list-group-item" id="list' + element.shortName + '">' + unitName + '</li>');
  $("#list"+element.shortName).click(
    function(){
      createTab(element);
    }
  );
});
$('#factionContainer').append('<div>Genestealer Cult</div>');
$('#factionContainer').append('<ul id="genestealerCultUnits" class="list-group"></ul>');
genestealer_cult_units.forEach(function(item, index){
  var element = units[item];
  var unitName = Array.isArray(element.name) ? element.name[0] : element.name;
  $("#genestealerCultUnits").append('<li class="list-group-item" id="list' + element.shortName + '">' + unitName + '</li>');
  $("#list"+element.shortName).click(
    function(){
      createTab(element);
    }
  );
});

function flat(data) {
  var r = [].concat.apply([], data);
  return r;
}

function HTMLEncodeString (rawStr){
  return rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
   return '&#'+i.charCodeAt(0)+';';
  });
}

function createTab(data){
  tabId = data.shortName;
  if(tabList.indexOf(tabId) === -1){
    tabList.push(tabId);
    $(".tab-content").append('<div class="tab-pane" id="' + tabId + '"></div>');
    sheetCreation(data, tabId);
    var unitName = Array.isArray(data.name) ? data.name[0] : data.name;
    $(".nav-tabs").append('<li><a href="#' + tabId + '" data-toggle="tab">'+ unitName + '<button class="close closeTab" type="button">x</button></a></li>');

    registerCloseEvent();
  }

}
//this method will register event on close icon on the tab..
function registerCloseEvent() {

    $(".closeTab").click(function () {

        //there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
        var tabContentId = $(this).parent().attr("href");
        tabList.splice(tabList.indexOf(tabContentId));
        $(this).parent().parent().remove(); //remove li of tab
        $('#myTab a:last').tab('show'); // Select first tab
        $(tabContentId).remove(); //remove respective tab content

    });
}
function sheetCreation(data, tabId){
  $("#"+tabId).append('<div class="unitContainer"></div>');
  $("#"+tabId +" .unitContainer").append('<div class="unitHeader row"></div>');
  $("#"+tabId +" .unitContainer .unitHeader").append('<div class="unitType blackTitle col-sm-1 h5">' + data.type + "</div>");
  $("#"+tabId +" .unitContainer .unitHeader").append('<div class="unitPower blackTitle col-sm-1 h5">' + data.pow + " power</div>");
  var unitName = Array.isArray(data.name) ? data.name[0] : data.name;
  $("#"+tabId +" .unitContainer .unitHeader").append('<div class="unitTitle blackTitle col-sm-10 h2">' + unitName + "</div>");

  $("#"+tabId +" .unitContainer").append('<div class="primaryStats row"></div>');
  $("#"+tabId +" .unitContainer .primaryStats").append('<div class="row primaryStatTitle"></div>');
  $("#"+tabId +" .unitContainer .primaryStatTitle").append('<div class="unitStatTitle col-sm-2">' + "NAME" + "</div>");
  $("#"+tabId +" .unitContainer .primaryStatTitle").append('<div class="unitStatTitle col-sm-1">' + "M" + "</div>");
  $("#"+tabId +" .unitContainer .primaryStatTitle").append('<div class="unitStatTitle col-sm-1">' + "WS" + "</div>");
  $("#"+tabId +" .unitContainer .primaryStatTitle").append('<div class="unitStatTitle col-sm-1">' + "BS" + "</div>");
  $("#"+tabId +" .unitContainer .primaryStatTitle").append('<div class="unitStatTitle col-sm-1">' + "S" + "</div>");
  $("#"+tabId +" .unitContainer .primaryStatTitle").append('<div class="unitStatTitle col-sm-1">' + "T" + "</div>");
  $("#"+tabId +" .unitContainer .primaryStatTitle").append('<div class="unitStatTitle col-sm-1">' + "W" + "</div>");
  $("#"+tabId +" .unitContainer .primaryStatTitle").append('<div class="unitStatTitle col-sm-1">' + "A" + "</div>");
  $("#"+tabId +" .unitContainer .primaryStatTitle").append('<div class="unitStatTitle col-sm-1">' + "LD" + "</div>");
  $("#"+tabId +" .unitContainer .primaryStatTitle").append('<div class="unitStatTitle col-sm-1">' + "SV" + "</div>");


  if (Array.isArray(data.name)) {
    data.name.forEach(function(element, index){
      $("#"+tabId +" .unitContainer .primaryStats").append('<div class="primaryStatValues row unit' + index + '"></div>');
      $("#"+tabId +" .unitContainer .primaryStatValues.unit" + index).append('<div class=" col-sm-2">' + data.name[index] + "</div>");
      $("#"+tabId +" .unitContainer .primaryStatValues.unit" + index).append('<div class=" col-sm-1">' + data.m[index] + '"</div>');
      $("#"+tabId +" .unitContainer .primaryStatValues.unit" + index).append('<div class=" col-sm-1">' + data.ws[index] + "+</div>");
      $("#"+tabId +" .unitContainer .primaryStatValues.unit" + index).append('<div class=" col-sm-1">' + data.bs[index] + "+</div>");
      $("#"+tabId +" .unitContainer .primaryStatValues.unit" + index).append('<div class=" col-sm-1">' + data.s[index] + "</div>");
      $("#"+tabId +" .unitContainer .primaryStatValues.unit" + index).append('<div class=" col-sm-1">' + data.t[index] + "</div>");
      $("#"+tabId +" .unitContainer .primaryStatValues.unit" + index).append('<div class=" col-sm-1">' + data.w[index] + "</div>");
      $("#"+tabId +" .unitContainer .primaryStatValues.unit" + index).append('<div class=" col-sm-1">' + data.a[index] + "</div>");
      $("#"+tabId +" .unitContainer .primaryStatValues.unit" + index).append('<div class=" col-sm-1">' + data.ld[index] + "</div>");
      $("#"+tabId +" .unitContainer .primaryStatValues.unit" + index).append('<div class=" col-sm-1">' + data.sv[index] + "+</div>");
    });
  } else{
    $("#"+tabId +" .unitContainer .primaryStats").append('<div class="primaryStatValues row"></div>');
    $("#"+tabId +" .unitContainer .primaryStatValues").append('<div class=" col-sm-2">' + data.name + "</div>");
    $("#"+tabId +" .unitContainer .primaryStatValues").append('<div class=" col-sm-1">' + data.m + '"</div>');
    $("#"+tabId +" .unitContainer .primaryStatValues").append('<div class=" col-sm-1">' + data.ws + "+</div>");
    $("#"+tabId +" .unitContainer .primaryStatValues").append('<div class=" col-sm-1">' + data.bs + "+</div>");
    $("#"+tabId +" .unitContainer .primaryStatValues").append('<div class=" col-sm-1">' + data.s + "</div>");
    $("#"+tabId +" .unitContainer .primaryStatValues").append('<div class=" col-sm-1">' + data.t + "</div>");
    $("#"+tabId +" .unitContainer .primaryStatValues").append('<div class=" col-sm-1">' + data.w + "</div>");
    $("#"+tabId +" .unitContainer .primaryStatValues").append('<div class=" col-sm-1">' + data.a + "</div>");
    $("#"+tabId +" .unitContainer .primaryStatValues").append('<div class=" col-sm-1">' + data.ld + "</div>");
    $("#"+tabId +" .unitContainer .primaryStatValues").append('<div class=" col-sm-1">' + data.sv + "+</div>");
  }
  $("#"+tabId +" .unitContainer").append('<div class="weaponsStats row"></div>');
  $("#"+tabId +" .unitContainer .weaponsStats").append('<div class="baseEquipment">' + data.equipment + '</div>');
  $("#"+tabId +" .unitContainer .weaponsStats").append('<div class="weaponStatsSelection row collapse"></div>');
  $("#"+tabId +" .unitContainer .weaponsStats").append('<div class="weaponStatsHeader row"></div>');
  $("#"+tabId +" .unitContainer .weaponsStats .weaponStatsHeader").append('<div class="unitStatTitle col-sm-1">' + "WEAPON" + "</div>");
  $("#"+tabId +" .unitContainer .weaponsStats .weaponStatsHeader").append('<a class="weaponStatsToggle col-sm-1" data-toggle="collapse" data-target="#' + tabId +' .unitContainer .weaponsStats .weaponStatsSelection">' + "toggle" + "</a>");
  $("#"+tabId +" .unitContainer .weaponsStats .weaponStatsHeader").append('<div class="unitStatTitle col-sm-1">' + "RANGE" + "</div>");
  $("#"+tabId +" .unitContainer .weaponsStats .weaponStatsHeader").append('<div class="unitStatTitle col-sm-2">' + "TYPE" + "</div>");
  $("#"+tabId +" .unitContainer .weaponsStats .weaponStatsHeader").append('<div class="unitStatTitle col-sm-1">' + "S" + "</div>");
  $("#"+tabId +" .unitContainer .weaponsStats .weaponStatsHeader").append('<div class="unitStatTitle col-sm-1">' + "AP" + "</div>");
  $("#"+tabId +" .unitContainer .weaponsStats .weaponStatsHeader").append('<div class="unitStatTitle col-sm-1">' + "D" + "</div>");
  $("#"+tabId +" .unitContainer .weaponsStats .weaponStatsHeader").append('<div class="unitStatTitle col-sm-1">' + "ABILITIES" + "</div>");
  $("#" + tabId + " .unitContainer .weaponsStats").append('<div class="weaponStatHolder row"</div>');

  if (data.weapons()) {
    var weaponsDisplayed = [];
    var weaponCount = 0;
    data.weapons().forEach(function(element, index){
        console.log(element);
        weaponCount++;
        var thisWeapon = weaponCount;
        weaponStats = weaponStatList[element];
        $("#" + tabId + " .unitContainer .weaponsStats .weaponStatsSelection").append('<label class="checkbox-inline ' + element +'">' + weaponStats.name + '</label>');
        $("#" + tabId + " .unitContainer .weaponsStats .weaponStatHolder").append('<div class="hidden weaponStatLines row ' + element +' weapon'+ thisWeapon + '"></div>');
        $("#" + tabId + " .unitContainer .weaponsStats .weaponStatHolder ." + element).append('<div class=" col-sm-2">' + weaponStats.name + "</div>");
        $("#" + tabId + " .unitContainer .weaponsStats .weaponStatHolder ." + element).append('<div class=" col-sm-1">' + weaponStats.range + "</div>");
        $("#" + tabId + " .unitContainer .weaponsStats .weaponStatHolder ." + element).append('<div class=" col-sm-2">' + weaponStats.type + "</div>");
        $("#" + tabId + " .unitContainer .weaponsStats .weaponStatHolder ." + element).append('<div class=" col-sm-1">' + weaponStats.s+ "</div>");
        $("#" + tabId + " .unitContainer .weaponsStats .weaponStatHolder ." + element).append('<div class=" col-sm-1">' + weaponStats.ap + "</div>");
        $("#" + tabId + " .unitContainer .weaponsStats .weaponStatHolder ." + element).append('<div class=" col-sm-1">' + weaponStats.d + "</div>");
        $("#" + tabId + " .unitContainer .weaponsStats .weaponStatHolder ." + element).append('<div class=" col-sm-4">' + weaponStats.abilities + "</div>");
        $("#" + tabId + " .unitContainer .weaponsStats .weaponStatsSelection ." + element).click(function(evt){
          $(this).toggleClass("selected");
          weaponsDisplayed.push(thisWeapon);
          weaponsDisplayed.sort(function(a, b) { return a-b; });
          weaponsDisplayed.forEach(function(element, index){
            if((index+1)%2 == 1){
              $(".weapon"+element).removeClass("stripe");
            } else{
              $(".weapon"+element).addClass("stripe");
            }

          });
          $("#" + tabId + " .unitContainer .weaponsStats .weaponStatLines." + element).toggleClass("hidden");
        });


    });
  } else {
      $("#" + tabId + " .unitContainer .weaponsStats .weaponStatsSelection").append("<div>No Weapons Accessible</div>");
  }
  if(data.wargear){
    $("#"+tabId +" .unitContainer").append('<div class="wargear bottomInfo row"></div>');
    $("#"+tabId +" .unitContainer .wargear").append('<div class="bottomTitle col-sm-2">WARGEAR OPTIONS</div>');
    $("#"+tabId +" .unitContainer .wargear").append('<div class="wargearText col-sm-8"></div>');
      data.wargear.forEach(function(element, index){
        $("#"+tabId +" .unitContainer .wargear .wargearText").append('<div>\u2022 ' + element + '</div>');
      });
  }
  if(data.psyker){
    $("#"+tabId +" .unitContainer").append('<div class="pskyer bottomInfo row"></div>');
    $("#"+tabId +" .unitContainer .pskyer").append('<div class="bottomTitle col-sm-2">PSKYER</div>');
    $("#"+tabId +" .unitContainer .pskyer").append('<div class="psykerText multiRuleContainer col-sm-8"></div>');

    if(data.psyker){
      data.psyker.forEach(function(element, index){
        $("#"+tabId +" .unitContainer .pskyer .psykerText").append('<div class="multiRuleBlock">' + element + '</div>');
      });

    }
  }
  $("#"+tabId +" .unitContainer").append('<div class="abilities bottomInfo row"></div>');
  $("#"+tabId +" .unitContainer .abilities").append('<div class="bottomTitle unitStatTitle col-sm-2">ABILITIES</div>');
  $("#"+tabId +" .unitContainer .abilities").append('<div class="abilitiyText multiRuleContainer col-sm-8"></div>');
  if(data.abilities){
    data.abilities.forEach(function(element, index){
      $("#"+tabId +" .unitContainer .abilities .abilitiyText").append('<div class="multiRuleBlock"><span class="abilityName">' + element.name + ': </span><span>' + HTMLEncodeString(element.rules) + '</span></div>');
    });
  }

  if(data.transport) {
    $("#"+tabId +" .unitContainer").append('<div class="transport bottomInfo row"></div>');
    $("#"+tabId +" .unitContainer .transport").append('<div class="bottomTitle unitStatTitle col-sm-2">TRANSPORT</div>');
    $("#"+tabId +" .unitContainer .transport").append('<div class="col-sm-8">' + HTMLEncodeString(data.transport) + '</div>');
  }

  $("#"+tabId +" .unitContainer").append('<div class="factions bottomInfo row"></div>');
  $("#"+tabId +" .unitContainer .factions").append('<div class="bottomTitle unitStatTitle col-sm-2">FACTIONS KEYWORDS</div>');
  $("#"+tabId +" .unitContainer .factions").append('<div class="keywordText col-sm-8">' + HTMLEncodeString(data.factions.join(", ")) + '</div>');


  $("#"+tabId +" .unitContainer").append('<div class="keywords bottomInfo row"></div>');
  $("#"+tabId +" .unitContainer .keywords").append('<div class="bottomTitle unitStatTitle col-sm-2">KEYWORDS</div>');
  $("#"+tabId +" .unitContainer .keywords").append('<div class="keywordText col-sm-8">' + HTMLEncodeString(data.keywords.join(", ")) + '</div>');







}
