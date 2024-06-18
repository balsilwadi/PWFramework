Feature: Create account from order confirmation page
  As a Customer
  I want to create
  account from confirmation page

  Background: As a Guest Customer place an order
    Given the customer is on the home page
    When customer adds "SKU_PARCEL" to cart as "Ship"
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    And Enter a brand new email address
    And customer selects shipmode "Standard" from shipping page
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "Visa" payment details and proceed to review page
    Then payment Information should reflect the "Visa" payment
    When Click on proceed to Review button
    And customer places order from review page
    Then Confirmation page displays
    And Validate the create new account fields

  @Regression @Smoke @Account @CreateAccount @ACNT_020 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario: As a Guest Customer I want to Create account from the order confirmation page

    And Customer Creates an account
    And Customer Sign in to the newly created account
    And Customer account details should match

  @Regression @Smoke @Account @CreateAccount @ACNT_021 @Apple @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario: As a Guest Customer I want to Create apple account from the order confirmation page

    When Customer clicks on Apple Signin button
    Then Apple signin page should display

  @Regression @Smoke @Account @CreateAccount @ACNT_021 @Google @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario: As a Guest Customer I want to Create google account from the order confirmation page

    When Customer clicks on Google Signin button
    Then Google signin page should display