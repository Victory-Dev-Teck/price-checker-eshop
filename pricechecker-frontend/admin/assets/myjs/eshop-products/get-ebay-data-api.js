function getEbayProductsFromAPI(searchCategory, searchString, currentPage, maxNumberOfProducts) {
    let retArray = [];
    let retData = {};
    let url = '';
    if(searchString){
        url = "https://ebay-data-scraper.p.rapidapi.com/products?page_number=1&product_name="+ searchString + "&country=canada";
    }else{
        url = "https://ebay-data-scraper.p.rapidapi.com/products?page_number=1&product_name=laptop&country=canada";
    }
    $.ajax({
        "async": false,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "d481c8a88fmsh66a39700101964fp15b1f5jsnb524d8ed956c",
            "X-RapidAPI-Host": "ebay-data-scraper.p.rapidapi.com"
        },
        success: function (response) {

            var myJsonString = JSON.stringify(response);

            let resp = JSON.parse(myJsonString);

            retArray = convertEbayResponseForUI(resp, 'Ebay', currentPage, maxNumberOfProducts);
            retData['error'] = "ok";
        },
        fail: function (response, textStatus){
            retData['error'] =  'Status is ' + textStatus + '\n Response is '+ response.toString();
        }
    });

    retData['data'] = retArray;
    return retData;
}
function convertEbayResponseForUI(response, eshop, currentPage, numberInPage) {
    console.log(response, eshop, currentPage, numberInPage);
    let retArray = [];

    let respLen = response.length;
    let startIndex = 0;
    if (currentPage > 0) {
        startIndex = currentPage * numberInPage;
    }
    let endIndex = numberInPage * (currentPage + 1);
    if (startIndex > respLen - 1) {
        startIndex = respLen - 11;
        if(startIndex < 0) startIndex = 0;
        endIndex = respLen;
    }
    if (endIndex > respLen - 1) {
        endIndex = respLen;
    }
    if (respLen > 0) {
        for (let i = startIndex; i < endIndex; i++) {
            let row = response[i];
            let buff = {};
            buff['title'] = removeSpecialChars(row['name']);
            buff['description'] = removeSpecialChars(row['description']);
            buff['product_url'] = row['link'];
            buff['image_url'] = row['thumbnail'];
            buff['price'] = row['price'];
            buff['eshop'] = eshop;
            retArray.push(buff);
        }
    }
    return retArray;
}
