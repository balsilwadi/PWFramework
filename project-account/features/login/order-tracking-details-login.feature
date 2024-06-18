Feature: As a Customer I want verify logging in from order tracking details page
    As a Customer
    I want to login in order tracking details page

    Background: Launch the Home page
        Given the customer is on the home page

    @Regression @Smoke @Account @AccountLogin @ACNT_064 @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Order Tracking
        When Customer navigates to order tracking page
        And Customer enters the Order Number and Email
        Then the account login fields should display
        When Customer logs in to the account
        Then Account page should display with Hi message

    @Regression @Smoke @Account @AccountLogin @Apple @ACNT_065 @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Order Tracking
        When Customer navigates to order tracking page
        And Customer enters the Order Number and Email
        When Customer clicks on Apple Signin button
        Then Apple signin page should display

    @Regression @Smoke @Account @AccountLogin @Google @ACNT_065 @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Order Tracking
        When Customer navigates to order tracking page
        And Customer enters the Order Number and Email
        When Customer clicks on Google Signin button
        Then Google signin page should display