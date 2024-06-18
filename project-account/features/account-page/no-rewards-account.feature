Feature: As a Customer I want to verify rewards menu for user without rewards
    As a Customer
    I want to verify
    rewards menu for user without rewards

    Background: Launch the Home page
        Given the customer is on the home page
        When Customer clicks on sign in from header

    @Regression @Smoke @Account @Rewards @ACNT_012 @CBUS @CB2US @ACNT_P2 @ACNT_HF
    Scenario Outline: Verify the rewards menu for a customer without rewards [no CBCC is added on the account]
        Then Login page should display with sign in form
        When Customer sign in with "NoRewardsNoCBCC" login credentials
        And Navigates to Rewards page
        Then Rewards page should display without reward content
        And Rewards menu should not show in the account header menu
        When Customer click on the cart icon
        Then Zero reward should display in cart page

    @Regression @Smoke @Account @Rewards @ACNT_012 @CBUS @CB2US @ACNT_P2 @ACNT_HF
    Scenario Outline: Verify the rewards menu for a customer without rewards [CBCC is added on the account]
        Then Login page should display with sign in form
        When Customer sign in with "NoRewardsCBCC" login credentials
        And Navigates to Rewards page
        Then Rewards content should display in the rewards page
        And Verifies Rewards menu is shown in the account header menu
        When Customer click on the cart icon
        Then Zero reward should display in cart page

    @Regression @Smoke @Account @Rewards @ACNT_011 @CBUS @CB2US @ACNT_P2 @ACNT_HF
    Scenario: Verify the Manage Crate & Barrel Credit Card/CB2 CREDIT CARD in account page
        Given the customer is on the home page
        When Customer clicks on sign in from header
        And Customer sign in with "Valid" login credentials
        When Customer clicks on Crate Barrel Credit Card CB2 CREDIT CARD link
        Then Crate & Barrel Credit Card CB2 CREDIT CARD is loaded