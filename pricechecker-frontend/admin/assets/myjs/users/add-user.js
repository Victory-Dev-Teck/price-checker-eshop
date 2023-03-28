function addUser(){
    var fullName = document.getElementById('full-name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    if(confirmPassword === password){
        var sentData = {
            'name': fullName,
            'email': email,
            'password' : password
        };
        $.ajax(
            {
                async : false,
                method : 'POST',
                url : baseServerPathNameForAdmin + '/users/add-user.php',
                data: sentData,
                success: function (response) {
                    var resp = JSON.parse(response);
                    if((resp['status'] === 'ok')){
                        window.location.href = baseAdminPathName + '/authorized/users/users.html';
                        // window.location.reload(true);
                    }else {
                        window.console.log("add product error: " + resp['error']);
                        window.alert("add product error: " + resp['error']);
                    }
                },
                fail: function (response) {
                    window.alert("add product error: " + response.toString());
                    window.console.log("add product error: " + response);
                }
            }
        );
    }else {
        window.alert('Please insert correct password.');
    }

}