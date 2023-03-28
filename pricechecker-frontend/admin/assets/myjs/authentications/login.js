function login(){
    let name = document.getElementById('name').value;
    let password = document.getElementById('password').value;
    $.ajax(
        {
            async : false,
            method : 'POST',
            url : baseServerPathNameForAdmin + '/authentications/login.php',
            data: {
                name,
                password
            },
            success: function (response) {
                let resp = JSON.parse(response);
                if((resp['status'] === 'ok')){
                    window.localStorage.setItem('pricechecker-admin-name', resp['name']);
                    window.location.href = baseAdminPathName + '/';
                }else {
                    let alert = document.getElementById('login-fail-alert');
                    alert.innerText = resp['error'];
                    alert.style.visibility = 'visible';
                }
            },
            fail: function (response) {
                let alert = document.getElementById('login-fail-alert');
                alert.innerText = response;
                alert.style.visibility = 'visible';
            }
        }
    );
}