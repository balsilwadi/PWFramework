Feature: Login to a DTP account and validate it

    As a Customer
    I want to login to trade program account and validate account details, billing address page of trade program user

    Background: Launch the Home page
        Given the customer is on the home page

    @Regression @Smoke @User4 @Trade @ACNT_087 @CBUS @CBCA @CB2US @CB2CA
    Scenario: Returning Customer Signing In to Account
        When Customer clicks on sign in from header
        Then Login page should display with sign in form
        When Customer sign in with "DTPLogin" login credentials
        When Customer navigates to Account Settings page
        Then Customer views the Account Settings Page of Trade program user
        And Customer views Billing Page of Trade program user
        And Customer logouts of the account