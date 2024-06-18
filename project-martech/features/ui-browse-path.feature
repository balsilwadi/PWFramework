Feature: DigitalData Validation for Browse path
    I want to use this feature file to validate DigitalData

	@home @Regression @Smoke @CBUS @CB2US @CBCA @CB2CA @Martech @Cypress
	Scenario: Validate digital data on Home Page
        Given the customer is on the home page
		Then validate digitalData events on "HOME-PAGE"

    @supercategory @Regression @Smoke @CBUS @CB2US @CBCA @CB2CA @Martech @Cypress
    Scenario: Validating digital data on Supercategory Page
        Given the customer is on the home page
        When they navigate to the Supercategory page
		Then validate digitalData events on "SUPERCATEGORY"

    @spategory @Regression @Smoke @CBUS @CB2US @CBCA @CB2CA @Martech @Cypress
    Scenario: Validating digital data on Category Page
        Given the customer is on the home page
        When they navigate to the Spategory page
		Then validate digitalData events on "SPATEGORY-PLP"

	@plp @Regression @Smoke @CBUS @CB2US @CBCA @CB2CA @Martech @Daily @Cypress
    Scenario: Validating digital data on Product Listing Page
        Given the customer is on the home page
        When customer search for a product "searchTermPLP"
        Then validate digitalData events on "PRODUCT-LISTING-PAGE"
        When they add item to favourites
        Then validate "Favorites Item Added" event on "PRODUCT-LISTING-PAGE"
