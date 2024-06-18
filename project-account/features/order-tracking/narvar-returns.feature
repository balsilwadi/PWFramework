Feature: As a Customer I want to verify Start Return link for delivered parcel items
    As a Customer
    I want to verify Start Return link for delivered parcel items

    Background: Launch the Home page
        Given the customer is on the home page

    @ACNT_070 @Account @Returns @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Verify Start Return link for delivered parcel items
        When Customer navigates to order tracking page
        And Customer enters the Order Number in delivered status
        Then Start return link should display
        And Clicking on Start Return link should launch the narvar page