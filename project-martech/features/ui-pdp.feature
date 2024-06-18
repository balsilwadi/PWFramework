Feature: DigitalData Validation for PDP and Family Page 
    I want to use this feature file to validate DigitalData  
    
    @pdp @Regression @Smoke @CBUS @CB2US @CBCA @CB2CA @Martech @Daily @Cypress
    Scenario: Validating digital data on Product Details Page
        Given the customer is on the home page
        When they navigate to the PDP
        Then validate digitalData events on "PDP"
        And verify product details on the PDP page
        When they click on Add To Cart button
        Then validate "Product Added" event on "PDP"
        When they click on Continue Shopping button
        And they add item to favourites
        Then validate "Favorites Item Added" event on "PDP"
        When they close Added To Favorites popup
        And they add item to registry
        Then validate "Registry Item Added" event on "PDP"

    @family @Regression @Smoke @CBUS @CBCA @Martech @Daily @Cypress
    Scenario: Validate digital data on Family details page
        Given the customer is on the home page
        When they navigate to the Family page
        Then validate digitalData events on "FAMILY-PAGE"
        When they click on Add To Cart button
        Then validate "Product Added" event on "FAMILY-PAGE"
        When they click on Continue Shopping button
        And they add item to favourites
        Then validate "Favorites Item Added" event on "FAMILY-PAGE"
        When they close Added To Favorites popup
        And they add item to registry
        Then validate "Registry Item Added" event on "FAMILY-PAGE"