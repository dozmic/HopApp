// Current Page
var pageSelected = "Home";

//Home Global Variables
var clubCurrent = "PRYVE";

//User Panel Global Variables
var usersCurrent = ["naughtyson","vlad","A","Marv","DomRich"];

//Search Global Variables
var areaListing  = {}
var areas        = ["Quezon City","Bonifacio Global City","Malate","Pasay","Makati"]
var barsQC       = ["Dragon","Prime Upscale Club","EXcess","Vanity Club","Vizio Bar"]
var barsBGC      = ["Club Haze","Prive","Scarlet"]
var barsMalate   = ["Exclusiv"]
var barsPasay    = ["Club Cabana","Republiq Club"]
var barsMakati   = ["Clubbing TV","Palladium","Time","Icon Ultimate Club","71 Gramercy","Black Market / Finders Keepers"]
var selectedArea = "NONE";
var selectedBar  = "NONE";
var selectedBarList = [];

//Profile Global Variables
var userFullName = "LUKE BEERWALKER";
var userTitle    = "The diver";
var experience   = 500;
var nextLevel    = 2000;
var expBarValue  = (experience/nextLevel)*100;
var userStatus   = false;

//LastModified Global Variables
var panelCurrentUserLastmodified = "";
var pageHomeLastModified         = "";
var pageSearchLastModified       = "";
var pageChallengesLastModified   = "";
var pageProfileLastModified      = "";


function changePageEvent(selected){
    pageSelected = selected;
};

function changePageEvent(selected,key){
    pageSelected = selected;
    
};

function updateHomePage(){
//    alert(pageSelected);
    refreshCurrentUsersList();
    document.getElementById("clubName").innerHTML = clubCurrent;
};

function updateSearchPage(){
//    alert(pageSelected);
    clearList("listArea");
    populateArealist();
};

function updateChallengesPage(){
//    alert(pageSelected);
};

function updateProfilePage(){
    document.getElementById("userFullName").innerHTML = userFullName;
    document.getElementById("userTitle").innerHTML = "\""+userTitle+"\"";
    document.getElementById("experienceData").innerHTML = experience+"/"+nextLevel;
    updateStatusButton();
    $("#progress-bar").val(expBarValue).slider("refresh");
};

function updateBarListPage(){
//    alert(pageSelected);
    document.getElementById("areaName").innerHTML = selectedArea;
    clearList("listBar");
    populateBarList();
};

function updateBarProfilePage(){
    document.getElementById("barName").innerHTML = selectedBar;
};

function updateStatusButton(){
    document.getElementById("btnToggleStatus").innerHTML = getStatus();
    document.getElementById("btnToggleStatus").className = getStatusClass();
}

//EVENT AFTER DISPLAYING A PAGE
$(document).on("pageshow",'*[data-role="page"]',function(){
    //alert(pageSelected);
    //setSelectedButton();
});

//EVENT BEFORE DISPLAYING A PAGE
$(document).on("pagebeforeshow",'*[data-role="page"]',function(){
    switch(pageSelected){
        case "Home":        updateHomePage(); break;
        case "Search":      updateSearchPage(); break; 
        case "Challenges":  updateChallengesPage(); break;
        case "Profile":     updateProfilePage(); break;
        case "BarList":     updateBarListPage(); break;
        case "BarProfile":  updateBarProfilePage(); break;
        default: alert("Something went wrong\nPage Selected: "+pageSelected); break;    
    }  
    
});

function refreshCurrentUsersList(){
    clearList("listCurrentUsers");
    populateCurrentUsersList();
}

function clearList(elementId){
    var ul = document.getElementById(elementId);
    while( ul.firstChild ){
        ul.removeChild( ul.firstChild );
    }
}

function populateCurrentUsersList()
{
    var ul = document.getElementById("listCurrentUsers");           
    for(var x in usersCurrent){
        var li = document.createElement("li");
        var a = document.createElement('a');
        a.innerHTML = usersCurrent[x];
        li.appendChild(a);
        ul.appendChild(li);
    }
}

function initializeAreaList(areaName){
    selectedArea = areaName;
    changePageEvent("BarList");
}

function initializeBarList(barName){
    selectedBar = barName;
    changePageEvent("BarProfile");
}

function getBarList(areaName){
 switch(areaName)
    {
        case "Quezon City":             return barsQC; break;
        case "Bonifacio Global City":   return barsBGC; break;
        case "Malate":                  return barsMalate; break;
        case "Pasay":                   return barsPasay; break;
        case "Makati":                  return barsMakati; break;
        default:                        return null; break;
    }   
}

function getAreaId(areaName){
    switch(areaName)
        {
            case "Quezon City":             return "Qc"; break;
            case "Bonifacio Global City":   return "Bgc"; break;
            case "Malate":                  return "Malate"; break;
            case "Pasay":                   return "Pasay"; break;
            case "Makati":                  return "Makati"; break;
            default:                        return null; break;
        }
}

function populateArealist(){
    var ul = document.getElementById("listArea");          
    for(var areaIndex in areas){
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.innerHTML = areas[areaIndex];
        a.href = "#pageBarList";
        a.className = "ui-btn ui-btn-icon-right ui-icon-carat-r customBtn"+getAreaId(areas[areaIndex]);
        a.onclick = (function() {
            var currentAreaIndex = areaIndex;
            return function() { 
                initializeAreaList(areas[currentAreaIndex]);
            }
        })();
        li.appendChild(a);
        ul.appendChild(li);
    }
}

function populateBarList(){
    var ul = document.getElementById("listBar");
    var bars = getBarList(selectedArea);     
    for(var barIndex in bars){
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.innerHTML = bars[barIndex];
        a.href = "#pageBarProfile";
        a.className = "ui-btn ui-btn-icon-right ui-icon-carat-r";
        
        a.onclick = (function() {
            var currentBarIndex = barIndex;
            return function() { 
                initializeBarList(bars[currentBarIndex]);
            }
        })();
        li.appendChild(a);
        ul.appendChild(li);
    }
}

$(document)
     .on("pageinit", document, function () {
         //set default transition to SLIDE
         $.mobile.changePage.defaults.transition = 'slide';
         $('.progress-bar').slider
});

$(function() {
    $(".dial").knob();
});

function toggleStatus(){
    userStatus = !userStatus;
    updateStatusButton();
}

function getStatus(){
    if(userStatus===true)
        return "READY TO MINGLE";
    else
        return "NOT IN THE MOOD";
}

function getStatusClass(){
    if(userStatus===true)
        return "ui-btn ui-icon-heart ui-btn-inline ui-btn-icon-left ui-corner-all readyToMingle";
    else
        return "ui-btn ui-icon-forbidden ui-btn-inline ui-btn-icon-left ui-corner-all notInTheMood";
}