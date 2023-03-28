$(document).on('ready', function () {
    $('footer').load(baseAdminPathName + "/include/footer.html");

});
var adminEmail = window.localStorage.getItem('pricechecker-admin-name');
if(adminEmail === null || adminEmail === ''){
    window.location.href = baseAdminPathName + '/authentications/login.html';
}else {
    var adminName = document.getElementsByClassName('admin-name')[0];
    adminName.innerText = adminEmail;
    // var textNode = document.createTextNode(adminEmail);
    // adminName.appendChild(textNode);
}

function removeSpecialChars(removingString) {
    if(removingString === undefined){
        return "";
    }
    return removingString.replace(/(?!\w|\s)./g, '')
        .replace(/\s+/g, ' ')
        .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
}