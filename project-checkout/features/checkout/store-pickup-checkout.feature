Feature: Checkout - Pickup E2E
    As a Customer,
    I want to purchase pickup orders,
    Such as BOPS and BOSS

    @CHK_015 @E2E @Smoke @Regression @TargettedRegression @Priority2 @Checkout @CreditCard @GuestUser @OverSized @USOnly @CBUS @CB2US
    Scenario: CHK_015_OverSized pickup order using Creditcard as Guest user
        Given the customer is on the home page
        When customer adds "SKU_OVERSIZED" to cart as "Pickup"
        Then cart page should be displayed with added item details
        And proceed to checkout as a guest user with "OVERSIZED_ITEMS" in cart
        Then add pickup information and click on Next button
        Then payment page should be displayed with the details
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then review page should be displayed with the correct details
        And review page should display "Visa" details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

        Examples:
            | billingAddressType |
            | DOMESTIC           |

    @CHK_007 @CHK_102 @CHK_103 @E2E @Smoke @Regression @TargettedRegression @Priority1 @Checkout @CreditCard @GuestUser @Pickup @BOPS @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_007_102_103_BOPS order using VISA as Guest user
        Given the customer is on the home page
        When customer adds "SKU_BOPS" to cart as "Pickup"
        Then cart page should be displayed with added item details
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        Then payment page should be displayed with the details
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "DOMESTIC" billing address
        And customer proceeds to review page after entering "DOMESTIC" billing address
        Then review page should be displayed with the correct details
        And review page should display "Visa" details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

    @CHK_009 @E2E @Smoke @Regression @TargettedRegression @Priority2 @Checkout @CreditCard @GuestUser @Pickup @BOSS @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_009_BOSS order using VISA as Guest user
        Given the customer is on the home page
        When customer adds "SKU_BOSS" to cart as "Pickup"
        Then cart page should be displayed with added item details
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        Then payment page should be displayed with the details
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        When customer enters "DOMESTIC" billing address
        And customer proceeds to review page after entering "DOMESTIC" billing address
        Then review page should be displayed with the correct details
        And review page should display "Visa" details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly
