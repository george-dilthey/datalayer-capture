chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            injectScript(chrome.extension.getURL('/js/inject.js'), 'body');
            document.addEventListener('yourCustomEvent', function (e) {
                data = e.detail;
                sendResponse(data)
                console.log(data)
            });
        }
        return true;
    }
);

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}


