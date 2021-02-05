document.addEventListener('DOMContentLoaded', function () {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function () {
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
      var eventButton = document.createElement("button")
      eventButton.setAttribute("class", "accordion");
      eventButton.innerText = (JSON.stringify(array[i].event));

      var copyButton = document.createElement("button")
      copyButton.setAttribute("class", "copy")
      copyButton.setAttribute("onclick", "copyJson()")
      copyButton.innerText = "Copy JSON"

      var div = document.createElement("div")
      div.setAttribute("class", "panel");
      div.innerHTML = ("<pre>" + syntaxHighlight(JSON.stringify(array[i],null,'\t'))+ "</pre>");

      document.querySelector('#dataLayerAccs').appendChild(eventButton);
      document.querySelector('#dataLayerAccs').appendChild(div);
      document.querySelector('#dataLayerAccs').appendChild(copyButton);
    }
  }
  else {
    var div = document.createElement("div");
    div.setAttribute("class", "dlobject");
    div.innerText = ("Sorry, no dataLayer detected!");
    document.querySelector('#dataLayerAccs').appendChild(div);
  }
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
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

function copyJson() {
  alert("Copied the text: " + copyText.value);
  var copyText = document.closest('div.panel');
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
}