Feature: As a Customer I want to verify the cookie preferences settings
    As a Customer
    I want to view verify the cookie preferences settings

    Background: Launch the Home page
        Given the customer is on the home page

    @ACNT_041 @Account @Cookie @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Verify the cookie preference settings
        When Customer clicks on the Cookie Settings
        Then Verifies the content of the popup
        When Customer clicks on Reject All Cookies button
        And Clicks on Accept All Cookies button