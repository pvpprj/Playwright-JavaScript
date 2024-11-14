Feature : Ecommerce validations

Scenarious: Placing the Order

Given a login to Ecommerce application with "pvpprjc@gmail.com" and "Qwer@12345"
When Add "ADIDAS ORIGINAL" to cart
Then Verify "ADIDAS ORIGINAL" is displayed in the cart
When Enter valid details and Place the Order
Then Verify order in present in the OrderHistory




