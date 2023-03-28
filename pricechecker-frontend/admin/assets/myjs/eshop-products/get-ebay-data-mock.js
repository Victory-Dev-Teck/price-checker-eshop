async function getEbayProductsFromMock(searchCategory, searchString,currentPage, maxNumberOfProducts){
    let retArray = [];
    let retData = {};
    let url = '';
    if(searchString === ''){
        searchString = 'all';
    }
    return new Promise((resolve, reject) => {
        $.ajax({
        "async" : true,
        "crossDomain" : true,
        "method" : "GET",
        url : baseServerPathNameForAdmin + '/products/ebay-compare-products.php?num=' + maxNumberOfProducts + '&searchval=' + searchString + '&category=' + searchCategory,
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        success: function (response) {
            setTimeout(function() {
                let respBuff = JSON.parse(response);

                retArray = convertEbayResponseForUI(respBuff['data'], 'Ebay', currentPage, maxNumberOfProducts);
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