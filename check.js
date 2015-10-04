// Check My Links by Paul Livingstone
// @ocodia

String.prototype.startsWith = function(text) {
  return this.substr(0, text.length) == text;
};

String.prototype.contains = function(text) {
  return this.indexOf(text) !== -1;
};
function removeClassFromElements(classname) {
  var x = document.getElementsByClassName(classname);
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove(classname);
  }
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function removeDOMElement(id){
  if(document.getElementById(id)){
    document.getElementById(id).remove();
  }
}

chrome.extension.onMessage.addListener(

  function doStuff(request, sender) {

  // Gather links
  var pageLinks = document.getElementsByTagName('a');
  var totalvalid = pageLinks.length;
  var queued = 0;
  var checked = 0;
  var invalid = 0;
  var passed = 0;
  var rpBox;
  // Clear the Previous Run
  removeDOMElement("ALP_ReportBox");

  (
  function(pg){

    var blacklist = request.bl;
    var blacklisted;

    var cacheType = request.ca;
    var checkType = request.ct;


    var reportStyle = document.createElement("style");
    reportStyle.setAttribute("rel", "stylesheet");
    reportStyle.setAttribute("type", "text/css");
    document.getElementsByTagName("head")[0].appendChild(reportStyle);

    reportStyle.appendChild(document.createTextNode("#ALP_ReportBox{font-weight: bold; width: 250px; position: fixed; right:0px; top: 0px; background: #fff; margin: 20px; padding: 0px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 14px; border-radius: 5px; z-index: 9999; box-shadow: 0px 0px 3px rgba(0,0,0,1);}"));

    var reportBox = document.createElement("div");
    var rbHeader = document.createElement("div");

    var rbClose = document.createElement("div");
    rbClose.innerHTML = "&times;";
    rbClose.setAttribute("id", "ALP_RB_Close");

    var rbSettings = document.createElement("div");

    reportBox.setAttribute("id", "ALP_ReportBox");
    rbHeader.innerHTML = "Link Results";

    document.getElementsByTagName("body")[0].appendChild(reportBox);
    rpBox = document.getElementById("ALP_ReportBox");

    //////////
    window.alert("event");
    //////////

    document.getElementById("ALP_RB_Close").onclick=function(){removeDOMElement("ALP_ReportBox");};
    // Remove the event listener in the event this is run again without reloading
    chrome.extension.onMessage.removeListener(doStuff);
  }(pageLinks)
  )

    return true;

  });
