Feature: Checkout - Monogramming
    As a customer,
    I want to purchase instock and backorder Monogrammed items

  Background: Customer launches Home page
    Given the customer is on the home page

  @CHK_068 @E2E @TargettedRegression @UATRegression @Priority1 @Checkout @Monogramming @GuestUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_068_Monogram instock item order
    When customer adds "SKU_MONOGRAM" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    Then the customer enters a receipt email address
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "<cardType>" payment details and proceed to review page
    Then payment Information should reflect the "<cardType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    Then review page should display "<cardType>" details
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly

    Examples:
      | cardType   |
      | MasterCard |

  @CHK_070 @E2E @TargettedRegression @UATRegression @Priority3 @Checkout @Monogramming @GuestUser @BackOrder @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_070_Monogram backorder item order
    When customer adds "SKU_MONOGRAM_BACKORDER" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    Then the customer enters a receipt email address
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "<cardType>" payment details and proceed to review page
    Then payment Information should reflect the "<cardType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    Then review page should display "<cardType>" details
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly

    Examples:
      | cardType   |
      | MasterCard |

  @CHK_M01 @Priority4 @Monogramming @GuestUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_M01_Update monogram item quantity in cart and purchase with PayPal
    When customer adds "SKU_MONOGRAM" to cart as "Ship"
    Then verify monogram details in "Cart" Page
    When customer clicks plus icon to increment quantity for item "SKU_MONOGRAM"
    Then verify item total updated correctly after update
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    Then the customer enters a receipt email address
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    When Select alternate payment "<paymentType>" and proceed to Review page
    Then Payment Information should be updated with the "<paymentType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    Then review page should display "<cardType>" details
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly

    Examples:
      | cardType |
      | PayPal   |

  @CHK_M03 @Priority4 @Monogramming @GuestUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_M03_Add instock monogram to cart and purchase with Credicard ang Giftcard
    When customer adds "SKU_MONOGRAM" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    Then the customer enters a receipt email address
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    When customer selects "<cardType>" from saved payment
    Then payment Information should reflect the "<cardType>" payment
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
      | cardType |
      | Visa     |

  @CHK_M02 @Priority4 @Monogramming @GuestUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_M02_Remove monogram item from cart and verify cart
    When customer adds "SKU_MONOGRAM" to cart as "Ship"
    Then verify monogram details in "Cart" Page
    When customer removes "SKU_MONOGRAM" from cart
    Then corresponding item should be removed
    And cart header and total should be updated

  @CHK_M04 @Priority4 @Monogramming @GuestUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_M04_Monogram order for SKU on SALE
    When customer adds "SKU_MONOGRAM_SALEPRICE_SKU" to cart as "Ship"
    Then verify monogram details in "Cart" Page
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    Then the customer enters a receipt email address
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "<cardType>" payment details and proceed to review page
    Then payment Information should reflect the "<cardType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    Then review page should display "<cardType>" details
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly

    Examples:
      | cardType |
      | Visa     |

  @CHK_M05 @Priority4 @Monogramming @GuestUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_M05_Monogram order for set SKU
    When they login using "<email>" and "password" and empties cart
    When customer adds "SKU_MONOGRAM_SETSKU" to cart as "Ship"
    Then cart page should be displayed with added item details
    Then verify monogram details in "Cart" Page
    When logged in customer proceeds to checkout
    Then shipping page should be loaded with "PARCEL" sku details for returning user
    Then the customer enters a receipt email address
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    When customer selects multiple creditcards "<cardType1>" and "<cardType2>" from saved payment
    Then enter amount for the additional card selected
    And payment Information should reflect the "<cardType1>" and "<cardType2>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And review page should display multiple cards "<cardType1>" and "<cardType2>" and amount used
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly

    Examples:
      | email     | cardType1  | cardType2 |
      | ACCOUNT22 | MasterCard | Visa      |

  @CHK_M06 @Priority4 @Monogramming @DTP @DTPUser @GuestUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_M06_PARCEL order with DTP Tax Exemption
    Given the customer is on the home page
    Then they login using "DTP_USER" and "DTP_PWD" and empties cart
    When customer adds "SKU_MONOGRAM" to cart as "Ship"
    Then verify monogram details in "Cart" Page
    And cart summary should contain message regarding where tax exemption can be applied
    And alternate payment options should be hidden in cart page
    And non removable trade program discount should be applied with DTP related tooltip
    When logged in customer proceeds to checkout
    Then shipping page should be loaded with "Parcel" sku details for returning user
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

  @CHK_M07 @Priority4 @Monogramming @GuestUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_M07_Multiple monogram items, enter gift messages and opt gift box for few items as Guest user
    When customer adds "SKU_LIST_MONOGRAM" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    Then shipping page should be updated with "PARCEL" sku details
    And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
    And customer adds gift message in shipping page
    And Customer opts Gift Box for "ALL" items
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

  @CHK_M07a @Priority4 @Monogramming @GuestUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_M07_Multiple monogram items, enter gift messages and opt gift box for few items as Guest user
    When customer adds "SKU_MONOGRAM_BACKORDER" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    Then shipping page should be updated with "PARCEL" sku details
    And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
    And customer adds gift message in shipping page
    And Customer opts Gift Box for "ALL" items
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
