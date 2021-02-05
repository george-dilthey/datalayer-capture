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
  console.log(array)
  if (array != null && array != undefined && array.length > 0) {
    for (i = 0; i < array.length; i++) {
      var button = document.createElement("button")
      button.setAttribute("class", "accordion");
      button.innerText = (JSON.stringify(array[i].event));

      var div = document.createElement("div")
      div.setAttribute("class", "panel");
      div.innerHTML = ("<p>"+JSON.stringify(array[i],null,2)+"</p>");

      document.querySelector('#dataLayerAccs').appendChild(button);
      document.querySelector('#dataLayerAccs').appendChild(div);
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