Feature: As a Customer I want to be able to create an account
  As a user
  I want to be able to create account
  and create/sign in with Google ID or Apple ID

  Background: Launch the Home page
    Given the customer is on the home page

  @Regression @Smoke @Account @CreateAccount @Payment @ACNT_001 @ACNT_002 @ACNT_003 @ACNT_004 @ACNT_005 @ACNT_006 @ACNT_007 @CBUS @CBCA @CB2US @CB2CA @ACNT_P1 @ACNT_HF
  Scenario Outline: Create New Account and add Payment Cards
    When Customer clicks on sign in from header
    When Customer clicks on Create Account button
    And Customer fills the Create New account form and click on Create Account button
    Then Customer should land to MyAccount page
    Then Customer verifies his name in the top banner
    When Customer add a visa creditcard
    And Customer add a master creditcard
    And Customer add a discover creditcard
    And Customer add a amex creditcard
    And Customer add a PLCC
    And Customer add a crateandbarrel creditcard
    And Customer delete all creditcards
    And Customer logouts of the account
    Then Customer lands to the Signin page

  @Regression @Smoke @Account @CreateAccount @Apple @ACNT_019 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario Outline: Click on Apple Sign in button in Create Account modal
    When Customer clicks on sign in from header
    When Customer clicks on Create Account button
    When Customer clicks on Apple Signin button
    Then Apple signin page should display

  @Regression @Smoke @Account @CreateAccount @Google @ACNT_019 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario Outline: Click on Google Sign in button in Create Account modal
    When Customer clicks on sign in from header
    When Customer clicks on Create Account button
    When Customer clicks on Google Signin button
    Then Google signin page should display

  @Account @Checkout @CreateAccount @CreditCards @ACNT_039 @ACNT_022 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario Outline: Create a new Account and Add Credit Card in Checkout then verify in Account
    When Customer clicks on sign in from header
    When Customer clicks on Create Account button
    And Customer fills the Create New account form and click on Create Account button
    Then Account page should display with Hi message
    When customer adds "SKU_PARCEL" to cart as "Ship"
    When logged in customer proceeds to checkout
    Then add shipping information and click on next button
    Then shipping page should be updated with "PARCEL" sku details
    And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "<cardType>" payment details and proceed to review page
    Then Click on proceed to Review button
    Then Navigates back to Home page from Checkout process
    When customer hover account icon
    Then Customer clicks on My Account navigation header
    Then Account page should display with Hi message
    And Customer navigates to Account Settings page
    And Verifies whether the correct email address is displayed
    When Customer navigates to Payments page
    Then Verify "<cardType>" credit card exists on Payment page

    Examples:
      | cardType   |
      | MasterCard |

  @Regression @Smoke @Account @CreateAccount @ACNT_059 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario Outline: Create Account from Order Tracking Page
    When Customer clicks on track orders from header
    Then Order tracking page displayed with create account option
    When Customer clicks on create account button from order tracking page
    When Customer fills the Create New account form and click on Create Account button
    Then Account page should display with Hi message

  @Regression @Smoke @Account @CreateAccount @ACNT_060 @Apple @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario Outline: Create Account from Order Tracking Page with Apple ID
    When Customer clicks on track orders from header
    Then Order tracking page displayed with create account option
    When Customer clicks on Apple Signin button
    Then Apple signin page should display

  @Regression @Smoke @Account @CreateAccount @ACNT_060 @Google @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario Outline: Create Account from Order Tracking Page with Google ID
    When Customer clicks on track orders from header
    Then Order tracking page displayed with create account option
    When Customer clicks on Google Signin button
    Then Google signin page should display