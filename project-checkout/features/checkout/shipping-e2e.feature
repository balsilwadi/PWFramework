Feature: Checkout - Shipping E2E
  As a Customer,
  I want to purchase different items using different options in shipping page

  Background: Customer launches Home page
    Given the customer is on the home page

  @CHK_081 @CHK_082 @CHK_050 @CHK_051 @E2E @Regression @TargettedRegression @UATRegression @Priority2 @Checkout @CreditCard @GuestUser @PremiumShipModes @CBUS @CB2US
  Scenario: CHK_081_82_50_51_Parcel order by selecting Premium ShipModes as Guest user
    When customer adds "SKU_PARCEL" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    Then shipping page should be updated with "PARCEL" sku details
    And customer selects shipmode "<shipMode>" from shipping page
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "<cardType>" payment details and proceed to review page
    Then payment Information should reflect the "<displayCardType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And review page should display "<displayCardType>" details
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly

    Examples:
      | shipMode | cardType      | displayCardType |
      | Premium  | ChinaUnionPay | Discover        |
      | Express  | JCB           | Discover        |

  @CHK_013 @CHK_052 @E2E @Regression @TargettedRegression @Priority2 @Checkout @CreditCard @GuestUser @VendorDropShipping @USOnly @CBUS @CB2US
  Scenario: CHK_013_52_VDS Order using Standard Shipping as a Guest user
    When customer adds "SKU_VENDOR_DROPSHIP" to cart as "Ship"
    Then cart page should be displayed with added item details
    And verify the ships from vendor link and popup
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    Then shipping page should be updated with "PARCEL" sku details
    And verify the ships from vendor link and popup
    And customer selects shipmode "<shipMode>" from shipping page
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "<cardType>" payment details and proceed to review page
    Then payment Information should reflect the "<displayCardType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And verify the ships from vendor link and popup
    And review page should display "<displayCardType>" details
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation order summary should be displayed correctly

    Examples:
      | shipMode | cardType | displayCardType |
      | Standard | Diners   | Discover        |

  @CHK_079 @CHK_047 @E2E @Smoke @Regression @TargettedRegression @UATRegression @Priority2 @Checkout @GuestUser @APO @UsOnly @CBUS @CB2US
  Scenario: CHK_079_47_Ship to APO address as Guest user
    When customer adds "SKU_PARCEL" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add "APO" shipping information and click on next button
    Then shipping page should be updated with "PARCEL" sku details
    And Shipping page should be updated for "APO" shipments
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "<cardType>" payment details and proceed to review page
    Then payment Information should reflect the "<displayCardType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And review page should display "<displayCardType>" details
    And order summary should be displayed correctly
    And order summary should be updated with zero tax for APO shipments
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly

    Examples:
      | cardType | displayCardType |
      | Discover | Discover        |

  @CHK_080 @E2E @Smoke @Regression @TargettedRegression @UATRegression @Priority2 @Checkout @ShipAK @CreditCard @CBUS @CB2US
  Scenario: CHK_080_Ship to AK address as Guest user
    When customer adds "SKU_PARCEL" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add "AK" shipping information and click on next button
    Then shipping page should be updated with "PARCEL" sku details for "AK"
    And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
    And Verify AK shipping address changes in the shipping page
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

  @CHK_083 @E2E @Smoke @Regression @UATRegression @Priority2 @Checkout @GuestUser @CreditCard @CBUS @CBCA
  Scenario: CHK_083_Multiple items added to cart, enter gift messages and opt gift box for few items as Guest user
    When customer adds "SKU_LIST_PARCEL" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    Then shipping page should be updated with "PARCEL" sku details
    And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
    And customer adds gift message in shipping page
    And Customer opts Gift Box for "FEW" items
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "<cardType>" payment details and proceed to review page
    Then payment Information should reflect the "<cardType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And review page should display Gift message entered
    And review page should display the Gift box details opted
    And review page should display "<cardType>" details
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly
    And Confirmation Order summary should be displayed with Gift box charge

    Examples:
      | cardType   |
      | MasterCard |

  @CHK_084 @E2E @Smoke @Regression @Priority3 @Checkout @Gifting @MultipleRecipient @CBUS @CBCA
  Scenario: CHK_084_Multiple Recipient, Enter Gift messages, Select Gift box for few items as Returning user
    When they login using "<email>" and "password" and empties cart
    And customer adds "SKU_PARCEL" to cart as "Ship"
    And customer adds "SKU_PARCEL2" to cart as "Ship"
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    When logged in customer proceeds to checkout
    Then Choose the ship to multiple addresses
    And Verify multiple recipient addresses
    And Enter giftbox option and add message for multiple recipient
    Then order summary should be displayed correctly
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    When customer selects "<cardType>" from saved payment
    Then payment Information should reflect the "<cardType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And Verify multiple recipient addresses in Review Page
    Then Verify Payment details in Review Page
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And Verify multiple recipient addresses in Confirmation Page
    And confirmation order summary should be displayed correctly

    Examples:
      | email     | cardType   |
      | ACCOUNT11 | MasterCard |

  @CHK_041 @E2E @Smoke @Regression @TargettedRegression @Priority2 @Checkout @Gifting @MultipleRecipient @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_041_Multiple Recipient order as Returning user
    When they login using "<email>" and "password" and empties cart
    And customer adds "SKU_PARCEL" to cart as "Ship"
    And customer adds "SKU_PARCEL2" to cart as "Ship"
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    When logged in customer proceeds to checkout
    Then Choose the ship to multiple addresses
    And Verify multiple recipient addresses
    Then order summary should be displayed correctly
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    When customer selects "<cardType>" from saved payment
    Then payment Information should reflect the "<cardType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And Verify multiple recipient addresses in Review Page
    Then Verify Payment details in Review Page
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And Verify multiple recipient addresses in Confirmation Page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly

    Examples:
      | email     | cardType   |
      | ACCOUNT15 | MasterCard |

  @CHK_036 @E2E @Smoke @Regression @TargettedRegression @Priority3 @Checkout @MixedItem @MultipleRecipient @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_036_Parcel item and Furniture item shipped to Multi Recipients as Returning user
    When they login using "<email>" and "password" and empties cart
    And customer adds "SKU_FURNITURE" to cart as "Ship"
    And customer adds "SKU_PARCEL" to cart as "Ship"
    # Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    # Then cart items and summary should be updated
    When logged in customer proceeds to checkout
    Then Choose the ship to multiple addresses
    And Verify multiple recipient addresses
    And Enter giftbox option and add message for multiple recipient
    Then order summary should be displayed correctly
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    When customer selects "<cardType>" from saved payment
    Then payment Information should reflect the "<cardType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And Verify multiple recipient addresses in Review Page
    Then Verify Payment details in Review Page
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And Verify multiple recipient addresses in Confirmation Page
    And confirmation order summary should be displayed correctly

    Examples:
      | email     | cardType   |
      | ACCOUNT12 | MasterCard |

  @CHK_014 @CHK_078 @E2E @Regression @TargettedRegression @UATRegression @Priority2 @OversizedItem @International @Checkout @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_014_078 Oversized items order with international billing address
    When customer adds "SKU_OVERSIZED" to cart as "Ship"
    Then additional charges message should be displayed
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    When Add shipping information with opt-in to use as billing set to "FALSE" and clicks on "Next" button
    Then shipping page should be updated with "PARCEL" sku details
    And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "<cardType>" payment details and proceed to review page
    Then payment Information should reflect the "<cardType>" card type
    Given customer enters "INTERNATIONAL" billing address
    And order summary should be displayed correctly
    When customer proceeds to review page after entering "<billingAddressType>" billing address
    Then review page should be displayed with the correct details
    Given review page should display "<cardType>" details
    When order summary should be displayed correctly
    Then Customer is able to place order from review page for international billing
    And customer should be taken to confirmation page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly

    Examples:
      | cardType   | billingAddressType |
      | MasterCard | INTERNATIONAL      |

  @CHK_016 @E2E @Regression @TargettedRegression @UATRegression @Priority2 @Checkout @Furniture @BFT @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_016_Basic freight delivery order creation
    When customer adds "SKU_BFT" to cart as "Ship"
    When customer updates his zipcode to "BFT_ZIPCODE" in Cart
    Then BFT label should be shown on cart page
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add "BFT" shipping information and click on next button
    Then shipping page should be updated with "FURNITURE" sku details for "BFT"
    Then Shipping page should display BFT shipping rate
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

  @CHK_017 @E2E @Regression @TargettedRegression @UATRegression @Priority2 @Checkout @Furniture @LNG @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_017_Long distance delivery order creation
    Given the customer is on the home page
    When customer adds "SKU_LONG_DISTANCE" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "LNG_ZIPCODE" in Cart
    Then long distance label should be shown on cart page
    Given proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    When customer enters shipping information for "LD" and clicks Next button
    Then shipping page should be updated with "FURNITURE" sku details for "LONG_DISTANCE"
    Given customer selects notification preferences from shipping page
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    When customer enters "<cardType>" payment details and proceeds to review page
    Then Payment page shows information for "<cardType>" card type
    Given order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    Given review page should display "<cardType>" details
    When order summary should be displayed correctly
    Then Customer is able to place order from review page
    Given customer should be taken to confirmation page
    When confirmation page should be displayed with detailed order information
    Then confirmation order summary should be displayed correctly

    Examples:
      | cardType   |
      | MasterCard |

  @CHK_111 @E2E @Smoke @Regression @TargettedRegression @Priority1 @Checkout @ReturningUser @MultiCreditCard @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_111_Furniture order as Returning user
    When they login using "<email>" and "password" and empties cart
    And customer adds "SKU_FURNITURE" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    When logged in customer proceeds to checkout
    Then shipping page should be loaded with "FURNITURE" sku details for returning user
    And customer selects notification preferences from shipping page
    Then order summary should be displayed correctly
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    When customer selects "<cardType>" from saved payment
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
      | email     | cardType   |
      | ACCOUNT19 | MasterCard |

  @CHK_0112 @E2E @Smoke @Regression @TargettedRegression @UATRegression @Priority2 @Checkout @GuestUser @CreditCard @Handy @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_019_Furniture order using CreditCard as Guest user
    When customer adds "SKU_FURNITURE_HANDY" to cart as "Ship"
    Then cart page should be displayed with added item details
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
