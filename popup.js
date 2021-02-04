document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        d = document;
        var node = document.createElement("p");
        var dl = window.dataLayer;
        if(dl != null && dl != undefined){
            console.log(dl);
            console.log('hi');
            var textnode = document.createTextNode(dl);
            node.appendChild(textnode);
            d.body.appendChild(node);
        }
        console.log('hello')
    }, false);
  }, false);