Feature: As A Customer I want to save multiple CBCC and have rewards combined
    As a Customer
    I want to save
    multiple CBCC and have rewards combined

    Background: Launch the Home page
        Given the customer is on the home page
        When Customer clicks on sign in from header

    @Regression @Smoke @Account @Rewards @ACNT_013 @CBUS @CB2US
    Scenario Outline: Verify saving multiple CBCC and validate whether the rewards are combined
        When Customer sign in with "MultipleRewards" login credentials
        And Navigates to Payments page and add CBCC
        And Customer logouts of the account
        And Customer sign in with "MultipleRewards" login credentials
        And Navigates to Rewards page
        Then Rewards should combine
