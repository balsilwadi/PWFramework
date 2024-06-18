Feature: Checkout - Warehouse pickup
    As a Customer,
    I want to purchase warehouse pickup orders

    @CHK_010 @E2E @Smoke @Regression @TargettedRegression @Priority1 @Checkout @CPU
    Scenario Outline: CHK_010_Warehouse Pickup order as Guest user
        Given the customer is on the home page
        When customer adds "SKU_CPU" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        When customer selects "<warehouseNumber>" warehouse for pickup
        And proceed to checkout as a guest user with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        And shipping page should be loaded with Warehouse Pickup details
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        When customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then review page should be displayed with the correct details
        And review page should display "Visa" details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

        @CBUS @CB2US
        Examples:
            | billingAddressType | warehouseNumber |
            | DOMESTIC           | 191             |

        @CBCA @CB2CA
        Examples:
            | billingAddressType | warehouseNumber |
            | DOMESTIC           | 370             |

    @CHK_011 @E2E @Smoke @Regression @TargettedRegression @Priority1 @Checkout @CPU
    Scenario Outline: CHK_011_Warehouse Pickup order without trip date
        Given the customer is on the home page
        When customer adds "SKU_CPU" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        When customer selects "<warehouseNumber>" warehouse for pickup
        And proceed to checkout as a guest user with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        And shipping page should be loaded with Warehouse Pickup details
        And customer opts schedule pickup later
        When customer proceeds to payment page
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

        @CBUS @CB2US
        Examples:
            | billingAddressType | warehouseNumber |
            | DOMESTIC           | 191             |

        @CBCA @CB2CA
        Examples:
            | billingAddressType | warehouseNumber |
            | DOMESTIC           | 370             |