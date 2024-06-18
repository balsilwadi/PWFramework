Feature: As a Customer I want to subscribe/unsubscribe from email preference for guest user
    As a Customer
    I want to subscribe/unsubscribe from
    Email/SMS from communication preferences page as guest user

    @Regression  @Account @CommPref @ACNT_081 @CBUS @CBCA @CB2US @CB2CA
    Scenario: Verify guest user can subscribe/unsubscribe to/from emails/SMS from comm pref page
        Given the customer is on the home page
        When Customer navigates to communication preferences page
        Then Text and Email drawer should display
        And Customer should opt in for sms on all brands as guest user
        And Customer should opt in for email on all brands as guest user
        And Customer should unsubscribe all from email as guest user