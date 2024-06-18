Feature: Free Shipping end to end scenarios
    As a customer,
    I want to checkout a free shipping eligible parcel item

    Background: Customer launches Home page
        Given the customer is on the home page

    @FS_01 @E2E @Regression @FreeShipping @FreeShip @GuestUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_023 Free Shipping Eligible Parcel item checkout as a guest user
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        When customer adds "FREE_SHIP_PARCEL_SKU" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        #And cart summary should not have shipping discount
        #And customer updates item quantity to get eligible for free shipping
        Then verify free shipping message
        Then verify free shipping link and popup
        And verify cart summary
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "Parcel" sku details
        Then verify free shipping link and popup
        And verify shipping discount applied in order summary
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        Then enter "<cardType>" payment details and proceed to review page
        Then payment Information should reflect the "<cardType>" payment
        And verify shipping discount applied in order summary
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "<cardType>" details
        And order summary should be displayed correctly
        Then verify free shipping link and popup
        And verify shipping discount applied in order summary
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And verify shipping discount applied in order summary
        And confirmation order summary should be displayed correctly

        Examples:
            | cardType   | date                           | time                           |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime |
            | MasterCard | FreeShippingDateBeforeEndDate  | FreeShippingTimeBeforeEndTime  |

    @FS_02 @FreeShipping @ThresholdNotMet @CBUS @CBCA @CB2US @CB2CA
    Scenario:Free Shipping Eligible Parcel item- threshold not met - checkout as a guest user
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        When customer adds "SKU_PARCEL3" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        Then verify free shipping message
        Then verify free shipping link and popup
        And verify shipping discount not applied in cart summary
        And verify cart summary
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "Parcel" sku details
        Then verify free shipping link and popup
        And verify shipping discount not applied in order summary
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        Then enter "<cardType>" payment details and proceed to review page
        Then payment Information should reflect the "<cardType>" payment
        And verify shipping discount not applied in order summary
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "<cardType>" details
        And order summary should be displayed correctly
        Then verify free shipping link and popup
        And verify shipping discount not applied in order summary
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And verify shipping discount not applied in order summary
        And confirmation order summary should be displayed correctly

        Examples:
            | cardType   | date                           | time                           |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime |
            | MasterCard | FreeShippingDateBeforeEndDate  | FreeShippingTimeBeforeEndTime  |

    @FS_08 @FreeShipping @FurnitureNoFreeShipping @CBUS @CBCA @CB2US @CB2CA
    Scenario: Furniture order as a guest user - verify shipping discount should not applied
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        When customer adds "SKU_FURNITURE" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And verify free shipping message not displayed
        And verify free shipping link not displayed
        And verify shipping discount not applied in cart summary
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "FURNITURE" sku details
        And verify free shipping link not displayed
        And verify shipping discount not applied in order summary
        And customer selects notification preferences from shipping page
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        Then enter "<cardType>" payment details and proceed to review page
        Then payment Information should reflect the "<cardType>" payment
        And order summary should be displayed correctly
        And verify free shipping link not displayed
        And verify shipping discount not applied in order summary
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "<cardType>" details
        And order summary should be displayed correctly
        And verify free shipping link not displayed
        And verify shipping discount not applied in order summary
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly
        And verify shipping discount not applied in order summary

        Examples:
            | cardType   | date                           | time                           |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime |
            | MasterCard | FreeShippingDateBeforeEndDate  | FreeShippingTimeBeforeEndTime  |

    @FS_19 @FreeShipping @RugNoFreeShipping @CBUS @CBCA @CB2US @CB2CA
    Scenario: Checkout Rug - Verify free shipping discount not getting applied
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        When customer adds "SKU_RUG" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And verify free shipping message not displayed
        And verify free shipping link not displayed
        And verify shipping discount not applied in cart summary
        And verify cart summary
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "Parcel" sku details
        And verify free shipping link not displayed
        And verify shipping discount not applied in order summary
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        Then enter "<cardType>" payment details and proceed to review page
        Then payment Information should reflect the "<cardType>" payment
        And verify shipping discount not applied in order summary
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "<cardType>" details
        And order summary should be displayed correctly
        And verify free shipping link not displayed
        And verify shipping discount not applied in order summary
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And verify shipping discount not applied in order summary
        And confirmation order summary should be displayed correctly

        Examples:
            | cardType   | date                           | time                           |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime |
            | MasterCard | FreeShippingDateBeforeEndDate  | FreeShippingTimeBeforeEndTime  |

    @FS_09 @FreeShipping @ParcelFurnitureNoFreeShipping @CBUS @CBCA @CB2US @CB2CA
    Scenario: Checkout Parcel Furniture - Verify free shipping discount not getting applied
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        When customer adds "SKU_PARCEL_FURNITURE" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And verify free shipping message not displayed
        And verify free shipping link not displayed
        And verify shipping discount not applied in cart summary
        And verify cart summary
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "Parcel" sku details
        And verify free shipping link not displayed
        And verify shipping discount not applied in order summary
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        Then enter "<cardType>" payment details and proceed to review page
        Then payment Information should reflect the "<cardType>" payment
        And verify shipping discount not applied in order summary
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "<cardType>" details
        And order summary should be displayed correctly
        And verify free shipping link not displayed
        And verify shipping discount not applied in order summary
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And verify shipping discount not applied in order summary
        And confirmation order summary should be displayed correctly

        Examples:
            | cardType   | date                           | time                           |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime |
            | MasterCard | FreeShippingDateBeforeEndDate  | FreeShippingTimeBeforeEndTime  |

    @FS_07 @FreeShipping @ParcelUpdateQuantity
    Scenario: Verify Free shipping - Update quantity so that merchandise total goes above and below threshold
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        When customer adds "FREE_SHIP_SKU_LESS_THAN_THRESHOLD" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        When merchandise total is between "<lowBelowThreshold>" and "<highBelowThreshold>"
        Then verify free shipping message
        Then verify free shipping link and popup
        And verify shipping discount not applied in cart summary
        And verify cart summary
        When merchandise total is between "<lowAboveThreshold>" and "<highAboveThreshold>"
        Then verify free shipping message
        Then verify free shipping link and popup
        And verify shipping discount applied in cart summary
        @CBUS @CB2US
        Examples:
            | cardType   | date                           | time                           | lowBelowThreshold | highBelowThreshold | lowAboveThreshold | highAboveThreshold |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime | $0                | $48                | $49               | $198               |
            | MasterCard | FreeShippingDateBeforeEndDate  | FreeShippingTimeBeforeEndTime  | $0                | $48                | $49               | $198               |
        @CB2CA @CB2CA
        Examples:
            | cardType   | date                           | time                           | lowBelowThreshold | highBelowThreshold | lowAboveThreshold | highAboveThreshold |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime | CAD 0             | CAD 148            | CAD 149           | CAD 250            |
            | MasterCard | FreeShippingDateBeforeEndDate  | FreeShippingTimeBeforeEndTime  | CAD 0             | CAD 148            | CAD 149           | CAD 250            |


    @FS_12 @FreeShipping @GRFreeShipEligibleCheckout @IncreaseQuantity @CBUS @CBCA @CB2US
    Scenario: Verify GR Free shipping - Add a GR item to cart which is below GR free shipping threshold, increase quantity and checkout
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL_FOR_FREESHIPPING"
        When the customer closes the popup if showing
        And the customer adds first item to cart
        Then click on CHECKOUT NOW button in gift registry flyout
        And verify free shipping message
        And verify free shipping link and popup
        And verify shipping discount not applied in cart summary
        When merchandise total is between "<lowAboveThreshold>" and "<highAboveThreshold>"
        Then verify free shipping message
        And verify free shipping link and popup
        And verify shipping discount applied in cart summary
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When the customer clicks on the Shipping Address Next button
        Then the ship to registrant message should be visible on the Shipping page
        And verify free shipping link and popup
        And verify shipping discount applied in order summary
        When the customer enters a receipt email address
        And the customer shipping to a gift registrant address proceeds to the Payment page
        And verify shipping discount applied in order summary
        And order summary should be displayed correctly
        When customer enters a billing address
        Then enter "<cardType>" payment details and proceed to review page
        And customer proceeds to review page after entering "DOMESTIC" billing address
        Then the ship to registrant message should be visible on the Review page
        And order summary should be displayed correctly
        And verify free shipping link and popup
        And verify shipping discount applied in order summary
        When the customer buying gift registry items places an order from the Review page
        Then the ship to registrant message should be visible on the Confirmation page
        And verify shipping discount applied in order summary


        Examples:
            | cardType   | date                           | time                           | lowAboveThreshold | highAboveThreshold |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime | $49               | $99                |

    @FS_10 @FreeShipping @GRFreeShipEligibleCheckout @CBUS @CBCA @CB2US
    Scenario: Verify GR Free shipping - Add a GR item to cart which is GR free ship eligible and checkout
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL_FOR_FREESHIPPING"
        When the customer closes the popup if showing
        And the customer adds second item to cart
        Then click on CHECKOUT NOW button in gift registry flyout
        And verify free shipping message
        And verify free shipping link and popup
        And verify shipping discount applied in cart summary
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When the customer clicks on the Shipping Address Next button
        Then the ship to registrant message should be visible on the Shipping page
        And verify free shipping link and popup
        And verify shipping discount applied in order summary
        When the customer enters a receipt email address
        And the customer shipping to a gift registrant address proceeds to the Payment page
        Then verify shipping discount applied in order summary
        And order summary should be displayed correctly
        When customer enters a billing address
        Then enter "<cardType>" payment details and proceed to review page
        And customer proceeds to review page after entering "DOMESTIC" billing address
        Then the ship to registrant message should be visible on the Review page
        And order summary should be displayed correctly
        And verify free shipping link and popup
        And verify shipping discount applied in order summary
        When the customer buying gift registry items places an order from the Review page
        Then the ship to registrant message should be visible on the Confirmation page
        And verify shipping discount applied in order summary

        Examples:
            | cardType   | date                           | time                           | lowAboveThreshold | highAboveThreshold |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime | $49               | $99                |

    @FS_11 @FreeShipping @GRFreeShipEligibleCheckout @GRThresholdNotMet @CBUS @CBCA @CB2US
    Scenario: Verify GR Free shipping - Add a GR item to cart which is GR free ship eligible and checkout
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL_FOR_FREESHIPPING"
        When the customer closes the popup if showing
        And the customer adds first item to cart
        Then click on CHECKOUT NOW button in gift registry flyout
        And verify free shipping message
        And verify free shipping link and popup
        And verify shipping discount not applied in cart summary
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When the customer clicks on the Shipping Address Next button
        Then the ship to registrant message should be visible on the Shipping page
        And verify free shipping link and popup
        And verify shipping discount not applied in order summary
        When the customer enters a receipt email address
        And the customer shipping to a gift registrant address proceeds to the Payment page
        And verify shipping discount not applied in order summary
        And order summary should be displayed correctly
        When customer enters a billing address
        Then enter "<cardType>" payment details and proceed to review page
        And customer proceeds to review page after entering "DOMESTIC" billing address
        Then the ship to registrant message should be visible on the Review page
        And order summary should be displayed correctly
        And verify free shipping link and popup
        And verify shipping discount not applied in order summary
        When the customer buying gift registry items places an order from the Review page
        Then the ship to registrant message should be visible on the Confirmation page
        And verify shipping discount not applied in order summary

        Examples:
            | cardType   | date                           | time                           | lowAboveThreshold | highAboveThreshold |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime | $49               | $99                |

    @FS_14 @FreeShipping @AddItemFromCarousel
    Scenario: Verify Free shipping - Add item from carousel and verify free shipping is applied when threshold met.
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        When customer adds "FREE_SHIP_SKU_LESS_THAN_THRESHOLD" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        When merchandise total is between "<lowBelowThreshold>" and "<highBelowThreshold>"
        Then verify free shipping message
        Then verify free shipping link and popup
        And verify shipping discount not applied in cart summary
        When customer add "First" item from cart carousel to cart
        Then verify add item from cart carousel toast is displayed
        And verify shipping discount applied in cart summary

        @CBUS @CB2US
        Examples:
            | cardType   | date                           | time                           | lowBelowThreshold | highBelowThreshold |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime | $99               | $148               |
            | MasterCard | FreeShippingDateBeforeEndDate  | FreeShippingTimeBeforeEndTime  | $99               | $148               |
        @CBCA @CB2CA
        Examples:
            | cardType   | date                           | time                           | lowBelowThreshold | highBelowThreshold |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime | CAD 130           | CAD 148            |
            | MasterCard | FreeShippingDateBeforeEndDate  | FreeShippingTimeBeforeEndTime  | CAD 130           | CAD 148            |

    @FS_15 @FreeShipping @OverSizedNoFreeShipping @CBUS @CB2US @CBCA @CB2CA
    Scenario: Oversized items order with international billing address verify free shipping is not getting applied
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        When customer adds "SKU_OVERSIZED" to cart as "Ship"
        Then additional charges message should be displayed
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And verify free shipping message not displayed
        And verify free shipping link not displayed
        And verify shipping discount not applied in cart summary
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When Add shipping information with opt-in to use as billing set to "FALSE" and clicks on "Next" button
        Then shipping page should be updated with "PARCEL" sku details
        And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
        And verify free shipping link not displayed
        And verify shipping discount not applied in order summary
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        And verify shipping discount not applied in order summary
        Then enter "<cardType>" payment details and proceed to review page
        Then payment Information should reflect the "<cardType>" card type
        Given customer enters "INTERNATIONAL" billing address
        And order summary should be displayed correctly
        When customer proceeds to review page after entering "<billingAddressType>" billing address
        Then review page should be displayed with the correct details
        And verify free shipping link not displayed
        And verify shipping discount not applied in order summary
        Given review page should display "<cardType>" details
        When order summary should be displayed correctly
        Then Customer is able to place order from review page for international billing
        And customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And verify shipping discount not applied in order summary
        And confirmation order summary should be displayed correctly

        Examples:

            | cardType   | billingAddressType | date                           | time                           |
            | MasterCard | INTERNATIONAL      | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime |
            | MasterCard | INTERNATIONAL      | FreeShippingDateBeforeEndDate  | FreeShippingTimeBeforeEndTime  |

    @FS_13 @FreeShipping @MessageValidatiom @CBUS @CB2US @CBCA @CB2CA
    Scenario: Validate free shipping promo messages on Search, PLP, PDP, Cart line and Checkout pages
        When customer sets timemachine cookie for "<date>" "<time>" plus 10 minutes
        Given the customer is on the home page
        When Customer searches for Keyword "<searchTerm>"
        Then Customer should be navigated to "<searchTerm>" Search PLP
        And Customer should be navigated to "<expectedUrl>"
        And verify Free Shipping text in Search results page
        Given the customer is on the home page
        When customer adds "FREE_SHIP_PARCEL_SKU" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        Then verify free shipping message
        Then verify free shipping link and popup
        And verify cart summary
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "Parcel" sku details
        Then verify free shipping link and popup
        And verify shipping discount applied in order summary
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        Then enter "<cardType>" payment details and proceed to review page
        Then payment Information should reflect the "<cardType>" payment
        And verify shipping discount applied in order summary
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "<cardType>" details
        And order summary should be displayed correctly
        Then verify free shipping link and popup
        And verify shipping discount applied in order summary
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And verify shipping discount applied in order summary
        And confirmation order summary should be displayed correctly

        Examples:
            | cardType   | date                           | time                           | searchTerm | expectedUrl    |
            | MasterCard | FreeShippingDateAfterStartDate | FreeShippingTimeAfterStartTime | glass      | /search?query= |
            | MasterCard | FreeShippingDateBeforeEndDate  | FreeShippingTimeBeforeEndTime  | glass      | /search?query= |