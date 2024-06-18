Feature: Checkout - Cart Promotions
    As a customer,
    I should see Error message on applying invalid promo code

    Background: Customer launches Home page
        Given the customer is on the home page

    @CHK_105 @Regression @Priority3 @Promo @Cart @Checkout @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: CHK_105_Apply invalid promocodes
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer apply "Invalid_Promo_Code_1" in cart page
        Then invalid promo code error message should display in cart page
        When customer apply "Invalid_Promo_Code_2" in cart page
        Then invalid promo code error message should display in cart page