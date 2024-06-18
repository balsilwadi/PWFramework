Feature: Checkout - Address validation
    As a Guest customer,
    I should see auto correction, suggested addresses when entering incorrect address format

    Background: Customer launches Home page

    @CHK_076 @E2E @Smoke @Regression @TargettedRegression @Priority1 @Checkout @GuestUser @AVS @CBUS @CB2US
    Scenario: CHK_076_Address validation popup should be displayed when incorrect address is entered
        Given the customer is on the home page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then verify "AVS" validation error displays as a popup in shipping
        And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
        When customer proceeds to payment page
        Then verify "AVS2" validation error popup in billing address
        Then payment page should be displayed with the details
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" payment
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "Visa" details
        And order summary should be displayed correctly
        And order summary should be updated with zero tax for APO shipments
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

    @CHK_077 @E2E @Smoke @Regression @Priority3 @Checkout @GuestUser @AVS @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_077_Address auto correction for typos in address line
        Given the customer is on the home page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add "ACA" shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details for "ACA"
        And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        Then enter "<cardType>" payment details and proceed to review page
        Then payment Information should reflect the "<cardType>" payment
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "<cardType>" details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And verify ACA address in the confirmation page
        And confirmation order summary should be displayed correctly
        Examples:
            | cardType   |
            | MasterCard |