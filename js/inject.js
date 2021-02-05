function getDataLayer() {
    var dl = window.dataLayer;
    var data = JSON.stringify(dl);
    document.dispatchEvent(new CustomEvent('sendDataLayer', { detail: data }));
}

getDataLayer()