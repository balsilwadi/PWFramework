Feature: Checkout - Shipping Rates
    As a Customer,
    I would like to get Correct shipping charge for furniture items

    Background: Customer launches Home page
        Given the customer is on the home page

    #This script is using a SKU which is not free ship eligible.  runs in US sites
    @CHK_108 @Regression @Priority2 @Checkout @Cart @Shipping @ShippingRates @CBUS @CB2US
    Scenario: CHK_108_Validate shipping rates in Cart and Shipping pages
        When customer adds "SKU_PARCEL4" to cart as "Ship"
        Then cart page should be displayed with added item details
        When merchandise total is between "<startRange>" and "<endRange>"
        Then "<standardShipCharge>" charge should be displayed in cart summary
        When proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        And add shipping information and click on next button
        Then verify the Shipping charge displayed for "Standard" shipmode
        And verify the Shipping charge displayed for "Premium" shipmode
        And verify the Shipping charge displayed for "Express" shipmode
        When customer selects shipmode "Premium" from shipping page
        Then shipping charge in order summary should be updated for "Premium"
        When customer selects shipmode "Express" from shipping page
        Then shipping charge in order summary should be updated for "Express"

        Examples:
            | startRange | endRange | standardShipCharge |
            | $0         | $15.00   | $6.00              |
            | $15.01     | $25.00   | $7.00              |
            | $25.01     | $45.00   | $9.00              |
            | $45.01     | $65.00   | $12.00             |
            | $65.01     | $95.00   | $15.00             |
            | $95.01     | $125.00  | $18.00             |
            | $125.01    | $200.00  | $24.00             |
            | $200.01    | $250.00  | $28.00             |

    @CHK_108 @Regression @Priority2 @Checkout @Cart @Shipping @ShippingRates @CBCA @CB2CA
    Scenario: CHK_108_Validate shipping rates in Cart and Shipping pages
        When customer adds "SKU_PARCEL4" to cart as "Ship"
        Then cart page should be displayed with added item details
        When merchandise total is between "<startRange>" and "<endRange>"
        Then "<standardShipCharge>" charge should be displayed in cart summary
        When proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        And add shipping information and click on next button
        Then verify the Shipping charge displayed for "Standard" shipmode

        Examples:
            | startRange  | endRange    | standardShipCharge |
            | CAD 0.00    | CAD 50.00   | CAD 14.95          |
            | CAD 50.01   | CAD 100.00  | CAD 19.95          |
            | CAD 100.01  | CAD 200.00  | CAD 24.95          |
            | CAD 200.01  | CAD 400.00  | CAD 29.95          |
            | CAD 400.01  | CAD 1000.00 | CAD 44.95          |
            | CAD 1000.01 | CAD 1100.00 | CAD 59.95          |

    @CHK_109 @Regression @Priority2 @Checkout @Cart @Delivery @ShippingRates
    Scenario: CHK_109_Validate delivery rates in Cart and Shipping pages
        When customer adds "<sku>" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "<zipCode>" in Cart
        Then shipping method should be updated to "<shipMethod>" in cart
        Then "<shipCharge>" charge should be displayed in cart summary

        @CBUS @CB2US
        Examples:
            | sku           | shipMethod            | zipCode           | shipCharge |
            | SKU_FRN_LT999 | Local In-Home         | LIH_LT100_ZIPCODE | $149.00    |
            | SKU_FRN_LT999 | Local In-Home         | LIH_GT100_ZIPCODE | $399.00    |
            | SKU_FRN_GT999 | Local In-Home         | LIH_LT100_ZIPCODE | $279.00    |
            | SKU_FRN_GT999 | Local In-Home         | LIH_GT100_ZIPCODE | $399.00    |
            | SKU_FURNITURE | Basic Freight         | BFT_ZIPCODE       | $299.00    |
            | SKU_FURNITURE | Long Distance In-Home | LNG_ZIPCODE       | $399.00    |

        @CBCA @CB2CA
        Examples:
            | sku               | shipMethod            | zipCode               | shipCharge |
            | SKU_FURNITURE     | Local In-Home         | LIH_LT161_ZIPCODE     | CAD 329.00 |
            | SKU_FURNITURE     | Local In-Home         | LIH_BT162_241_ZIPCODE | CAD 499.00 |
            | SKU_FRN_GT999     | Local In-Home         | LIH_GT241_ZIPCODE     | CAD 599.00 |
            | SKU_FURNITURE     | Basic Freight         | BFT_ZIPCODE           | CAD 230.00 |
            | SKU_LONG_DISTANCE | Long Distance In-Home | LNG_ZIPCODE           | CAD 599.00 |

    @CHK_108a @Regression @Priority2 @Cart @Shipping @ShippingRates @CBUS @CB2US
    Scenario: CHK_108a_Validate shipping rates in Cart and Shipping pages when expedited turned off
        When customer adds "SKU_PARCEL4" to cart as "Ship"
        Then cart page should be displayed with added item details
        When merchandise total is between "<startRange>" and "<endRange>"
        Then "<standardShipCharge>" charge should be displayed in cart summary
        When proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        And add shipping information and click on next button
        Then verify the Shipping charge displayed for "Standard" shipmode

        Examples:
            | startRange | endRange | standardShipCharge |
            | $0         | $15.00   | $6.00              |
            | $15.01     | $25.00   | $7.00              |
            | $25.01     | $45.00   | $9.00              |
            | $45.01     | $65.00   | $12.00             |
            | $65.01     | $95.00   | $15.00             |
            | $95.01     | $125.00  | $18.00             |
            | $125.01    | $200.00  | $24.00             |
            | $200.01    | $250.00  | $28.00             |