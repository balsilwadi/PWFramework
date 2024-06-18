Feature: Verify catalog preference page
    As a Customer
    I want to submit catalog subscription form


    Background: Launch the Home page
        Given the customer is on the home page
        When Customer clicks on sign in from header
        Then Login page should display with sign in form
        When Customer sign in with "Valid" login credentials
        Then Account page should display with Hi message

    @Regression  @Account @CommPref @ACNT_015 @CBUS @CB2US
    Scenario: Customer submit form to remove from catalog list
        When Customer proceeds to catalog preference page
        Then Catalog preference page should display
        And Catalog unsubscribe form should display
        When Customer submit catalog unsubscribe form
        Then Catalog unsubscribe success message should display