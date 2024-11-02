class LoginPage  {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.email = "pvpprjc@gmail.com";
        this.emailPassword = "Qwer@12345";
    }
 
    async goTo() {
        console.log('Navigating to the client page...');
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
 
    async validLogin(email, emailPassword) {
        console.log('Performing valid login...');
        await this.userName.type(email);
        await this.password.type(emailPassword);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
    
}
 
module.exports = { LoginPage };