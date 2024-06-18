Feature: As a Customer I want to be able to track my orders
    As a Customer
    I want to be able to track my orders

    Background: Launch the Home page
        Given the customer is on the home page

    @API @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Order Tracking
        When Customer navigates to order tracking page
        And Customer enters the Order Number and Email
        And User request Authorization API with "get-order.json"
        And User send GET request to API with Data and Secretkey
        And Customer view the order summary page