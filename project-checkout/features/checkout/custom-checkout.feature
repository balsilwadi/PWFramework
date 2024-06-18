Feature: Checkout - CustomSKU
    As a Customer,
    I should be able to create customized SKU orders

    Background: Customer launches Home page
        Given the customer is on the home page

    @CHK_038 @E2E @Regression @TargettedRegression @UATRegression @Priority2 @Checkout @CustomSKU @Delivery @MTO @GuestUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_038_Custom SKU checkout
        When customer adds "SKU_CUSTOM" to cart as "Ship"
        When customer is shown the cart page
        Then Customer sees the custom order messaging for cart page

        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then proceed to checkout as a guest user with "REGULAR_ITEMS" in cart

        When add shipping information and click on next button
        Then shipping page should be updated with selected custom option
        And shipping page should be updated with "FURNITURE" sku details

        Given customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then payment page should be displayed with the details

        When customer enters "<cardType>" payment details and proceeds to review page
        Then Payment page shows information for "<cardType>" card type
        And Payment page shows custom order messaging

        Given order summary should be displayed correctly
        When customer proceeds to review page
        Then Review Page should be updated with selected custom option
        And review page should be displayed with the correct details

        Given review page should display "<cardType>" details
        When order summary should be displayed correctly
        Then Customer is able to place order from review page

        Given customer should be taken to confirmation page
        When confirmation page should be displayed with detailed order information
        Then confirmation order summary should be displayed correctly
        And Confirmation page shows custom order messaging

        Examples:
            | cardType   | shipMode |
            | MasterCard | Standard |

    @CHK_037 @E2E @Regression @TargettedRegression @UATRegression @Priority2 @Checkout @Delivery @MTO @GuestUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_037_MTO item checkout
        When customer adds "SKU_MTO" to cart as "Ship"
        Then MTO message should be displayed
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "FURNITURE" sku details
        And customer selects notification preferences from shipping page
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
        And confirmation order summary should be displayed correctly

        Examples:
            | cardType   |
            | MasterCard |
