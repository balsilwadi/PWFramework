Feature: As a Customer I want to sign in to account from cart page
    As a user
    I want to test
    sign in from cart page

    Background: Launch the Home page
        Given the customer is on the home page

    @LoginFromCart @Regression @Smoke @Account @ACNT_027 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: Returning user sign in from Cart page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When Customer opens sign in popup in cart page
        And Customer sign in with "CartLogin" login credentials from cart page
        Then Customer should still stay in the cart page

    @LoginFromCart @Regression @Smoke @Account @Google @ACNT_028 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: Returning user sign in from Cart page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When Customer opens sign in popup in cart page
        When Customer clicks on Google Signin button
        Then Google signin page should display

    @LoginFromCart @Regression @Smoke @Account @Apple @ACNT_028 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: Returning user sign in from Cart page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When Customer opens sign in popup in cart page
        When Customer clicks on Apple Signin button
        Then Apple signin page should display




