/**
 * This is javascript file for common settings
 */
var baseAdminPathName = "/pricechecker-frontend/admin";
var baseClientPathName = "/pricechecker-frontend";
var baseServerPathNameForAdmin = "http://localhost/pricechecker/admin";
var numOfShowProducts = 10;
var currentPageOfAmazon = 0;
var currentPageOfBestbuy = 0;
var currentPageOfEbay = 0;
var currentPageOfWalmart = 0;
var isMockData = false;
function objLength(obj){
    var i=0;
    for (var x in obj){
        if(obj.hasOwnProperty(x)){
            i++;
        }
    }
    return i;
}