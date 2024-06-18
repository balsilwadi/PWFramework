Feature: Login to account where it doesn't have any design pacakge exists
    As a Customer
    I want to verify the Design Packages page
    for an account which doesn't have any design package exist

    Background: Launch the Home page
        Given the customer is on the home page

    @Regression @Smoke @Account @AccountLogin @ACNT_049 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: Login to account where it doesn't have any design pacakge exists
        When Customer navigates to sign in page
        Then Login page should display with sign in form
        When Customer sign in with "NoDesignPackage" login credentials
        And Customer navigates to My Design Packages page
        Then Design Pacakges page for a new Customer should display
        And Customer logouts of the account