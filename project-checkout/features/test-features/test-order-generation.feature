Feature: TestOrder Creation. Not part of any tests
    TestOrder Creation
    @DeclineOrderCreationParcel @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_001a_As a Guest Customer I want to purchase a PARCEL order using CreditCard
        Given the customer is on the home page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details
        And enter email address 'asoman@crateandbarrel.com'
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
        And confirmation order summary should be displayed correctly

        Examples:
            | cardType |
            | Visa     |
            | Visa     |
            | Visa     |
            | Visa     |
            | Visa     |
            | Visa     |
            | Visa     |

    @DeclineOrderCreationFurniture @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_001b_As a Guest Customer I want to purchase a FURNITURE order with CreditCard
        Given the customer is on the home page
        When customer adds "SKU_FURNITURE" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "FURNITURE" sku details
        And customer selects notification preferences from shipping page
        And enter email address 'asoman@crateandbarrel.com'
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
            | cardType        |
            | AmericanExpress |

    @SimpleOrderCreationParcel @CHK_E01 @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_E01_As a Guest Customer I want to purchase a PARCEL order using CreditCard
        Given the customer is on the home page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        And enter email address 'asoman@crateandbarrel.com'
        When customer proceeds to payment page
        Then enter "<cardType>" payment details and proceed to review page
        When customer proceeds to review page
        And order summary should be displayed correctly
        When customer places order from review page
        And confirmation page should be displayed with detailed order information

        Examples:
            | cardType        |
            | AmericanExpress |

    @SimpleOrderCreationFurniture @CHK_E02 @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_E02_As a Guest Customer I want to purchase a FURNITURE order with CreditCard
        Given the customer is on the home page
        When customer adds "SKU_FURNITURE" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        And customer selects notification preferences from shipping page
        And enter email address 'asoman@crateandbarrel.com'
        When customer proceeds to payment page
        Then enter "<cardType>" payment details and proceed to review page
        When customer proceeds to review page
        When customer places order from review page
        And confirmation page should be displayed with detailed order information

        Examples:
            | cardType        |
            | AmericanExpress |

    @SimpleOrderCreationParcelForOMS @CHK_E01 @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_E01_As a Guest Customer I want to purchase a PARCEL order using CreditCard
        Given the customer is on the home page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        And enter email address 'asoman@crateandbarrel.com'
        When customer proceeds to payment page
        Then enter "<cardType>" payment details and proceed to review page
        When customer proceeds to review page
        And order summary should be displayed correctly
        When customer places order from review page
        And confirmation page should be displayed with detailed order information

        Examples:
            | cardType        |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |

    @SimpleOrderCreationFurnitureForOMS @CHK_E02 @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_E02_As a Guest Customer I want to purchase a FURNITURE order with CreditCard
        Given the customer is on the home page
        When customer adds "SKU_FURNITURE" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        And customer selects notification preferences from shipping page
        And enter email address 'asoman@crateandbarrel.com'
        When customer proceeds to payment page
        Then enter "<cardType>" payment details and proceed to review page
        When customer proceeds to review page
        When customer places order from review page
        And confirmation page should be displayed with detailed order information

        Examples:
            | cardType        |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |
            | Visa            |
            | AmericanExpress |
            | MasterCard      |