Feature: Checkout - Payment
  As a customer shopping in,
  I want to verify the end to end order creation process
  For different payment methods available in the site

  Background: Customer launches Home page
    Given the customer is on the home page

  @CHK_043 @CHK_045 @E2E @Regression @TargettedRegression @Priority1 @Checkout @GuestUser @CBCC @CoBrandCC @CBUS @CB2US
  Scenario: CHK_043_45_Guest customer uses CBCC when merchandise total is greater than $749
    When customer adds "SKU_FURNITURE" to cart as "Ship"
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

    @UsOnly
    Examples:
      | cardType   | sku           | testCondition |
      | C&B/CB2 CC | SKU_FURNITURE | above 749     |
      | C&B/CB2 MC | SKU_FURNITURE | above 749     |

  @CHK_042 @CHK_044 @E2E @Regression @TargettedRegression @Priority1 @Checkout @GuestUser @CBCC @PLCC @CBUS @CB2US
  Scenario: CHK_042_44_Guest customer uses CBCC when merchandise total is less than $749
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

    @UsOnly
    Examples:
      | cardType   | sku        | testCondition |
      | C&B/CB2 CC | SKU_PARCEL | below 749     |
      | C&B/CB2 MC | SKU_PARCEL | below 749     |

  @CHK_057 @E2E @Regression @Priority2 @Checkout @MixedPayment @CreditCard @GiftCard @ReturningUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_057_Returning Customer uses credit Card + giftcards as payment
    When they login using "<email>" and "password" and empties cart
    And customer adds "SKU_PARCEL" to cart as "Ship"
    And customer adds "GIFTCARD" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    When logged in customer proceeds to checkout
    Then shipping page should be loaded with "Parcel" sku details for returning user
    When customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
    Then order summary should be displayed correctly
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
      | email     | cardType   |
      | ACCOUNT16 | MasterCard |

  @CHK_063 @E2E @Regression @TargettedRegression @Priority1 @Checkout-USR4 @Rewards @ReturningUser @CBUS @CB2US
  Scenario: CHK_063_Returning Customer purchases PARCEL order with Rewards
    When they login using "<email>" and "password" and empties cart
    And customer adds "SKU_REWARD" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    When logged in customer proceeds to checkout
    Then shipping page should be loaded with "Parcel" sku details for returning user
    When customer selects shipmode "<shipMode>" from shipping page
    And shipping page should be loaded with gifting details
    And customer adds gift message in shipping page
    Then order summary should be displayed correctly
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then Enter "<cardType>" payment details changecard and proceed to Review page
    Then payment Information should reflect the "C&B/CB2 MC" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And review page should display "<cardType>" and Reward details
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed rewards and order information
    And confirmation order summary should be displayed correctly
    Examples:
      | email    | cardType       |
      | ACCOUNT7 | PLCCWithReward |

  @CHK_064 @E2E @Regression @Priority2 @Checkout-USR4 @MultipleRewards @ReturningUser @CBCC @CBUS @CB2US
  Scenario: CHK_064_Returning user uses CBCC with rewards, applies multiple rewards from payment
    When they login using "<email>" and "password" and empties cart
    And customer adds "SKU_REWARD" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    When logged in customer proceeds to checkout
    # And customer selects notification preferences from shipping page
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    When customer selects "<cardType>" from saved payment
    Then apply multiple rewards for cbcc cards
    Then payment Information should reflect the "<cardType>" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And review page should display "<cardType>" and Multiple Reward details
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And Confirmation page should be displayed with detailed multiple rewards and order information
    And confirmation order summary should be displayed correctly
    Examples:
      | email    | cardType   |
      | ACCOUNT7 | C&B/CB2 CC |

  @CHK_066 @E2E @Regression @TargettedRegression @Priority2 @Checkout-USR4 @Rewards @ReturningUser @CBCC @CBUS @CB2US
  Scenario: CHK_066_Returning Customer without default CBCC saved, makes CBCC and rewards payment
    When they login using "<email>" and "password" and empties cart
    And Customer navigates to My Account page
    And Customer navigates to Payments page
    Then Customer delete all creditcards
    When customer adds "SKU_REWARD" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    When logged in customer proceeds to checkout
    Then shipping page should be loaded with "Parcel" sku details for returning user
    When customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
    And shipping page should be loaded with gifting details
    And customer adds gift message in shipping page
    Then order summary should be displayed correctly
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "<cardType>" payment details and proceed to review page
    Then apply reward for CBCC card
    Then payment Information should reflect the "C&B/CB2 MC" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And review page should display "C&B/CB2 MC" and Reward details
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed rewards and order information
    And confirmation order summary should be displayed correctly
    Examples:
      | email     | cardType       |
      | ACCOUNT21 | CBCCwithReward |

  @CHK_065 @E2E @Regression @Priority3 @Checkout-USR4 @Rewards @ReturningUser @CBCC @CBUS @CB2US
  Scenario: CHK_065_Guest User add a CBCC card in Payment and applies reward associated, Proceed to review page, navigate back to Cart page and Complete order. Verify the reward section in cart, payment and order summary
    When customer adds "SKU_REWARD" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    Then shipping page should be updated with "Parcel" sku details
    When customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
    And shipping page should be loaded with gifting details
    And customer adds gift message in shipping page
    Then order summary should be displayed correctly
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "<cardType>" payment details and proceed to review page
    Then apply reward for CBCC card
    Then payment Information should reflect the "C&B/CB2 MC" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And review page should display "C&B/CB2 MC" and Reward details
    And order summary should be displayed correctly
    When customer navigate back to cart page
    Then cart page should be displayed with added item details
    Then verify applied reward in cart page
    And verify cart summary
    And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then shipping page should be updated with "Parcel" sku details
    Then order summary should be displayed correctly
    When customer proceeds to payment page
    Then payment Information should reflect the "C&B/CB2 MC" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And review page should display "C&B/CB2 MC" and Reward details
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed rewards and order information
    And confirmation order summary should be displayed correctly
    Examples:
      | cardType       |
      | CBCCwithReward |