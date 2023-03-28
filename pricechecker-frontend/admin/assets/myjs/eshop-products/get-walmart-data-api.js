async function getWalmartFromApi(searchCategory, searchString, currentPage, maxNumberOfProducts){
    let retArray = [];
    let retData = {};
    let url = '';
    if(searchString === ''){
        searchString = 'laptop';
    }
    return new Promise((resolve, reject) => {
        $.ajax({
        "async" : true,
        "crossDomain" : true,
        "method" : "GET",
        url : 'https://api.bluecartapi.com/request?api_key=84E30F5FC5FA44029956F1FEFA2D3CB1&search_term=' + searchString + '&type=search',
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        success: function (response) {

            setTimeout(function() {
                var myJsonString = JSON.stringify(response);
                let respBuff = JSON.parse(myJsonString);

                retArray = convertWalmartResponseForUI(respBuff['search_results'], 'Walmart', currentPage, maxNumberOfProducts);
                retData['error'] = "ok";

                retData['data'] = retArray;
                return resolve(retData);
            }, 4000);

        },
        fail: function (response, textStatus) {
            retData['error'] = 'Status is ' + textStatus + '\n Response is ' + response.toString();
            return reject(retData);
        }
    });
})  ;
}
function convertWalmartResponseForUI(response, eshop, currentPage, numberInPage) {
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
        endIndex = respLen;
    }
    if (endIndex > respLen - 1) {
        endIndex = respLen;
    }
    if (respLen > 0) {
        for (let i = startIndex; i < endIndex; i++) {
            let row = response[i]['product'];
            let buff = {};
            buff['title'] = removeSpecialChars(row['title']);
            buff['description'] = removeSpecialChars(row['description']);
            buff['product_url'] = row['link'];
            buff['image_url'] = row['main_image'];
            buff['price'] = response[i]['offers']['primary']['price'] + "USD";
            buff['eshop'] = eshop;
            retArray.push(buff);
        }
    }
    return retArray;
}
