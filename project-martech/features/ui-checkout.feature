Feature: DigitalData Validation for Checkout
    I want to use this feature file to validate DigitalData

    @cart @Regression @Smoke @CBUS @CB2US @CBCA @CB2CA @Martech @Daily @Cypress
    Scenario: Validating digital data on Cart Page
        Given the customer is on the home page
        When they navigate to the PDP
        And they add item to the cart from the PDP
        And they increase the quantity of an item in the cart
        Then validate "Cart Updated" event on "CART-PAGE"
        When they click on the Save For Later button
        Then validate "Save For Later Product Added" event on "CART-PAGE"
        And validate "Product Removed" event on "CART-PAGE"
        When they click on the Move To Cart button
        Then validate "Save for Later Product Removed" event on "CART-PAGE"
        When they click on the Checkout Now button
        Then validate "Initiate Checkout" event on "CART-PAGE"
    
    @confirmation @SingleProductCheckout @Regression @Smoke @CBUS @CB2US @CBCA @CB2CA @Martech @Daily @Cypress
    Scenario: Validating digital data on Order Confirmation Page with single item in cart
        Given the customer is on the home page
        When they login with "singleItemEmail" and empty cart
        And customer search for a SKU "coreSku"
        And they add item to the cart from the PDP
        And they click on checkout Now button and place order
		Then validate the confirmation page for the thank you message and order details
        And validate digitalData events on "ORDER-CONFIRMATION-PAGE-CORE"

    @confirmation @MultiProductCheckout @Regression @Smoke @CBUS @CBCA @Martech @Daily @Cypress
    Scenario: Validating digital data on Order Confirmation Page with 1 Core & 1 Kids item in cart
        Given the customer is on the home page
        When they login with "multipleItemEmail" and empty cart
        And customer search for a SKU "coreSku"
        And they click on Add To Cart button
        And they click on Continue Shopping button
        And customer search for a SKU "kidsSku"
        And they add item to the cart from the PDP
        And they click on checkout Now button and place order
		Then validate the confirmation page for the thank you message and order details
        And validate digitalData events on "ORDER-CONFIRMATION-PAGE-CORE&KIDS"