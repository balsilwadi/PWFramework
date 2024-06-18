Feature: Store Details Page
    Customer should be able to navigate to store details page from the store locator page and verify the store details page

    @Stores @Search @TC_SCH_016 @StoreDetailsPage @CBUS @CBCA
    Scenario Outline: Crate - Customer navigate to store details page and verify the page with breadcrumb, store related information and SEO copy
        Given the customer is on the home page
        When The customer navigate to Store Locator page
        And Enter the zipcode "<zipcode>" and click on the Find button
        Then List of Stores is displayed in the page
        When Customer selects the store from the store List
        Then Customer navigates to store details page
        And Verify the Map is displayed
        And Verify Make This My Store Button is displayed
        When Customer click on Make This My Store button
        Then Make This My Store button should be changed to My Store button
        And Verify Address and Phone Number is displayed
        When Customer click on Find A New Store button
        Then The customer navigate to Store Locator page
        When Customer selects the store from the store List
        Then Store hours should be displayed
        And Verify Registry message
        And Verify Get Directions
        And Verify Store Information section is displayed
        And Verify Upcoming Store Events section is displayed
        And Verify Store Features is displayed
        And Verify Most Popular Items is displayed in the Store
        And Verify SEO Copy is displayed in the page
        Examples:
            | zipcode |
            | 60601   |

    @Stores @Search @TC_SCH_016 @StoreDetailsPage @CB2US @CB2CA
    Scenario Outline: CB2 - Customer navigate to store details page and verify the page with breadcrumb, store related information and SEO copy
        Given the customer is on the home page
        When The customer navigate to Store Locator page
        And Enter the zipcode "<zipcode>" and click on the Find button
        Then List of Stores is displayed in the page
        When Customer selects the store from the store List
        Then Customer navigates to store details page
        And Verify View All Stores link is displayed
        And Verify breadcrumb is displayed in the page
        And Verify Address and Phone Number is displayed
        And Verify Get Directions
        And Verify See Store Services button is displayed
        When Customer click on See Store Services button
        Then Verify Customer is taken to the Services section in the page
        And Verify Free Design Consultation is displayed in the Services section
        And Verify In Store Shopping Appointment is displayed in the Services section
        And Verify Meet Virtually with a Personal Shopper is displayed in the Services section
        And Verify Make This My Store Button is displayed
        When Customer click on Make This My Store button
        Then Make This My Store button should be changed to My Store button
        And Store hours should be displayed
        And Verify Store Information section is displayed
        And Verify Upcoming Store Events section is displayed
        #And Verify Store Events section is displayed in the page
        And Verify Careers section is displayed in the page
        And Verify SEO Copy is displayed in the page
        Examples:
            | zipcode |
            | 60169   |

