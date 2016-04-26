(function() {
  var removeClassFromElements, removeDOMElement, removeElementsByClass;

  removeClassFromElements = function(classname) {
    var i, x;
    x = document.getElementsByClassName(classname);
    i = void 0;
    i = 0;
    while (i < x.length) {
      x[i].classList.remove(classname);
      i++;
    }
  };

  removeElementsByClass = function(className) {
    var elements;
    elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  };

  removeDOMElement = function(id) {
    if (document.getElementById(id)) {
      document.getElementById(id).remove();
    }
  };

  String.prototype.startsWith = function(text) {
    return this.substr(0, text.length) === text;
  };

  String.prototype.contains = function(text) {
    return this.indexOf(text) !== -1;
  };

  chrome.extension.onMessage.addListener(function(request, sender) {
    var checked, invalid, pageLinks, passed, queued, rpBox, totalvalid;
    pageLinks = document.getElementsByTagName('a');
    totalvalid = pageLinks.length;
    queued = 0;
    checked = 0;
    invalid = 0;
    passed = 0;
    rpBox = void 0;
    removeDOMElement('ALP_ReportBox');
    (function(pg) {
      var a, blacklist, blacklisted, cacheType, checkType, e, h, i, j, r, rbClose, rbHeader, rbSettings, rcss, reportBox, reportStyle, rid, scrollTo, tblcss, tdlcss, tdrcss;
      blacklist = request.bl;
      blacklisted = void 0;
      cacheType = request.ca;
      checkType = request.ct;
      reportStyle = document.createElement('style');
      reportStyle.setAttribute('rel', 'stylesheet');
      reportStyle.setAttribute('type', 'text/css');
      document.getElementsByTagName('head')[0].appendChild(reportStyle);
      reportStyle.appendChild(document.createTextNode('#ALP_ReportBox{font-weight: bold; width: 250px; position: fixed; right:0px; top: 0px; background: #fff; margin: 20px; padding: 0px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 14px; border-radius: 5px; z-index: 99999; box-shadow: 0px 0px 3px rgba(0,0,0,1);}'));
      reportBox = document.createElement('div');
      rbHeader = document.createElement('div');
      rbClose = document.createElement('div');
      rbClose.innerHTML = '&times;';
      rbClose.setAttribute('id', 'ALP_RB_Close');
      rbSettings = document.createElement('div');
      reportBox.setAttribute('id', 'ALP_ReportBox');
      rbHeader.innerHTML = 'Link Results';
      document.getElementsByTagName('body')[0].appendChild(reportBox);
      rpBox = document.getElementById('ALP_ReportBox');
      a = void 0;
      e = void 0;
      h = void 0;
      i = void 0;
      j = void 0;
      r = void 0;
      rcss = void 0;
      rid = void 0;
      tblcss = void 0;
      tdlcss = void 0;
      tdrcss = void 0;
      rid = 'HREF_VIEWER_PLUS';
      e = function(t) {
        return document.getElementsByTagName(t);
      };
      a = function(o, a) {
        var prop;
        prop = o.href;
        if (a === 'href' && prop === null) {
          return 'href未設定';
        }
        return prop;
      };
      if (document.getElementById(rid)) {
        return;
      }
      i = e('a');
      if (i.length <= 0) {
        return;
      }
      r = document.createElement('div');
      rcss = 'padding:0px;position:fixed;top:0;right:0;border:solid #ccc 1px;z-index:2147483647;max-height:100%;overflow: auto;width: 400px;';
      tblcss = ' style=\'border-collapse:collapse;background:hsla(0,0%,0%,.75);\'';
      tdlcss = ' style=\'padding:0 .5em 0 0;border-bottom:solid #fff 2px;text-align:right;\'';
      tdrcss = ' style=\'padding:0 0 0 .5em;border-bottom:solid #fff 2px;text-align:left;background-color:hsla(0,0%,0%,.45);color:#F0EA30;width:250px;\'';
      r.id = rid;
      r.style.cssText = rcss;
      h = '<style>\n';
      h += '@-webkit-keyframes anime1 {\n0% {opacity: .2;}\n100% {opacity: 1;}\n}\n.img_blink{-webkit-animation: anime1 0.5s ease 0s infinite alternate;}\n';
      h += '.icon_href_link{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODRCMzY0QjUwM0I5MTFFNjhERERCOUY2QTA3NTkzQjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODRCMzY0QjYwM0I5MTFFNjhERERCOUY2QTA3NTkzQjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGNEQ4MzgwODAzQjExMUU2OEREREI5RjZBMDc1OTNCMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NEIzNjRCNDAzQjkxMUU2OEREREI5RjZBMDc1OTNCMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhzapaMAAADmSURBVHjalFMLEcIwDO3tEFAJlYADigImoTjAATgAB9QBSMABQ8HqgKGgpCO5y4V0jNy969rs5Z8m52xmIAD6/JFyHgG26OaQY9blXoz8Qz4APKAFDPQ2RT4xclBSGtNpTF0cnltAFLpE/ywmDLRoxAJ6JK1R5/F8aGFf2H0JeGK4SYQ/plYrmBPkAe+cHHkboyiYRnaSTAZ2SrWTIJOjK6ZpuIHE+kyKG76T52q7DfPuKyOc0bNqoMzBS/SdJADOou/fwiauFG0DWAH2WsFqKZSt6ioLE38tG31YjIQK2inzr+ItwACVV8TFxCPiqAAAAABJRU5ErkJggg==) no-repeat;\n';
      h += 'width: 10px;\n';
      h += 'height: 10px;\n';
      h += 'content: \".\";\n';
      h += 'color: transparent;\n';
      h += 'background-size: initial;\n';
      h += 'padding: 0 5px 0 12px;\n';
      h += 'margin-left: 5px;\n';
      h += '}\n';
      h += '</style>';
      h += '<table' + tblcss + ' class="ATT_VIEWER_TABLE">';
      j = 0;
      while (j < i.length) {
        h += j % 252 === 0 ? '<tr>' : '<tr>';
        h += '<td' + tdlcss + '><span class=\"icon_href_link\"></span></td><td' + tdrcss + '>' + a(i[j], 'href') + '</td></tr>';
        j++;
      }
      h += '</table>';
      e('body')[0].appendChild(r);
      r.innerHTML = h;
      scrollTo = function(to, duration) {
        var difference, perTick, scrollTop;
        if (duration < 0) {
          return;
        }
        scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
        difference = to - scrollTop;
        perTick = difference / duration * 10;
        setTimeout((function() {
          scrollTop = scrollTop + perTick;
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          if (scrollTop === to) {
            return;
          }
          scrollTo(to, duration - 10);
        }), 10);
      };
      r.onclick = function() {};
      document.querySelector('.HREF_VIEWER_CLOSE').onclick = function() {
        var i;
        i = r.childNodes.length - 1;
        while (i >= 0) {
          r.removeChild(r.childNodes[i]);
          i--;
        }
      };
      window.scrollTo(0, 0);
      Array.prototype.forEach.apply(document.querySelectorAll('.ATT_VIEWER_TABLE img'), [
        function(e, i, a) {
          e.addEventListener('mouseover', (function(event) {
            var elm, filename_ex, offsetTop, top;
            filename_ex = event.target.src.match('.+/(.+?)([?#;].*)?$')[1];
            elm = document.querySelector("[src*=\"" + filename_ex + "\"]");
            console.log(elm);
            if (elm) {
              elm.style.border = "solid 3px #F82F66";
              elm.classList.add("img_blink");
              offsetTop = 50;
              top = elm.getBoundingClientRect().top + window.scrollY - offsetTop;
              scrollTo(top, 300);
            }
          }), false);
        }
      ]);
      Array.prototype.forEach.apply(document.querySelectorAll('.ATT_VIEWER_TABLE img'), [
        function(e, i, a) {
          e.addEventListener('mouseout', (function(event) {
            var elm, filename_ex;
            filename_ex = event.target.src.match('.+/(.+?)([?#;].*)?$')[1];
            elm = document.querySelector("[src*=\"" + filename_ex + "\"]");
            if (elm) {
              elm.style.border = 'none';
              return elm.classList.remove('img_blink');
            }
          }), false);
        }
      ]);
      Array.prototype.forEach.apply(document.querySelectorAll('.ATT_VIEWER_TABLE .HREF_VIEWER_TITLE'), [
        function(e, i, a) {
          e.addEventListener('mouseover', (function(event) {
            var title;
            title = event.target.innerText;
            document.querySelector('[title$="' + title + '"]').style.border = 'solid 3px #F82F66';
            document.querySelector('[title$="' + title + '"]').classList.add('img_blink');
          }), false);
        }
      ]);
      Array.prototype.forEach.apply(document.querySelectorAll('.ATT_VIEWER_TABLE .HREF_VIEWER_TITLE'), [
        function(e, i, a) {
          e.addEventListener('mouseout', (function(event) {
            var title;
            title = event.target.innerText;
            document.querySelector('[title$="' + title + '"]').style.border = 'none';
            document.querySelector('[title$="' + title + '"]').classList.remove('img_blink');
          }), false);
        }
      ]);
      document.getElementById('ALP_RB_Close').onclick = function() {
        removeDOMElement('ALP_ReportBox');
      };
      chrome.extension.onMessage.removeListener(doStuff);
    })(pageLinks);
    return true;
  });

}).call(this);
