function getDataLayer() {
    dl = window.dataLayer;
    if (dl != null & dl != undefined && dl.length > 0) {
        for(i=0; i<dl.length; i++){
            if(dl[i].ecommerce != null && dl[i].ecommerce != undefined){
                window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*"); 
            }
        }
    }
}

getDataLayer()