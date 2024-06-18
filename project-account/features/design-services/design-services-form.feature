Feature: Design Services Form functionality
  As a Customer
  I want to fill out the Design Services Form
  and verify an Account was created
  to submit Design Srvices Form Request, to see Design Packages under my account,
  to add items from product list to my cart and complete checkout


  Background: Launch the Home page
    Given the customer is on the home page

  @Regression @Smoke @Account @DesignServices @ACNT_044 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario: Create an account through design services form
    Given the customer is on the Design Services Form page
    When Fills out the Design Services Form
    Then Design Services Form should complete
    When Customer goes to My Account page
    Then Customer should land to MyAccount page

  @Regression @Smoke @Account @DesignServices @ACNT_044 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario: Create an account through design services form
    Given the customer is on the Design Services Form page
    When Fills out the Design Services Form with "playwright@crate.com" and "Crate123$"
    Then Verify Design Services Form auth succeeded
    When Customer goes to My Account page
    Then Customer lands to MyAccount page

  @Smoke @Regression @Account @Addresses @DesignServices @ACNT_047 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario: Design Services Form Submition For Logged In Customer
    When Customer navigates to sign in page
    And Customer sign in with 'DesignServicesForm' login credentials
    Given the customer is on the Design Services Form page
    Then the form should be prepopulated
    When Customer fills the form and clicks Submit button
    Then the form should be sent
    When Customer logs out from header
    And Customer opens the Design Services form
    Then the form should not be prepopulated

  @Regression @Smoke @Account @DesignServices @ACNT_045 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario: Returning Customer signing in from Design Services Form with Regular account
    Given the customer is on the Design Services Form page
    When Fills out the Step 1 on Design Services Form
    And Enters the password and clicks on Sign in button
    Then Verifies login is successful
    And Continue filling the form
    And the form should be sent

  @Regression @Smoke @Account @DesignServices @ACNT_046 @Apple @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario: Returning Customer signing in from Design Services Form with Apple account
    Given the customer is on the Design Services Form page
    When Fills out the Step 1 on Design Services Form
    And Customer clicks on Apple Signin button
    Then Apple signin page should display

  @Regression @Smoke @Account @DesignServices @ACNT_046 @Google @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
  Scenario: Returning Customer signing in from Design Services Form with Google account
    Given the customer is on the Design Services Form page
    When Fills out the Step 1 on Design Services Form
    And Customer clicks on Google Signin button
    Then Google signin page should display