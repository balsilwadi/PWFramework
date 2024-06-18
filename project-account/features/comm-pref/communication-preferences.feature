Feature: Verify logged in user can subscribe/unsubscribe to/from emails/SMS from comm pref page
    As a Customer
    I want to subscribe/unsubscribe from
    Email/SMS from communication preferences page

    @Regression  @Account @CommPref @ACNT_080 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: Verify logged in user can subscribe/unsubscribe to/from emails/SMS from comm pref page
        Given the customer is on the home page
        When Customer clicks on sign in from header
        And Customer clicks on Create Account button
        And Customer fills the Create New account form and click on Create Account button
        And Clicks on Preferences link
        Then Communication preferences page should display
        And Logged in user Text and Email drawer should display
        And Customer should opt in for sms on all brands
        And Customer should opt in for email on all brands
        And Email opt in should successful
        And Customer should unsubscribe all from email