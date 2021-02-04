document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
            console.log('message sent')
          });
    }, false);
  }, false);