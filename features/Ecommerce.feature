Feature: Ecommerce validations
 
  Scenario: Placing the Order
    Given I log in to the Ecommerce application with "pvpprjc@gmail.com" and "Qwer@12345"
    When I add "ADIDAS ORIGINAL" to the cart and verify product is displayed in the cart with "pvpprjc@gmail.com"
    # Then I verify "ADIDAS ORIGINAL" is displayed in the cart
    When I enter valid details and place the order
    Then I verify the order is present in the Order History