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
  for (i = 0; i < array.length; i++) {
    var div = document.createElement("div");
    div.setAttribute("class", "dlobject");
    div.innerText = (array[i]);
    document.body.appendChild(div);
  }
}

//ignore this, it doesn't work.
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log('request received: ' + request)
    if (request.message === "add_datalayer") {
      console.log(request.datalayer);
      addDiv(request.datalayer);
    }
  }
);