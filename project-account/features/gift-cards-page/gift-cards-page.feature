Feature: As a Customer I want to see gift card page
    As a user I want to be able page to see gift cards page

    Background: Launch the Home page
        Given the customer is on the home page

    @GiftCard @Regression @Account @ACNT_042 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: Customer views gift cards page
        When Customer navigates to gift cards page
        Then gift cards page should be loaded
        And eGift card button takes to Vendor page
        And Gift Card FAQs link should navigate to FAQ page
        When Customer adds gift card to the cart
        Then gift card should be added