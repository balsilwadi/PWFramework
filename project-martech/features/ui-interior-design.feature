Feature: DigitalData Validation for Interior Design Services, Search, Stores, Rewards and Trade Pages 
    I want to use this feature file to validate DigitalData

    @designServicesCrate @Regression @CBUS @CBCA @Martech @Cypress
    Scenario: Validating digital data on Design Services page on Crate sites
        Given the customer is on the home page
        When they navigate to the Design Services page
		Then validate digitalData events on "DESIGN-SERVICES-CRATE-PAGE"
        When they click on Book Your Free Appointment button on crate core
        And they click on the "In-Home" button
        Then validate "Design Services In-Home Appointment Schedule Start" event on "DESIGN-SERVICES-CRATE-PAGE"
        When they click on the "Local" button
        Then validate "Design Services In-Store Appointment Schedule Start" event on "DESIGN-SERVICES-CRATE-PAGE"
        When they click on the "Online" button
        Then validate "Design Services Online Appointment Schedule Start" event on "DESIGN-SERVICES-CRATE-PAGE"

    @designServicesCB2 @Regression @CB2US @CB2CA @Martech @Cypress
    Scenario: Validating digital data on Design Services page on CB2 sites
        Given the customer is on the home page
        When they navigate to the Design Services page
		Then validate digitalData events on "DESIGN-SERVICES-CB2-PAGE"
        When they click on the "Meet Locally" button
        Then validate "Connect With a Designer Locally Schedule Start" event on "DESIGN-SERVICES-CB2-PAGE"
        When they click on the "Meet Virtually" button
        Then validate "Connect With a Designer Virtually Schedule Start" event on "DESIGN-SERVICES-CB2-PAGE"

    @designKidsServices @Regression @CBUS @CBCA @Martech @Cypress
    Scenario: Validating digital data on Design Kids Services Page
        Given the customer is on the home page
        When they navigate to the Design Services Kids page
		Then validate digitalData events on "DESIGN-SERVICES-KIDS-PAGE"
        When they click on Book Your Free Appointment button on crate kids
        And they click on the "In-Home" button
        Then validate "Design Services In-Home Appointment Schedule Start" event on "DESIGN-SERVICES-KIDS-PAGE"
        When they click on the "Local" button
        Then validate "Design Services In-Store Appointment Schedule Start" event on "DESIGN-SERVICES-KIDS-PAGE"
        When they click on the "Online" button
        Then validate "Design Services Online Appointment Schedule Start" event on "DESIGN-SERVICES-KIDS-PAGE"

    @trade @Regression @CBUS @CB2US @CBCA @CB2CA @Martech @Cypress
    Scenario: Validating digital data on Trade Page
        Given the customer is on the home page
        When they navigate to the Trade Program page
		Then validate digitalData events on "TRADE-PROGRAM-PAGE"
        When they click on Apply Now button on the trade program page
        Then validate "Trade Program Apply Now" event on "TRADE-PROGRAM-PAGE"
    
    @rewards @Regression @CBUS @CB2US @Martech @Cypress
    Scenario: Validating digital data on Rewards Page
        Given the customer is on the home page
        When they navigate to the Rewards page
		Then validate digitalData events on "REWARDS-PAGE"
        When they click on Apply Now button on the rewards page
        Then validate "CBCC Apply Now Click" event on "REWARDS-PAGE"

    @search @Regression @Smoke @CBUS @CB2US @CBCA @CB2CA @Martech @Cypress
    Scenario: Validating digital data on Search Page
        Given the customer is on the home page
        When customer search for a product "searchTermSearch"
        Then validate digitalData events on "SEARCH-RESULTS"
        When Customer click on the Filter button
        And Customer selects Type filter
        Then validate "Product List Viewed" event on "SEARCH-RESULTS"
        And validate "Filter Interaction" event on "SEARCH-RESULTS"
        When they add item to favourites
        Then validate "Favorites Item Added" event on "SEARCH-RESULTS"
        
    @storesCrateUS @Regression @CBUS @Martech
    Scenario Outline: Validating digital data on Stores Page
        Given the customer is on the home page
        When The customer navigate to Store Locator page
		Then validate digitalData events on "STORES-LOCATOR-PAGE"
        When Enter the zipcode "<zipcode>" and click on the Find button
        And Customer selects the store from the store List
		Then validate digitalData events on "STORES-DETAILS-PAGE"
        When they click on Add To Cart button
        Then validate "Product Added" event
        When they click on Continue Shopping button
        And Customer click on Find A New Store button
        And Customer click on View All Stores and Facilities link from the Store Locator page
		Then validate digitalData events on "STORES-LIST-PAGE"
        When Customer click on the state "<usStateName>", "<canStateName>"
		Then validate digitalData events on "STORES-LIST-PAGE"
        When Customer click on Store details and Upcoming Events button "<usStateName>"
		And Customer click on RSVP button under Upcoming Store Events
        And Customer fill out the Private Registry Event RSVP form and submit
        Then validate "Form Submitted" event on "STORES-DETAILS-PAGE"

        Examples:
            | zipcode | usStateName |
            | 60601   | Arizona     |