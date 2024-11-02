
const {LoginPage} = require('./LoginPage');
const {Dashboardpage} = require('./Dashboardpage');

class PoManager{
 
    constructor(page){
        this.page = page;
        this.loginpage = new LoginPage(this.page);
        this.dashboardPage = new Dashboardpage(this.page);
    }

    getLoginPage(){
        return this.loginpage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

}
module.exports = { PoManager };