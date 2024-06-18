Feature: Sign in from PDP
    As a Customer
    I want to verify sign in from PDP

    Background: Signin from PDP
        Given the customer is on the home page

    @Regression @Smoke @Account @AccountLogin @ACNT_033 @CBUS @CBCA @CB2US @CB2CA
    Scenario: Signin from PDP for Regular Account
        When Customer searches for Keyword "Table"
        Then Customer should navigate to PDP
        When Customer clicks on sign in from header
        And Customer sign in with "Valid" login credentials
        Then Customer should stay on the PDP

    @Regression @Smoke @Account @AccountLogin @ACNT_034 @Apple @CBUS @CBCA @CB2US @CB2CA
    Scenario: Signin from PDP for Apple Account
        When Customer searches for Keyword "Table"
        Then Customer should navigate to PDP
        When Customer clicks on sign in from header
        And Customer clicks on Apple Signin button
        Then Apple signin page should display

    @Regression @Smoke @Account @AccountLogin @ACNT_034 @Google @CBUS @CBCA @CB2US @CB2CA
    Scenario: Signin from PDP for Apple Account
        When Customer searches for Keyword "Table"
        Then Customer should navigate to PDP
        When Customer clicks on sign in from header
        And Customer clicks on Google Signin button
        Then Google signin page should display