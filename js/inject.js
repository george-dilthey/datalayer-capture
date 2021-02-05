function getDataLayer() {
    dl = window.dataLayer;
    if (dl != null & dl != undefined && dl.length > 0) {
        for(i=0; i<dl.length; i++){
            if(dl[i].ecommerce != null && dl[i].ecommerce != undefined){
                //this is where i need a way to push the dl[i] up to content.js so that it can be pushed to popup.js
            }
        }
    }
}

getDataLayer()