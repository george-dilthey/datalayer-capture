document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
  
      chrome.tabs.getSelected(null, function(tab) {
        d = document;
        var node = document.createElement("p");
        var textnode = document.createTextNode("Testing!");
        node.appendChild(textnode);
        d.body.appendChild(node);
      });
    }, false);
  }, false);