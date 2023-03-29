var fullName = document.getElementById('full-name');
var email = document.getElementById('email');
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirm-password');
var id = window.localStorage.getItem('current-edited-user-id');
function getUserById(id){
    var user=[];
    $.ajax(
        {
            async : false,
            method : 'GET',
            url : baseServerPathNameForAdmin + '/users/get-user-by-id.php?id='+id,
            success: function (response) {
                var resp = JSON.parse(response);
                if((resp['status'] === 'ok')){
                    user = resp['data'];
                }else {
                    window.console.log("update user error: " + resp['error']);
                    window.location.href = baseAdminPathName + '/authorized/users/users.html';
                    // window.location.reload(true);
                }
            },
            fail: function (response) {
                window.console.log("update user error: " + response);
                window.location.href = baseAdminPathName + '/authorized/users/users.html';
                window.location.reload(true);
            }
        }
    );
    return user;
}
function getUser(){
    return  getUserById(id);
}
function updateUser(){
    if(confirmPassword.value === password.value){
        var sentData = {
            'id' : id,
            'name': fullName.value,
            'email': email.value,
            'password' : password.value
        };
        $.ajax(
            {
                async : false,
                method : 'POST',
                url : baseServerPathNameForAdmin + '/users/update-user.php',
                data: sentData,
                success: function (response) {
                    var resp = JSON.parse(response);
                    if((resp['status'] === 'ok')){
                        window.console.log("user info updated");
                        window.location.href = baseAdminPathName + '/authorized/users/users.html';
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
        window.alert('There is no user to be edited.\n Return to users list.');
        window.location.href = baseAdminPathName + '/authorized/users/users.html';
    }else {
        fullName.value = user[0]['name'];
        email.value = user[0]['email'];
        password.value = user[0]['password'];
        confirmPassword.value = user[0]['password'];
    }
}
showUser();