Feature: Checkout - PayPal
    As a Customer,
    I want to make purchases with
    PayPal as a payment

    Background: Customer launches Home page
        Given the customer is on the home page

    @CHK_026 @CHK_059 @E2E @Regression @TargettedRegression @Priority1 @Checkout @GiftCard @PayPal @GiftCard @GuestUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_026_59_Giftcard item order using PayPal from payment page as Guest user
        When customer adds "GIFTCARD" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details
        And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        When Select alternate payment "<paymentType>" and proceed to Review page
        Then Payment Information should be updated with the "<paymentType>" payment
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "<paymentType>" details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

        Examples:
            | paymentType |
            | PayPal      |

    @CHK_056 @E2E @Regression @Priority3 @Checkout @MixedPayment @Paypal @GiftCard @ReturningUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_056_Parcel order using PayPal + GiftCards as a Returning user
        When they login using "<email>" and "password" and empties cart
        And customer adds "SKU_PARCEL" to cart as "Ship"
        And customer adds "GIFTCARD" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        When logged in customer proceeds to checkout
        When customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
        Then order summary should be displayed correctly
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        When Select alternate payment "<paymentType>" and proceed to Review page
        Then Payment Information should be updated with the "<paymentType>" payment
        When enter "giftcard" details on payment page
        Then verify "giftcard" details on payment page
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

        Examples:
            | email    | paymentType |
            | ACCOUNT5 | PayPal      |

    @CHK_060 @E2E @Regression @TargettedRegression @Priority2 @Checkout @GiftCard @PayPal @GiftCard @GuestUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_060_Pickup order using PayPal from Cart as Guest user
        Given the customer is on the home page
        When customer adds "SKU_BOPS" to cart as "Pickup"
        Then cart page should be displayed with added item details
        And pay with PayPal from cart and proceed to checkout as a guest user
        Then add pickup information and click on Next button
        Then payment page should be displayed with the details
        Then Payment Information should be updated with the "<paymentType>" payment
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "<paymentType>" details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

        Examples:
            | paymentType | billingAddressType |
            | PayPal      | DOMESTIC           |

    @CHK_061 @E2E @Smoke @Regression @Priority2 @Checkout @GuestUser @PayPal @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_061_Parcel order using PayPal from payment page as Guest user
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details
        And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        When Select alternate payment "<paymentType>" and proceed to Review page
        Then Payment Information should be updated with the "<paymentType>" payment
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "<paymentType>" details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

        Examples:
            | paymentType |
            | PayPal      |

    @CHK_062 @E2E @Regression @TargettedRegression @Priority1 @Checkout @PayPal @ReturningUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_062_Parcel order using PayPal from payment page as Returning user
        When they login using "<email>" and "password" and empties cart
        And customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        When logged in customer proceeds to checkout
        Then shipping page should be loaded with "PARCEL" sku details for returning user
        When customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
        And shipping page should be loaded with gifting details
        And customer adds gift message in shipping page
        Then order summary should be displayed correctly
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        When Select alternate payment "<paymentType>" and proceed to Review page
        Then Payment Information should be updated with the "<paymentType>" payment
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "<paymentType>" details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

        Examples:
            | email    | paymentType |
            | ACCOUNT5 | PayPal      |