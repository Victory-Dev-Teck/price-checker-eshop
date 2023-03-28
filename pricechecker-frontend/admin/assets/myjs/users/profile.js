var fullName = document.getElementById('full-name');
var email = document.getElementById('email');
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirm-password');
var name = window.localStorage.getItem('pricechecker-admin-name');

function getUserById(name){
    var user=[];
    $.ajax(
        {
            async : false,
            method : 'GET',
            url : baseServerPathNameForAdmin + '/users/get-admin-by-name.php?name='+name,
            success: function (response) {
                var resp = JSON.parse(response);
                if((resp['status'] === 'ok')){
                    user = resp['data'];
                }else {
                    window.console.log("update user error: " + resp['error']);
                   // window.location.href = baseAdminPathName ;
                }
            },
            fail: function (response) {
                window.console.log("update user error: " + response);
                //window.location.href = baseAdminPathName ;
            }
        }
    );
    return user;
}
function getUser(){
    return  getUserById(name);
}
function updateAdmin(){
    if(confirmPassword.value === password.value){
        var sentData = {
            'id' : window.localStorage.getItem('pricechecker-admin-id'),
            'name': fullName.value,
            'email': email.value,
            'password' : password.value
        };
        $.ajax(
            {
                async : false,
                method : 'POST',
                url : baseServerPathNameForAdmin + '/users/update-admin.php',
                data: sentData,
                success: function (response) {
                    var resp = JSON.parse(response);
                    if((resp['status'] === 'ok')){
                        window.location.href = baseAdminPathName;
                    }else {
                        window.console.log("add product error: " + resp['error']);
                    }
                },
                fail: function (response) {
                    window.console.log("add product error: " + response);
                }
            }
        );
    }else {
        window.alert('Please insert correct password.');
    }
}
function showUser(){
    var user = getUser();
    if (user.length < 1){
        window.alert('There is no admin to be edited.\n Return to home page.');
        //window.location.href = baseAdminPathName ;
    }else {
        window.localStorage.setItem('pricechecker-admin-id', user[0]['id']);
        fullName.value = user[0]['name'];
        email.value = user[0]['email'];
        password.value = user[0]['password'];
        confirmPassword.value = user[0]['password'];
    }
}
showUser();