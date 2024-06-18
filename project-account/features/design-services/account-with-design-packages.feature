Feature: Login to account where it does have design pacakge exists
    As a Customer I want to see under my account Design Packages that are less than 24 months old

    Background: Launch the Home page
        Given the customer is on the home page

    @Regression @Smoke @Account @AccountLogin @ACNT_048 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: Login to account where it does have design pacakge exists
        When Customer navigates to sign in page
        Then Login page should display with sign in form
        When Customer sign in with "HasDesignPackage" login credentials
        And Customer navigates to My Design Packages page
        Then Design Packages page should load with Design Package
        When Customer clicks on Design Package
        Then Customer can see Moodboard, Download link and Room Tour link
        When Customer clicks on Products link and Add all products button
        Then Add all products pop up is displayed