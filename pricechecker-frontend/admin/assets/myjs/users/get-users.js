
var container = document.getElementById('users-container');
function getUsers(){
    var resultHtml = '';
    $.ajax(
        {
            async : false,
            method : "GET",
            url : baseServerPathNameForAdmin + '/users/get-users.php',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            success: function (response) {
                resultHtml = convertResponse2HtmlForUsers(response);
            },
            fail: function (response) {
                window.console.log('Response is '+ response.toString() + '\n');
            }
        }
    );
    return resultHtml;
}
function convertResponse2HtmlForUsers(response){
    var resultHtml = '';

    var resp = JSON.parse(response);
    if(resp['status'] === 'ok'){
        if(objLength(resp['data']) > 0){
            var i = 0;
            resultHtml = ' <table>\n' +
                '                                    <tr>\n' +
                '                                        <th>No</th>\n' +
                '                                        <th>Name</th>\n' +
                '                                        <th>Email</th>\n' +
                '                                        <th>Password</th>\n' +
                '                                        <th>Mobile</th>\n' +
                '                                        <th>city</th>\n' +
                '                                        <th>code</th>\n' +
                '                                        <th>status</th>\n' +
                '                                        <th>Action</th>\n' +
                '                                    </tr>';
            for(i = 0; i < resp['data'].length; i++){
                var id = resp['data'][i]['id'];
                var name = resp['data'][i]['name'];
                var email = resp['data'][i]['email'];
                var password = resp['data'][i]['password'];
                var mobile = resp['data'][i]['mobile'];
                var city = resp['data'][i]['city'];
                var code = resp['data'][i]['code'];
                var status = resp['data'][i]['status'];
                resultHtml +=  '<tr>\n' +
                    '                                        <td>' + (i + 1) + '</td>\n' +
                    '                                        <td>'+name + '</td>\n' +
                    '                                        <td>' + email + '</td>\n' +
                    '                                        <td>' + password + '</td>\n' +
                    '                                        <td>'+ mobile + '</td>\n' +
                    '                                        <td>'+ city +'</td>\n' +
                    '                                        <td>'+ code + '</td>\n' +
                    '                                        <td>'+ status + '</td>\n' +
                    '                                        <td>\n' +
                    '                                            <a data-toggle="tooltip" title="Remove" class="pd-setting-ed"><i class="fa fa-trash-o" aria-hidden="true" onclick="deleteUser(' + id + ')"></i></a>\n' +
                    '                                            <a data-toggle="tooltip" title="Edit" class="pd-setting-ed"><i class="fa fa-pencil-square-o" aria-hidden="true" onclick="go2EditUser(' + id + ')"></i></a>\n' +
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
function deleteUser(id){
    if(window.confirm('Are you sure to delete this user?')){
        $.ajax({
            async: false,
            method: 'GET',
            url: baseServerPathNameForAdmin + '/users/delete-user.php?id=' + id,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (response) {
                let resJson = JSON.parse(response);
                if(resJson['status'] === 'ok'){
                    showUsers();
                }else{
                    window.console.log(resJson['error']);
                }
            },
            fail: function (response){
                window.console.log(response.toString());
            }
        });
    }
}
function go2EditUser(id){
    window.localStorage.setItem('current-edited-user-id', id);
    window.location.href = baseAdminPathName + '/authorized/users/edit-user.html';
}
function showUsers(){
    container.innerHTML = getUsers();
}
showUsers();