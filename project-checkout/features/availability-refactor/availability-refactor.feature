Feature: Checkout - Availability Refactoring Test Cases
    As a user I want to verify correct Availability Messages are shown for various availability scenarios
    for Furnitures and Housewares

    # Shipping Housewares

    @InStockShippingHousewares @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockShippingHousewares As a Guest Customer I want to purchase a PARCEL order which is Instock by selecting different ShipModes
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then Confirmation page verify availability data
        Examples:
            | shipMode |
            | Standard |

    @InStockShippingHousewaresCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockShippingHousewares As a Guest Customer I want to purchase a PARCEL order which is Instock by selecting different ShipModes
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data
        Examples:
            | shipMode |
            | Standard |

    @InStockShippingHousewaresShippingPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockShippingHousewares As a Guest Customer I want to purchase a PARCEL order which is Instock by selecting different ShipModes
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Examples:
            | shipMode |
            | Standard |

    @InStockShippingHousewaresReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockShippingHousewares As a Guest Customer I want to purchase a PARCEL order which is Instock by selecting different ShipModes
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item
        Examples:
            | shipMode |
            | Standard |

    @InStockShippingHousewaresConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockShippingHousewares As a Guest Customer I want to purchase a PARCEL order which is Instock by selecting different ShipModes
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        When customer places order from review page
        Then Confirmation page verify availability data
        Examples:
            | shipMode |
            | Standard |

    # Shipping Housewares BackOrder

    @BackOrderShippingHousewares @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderShippingHousewares As a Guest Customer I want to purchase a PARCEL order which is BackOrder by selecting different ShipModes
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then Confirmation page verify availability data
        Examples:
            | shipMode |
            | Standard |

    @BackOrderShippingHousewaresCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderShippingHousewares As a Guest Customer I want to purchase a PARCEL order which is BackOrder by selecting different ShipModes
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data
        Examples:
            | shipMode |
            | Standard |

    @BackOrderShippingHousewaresShippingPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderShippingHousewares As a Guest Customer I want to purchase a PARCEL order which is BackOrder by selecting different ShipModes
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Examples:
            | shipMode |
            | Standard |

    @BackOrderShippingHousewaresReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderShippingHousewares As a Guest Customer I want to purchase a PARCEL order which is BackOrder by selecting different ShipModes
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item
        Examples:
            | shipMode |
            | Standard |

    @BackOrderShippingHousewaresConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderShippingHousewares As a Guest Customer I want to purchase a PARCEL order which is BackOrder by selecting different ShipModes
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        When customer places order from review page
        Then Confirmation page verify availability data
        Examples:
            | shipMode |
            | Standard |

    # BackOrder Housewares Pickup

    @BackOrderPickupHousewares @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderPickupHousewares As a Guest Customer I want to purchase a PARCEL order which is BackOrder by Pickup option
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_BOPS_SKU" to cart as "Pickup" and "ADD" availability data
        Then cart page add availability data
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_BOPS_SKU" to cart as "Pickup" and "VERIFY" availability data
        Then cart page verify availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then Confirmation page verify availability data

        Examples:
            | billingAddressType |
            | DOMESTIC           |

    @BackOrderPickupHousewaresCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderPickupHousewares As a Guest Customer I want to purchase a PARCEL order which is BackOrder by Pickup option
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_BOPS_SKU" to cart as "Pickup" and "ADD" availability data
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_BOPS_SKU" to cart as "Pickup" and "VERIFY" availability data
        Then cart page verify availability data

    @BackOrderPickupHousewaresReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderPickupHousewares As a Guest Customer I want to purchase a PARCEL order which is BackOrder by Pickup option
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_BOPS_SKU" to cart as "Pickup" and "ADD" availability data
        Then cart page add availability data
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_BOPS_SKU" to cart as "Pickup" and "VERIFY" availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page verify availability data for "regular" item

        Examples:
            | billingAddressType |
            | DOMESTIC           |

    @BackOrderPickupHousewaresConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderPickupHousewares As a Guest Customer I want to purchase a PARCEL order which is BackOrder by Pickup option
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_BOPS_SKU" to cart as "Pickup" and "ADD" availability data
        Then cart page add availability data
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BACKORDER_BOPS_SKU" to cart as "Pickup" and "VERIFY" availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        When customer places order from review page
        Then Confirmation page verify availability data

        Examples:
            | billingAddressType |
            | DOMESTIC           |

    # InStock Housewares Pickup

    @InStockPickupHousewares @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockPickupHousewares As a Guest Customer I want to purchase a PARCEL order which is Instock by Pickup option
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BOPS_SKU" to cart as "Pickup" and "ADD" availability data
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BOPS_SKU" to cart as "Pickup" and "VERIFY" availability data
        Then cart page verify availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then Confirmation page verify availability data

        Examples:
            | billingAddressType |
            | DOMESTIC           |

    @InStockPickupHousewaresCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockPickupHousewares As a Guest Customer I want to purchase a PARCEL order which is Instock by Pickup option
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BOPS_SKU" to cart as "Pickup" and "ADD" availability data
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BOPS_SKU" to cart as "Pickup" and "VERIFY" availability data
        Then cart page verify availability data

    @InStockPickupHousewaresShippingPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockPickupHousewares As a Guest Customer I want to purchase a PARCEL order which is Instock by Pickup option
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BOPS_SKU" to cart as "Pickup" and "ADD" availability data
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BOPS_SKU" to cart as "Pickup" and "VERIFY" availability data
        Then cart page verify availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then Confirmation page verify availability data

        Examples:
            | billingAddressType |
            | DOMESTIC           |

    @InStockPickupHousewaresReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockPickupHousewares As a Guest Customer I want to purchase a PARCEL order which is Instock by Pickup option
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BOPS_SKU" to cart as "Pickup" and "ADD" availability data
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BOPS_SKU" to cart as "Pickup" and "VERIFY" availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page verify availability data for "regular" item

        Examples:
            | billingAddressType |
            | DOMESTIC           |

    @InStockPickupHousewaresConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockPickupHousewares As a Guest Customer I want to purchase a PARCEL order which is Instock by Pickup option
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BOPS_SKU" to cart as "Pickup" and "ADD" availability data
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PARCEL_BOPS_SKU" to cart as "Pickup" and "VERIFY" availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        #And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add pickup information and click on Next button
        #Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        When customer places order from review page
        Then Confirmation page verify availability data

        Examples:
            | billingAddressType |
            | DOMESTIC           |

    # Instock Furnitures Shipping

    @InStockShippingFurnitures @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockShippingFurnitures As a Guest Customer I want to purchase a FURNITURE which is Instock and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then Confirmation page verify availability data

    @InStockShippingFurnituresCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockShippingFurnitures As a Guest Customer I want to purchase a FURNITURE which is Instock and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data

    @InStockShippingFurnituresShippingPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockShippingFurnitures As a Guest Customer I want to purchase a FURNITURE which is Instock and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Ship" for "regular" address

    @InStockShippingFurnituresReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockShippingFurnitures As a Guest Customer I want to purchase a FURNITURE which is Instock and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item

    @InStockShippingFurnituresConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockShippingFurnitures As a Guest Customer I want to purchase a FURNITURE which is Instock and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        When customer places order from review page
        Then Confirmation page verify availability data

    # InStock Furnitures Pickup

    @InStockPickupFurnitures @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockPickupFurnitures As a Guest Customer I want to purchase a FURNITURE which is Instock with pickup option and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page add availability data
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page add availability messages for "FURNITURE" sku details by "Pickup" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then customer should be taken to confirmation page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page verify availability data
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Pickup" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then customer should be taken to confirmation page
        Then Confirmation page verify availability data

        Examples:
            | skuList | billingAddressType |
            | 171376  | DOMESTIC           |

    @InStockPickupFurnituresCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockPickupFurnitures As a Guest Customer I want to purchase a FURNITURE which is Instock with pickup option and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page verify availability data

    @InStockPickupFurnituresShippingPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockPickupFurnitures As a Guest Customer I want to purchase a FURNITURE which is Instock with pickup option and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page add availability data
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page add availability messages for "FURNITURE" sku details by "Pickup" for "regular" address
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Pickup" for "regular" address

    @InStockPickupFurnituresReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockPickupFurnitures As a Guest Customer I want to purchase a FURNITURE which is Instock with pickup option and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page add availability data
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page add availability messages for "FURNITURE" sku details by "Pickup" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page verify availability data for "regular" item

        Examples:
            | skuList | billingAddressType |
            | 171376  | DOMESTIC           |

    @InStockPickupFurnituresConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: InStockPickupFurnitures As a Guest Customer I want to purchase a FURNITURE which is Instock with pickup option and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page add availability data
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page add availability messages for "FURNITURE" sku details by "Pickup" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then customer should be taken to confirmation page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        When customer places order from review page
        Then customer should be taken to confirmation page
        Then Confirmation page verify availability data

        Examples:
            | skuList | billingAddressType |
            | 171376  | DOMESTIC           |

    # BackOrder Furnitures Shipping

    @BackOrderShippingFurnitures @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderShippingFurnitures As a Guest Customer I want to purchase a FURNITURE which is BackOrder and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then Confirmation page verify availability data

    @BackOrderShippingFurnituresCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderShippingFurnitures As a Guest Customer I want to purchase a FURNITURE which is BackOrder and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data

    @BackOrderShippingFurnituresShippingPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderShippingFurnitures As a Guest Customer I want to purchase a FURNITURE which is BackOrder and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Ship" for "regular" address

    @BackOrderShippingFurnituresReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderShippingFurnitures As a Guest Customer I want to purchase a FURNITURE which is BackOrder and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item

    @BackOrderShippingFurnituresConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderShippingFurnitures As a Guest Customer I want to purchase a FURNITURE which is BackOrder and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        When customer places order from review page
        Then Confirmation page verify availability data

    # BackOrder Furnitures Pickup

    @BackOrderPickupFurnitures @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderPickupFurnitures As a Guest Customer I want to purchase a FURNITURE which is BackOrder with pickup option and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page add availability data
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page add availability messages for "FURNITURE" sku details by "Pickup" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then customer should be taken to confirmation page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page verify availability data
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Pickup" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then customer should be taken to confirmation page
        Then Confirmation page verify availability data

        Examples:
            | skuList | billingAddressType |
            | 171376  | DOMESTIC           |

    @BackOrderPickupFurnituresCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderPickupFurnitures As a Guest Customer I want to purchase a FURNITURE which is BackOrder with pickup option and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page verify availability data

    @BackOrderPickupFurnituresShippingPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderPickupFurnitures As a Guest Customer I want to purchase a FURNITURE which is BackOrder with pickup option and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page add availability data
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page add availability messages for "FURNITURE" sku details by "Pickup" for "regular" address
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Pickup" for "regular" address

    @BackOrderPickupFurnituresReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderPickupFurnitures As a Guest Customer I want to purchase a FURNITURE which is BackOrder with pickup option and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page add availability data
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page add availability messages for "FURNITURE" sku details by "Pickup" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page verify availability data for "regular" item

        Examples:
            | skuList | billingAddressType |
            | 171376  | DOMESTIC           |

    @BackOrderPickupFurnituresConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: BackOrderPickupFurnitures As a Guest Customer I want to purchase a FURNITURE which is BackOrder with pickup option and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page add availability data
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then Shipping page add availability messages for "FURNITURE" sku details by "Pickup" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then customer should be taken to confirmation page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        When customer selects free pickup
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart with "CPU_ITEMS" in cart
        Then verify pickup location warehouse displayed
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        Given customer enters "<billingAddressType>" billing address
        And customer proceeds to review page after entering "<billingAddressType>" billing address
        When customer places order from review page
        Then customer should be taken to confirmation page
        Then Confirmation page verify availability data

        Examples:
            | skuList | billingAddressType |
            | 171376  | DOMESTIC           |

    # Shipping MTO items

    @MTOShipping @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: MTOShipping As a Guest Customer I want to purchase a FURNITURE which MTO and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_MTO_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_MTO_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then Confirmation page verify availability data

    @MTOShippingCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: MTOShipping As a Guest Customer I want to purchase a FURNITURE which MTO and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_MTO_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_MTO_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data

    @MTOShipping @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: MTOShipping As a Guest Customer I want to purchase a FURNITURE which MTO and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_MTO_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_MTO_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Ship" for "regular" address

    @MTOShippingReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: MTOShipping As a Guest Customer I want to purchase a FURNITURE which MTO and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_MTO_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_MTO_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item

    @MTOShippingConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: MTOShipping As a Guest Customer I want to purchase a FURNITURE which MTO and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_MTO_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_MTO_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        When customer places order from review page
        Then Confirmation page verify availability data

    # Shipping Custom items

    @CustomShipping @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: CustomShipping As a Guest Customer I want to purchase a Custom FURNITURE and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_CUSTOM_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_CUSTOM_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then Confirmation page verify availability data

    @CustomShippingCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: CustomShipping As a Guest Customer I want to purchase a Custom FURNITURE and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_CUSTOM_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_CUSTOM_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data

    @CustomShippingShippingPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: CustomShipping As a Guest Customer I want to purchase a Custom FURNITURE and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_CUSTOM_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_CUSTOM_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "FURNITURE" sku details by "Ship" for "regular" address

    @CustomShippingReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: CustomShipping As a Guest Customer I want to purchase a Custom FURNITURE and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_CUSTOM_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_CUSTOM_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page.

    @CustomShippingConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: CustomShipping As a Guest Customer I want to purchase a Custom FURNITURE and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_CUSTOM_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "FURNITURE" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_CUSTOM_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        When customer places order from review page
        Then Confirmation page verify availability data

    # Shipping Personalized items

    @PersonalizedShipping @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: PersonalizedShipping As a Guest Customer I want to purchase a Personalized item and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PERSONALIZED_SKU" to cart as "Ship"
        Then verify monogram details in "Cart" Page
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then "ADD" Personalized availability details in Shipping Page
        Then the customer enters a receipt email address
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "Personalized" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PERSONALIZED_SKU" to cart as "Ship"
        Then verify monogram details in "Cart" Page
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then "VERIFY" Personalized availability details in Shipping Page
        Then the customer enters a receipt email address
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "Personalized" item
        When customer places order from review page
        Then Confirmation page verify availability data

    @PersonalizedShippingCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: PersonalizedShipping As a Guest Customer I want to purchase a Personalized item and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PERSONALIZED_SKU" to cart as "Ship"
        Then verify monogram details in "Cart" Page
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PERSONALIZED_SKU" to cart as "Ship"
        Then verify monogram details in "Cart" Page
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data

    @PersonalizedShippingShippingPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: PersonalizedShipping As a Guest Customer I want to purchase a Personalized item and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PERSONALIZED_SKU" to cart as "Ship"
        Then verify monogram details in "Cart" Page
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then "ADD" Personalized availability details in Shipping Page
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PERSONALIZED_SKU" to cart as "Ship"
        Then verify monogram details in "Cart" Page
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then "VERIFY" Personalized availability details in Shipping Page

    @PersonalizedShippingReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: PersonalizedShipping As a Guest Customer I want to purchase a Personalized item and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PERSONALIZED_SKU" to cart as "Ship"
        Then verify monogram details in "Cart" Page
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then "ADD" Personalized availability details in Shipping Page
        Then the customer enters a receipt email address
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "Personalized" item
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PERSONALIZED_SKU" to cart as "Ship"
        Then verify monogram details in "Cart" Page
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "Personalized" item

    @PersonalizedShippingConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: PersonalizedShipping As a Guest Customer I want to purchase a Personalized item and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_PERSONALIZED_SKU" to cart as "Ship"
        Then verify monogram details in "Cart" Page
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then "ADD" Personalized availability details in Shipping Page
        Then the customer enters a receipt email address
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "Personalized" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_PERSONALIZED_SKU" to cart as "Ship"
        Then verify monogram details in "Cart" Page
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        When customer places order from review page
        Then Confirmation page verify availability data

    # Shipping Monogram items

    @MonogrammingAvailability @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: MonogrammingAvailability As a Guest Customer I want to purchase a Monogram item and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_MONOGRAM_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_MONOGRAM_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item
        When customer places order from review page
        Then Confirmation page verify availability data
        Examples:
            | shipMode |
            | Standard |

    @MonogrammingAvailabilityCartPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: MonogrammingAvailability As a Guest Customer I want to purchase a Monogram item and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_MONOGRAM_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_MONOGRAM_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page verify availability data

    @MonogrammingAvailabilityShippingPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: MonogrammingAvailability As a Guest Customer I want to purchase a Monogram item and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_MONOGRAM_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_MONOGRAM_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page verify availability messages for "PARCEL" sku details by "Ship" for "regular" address

    @MonogrammingAvailabilityReviewPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: MonogrammingAvailability As a Guest Customer I want to purchase a Monogram item and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_MONOGRAM_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_MONOGRAM_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page verify availability data for "regular" item
        Examples:
            | shipMode |
            | Standard |

    @MonogrammingAvailabilityConfirmationPage @AvailabilityRefactor @CBUS @CBCA @CB2US @CB2CA
    Scenario: MonogrammingAvailability As a Guest Customer I want to purchase a Monogram item and verify availability Messages
        Given the customer is on the home page
        When customer adds "AVAILABILITYREFACTOR_MONOGRAM_SKU" to cart as "Ship" and "ADD" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        Then cart page add availability data
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then Shipping page add availability messages for "PARCEL" sku details by "Ship" for "regular" address
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        Then Review Page add availability data for "regular" item
        When customer places order from review page
        Then Confirmation page add availability data
        Given the customer is on the home page for availability verification
        When customer adds "AVAILABILITYREFACTOR_MONOGRAM_SKU" to cart as "Ship" and "VERIFY" availability data
        When customer updates his zipcode to "AVAILABILITYREFACTOR_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then the customer enters a receipt email address
        And customer selects shipmode "<shipMode>" from shipping page
        When customer proceeds to payment page
        Then enter "MasterCard" payment details and proceed to review page
        When customer proceeds to review page
        When customer places order from review page
        Then Confirmation page verify availability data
        Examples:
            | shipMode |
            | Standard |
