Feature: Login to account from Login Page/Login popup
    As a Customer
    I want to login to account from Login Page/Login popup
    and reset my password

    Background: Launch the Home page
        Given the customer is on the home page

    @Regression @Smoke @Account @AccountLogin @CBUS @CBCA @CB2US @CB2CA
    Scenario: Returning Customer Signing In to Account (Login Page)
        When Customer navigates to sign in page
        Then Login page should display with sign in form
        And Signin form displayed with create account option
        When Customer sign in with valid "playwright@crate.com" and "Crate123$"
        Then Account page should display with Hi message

    @Regression @Smoke @Account @ResetPassword @ACNT_017 @CBUS @CBCA @CB2US @CB2CA @ACNT_P1 @ACNT_HF
    Scenario: Reset Password
        When Customer navigates to sign in page
        Then the login page should display
        When Customer opens reset password link
        When Customer reset the password of "tester@test.com"
        When Customer closes the reset password popup
        Then the login page should display

    @Regression @Smoke @Account @AccountLogin @ACNT_025 @CBUS @CBCA @CB2US @CB2CA
    Scenario: Returning Customer Signing In to Account (Login Popup)
        When Customer clicks on sign in from header
        Then Login page should display with sign in form
        And Signin form displayed with create account option
        When Customer sign in with "Valid" login credentials
        Then Customer should land on the account page

    @Regression @Account @AccountLogin @Invalid @ACNT_024 @CBUS @CBCA @CB2US @CB2CA @ACNT_P1 @ACNT_HF
    Scenario: Returning Customer Signing In to Account With Invalid Login Credential
        When Customer navigates to sign in page
        Then Login page should display with sign in form
        And Signin form displayed with create account option
        When Customer enter "Invalid" login credentials
        And Customer click on sign in button
        Then Error message should display in login page
        And Reload the page
        When Customer enter "InvalidAccount" login credentials
        And Customer click on sign in button
        Then Error message should display in login page

    @Regression @Smoke @Account @AccountLogin @SSO @CBUS @CBCA @CB2US @CB2CA @ACNT_023 @ACNT_P2 @ACNT_HF
    Scenario Outline: Verify SSO across all brands
        When Customer navigates to sign in page
        And Customer sign in with valid "pwssotest@cb.com" and "Crate123!"
        Then Account page should display with Hi message
        Then Customer launches signin popup on other brands and verify SSO is working

    @Regression @Smoke @Account @SSO @CBUS @CBCA @CB2US @CB2CA @ACNT_058 @ACNT_P1 @ACNT_HF
    Scenario Outline: Verify SSO on Registry page
        When Customer navigates to sign in page
        And Customer sign in with valid "registrytest@cb.com" and "Password@123"
        Then Customer clicks on myRegistry Link
        And Clicks on the first registry in the page
        When Customer clicks on the brand switch button
        Then the registry page should open for the sister brand as a logged in user
