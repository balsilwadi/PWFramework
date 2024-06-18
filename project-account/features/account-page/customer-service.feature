Feature: As a Customer I want to verify customer service link
    As a Customer
    I want to click on Customer services link in Account page
    verify whether the links in service page is working

    @Smoke @Regression @Account @ACNT_014 @CBUS @CBCA @CB2US @CB2CA
    Scenario: Verify the customer service link in account page
        Given the customer is on the home page
        When Customer clicks on sign in from header
        And Customer sign in with "Valid" login credentials
        And Customer clicks on Customer Service link
        Then Customer service page should launch
        And the links on customer service page should navigate to the desired pages