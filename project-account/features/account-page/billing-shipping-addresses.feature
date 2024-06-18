Feature: As a Customer I want to add, edit and delete my shipping and billing addresses
    As a Customer
    I want to test
    adding and updating domestic/international billing address for a logged in user
    and adding, updating and deleting shipping address for a logged in user

    Background: Launch the Home page
        Given the customer is on the home page
        When Customer clicks on sign in from header

    @Regression @Smoke @Account @Addresses @ACNT_008 @ACNT_009 @Domestic @International @CBUS @CBCA @CB2US @CB2CA @ACNT_P1 @ACNT_HF
    Scenario Outline: Save and Edit Domestic Billing Address
        When Customer clicks on Create Account button
        And Customer fills the Create New account form and click on Create Account button
        And Customer adds the Billing Address
        And Customer edits the Billing Address
        And Customer click on the Address Link
        And Customer adds valid shipping address
        Then address should be added as a shipping address
        When Customer edits existing shipping address
        Then changes should be saved
        When Customer deletes existing shipping address
        Then address should not display as a shipping address
        And Customer adds the International Billing Address
        And Customer logouts of the account