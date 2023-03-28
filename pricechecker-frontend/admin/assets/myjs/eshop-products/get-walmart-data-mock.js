async function getWalmartProductsFromMock(searchCategory, searchString, currentPage, maxNumberOfProducts, returnData){
    let retArray = [];
    let retData = {};
    if(searchString === ''){
        searchString = 'all';
    }
    // $.ajax(
    //     {
    //         async : false,
    //         method : "GET",
    //         url : baseServerPathNameForUser + '/products/amazon-compare-products.php?num=' + currentPage + '&searchval=' + searchString + '&category=' + searchCategory,
    //         headers:{
    //             'Accept' : 'application/json',
    //             'Content-Type' : 'application/json'
    //         },
    //         success: function (response) {
    //             let resp = JSON.parse(response);
    //             retData['error'] = 'ok';
    //             retArray = convertAmazonResponseForUI(resp['data'], 'Amazon',  currentPage, maxNumberOfProducts);
    //         },
    //         fail: function (response, textStatus){
    //             retData['error'] = 'Status is ' + textStatus + '\n Response is '+ response.toString();
    //         }
    //     }
    // );
    return new Promise((resolve, reject) => {
        $.ajax({
        "async" : true,
        "crossDomain" : true,
        "method" : "GET",
        "url" : baseServerPathNameForAdmin + '/products/walmart-compare-products.php?num=' + currentPage + '&searchval=' + searchString + '&category=' + searchCategory,
        "headers":{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        success: function (response) {
            setTimeout(function() {
                let respBuff = JSON.parse(response);

                retArray = convertWalmartResponseForUI(respBuff['data']['search_results'], 'Walmart', currentPage, maxNumberOfProducts);
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