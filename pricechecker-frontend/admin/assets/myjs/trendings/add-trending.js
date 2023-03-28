function addTrending(title, description, productUrl, imageUrl, price, category, eshop){
    var sentData = {
        'title': title,
        'description': description,
        'product_url' : productUrl,
        'image_url' : imageUrl,
        'price' : price,
        'category' : category,
        'eshop' : eshop
    };
    $.ajax(
        {
            async : false,
            method : 'POST',
            url : baseServerPathNameForAdmin + '/trendings/add-trending.php',
            data: sentData,
            success: function (response) {
                var resp = JSON.parse(response);
                if((resp['status'] === 'ok')){
                    window.location.href = baseAdminPathName + '/authorized/trendings/trendings.html';
                    // window.location.reload(true);
                }else {
                    window.console.log("add trending product error: " + resp['error']);
                    window.alert(resp['error'])
                }
            },
            fail: function (response) {
                window.console.log("add trending product error: " + response);
                window.alert(response)
            }
        }
    );
}
