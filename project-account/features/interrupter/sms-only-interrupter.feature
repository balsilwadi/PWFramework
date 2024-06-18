Feature: As a Customer I want to view the SMS Only interrupter
    As a Customer
    I want to view the SMS Only Interrupter

    Background: Launch the Home page
        Given the interrupter should show
        When Launch the Home Page

    @Account @Regression @Interrupter @Smoke @SMSOnly @ACNT_077 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario Outline: Verify the SMS Only Interrupter for the logged in user who is already opted in for emails
        When Customer navigates to sign in page
        And Customer sign in with 'SMSOnly' login credentials
        And Customer navigates to home page
        Then SMS only interrupter should display
        And Customer should able to submit the SMS only interrupter