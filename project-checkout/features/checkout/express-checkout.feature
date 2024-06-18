Feature: Checkout - Express checkout
    As a customer eligible for express checkout,
    I want to purchase items through express checkout

    Background: Customer login to account and removes all previously added items to avoid cart merge issues
        Given the customer is on the home page
        Then they login using "EXPRESS_CHK_ELIG_ACCNT_EMAIL" and "EXPRESS_CHK_ELIG_ACCNT_PWD" and empties cart

    @CHK_020 @E2E @Smoke @Regression @TargettedRegression @Priority1 @ExpressCheckout @Checkout @ReturningUser @CBUS @CB2US
    Scenario Outline: CHK_020_Express checkout with parcel items
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer proceeds to checkout as a express user
        Then verify express summary on review page
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly
