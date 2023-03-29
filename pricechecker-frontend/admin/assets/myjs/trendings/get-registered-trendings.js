var currentPage = 0;
var container = document.getElementById('trending-products-container');
function getTrendingProducts(numberInPage, currentPage){
    var resultHtml = '';
    $.ajax(
        {
            async : false,
            method : "GET",
            url : baseServerPathNameForAdmin + '/trendings/get-trending-products.php?currentPage=' + currentPage + '&numberInPage=' + numberInPage,
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            success: function (response) {
                resultHtml = convertResponse2HtmlForTrendingProducts(response);
            },
            fail: function (response) {
                window.console.log('Response is '+ response.toString() + '\n');
            }
        }
    );
    return resultHtml;
}
function convertResponse2HtmlForTrendingProducts(response){
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
                    '                                            <a data-toggle="tooltip" title="Remove" class="pd-setting-ed" target="_blank"><i class="fa fa-trash-o" aria-hidden="true" onclick="deleteTrending(' + id + ')"></i></a>\n' +
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
function deleteTrending(id){
    $.ajax({
        async: false,
        method: 'GET',
        url: baseServerPathNameForAdmin + '/trendings/delete-trending.php?id=' + id,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (response) {
            let resJson = JSON.parse(response);
            if(resJson['status'] === 'ok'){
                currentPage = 0;
                getAllTrendings(currentPage);
            }else{
                window.console.log(resJson['error']);
            }
        },
        fail: function (response){
            window.console.log(response.toString());
        }
    });
}
function getAllTrendings(currentPage){
    //localStorage.setItem("sendData", null)
    var products = getTrendingProducts(numOfShowProducts, currentPage);
    container.innerHTML = products;
}
function getPreviewTrendingsPage(){
    if(currentPage > 1){
        currentPage --;
        getAllTrendings(currentPage);
    }
}
function getNextTrendingsPage(){
    currentPage++;
    getAllTrendings(currentPage)
}

getAllTrendings(currentPage);