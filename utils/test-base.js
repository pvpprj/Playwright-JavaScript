const base = require('@playwright/test');

exports.customtest =  base.test.extend(
{
    testDataForOrder : {
            username : "pvpprjc@gmail.com",
            password : "Qwer@12345",
            productsName : "ADIDAS ORIGINAL"     
    }
    
}


)

