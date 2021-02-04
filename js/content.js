chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            injectScript(chrome.extension.getURL('/js/inject.js'), 'body');
            sendResponse(getResponse())
            function getResponse() {
                window.addEventListener("message", function (e) {
                    console.log(e.data.text)
                    return e.data.text
                })
            }
        }
    }
);

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}


