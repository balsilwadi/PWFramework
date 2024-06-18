Feature: Header Store Locator
    Customer should be able to hover on header store locator icon from home page and verify the header Locator functionality

    #This feature is applicable only for Desktop
    @Stores @Search @TC_SCH_020 @HeaderStoreLocator @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Customer is on the home page and hover on the header store locator icon, verify shipping to and find a store link and its corresponding details
        Given the customer is on the home page
        When the customer hover on header store locator from the Home page
        Then Verify the Shipping to and Find a Store link is displayed
        When Customer click on the Shipping to zip code link
        Then Verify zip code textbox is displayed
        When Customer enter the zip code "<uszipcode>" "<canzipcode>" and click on the update zip code button
        Then Verify zip code is displayed on zip code display link
        When Customer enter the zip code as empty and click on the update zip code button
        Then Verify appropriate error message is displayed
        When Customer click on find a store link
        Then Verify list of stores is displayed in locator popup
        When Customer enter the zip code "<uszipcode>" "<canzipcode>" and click on the zip code link in locator popup
        Then Verify list of stores is displayed in locator popup
        And Verify View All Stores link is displayed in locator popup
        When Customer click on View All Stores link from the locator popup
        Then Verify customer navigates to store locator page
        When Customer click on the store from the locator popup
        Then the store should be displayed in the expanded form with address, store operating time, store info and events link and make this my store button
        When Customer click on Store Info and Events from the locator popup
        Then Verify customer is taken to the store details page
        When Customer click on Make This My Store button in the locator popup
        Then Verify make this My Store button should be changed to My Store button in locator popup
        When Customer click on store name link from header store locator in home page
        Then Verify phone number, store operating time, store info and events link, change my store link and all stores link are displayed in header store locator
        When Customer click on Store Info and Events from header store locator
        Then Verify customer is taken to the store details page
        When Customer click on Change My Store from header store locator
        Then Verify customer navigates to locator popup
        When Customer click on View All Stores link from the locator popup
        Then Verify customer navigates to store locator page
        Examples:
            | uszipcode | canzipcode |
            | 60605     | L5T2T5     |
