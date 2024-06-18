Feature: DigitalData Validation for Browse Product
    I want to use this feature file to validate DigitalData

    @grouper @Regression @Smoke @Martech @browseProduct @CBUS @CB2US @CBCA @CB2CA
    Scenario: Validating digital data on Grouper PDP by adding item to cart, favorites & registry
        Given the customer is on the home page
        When they navigate to the Grouper PDP
        Then validate digitalData events on "GROUPER-PDP"
        When they click on Add To Cart button
        Then validate "Product Added" event on "GROUPER-PDP"
        When they click on Continue Shopping button
        And they add item to favourites
        Then validate "Favorites Item Added" event on "GROUPER-PDP"
        When they close Added To Favorites popup
        And they add item to registry
        Then validate "Registry Item Added" event on "GROUPER-PDP"

    @grouper @Regression @Martech @browseProduct @CBUS @CB2US @CBCA @CB2CA
    Scenario: Validating digital data on Grouper PDP by selecting grouper options
        Given the customer is on the home page
        When they navigate to the Grouper PDP
        And they select a different color from the color group
        Then validate digitalData events on "GROUPER-PDP-COLOR-GROUP"
        When they select a different size from the size group
        Then validate digitalData events on "GROUPER-PDP-SIZE-GROUP"
        When they click on Add To Cart button
        Then validate "Product Added" event on "GROUPER-PDP-SIZE-GROUP"

    @superSOR @Regression @Martech @browseProduct @CBUS
    Scenario: Validating digital data on Super SOR PDP by adding item to cart, favorites & registry
        Given the customer is on the home page
        When they navigate to the Super SOR PDP
        Then validate digitalData events on "SUPERSOR-PDP"
        # When they click on quick ship link and select a quick ship product
        # Then validate digitalData events on "SUPERSOR-QUICK-SHIP-PRODUCTS"
        When they click on Add To Cart button
        Then validate "Product Added" event on "SUPERSOR-PDP"
        When they click on Continue Shopping button
        And they add item to favourites
        Then validate "Favorites Item Added" event on "SUPERSOR-PDP"
        When they close Added To Favorites popup
        And they add item to registry
        Then validate "Registry Item Added" event on "SUPERSOR-PDP"

    @superSOR @Regression @Martech @browseProduct @CBUS
    Scenario: Validating digital data on Super SOR PDP by selecting drawer options
        Given the customer is on the home page
        When they navigate to the Super SOR PDP
        When they select a different "Size" from the size drawer
        Then validate digitalData events on "SUPERSOR-PDP-SIZE-DRAWER"
        And they select a different "Depth" from the depth drawer
        Then validate digitalData events on "SUPERSOR-PDP-DEPTH-DRAWER"
        When they select a different "Fabric" from the fabric drawer
        Then validate digitalData events on "SUPERSOR-PDP-FABRIC-DRAWER"
        When they click on Get Free Swatches button
        Then validate "Popup" event on "SUPERSOR-PDP-FABRIC-DRAWER"

    @Installation @Regression @Martech @browseProduct
    Scenario: Validating digital data on Installation PDP
        Given the customer is on the home page
        When they navigate to the PDP which has Installation service option
        Then validate digitalData events on "INSTALLATION-PDP"
        When they clicked on Add Installation Service check box
        And they click on Add To Cart button
        Then validate "Product Added" event on "INSTALLATION-PDP"
        When they click on Continue Shopping button
        And they add item to favourites
        Then validate "Favorites Item Added" event on "INSTALLATION-PDP"
        When they close Added To Favorites popup
        And they add item to registry
        Then validate "Registry Item Added" event on "INSTALLATION-PDP"

    @AddToCartConfirmationAddOns @Regression @Smoke @Daily @Martech @browseProduct @CBUS
    Scenario: Validating digital data on cart popup Add Ons
        Given the customer is on the home page
        When they navigate to the PDP which has Add Ons
        And they click on Add To Cart button
        And they click Add To Cart under Extras And Essentials on the cart popup
        Then validate "Product Added" event on "ADDTOCART-CONFIRMATION-ADDONS-PDP"
        
    @Monogram @Regression @Martech @browseProduct @CBUS @CB2US @CBCA @CB2CA
    Scenario: Validate digital data on Monogram PDP 
        Given the customer is on the home page
        When they navigate to the PDP which has monogram style
        Then validate digitalData events on "MONOGRAM-PDP"
        When they select Personalized option from style group
        And they fill the Personalized Text field
        Then validate "Personalized Button Click" event on "MONOGRAM-PDP"
        
    @swatch @Regression @Martech @browseProduct @CBUS @CB2US @CBCA @CB2CA
    Scenario: Validating digital data on Swatch PDP by adding swatch to cart
        Given the customer is on the home page
        When they navigate to the PDP which has Add Swatch To Cart button
        Then validate digitalData events on "SWATCH-PDP"
        When they click on the Add Swatch To Cart button
        Then validate "Product Added" event on "SWATCH-PDP"

    @AddOns @Regression @Martech @browseProduct @CBUS @CB2US @CBCA @CB2CA
    Scenario: Validating digital data on Add Ons
        Given the customer is on the home page
        When they navigate to the PDP which has Extras And Essentials
        And they click on Add To Cart button under Extras And Essentials
        Then validate "Product Added" event

    @PartOfCollection @Regression @Martech @browseProduct @CBUS
    Scenario: Validating digital data on Part of a Collection
        Given the customer is on the home page
        When they navigate to the PDP which has Part of a Collection
        And they click on Add To Cart button under Part of a Collection
        Then validate "Product Added" event on "PART-OF-COLLECTION-PDP"