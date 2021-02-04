chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        console.log('message received')
        window.dataLayer = window.dataLayer || [];
        var dl = window.dataLayer;
        console.log(dataLayer);
      }
    }
  );
