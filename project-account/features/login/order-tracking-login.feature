Feature: Login to account from order tracking page
    As a Customer
    I want to login to account from order tracking page


    Background: Launch the Home page
        Given the customer is on the home page
        When Customer clicks on sign in from header
        Then Login page should display with sign in form
        When Customer sign in with "orderTrackingLogin" login credentials
        Then Account page should display with Hi message
        When Customer sign out from account page
        Then Login page should display with sign in form
        When Customer clicks on track orders from header
        Then Customer should see order tracking section in order tracking page
        And Customer should see sign in section in order tracking page

    @Regression @Smoke @Account @AccountLogin @ACNT_061 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario Outline: Returning Customer Signing In to Account from order tracking page

        Then Customer should see "orderTrackingLogin" account email prepopulated in order tracking page
        When Customer enter the password of "orderTrackingLogin" account
        And Customer Sign in to account from order tracking page
        Then Account page should display with Hi message

    @Regression @Smoke @Account @AccountLogin @ACNT_062 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF @Apple
    Scenario Outline: Returning Customer Signing In to Account from order tracking page

        Then Customer should see "orderTrackingLogin" account email prepopulated in order tracking page
        When Customer clicks on Apple Signin button
        Then Apple signin page should display

    @Regression @Smoke @Account @AccountLogin @ACNT_062 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF @Google
    Scenario Outline: Returning Customer Signing In to Account from order tracking page

        Then Customer should see "orderTrackingLogin" account email prepopulated in order tracking page
        When Customer clicks on Google Signin button
        Then Google signin page should display


