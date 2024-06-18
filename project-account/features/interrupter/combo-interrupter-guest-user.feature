Feature: As a Customer I want to verify the combo interrupter for a Guest User
    As a Customer
    I want to verify the combo interrupter for a Guest User

    Background: Launch the Home page
        Given the interrupter should show
        When Launch the Home Page

    @Account @Regression @Interrupter @Smoke @ComboInterrupter @ACNT_076 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario Outline: Verify the Combo Interrupter for the guest user
        Then Combo interrupter should display
        When customer submits the combo interrutper
        Then the second page of the interrutper should display
        And the final page of the interrupter should display

    @Account @Regression @Interrupter @Smoke @ComboInterrupter @ACNT_085 @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Verify the terms and policy links on the Combo Interrupter for the guest user
        Then Customer verifies the Terms link
        And Customer verifies the Privacy Policy link
        And Customer verifies the Offer Terms link

    @Account @Regression @Interrupter @Smoke @ComboInterrupter @ACNT_085 @CBUS @CBCA
    Scenario Outline: Verify the terms and policy links on the Combo Interrupter on crate and kids brand
        When Customer navigates to Kids page
        Then Customer verifies the Kids Terms link
        And Customer verifies the Kids Privacy Policy link
        And Customer verifies the Kids Offer Terms link
