Feature: Checkout - Cart carousels
    As a Customer,
    I should be able to add items to cart from carousels shown in cart

    Background: Customer launches Home page
        Given the customer is on the home page

    @CHK_107 @Regression @Priority1 @TargettedRegression @Checkout @Cart @Carousels @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: CHK_107_Add items to cart from carousels

        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer add "First" item from cart carousel to cart
        Then verify add item from cart carousel toast is displayed
        And cart list should be updated
        When customer add "Second" item from cart carousel to cart
        Then verify add item from cart carousel toast is displayed
        And cart list should be updated
        When customer clicks view button in add item from cart carousel toast
        Then page scrolls to corresponding item in cart
        Then verify carousel toast getting closed on clicking close button