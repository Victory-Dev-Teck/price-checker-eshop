preloader = document.getElementById("preloader-for-products");
let preloader_html = "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-12\"></div>\n" +
    "                <div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-12\">\n" +
    "                    <div class=\"preloader-single shadow-inner mt-b-30\">\n" +
    "                        <div class=\"ts_preloading_box\">\n" +
    "                            <div id=\"ts-preloader-absolute02\">\n" +
    "                                <div class=\"tsperloader2\" id=\"tsperloader2_four\"></div>\n" +
    "                                <div class=\"tsperloader2\" id=\"tsperloader2_three\"></div>\n" +
    "                                <div class=\"tsperloader2\" id=\"tsperloader2_two\"></div>\n" +
    "                                <div class=\"tsperloader2\" id=\"tsperloader2_one\"></div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-12\"></div>";
preloader.innerHTML = preloader_html;

async function getAmazonProducts(maxNumberOfProducts, currentPage){
    let resultHtml = '';
    let response = {};
    if(isMockData){
        response =  await getAmazonProductsFromMock("", "", currentPage,  maxNumberOfProducts);
    }else {
        response = await getAmazonProductsFromApi("", "",  currentPage, maxNumberOfProducts);
    }
    if(response['error'] === 'ok'){
        resultHtml = convertResponse2HtmlForAddProduct(response['data'], "Amazon");
    }else {
        resultHtml = response['error'];
    }
    return resultHtml;
}
async function getEbayProducts(maxNumberOfProducts, currentPage){
    let resultHtml = '';
    let response = {};
    if(isMockData){
        response = await getEbayProductsFromMock("", "", currentPage,  maxNumberOfProducts);
    }else {
        response = await getEbayProductsFromAPI("", "",  currentPage, maxNumberOfProducts);
    }
    if(response['error'] === 'ok'){
        resultHtml = convertResponse2HtmlForAddProduct(response['data'], "Ebay");
    }else {
        resultHtml = response['error'];
    }
    return resultHtml;
}

async function getWalmProducts(maxNumberOfProducts, currentPage){
    let resultHtml = '';
    let response = {};
    if(isMockData){
        response = await getWalmartProductsFromMock("", "", currentPage,  maxNumberOfProducts);
    }else {
        response = await getWalmartFromApi("", "",  currentPage, maxNumberOfProducts);
    }
    if(response['error'] === 'ok'){
        resultHtml = convertResponse2HtmlForAddProduct(response['data'], "Walmart");
    }else {
        resultHtml = response['error'];
    }
    return resultHtml;
}

function convertResponse2HtmlForAddProduct(response, shopName){
    var resultHtml = '';
    var respLen = response.length;
    if(respLen){
        var i = 0;
        resultHtml = '<div class="product-status-wrap" >\n' +
            '                        <h4>Products From '+ shopName + '</h4>\n' +
            '                        <div class="asset-inner" >' +
            ' <table>\n' +
            '                                    <tr>\n' +
            '                                        <th>No</th>\n' +
            '                                        <th>Image</th>\n' +
            '                                        <th>Title</th>\n' +
            '                                        <th>Description</th>\n' +
            '                                        <th>Price</th>\n' +
            '                                        <th>Category</th>\n' +
            '                                        <th>EShop</th>\n' +
            '                                        <th>Action</th>\n' +
            '                                    </tr>';
        for(i = 0; i < respLen; i++){
            var title = response[i]['title'];
            var description = response[i]['description'];
            var product_url = response[i]['product_url'];
            var image_url = response[i]['image_url'];
            var price = response[i]['price'];
            var category = response[i]['title'];
            var eshop = shopName;
            resultHtml +=  '<tr>\n' +
                '                                        <td>' + (i + 1) + '</td>\n' +
                '                                        <td><img src="' + image_url + '" alt="" /></td>\n' +
                '                                        <td>' + title + '</td>\n' +
                '                                        <td>' + description + '</td>\n' +
                '                                        <td>'+ price + '</td>\n' +
                '                                        <td>'+ category +'</td>\n' +
                '                                        <td>'+ eshop + '</td>\n' +
                '                                        <td>\n' +
                '                                            <a href="' + product_url + '" data-toggle="tooltip" title="Go to EShop" class="pd-setting-ed"><i class="fa fa-hand-grab-o" aria-hidden="true"></i></a>\n' +
                '                                            <a data-toggle="tooltip" title="Add to our system" class="pd-setting-ed"><i class="fa fa-plus" aria-hidden="true" onclick="addTrending(\'' + title + '\',\'' + description + '\',\'' + product_url + '\',\'' + image_url + '\',\'' + price + '\',\'' + category + '\',\'' + eshop +'\')" ' +
                '                                               style="padding: 5px;"></i></a>\n' +
                '                                        </td>\n' +
                '                                    </tr>';
        }
        resultHtml += '</table>' +
            '</div>\n' +
            '                        <div class="custom-pagination" id="pagination-container">\n' +
            '                            <ul class="pagination">\n' +
            '                                <li class="page-item"><a class="page-link" onclick="getPreviewPage'+ eshop + '()">Previous</a></li>\n' +
            '                                <li class="page-item"><a class="page-link" onclick="getNextPage'+ eshop + '()">Next</a></li>\n' +
            '                            </ul>\n' +
            '                        </div>\n' +
            '                    </div></div>';
    }

    return resultHtml;
}
async function getAllProducts(){
    var amazonProducts = await getAmazonProducts(numOfShowProducts, currentPageOfAmazon);
    var ebayProducts = await getEbayProducts(numOfShowProducts, currentPageOfEbay);
    var walmartProducts = await getWalmProducts(numOfShowProducts, currentPageOfWalmart);
    var containerAmazon = document.getElementById('product-table-amazon');
    var containerEbay = document.getElementById('product-table-ebay');
    var containerWalmart = document.getElementById('product-table-walmart');
    containerAmazon.innerHTML = amazonProducts;
    containerEbay.innerHTML = ebayProducts;
    containerWalmart.innerHTML = walmartProducts;
    preloader.innerHTML = "";
}
async function getPreviewPageAmazon(){
    if(currentPageOfAmazon > 0){
        currentPageOfAmazon --;
        var resultHtml = await getAmazonProducts(numOfShowProducts, currentPageOfAmazon);
        $('#product-table-amazon').html(resultHtml);
    }
}
async function getPreviewPageEbay(){
    if(currentPageOfEbay > 0){
        currentPageOfEbay --;
        var resultHtml = await getEbayProducts(numOfShowProducts, currentPageOfEbay);
        $('#product-table-ebay').html(resultHtml);
    }
}
async function getPreviewPageWalmart(){
    if(currentPageOfEbay > 0){
        currentPageOfEbay --;
        var resultHtml = await getWalmartProducts(numOfShowProducts, currentPageOfEbay);
        $('#product-table-walmart').html(resultHtml);
    }
}
async function getNextPageAmazon( ){
    currentPageOfAmazon ++;
    var resultHtml = await getAmazonProducts(numOfShowProducts, currentPageOfAmazon);
    $('#product-table-amazon').html(resultHtml);
}
async function getNextPageEbay(){
    currentPageOfEbay ++;
    var resultHtml = await getEbayProducts(numOfShowProducts, currentPageOfEbay);
    $('#product-table-ebay').html(resultHtml);
}
async function getNextPageWalmart(){
    currentPageOfEbay ++;
    var resultHtml = await getWalmartProducts(numOfShowProducts, currentPageOfEbay);
    $('#product-table-walmart').html(resultHtml);
}
// function getNextPageWalmart(){
//     currentPageOfWalmart --;
//     var resultHtml = getWalmartProducts(numOfShowProducts, currentPageOfWalmart);
//     var element = document.getElementById('product-table-Walmart');
//     element.innerHTML = "";
//     element.innerHTML = resultHtml;
// }
getAllProducts();
