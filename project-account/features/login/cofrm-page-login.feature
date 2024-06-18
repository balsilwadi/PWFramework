Feature: Returning user sign in from confirmation page
  As a Customer
  I want to signin from confirmation page

  Background: As a Guest Customer I want to place an order
    Given the customer is on the home page
    When customer adds "SKU_PARCEL" to cart as "Ship"
    When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
    Then proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
    Then add shipping information and click on next button
    When Customer enters an email address
    Then customer selects shipmode "Standard" from shipping page
    When customer proceeds to payment page
    Then payment page should be displayed with the details
    Then enter "Visa" payment details and proceed to review page
    Then payment Information should reflect the "Visa" payment
    When Click on proceed to Review button
    And customer places order from review page
    Then Confirmation page displays

  @Regression @Smoke @Account @AccountLogin @ACNT_037 @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline: As a Guest Customer I want to signin from the order confirmation page

    When Customer logs in from the confirmation page
    Then Customer account details should match

  @Regression @Smoke @Account @AccountLogin @ACNT_038 @CBUS @CBCA @CB2US @CB2CA @Apple
  Scenario Outline: As a Guest Customer I want to signin from the order confirmation page with Apple ID

    When Customer clicks on Apple Signin button
    Then Apple signin page should display

  @Regression @Smoke @Account @AccountLogin @ACNT_038 @CBUS @CBCA @CB2US @CB2CA @Google
  Scenario Outline: As a Guest Customer I want to signin from the order confirmation page with Google ID

    When Customer clicks on Google Signin button
    Then Google signin page should display