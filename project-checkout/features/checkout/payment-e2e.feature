Feature: Checkout - Payment
  As a customer,
  I want to make purchases using various payment combinations
  Creditcards, Multiple creditcards, Giftcards, Shopcards, Tendercodes & Mixed payments

  Background: Customer launches Home page
    Given the customer is on the home page

  @CHK_046 @CHK_048 @CHK_049 @E2E @Regression @TargettedRegression @UATRegression @Priority2 @Checkout @GuestUser @CreditCard @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_046_48_49_Parcel order using CreditCard as Guest user
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
      | cardType        | displayCardType |
      | MasterCard      | MasterCard      |
      | AmericanExpress | AmericanExpress |
      | Visa            | Visa            |

  @CHK_019 @E2E @Smoke @Regression @TargettedRegression @UATRegression @Priority1 @Checkout @GuestUser @CreditCard @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_019_Furniture order using CreditCard as Guest user
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

    Examples:
      | cardType   |
      | MasterCard |

  @CHK_018 @E2E @Smoke @Regression @TargettedRegression @Priority2 @Checkout @ReturningUser @MultiCreditCard @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_018_Furniture order using Multiple CreditCards as Returning user
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
      | ACCOUNT14 | MasterCard | Visa      |

  @CHK_040 @CHK_053 @CHK_054 @E2E @Regression @TargettedRegression @Priority2 @Checkout @CreditCard @MultiCreditCard @ReturningUser
  Scenario: CHK_040_53_54_Parcel order using Multiple CreditCards as Returning user
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

    @CBUS @CBCA @CB2US @CB2CA
    Examples:
      | email    | cardType1  | cardType2 |
      | ACCOUNT1 | MasterCard | Visa      |

    @CBUS @CB2US
    Examples:
      | email     | cardType1       | cardType2  |
      | ACCOUNT13 | AmericanExpress | C&B/CB2 MC |

  @CHK_039 @E2E @Smoke @Regression @Checkout @TargettedRegression @Priority2 @CreditCard @ReturningUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_039_Parcel order using CreditCard as Returning user
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
      | email    | cardType        |
      | ACCOUNT2 | MasterCard      |
      | ACCOUNT3 | AmericanExpress |
      | ACCOUNT4 | Visa            |

  @CHK_055 @E2E @Smoke @Regression @TargettedRegression @Priority2 @Checkout @GiftCard @ReturningUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_055_Parcel order using GiftCard as Returning user
    When they login using "<email>" and "password" and empties cart
    And customer adds "SKU_PARCEL" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    # When customer logging in from flyout and proceeds to checkout as a returning user
    When logged in customer proceeds to checkout
    Then shipping page should be loaded with "PARCEL" sku details for returning user
    When customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
    And shipping page should be loaded with gifting details
    And customer adds gift message in shipping page
    # And Customer opts for GiftBoxing for items in shipping page
    Then order summary should be displayed correctly
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    When enter "giftcard" details on payment page
    Then verify "giftcard" details on payment page
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And validate gift options info of review page
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly

    Examples:
      | email    |
      | ACCOUNT6 |

  @CHK_067 @E2E @Smoke @Priority3 @Checkout-USR4 @Rewards @ReturningUser @TenderCode @GiftCard @CBUS @CB2US
  Scenario: CHK_067_Parcel order using Tender Certificate + Rewards + Gift card as Returning user
    When they login using "<email>" and "password" and empties cart
    And customer adds "SKU_REWARD" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then cart items and summary should be updated
    When logged in customer proceeds to checkout
    And customer selects notification preferences from shipping page
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then Enter "<cardType>" payment details changecard and proceed to Review page
    When Apply TenderCode and GiftCard
    Then payment Information should reflect the "C&B/CB2 MC" payment
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    Then Verify Payment details in Review Page
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation order summary should be displayed correctly

    Examples:
      | email    | cardType       |
      | ACCOUNT8 | PLCCWithReward |

  @CHK_058 @E2E @Smoke @Regression @Priority2 @Checkout @ShopCard @ReturningUser @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_058_Parcel order using ShopCard as Returning user
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
    When enter "shopcard" details on payment page
    Then verify "shopcard" details on payment page
    And order summary should be displayed correctly
    When customer proceeds to review page
    Then review page should be displayed with the correct details
    And validate gift options info of review page
    And order summary should be displayed correctly
    When customer places order from review page
    Then customer should be taken to confirmation page
    And confirmation page should be displayed with detailed order information
    And confirmation order summary should be displayed correctly

    Examples:
      | email     |
      | ACCOUNT18 |

