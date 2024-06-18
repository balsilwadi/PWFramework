Feature: As a Customer I want to be able to see my orders details
    As a Customer
    I want to be able to see my orders details

    Background: Launch the Home page
        Given the customer is on the home page
        When Customer navigates to track orders page

    @Regression @Account @Order_Details @Registry @User3 @ACNT_066 @CBUS @CB2US @CBCA @CB2CA
    Scenario Outline: Order Details Gift Registry Item
        And Customer enters Gift Registry order number and email
        Then Customer should see Gift Registry details for order

    @Regression @Smoke @Account @ACNT_067 @SwatchOrder @CBUS @CBCA @CB2US @CB2CA
    Scenario: Validate free swatches order shows only quantity and fabric
        And Customer enters Free Swatch order number and email
        Then Customer verifies whether only the quantity and fabric is displayed

    @Regression @Account @Order_Details @Monogramming @User3 @ACNT_068 @CBUS @CB2US @CBCA @CB2CA
    Scenario Outline: Order Details Monogramming
        And Customer enters Monogrammed order number and email
        Then Customer should see Monogrammed details for order