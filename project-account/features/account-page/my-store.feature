Feature: As a Customer I want to click on My Store and select my store
    As a Customer
    I want to click on My Store link in Account page
    Select my store, navigate to PDP and make sure my store is displayed there

    @Smoke @Regression @Account @ACNT_016 @CBUS @CBCA @CB2US @CB2CA
    Scenario: Verify whether the customer can pick his store from stores page
        Given the customer is on the home page
        When Customer clicks on sign in from header
        Then Login page should display with sign in form
        And Signin form displayed with create account option
        When Customer sign in with "Valid" login credentials
        And Customer clicks on My Store link
        Then the stores page should launch