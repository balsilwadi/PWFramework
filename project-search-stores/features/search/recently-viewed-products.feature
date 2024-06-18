Feature: Recently viewed products testcases

    @Search @TC_SCH_015 @RecentlyViewed @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Recently viewed products validation
        Given the customer is on the home page
        When Customer clicks search box
        Then Recently viewed products should not be displayed in typeahead
        When Customer searches for "<keyword>"
        Then Customer should be navigated to "<keyword>" Search PLP
        When Customer selects a product on the search page
        When the customer is on the home page
        When Customer clicks search box
        Then Recently viewed products should be displayed in typeahead
        Then Recently viewed product should be clickable
        When Customer searches for "<keyword>"
        Then Recently viewed products should be displayed
        When Customer searches for "<partialKeyword>"
        Then Customer should be navigated to "<partialSearchUrl>"
        Then Recently viewed products should be displayed
        When Customer searches for "<noResultsKeyword>"
        Then Customer should be navigated to "<noResultsUrl>"
        Then Recently viewed products should be displayed
        When The customer navigate to Store Locator page
        And Enter the zipcode "<zipcode>" and click on the Find button
        Then List of Stores is displayed in the page
        When Customer selects the store from the store List
        Then Customer navigates to store details page
        Then Recently viewed products should be displayed

        Examples:
            | keyword | partialSearchUrl | partialKeyword | noResultsKeyword | noResultsUrl             | zipcode |
            | tray    | /search_partial  | xyz tray       | xxyyyz           | /search_noresults?query= | 60455   |