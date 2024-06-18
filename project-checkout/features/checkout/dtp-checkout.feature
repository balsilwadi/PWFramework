Feature: Checkout - DTP
    As a Returning DTP Customer,
    I want to make exempt and non-except purchases

    @CHK_071 @E2E @Regression @TargettedRegression @Priority1 @Checkout-USR4 @CreditCard @ReturningUser @DTPUser @DTP @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_071_PARCEL order with DTP Tax Exemption
        Given the customer is on the home page
        Then they login using "DTP_USER" and "DTP_PWD" and empties cart
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        And cart summary should contain message regarding where tax exemption can be applied
        And alternate payment options should be hidden in cart page
        And non removable trade program discount should be applied with DTP related tooltip
        When logged in customer proceeds to checkout
        Then shipping page should be loaded with "Parcel" sku details for returning user
        When customer selects shipmode "<shipMode>" from shipping page
        Then order summary should be displayed correctly
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        And Payment page should have a default Promo code applied
        When Customer clicks Tax Exemption Checkbox
        Then order summary should be displayed correctly
        And Payment page should be displayed with DTP details
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

        Examples:
            | shipMode |
            | Standard |

    @CHK_072 @E2E @Smoke @Regression @TargettedRegression @Priority1 @Checkout-USR4 @CreditCard @ReturningUser @DTPUser @DTP @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_072_FURNITURE order with DTP Tax Exemption
        Given the customer is on the home page
        Then they login using "DTP_USER" and "DTP_PWD" and empties cart
        When customer adds "SKU_FURNITURE" to cart as "Ship"
        Then cart page should be displayed with added item details
        And cart summary should contain message regarding where tax exemption can be applied
        And alternate payment options should be hidden in cart page
        And non removable trade program discount should be applied with DTP related tooltip
        When logged in customer proceeds to checkout
        Then shipping page should be loaded with "Furniture" sku details for returning user
        When customer selects shipmode "Standard" from shipping page
        Then order summary should be displayed correctly
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        And Payment page should have a default Promo code applied
        When Customer clicks Tax Exemption Checkbox
        Then order summary should be displayed correctly
        And Payment page should be displayed with DTP details
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

    @CHK_073 @E2E @Regression @Priority3 @Checkout-USR4 @CreditCard @ReturningUser @DTPUser @DTP @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_073_Consecutive PARCEL orders with DTP Tax Exemptions
        Given the customer is on the home page
        Then they login using "DTP_USER" and "DTP_PWD" and empties cart
        When customer adds "SKU_PARCEL" to cart as "Delivery"
        Then cart page should be displayed with added item details
        And cart summary should contain message regarding where tax exemption can be applied
        And alternate payment options should be hidden in cart page
        And non removable trade program discount should be applied with DTP related tooltip
        When logged in customer proceeds to checkout
        Then shipping page should be loaded with "Parcel" sku details for returning user
        When customer selects shipmode "Standard" from shipping page
        Then order summary should be displayed correctly
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        And Payment page should have a default Promo code applied
        When Customer clicks Tax Exemption Checkbox
        Then order summary should be displayed correctly
        And Payment page should be displayed with DTP details
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly
        When the customer is on the home page
        And customer adds "SKU_PARCEL" to cart as "Delivery"
        Then cart page should be displayed with added item details
        And cart summary should contain message regarding where tax exemption can be applied
        And alternate payment options should be hidden in cart page
        And non removable trade program discount should be applied with DTP related tooltip
        When logged in customer proceeds to checkout
        Then shipping page should be loaded with "Parcel" sku details for returning user
        When customer selects shipmode "Standard" from shipping page
        Then order summary should be displayed correctly
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        And Payment page should have a default Promo code applied
        When Customer clicks Tax Exemption Checkbox
        Then order summary should be displayed correctly
        And Payment page should be displayed with DTP details
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

    @CHK_074 @E2E @Regression @Priority3 @Checkout-USR4 @CreditCard @ReturningUser @DTPUser @DTP @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_074_PARCEL order shipping to invalid Tax Exemption address as Returning user
        Given the customer is on the home page
        Then they login using "DTP_INVALIDTAXEXEMPT_ACCNT" and "DTP_INVALIDTAXEXEMPT_ACCNT_PWD" and empties cart
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        And cart summary should contain message regarding where tax exemption can be applied
        And alternate payment options should be hidden in cart page
        And non removable trade program discount should be applied with DTP related tooltip
        When logged in customer proceeds to checkout
        Then shipping page should be loaded with "Parcel" sku details for returning user
        When customer selects shipmode "<shipMode>" from shipping page
        Then order summary should be displayed correctly
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        And Payment page should have a default Promo code applied
        And verify tax exemption is disabled
        Then order summary should be displayed correctly
        And Payment page should be displayed with DTP details
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

        Examples:
            | shipMode |
            | Standard |