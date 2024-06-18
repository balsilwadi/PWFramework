Feature: Verify Apple / Google button in the Sign in modal
    As a Customer
    I want to verify whether the Apple / Google button in the sign in modal
    is redirecting to the correct page

    Background: Launch the Home page
        Given the customer is on the home page

    @Regression @Smoke @Account @AccountLogin @ACNT_026 @Apple @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: Verify Apple Signin button in Sign in modal
        When Customer clicks on sign in from header
        Then Login page should display with sign in form
        When Customer clicks on Apple Signin button
        Then Apple signin page should display

    @Regression @Smoke @Account @AccountLogin @ACNT_026 @Google @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: Verify Google Signin button in Sign in modal
        When Customer clicks on sign in from header
        Then Login page should display with sign in form
        When Customer clicks on Google Signin button
        Then Google signin page should display