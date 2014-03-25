
var pageSelected = "Home";

//Home Global Variables
var clubCurrent = "PRYVE";

//User Panel Global Variables
var usersCurrent = ["naughtyson","vlad","A","Marv","DomRich"];

//Profile Global Variables
var userFullName = "LUKE BEERWALKER IS THE GREATEST BEERWALKER ALIVE.";
var userTitle    = "The diver";

//LastModified Global Variables
var panelCurrentUserLastmodified = "";
var pageHomeLastModified         = "";
var pageSearchLastModified       = "";
var pageChallengesLastModified   = "";
var pageProfileLastModified      = "";


function changePageEvent(){
    pageSelected = this.name;
};

function updateHomePage(){
//    alert(pageSelected);
    refreshCurrentUsersList();
    document.getElementById("clubName").innerHTML = clubCurrent;
};

function updateSearchPage(){
//    alert(pageSelected);
};

function updateChallengesPage(){
//    alert(pageSelected);
};

function updateProfilePage(){
    document.getElementById("userFullName").innerHTML = userFullName;
    document.getElementById("userTitle").innerHTML = userTitle;
};

//EVENT AFTER DISPLAYING A PAGE
$(document).on("pageshow",'*[data-role="page"]',function(){
    //alert(pageSelected);
    //setSelectedButton();
});

//function setSelectedButton(){
//    $('#btn'+pageSelected).addClass("ui-btn-active ui-state-persist");
//}

//EVENT BEFORE DISPLAYING A PAGE
$(document).on("pagebeforeshow",'*[data-role="page"]',function(){
    switch(pageSelected){
        case "Home":        updateHomePage(); break;
        case "Search":      updateSearchPage(); break; 
        case "Challenges":  updateChallengesPage(); break;
        case "Profile":     updateProfilePage(); break;
        default: alert("Something went wrong\nPage Selected: "+pageSelected); break;    
    }  
});

//ADD FOOTER AT START OF CREATION
jQuery('*[data-role="page"]').on("pagebeforecreate", function(e) {
    var page = jQuery(this);
    var footer = jQuery(jQuery("#myFooterTemplateID").html()); 
    footer.find('a').on('click', changePageEvent);
    page.append(footer);
});

function clearCurrentUsersList(){
    var ul = document.getElementById("listCurrentUsers");
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

function refreshCurrentUsersList(){
    clearCurrentUsersList();
    populateCurrentUsersList();
}