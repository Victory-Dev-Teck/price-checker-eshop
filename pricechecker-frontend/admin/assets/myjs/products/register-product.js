function registerProduct(title, description, productUrl, imageUrl, price, category, eshop){
    var sentData = {
        'title': title,
        'description': description,
        'product_url' : productUrl,
        'image_url' : imageUrl,
        'price' : price,
        'category' : category,
        'eshop': eshop
    };
    $.ajax(
        {
            async : false,
            method : 'POST',
            url : baseServerPathNameForAdmin + '/my-products/register-product.php',
            data: sentData,
            success: function (response) {
                var resp = JSON.parse(response);
                if((resp['status'] === 'ok')){
                    window.location.href = baseAdminPathName + '/authorized/products/products.html';
                    // window.location.reload(true);
                }else {
                    window.console.log("add product error: " + resp['error']);
                    let error = resp['error']
                    window.alert(error);
                }
            },
            fail: function (response) {
                window.console.log("add product error: " + response);
                window.alert(response)
            }
        }
    );
}