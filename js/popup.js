document.addEventListener('DOMContentLoaded', function () {
  var getDataLayerButton = document.getElementById('checkPage');
  getDataLayerButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { "message": "clicked_browser_action" }, function (response) {
        addDiv(response)
      });
    });
  }, false);
}, false);



function addDiv(array) {
  document.querySelector('#dataLayerAccs').innerHTML = "";

  if (array != null && array != undefined && array.length > 0) {
    for (i = 0; i < array.length; i++) {
      var accCont = document.createElement("div");
      var contId = ("accordion" + i).toString();
      accCont.setAttribute("id", contId);
      accCont.setAttribute("class", "accCont");

      var eventButton = document.createElement("button")
      eventButton.setAttribute("class", "accordion");
      eventButton.innerText = (JSON.stringify(array[i].event));

      var copyButton = document.createElement("button")
      copyButton.setAttribute("class", "copy")
      copyButton.innerText = "Copy JSON"

      var div = document.createElement("div")
      div.setAttribute("class", "panel");
      div.innerHTML = ("<pre>" + syntaxHighlight(JSON.stringify(array[i], null, '\t')) + "</pre>");
      
      document.querySelector('#dataLayerAccs').appendChild(accCont);
      document.querySelector('[id=' + CSS.escape(contId) + ']').appendChild(eventButton);
      document.querySelector('[id=' + CSS.escape(contId) + ']').appendChild(div);
      document.querySelector('div[id=' + CSS.escape(contId) + '] button.accordion').appendChild(copyButton);

    }
  }
  else {
    var div = document.createElement("div");
    div.setAttribute("class", "dlobject");
    div.innerText = ("Sorry, no dataLayer detected!");
    document.querySelector('#dataLayerAccs').appendChild(div);
  }
  //Add click to accordion
  var acc = document.querySelectorAll('button.accordion');
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function (e) {
      if (e.target == this) {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      }
    });
  }
  
  //Add click to copy
  var copyJSONButtons = document.getElementsByClassName('copy');
  for (i = 0; i < copyJSONButtons.length; i++) {
    copyJSONButtons[i].addEventListener('click', function (e) {
      var copyText = e.target.closest('div.accCont').querySelector('div.panel').innerText;
      navigator.clipboard.writeText(copyText);
    });
  }
}

function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}