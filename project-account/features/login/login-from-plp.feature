Feature: Sign in from PLP
    As a Customer
    I want to verify sign in from PLP

    Background: Signin from PLP
        Given the customer is on the home page

    @Regression @Smoke @Account @AccountLogin @ACNT_031 @CBUS @CBCA @CB2US @CB2CA
    Scenario: Signin from PLP for Regular Account
        When  Customer navigates to PLP
        And Customer clicks on sign in from header
        And Customer sign in with "Valid" login credentials
        Then Customer should stay on the PLP

    @Regression @Smoke @Account @AccountLogin @ACNT_032 @Apple @CBUS @CBCA @CB2US @CB2CA
    Scenario: Signin from PDP for Apple Account
        When Customer navigates to PLP
        And Customer clicks on sign in from header
        And Customer clicks on Apple Signin button
        Then Apple signin page should display

    @Regression @Smoke @Account @AccountLogin @ACNT_032 @Google @CBUS @CBCA @CB2US @CB2CA
    Scenario: Signin from PDP for Google Account
        When Customer navigates to PLP
        And Customer clicks on sign in from header
        And Customer clicks on Google Signin button
        Then Google signin page should display