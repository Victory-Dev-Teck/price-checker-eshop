var currentPage = 0;
var container = document.getElementById('registered-products-container');
function getRegisteredProducts(numberInPage, currentPage){
    var resultHtml = '';
    $.ajax(
        {
            async : false,
            method : "GET",
            url : baseServerPathNameForAdmin + '/my-products/get-registered-products.php?currentPage=' + currentPage + '&numberInPage=' + numberInPage,
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            success: function (response) {
                resultHtml = convertResponse2HtmlForRegisteredProducts(response);
            },
            fail: function (response) {
                window.console.log('Response is '+ response.toString() + '\n');
            }
        }
    );
    return resultHtml;
}
function convertResponse2HtmlForRegisteredProducts(response){
    var resultHtml = '';

    var resp = JSON.parse(response);
    if(resp['status'] === 'ok'){
        if(objLength(resp['data']) > 0){
            var i = 0;
            resultHtml = ' <table>\n' +
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
            for(i = 0; i < resp['data'].length; i++){
                var id = resp['data'][i]['id'];
                var title = resp['data'][i]['title'];
                var description = resp['data'][i]['title'];
                var product_url = resp['data'][i]['product_url'];
                var image_url = resp['data'][i]['image_url'];
                var price = resp['data'][i]['price'];
                var category = resp['data'][i]['category'];
                var eshop = resp['data'][i]['eshop'];
                resultHtml +=  '<tr>\n' +
                    '                                        <td>' + (i + 1) + '</td>\n' +
                    '                                        <td><img src="' + image_url + '" alt="" /></td>\n' +
                    '                                        <td>' + title + '</td>\n' +
                    '                                        <td>' + description + '</td>\n' +
                    '                                        <td>'+ price + '</td>\n' +
                    '                                        <td>'+ category +'</td>\n' +
                    '                                        <td>'+ eshop + '</td>\n' +
                    '                                        <td>\n' +
                    '                                            <a href="' + product_url + '" data-toggle="tooltip" title="Go to EShop" class="pd-setting-ed" target="_blank"><i class="fa fa-hand-grab-o" aria-hidden="true"></i></a>\n' +
                    '                                            <a data-toggle="tooltip" title="Remove" class="pd-setting-ed" target="_blank"><i class="fa fa-trash-o" aria-hidden="true" onclick="deleteProduct(\'' + id + '\')" style="padding: 5px" ></i></a>\n' +
                    '                                        </td>\n' +
                    '                                    </tr>';
            }
            resultHtml += '</table>';
        }
    }else {
        window.console.log('Resp is ' + resp['status'] + '\nResponse is '+ response.toString() + '\n');
    }
    return resultHtml;
}

function deleteProduct(id){
    $.ajax({
        async: false,
        method: 'GET',
        url: baseServerPathNameForAdmin + '/my-products/delete-product.php?id=' + id,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (response) {
            let resJson = JSON.parse(response);
            if(resJson['status'] === 'ok'){
                currentPage = 0;
                getAllProducts(currentPage);
            }else{
                window.console.log(resJson['error']);
            }
        },
        fail: function (response){
            window.console.log(response.toString());
        }
    });
}
function getAllProducts(currentPage){
    var products = getRegisteredProducts(10, currentPage);
    container.innerHTML = products;
}
function getPreviewPage(){
    if(currentPage > 1){
        currentPage --;
        getAllProducts(currentPage);
    }
}
function getNextPage(){
    currentPage++;
    var products = getRegisteredProducts(10, currentPage);
    if(products){
        container.innerHTML = products;
    }
}
getAllProducts(currentPage);