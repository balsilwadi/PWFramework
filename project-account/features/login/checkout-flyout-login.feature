Feature: Sign In from "returning customers" flyout
    As a Customer
    I want to signin
    from returning customer flyout in cart page

    Background: As a Guest Customer add an item to cart
        Given the customer is on the home page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        And Click on Checkout Now button in Cart Page

    @Regression @Smoke @Account @CreateAccount @ACNT_029 @ACNT_038 @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: As a Guest Customer I want to Signin from returning customer flyout

        And Signin from the returing customer flyout
        And Customer navigates to home page from Cart Page
        Then Customer should be successfully signed in

    @Regression @Smoke @Account @CreateAccount @ACNT_030 @ACNT_038 @Apple @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: As a Guest Customer I want to Signin from returning customer flyout [Apple sign in]

        When Customer clicks on Apple Signin button
        Then Apple signin page should display

    @Regression @Smoke @Account @CreateAccount @ACNT_030 @ACNT_038 @Google @CBUS @CBCA @CB2US @CB2CA @ACNT_P2 @ACNT_HF
    Scenario: As a Guest Customer I want to Signin from returning customer flyout [Google sign in]

        When Customer clicks on Google Signin button
        Then Google signin page should display