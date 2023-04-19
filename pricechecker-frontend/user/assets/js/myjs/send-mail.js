function sendEmail(firstName, lastName, subject, mailText){

    let alertDiv = document.getElementById('email-fail-alert');

    let params = {
        email: 'pricecheckerproject@gmail.com',
        firstName: firstName,
        lastName: lastName,
        subject: subject,
        mailText: mailText};
    return new Promise((resolve, reject) => {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": baseServerPathNameForUser + '/authentications/send-email.php',
            "method": "POST",
            "data": params,
            success: function (response) {
                let respBuff = null;
                try {
                    let respBuff = JSON.parse(response);
                    if(respBuff['status'] !== 'ok'){
                        alertDiv.setAttribute("style", "visibility:visible;");
                        alertDiv.innerText = respBuff['error'];
                    }
                }catch (e) {
                    alertDiv.setAttribute("style", "visibility:visible;");
                    console.log(response);
                    if(response.includes(" Failed to connect to mailserver")){
                        alertDiv.innerText = "Failed to connect to mailserver.";
                    }else {
                        alertDiv.innerText = response;
                    }
                }
                return resolve(respBuff);
            },
            fail: function (response, textStatus) {
                let errStr = 'Status is ' + textStatus + '.\n Response is ' + response.toString();
                alertDiv.innerText = errStr;
                return reject(errStr);
            }
        });
    });
}