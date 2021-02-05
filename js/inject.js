function getDataLayer() {
    var dl = window.dataLayer;
    var dlArray = [];
    if (dl != null & dl != undefined && dl.length > 0) {
        for (i = 0; i < dl.length; i++) {
            dlArray.push(JSON.stringify(dl[i]))
        }
        var data = dlArray;
        document.dispatchEvent(new CustomEvent('yourCustomEvent', { detail: data }));
    }
}

getDataLayer()