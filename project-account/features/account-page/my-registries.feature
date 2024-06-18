Feature: As a Customer I want to see my Registry from my account
    As a Customer with Registry I want to see my active Registry from my Account
    As a Customer without Registry I want to see be taken to Registry home page from my Account


    Background: Launch the Home page
        Given the customer is on the home page
        When Customer clicks on sign in from header

    @Smoke @Regression @Account @Registry @ACNT_056 @CBUS @CB2US @CBCA @ACNT_P2 @ACNT_HF
    Scenario Outline: Customer with Registry can see active Registry

        When Customer sign in with "hasRegistry" login credentials
        And Customer clicks on myRegistry Link
        Then Active Gift Registry page should display

    @Smoke @Regression @Account @Registry @ACNT_057 @CBUS @CBCA @CB2US @ACNT_P2 @ACNT_HF
    Scenario Outline: Customer without Registry is taken to a Registry home page

        When Customer sign in with "hasNoRegistry" login credentials
        And Customer clicks on myRegistry Link
        Then Gift Registry home page should display