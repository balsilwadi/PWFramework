Feature: As a Customer I want to be able to edit my account details
  As a user
  I want to test
  the edit account feature

  Background: Launch the Home page
    Given the customer is on the home page

  @ReturningCustomer @Regression @Account @EditAccount @ACNT_010 @Smoke @CBUS @CBCA @CB2US @CB2CA @ACNT_P1 @ACNT_HF
  Scenario: Update Username and Password (Returning Customer)
    When Customer clicks on sign in from header
    And Customer clicks on Create Account button
    And Customer fills the Create New account form and click on Create Account button
    Then Account page should display with Hi message
    When Customer navigates to Account Settings page
    Then Account settings page should display
    When Customer updates his email address
    And Customer updates his password
    And Customer sign out from account page
    Then the login page should display
    When Customer sign in with updated credentials
    Then Account page should display with Hi message
    When Customer navigates to Account Settings page
    Then Account settings page should display