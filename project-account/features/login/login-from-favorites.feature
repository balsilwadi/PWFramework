Feature: Sign in from Favorites menu
    As a Customer
    I want to verify sign in from Favorites menu

    Background: Signin from Favorites
        Given the customer is on the home page

    @Regression @Smoke @Account @AccountLogin @ACNT_035 @CBUS @CBCA @CB2US @CB2CA
    Scenario: Signin from Favorites for Regular Account
        When Customer hover the Favorites menu and click on Sign in link
        Then Login page should display with sign in form
        And Signin form displayed with create account option
        When Customer sign in with "Valid" login credentials
        Then Customer should navigate to Favorites page

    @Regression @Smoke @Account @AccountLogin @ACNT_036 @Apple @CBUS @CBCA @CB2US @CB2CA
    Scenario: Signin from Favorites for Apple Account
        When Customer hover the Favorites menu and click on Sign in link
        Then Login page should display with sign in form
        And Signin form displayed with create account option
        And Customer clicks on Apple Signin button
        Then Apple signin page should display

    @Regression @Smoke @Account @AccountLogin @ACNT_036 @Google @CBUS @CBCA @CB2US @CB2CA
    Scenario: Signin from Favorites for Apple Account
        When Customer hover the Favorites menu and click on Sign in link
        Then Login page should display with sign in form
        And Signin form displayed with create account option
        And Customer clicks on Google Signin button
        Then Google signin page should display