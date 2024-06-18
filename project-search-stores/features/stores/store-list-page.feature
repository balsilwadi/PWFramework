Feature: Store List Page
    Customer should be able to navigate to store list page from the store locator page and verify the store list page

    @Stores @Search @TC_SCH_017 @StoreListPage @CBUS @CBCA
    Scenario Outline: Crate - Customer navigate to store list page and verify the page with breadcrumb, list of states and its corresponding stores, SEO copy
        Given the customer is on the home page
        When The customer navigate to Store Locator page
        And Customer click on View All Stores and Facilities link from the Store Locator page
        Then Verify the breadcrumb is displayed in the page
        When Customer click and verify the breadcrumb navigations
        Then Header is displayed in the page
        And Verify the view by list dropdown is displayed
        And Verify Stores by state is displayed
        And Verify SEO copy is displayed in the page
        When Customer click on the state "<usstateName>", "<castatename>"
        Then Verify state specific stores are displayed
        And Verify SEO copy is displayed in the page
        When Customer click on Store details and Upcoming Events button "<usstateName>"
        Then Customer navigates to store details page
        Examples:
            | usstateName | castatename |
            | Arizona     | Alberta     |

    @Stores @Search @TC_SCH_017 @StoreListPage @CB2US
    Scenario Outline: CB2 - Customer navigate to store list page and verify the page with breadcrumb, list of states and its corresponding stores, SEO copy
        Given the customer is on the home page
        When The customer navigate to Store Locator page
        And Enter the zipcode "<zipcode>" and click on the Find button
        Then List of Stores is displayed in the page
        And The customer click on the View All Stores & Facilities link
        Then Verify the breadcrumb is displayed in the page
        When Customer click and verify the breadcrumb navigations
        Then Header is displayed in the page
        And Verify the view by list dropdown is displayed
        And Verify Stores by state is displayed
        And Verify SEO copy is displayed in the page
        When Customer click on the state "<usstateName>", "<castatename>"
        Then Verify state specific stores are displayed
        And Verify SEO copy is displayed in the page
        When Customer click on Store details and Upcoming Events button "<usstateName>"
        Then Customer navigates to store details page
        Examples:
            | zipcode | usstateName |
            | 60601   | Arizona     |
