Feature: Search no results testcases

    @Search @TC_SCH_003 @NoResults @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: No results page Validation
        Given the customer is on the home page
        And Customer searches for Keyword "<searchTerm>"
        Then Customer should be navigated to "<expectedUrl>"
        And Customer should verify the h1 tag displayed in the page as "<h1>"
        Then Customer should see the search results message "<searchTerm>"
        When Customer clicks on "Try a new search" Button
        Then Customer should see the search bar focused
        When Customer clicks on "Find a gift registry" Button
        Then Customer should be navigated to the gift registry
        When Customer clicks on "Shop new arrivals" Button
        Then Customer should be navigated to the new arrivals page
        And Customer should be able to see the Chat with us Button

        Examples:
            | searchTerm | expectedUrl              | h1    |
            | xxyyyz     | /search_noresults?query= | Oops! |

    @Search @TC_SCH_008 @NoResultsKids @CBUS @CBCA
    Scenario Outline: Crate & Kids No results page validation
        Given the customer is on the home page
        And The customer clicks on Crate & Kids home page
        And Customer searches for Keyword "<searchTerm>"
        Then Customer should be navigated to "<expectedUrl>"
        And Customer should verify the h1 tag displayed in the page as "<h1>"
        Then Customer should see the search results message "<searchTerm>"
        When Customer clicks on "Try a new search" Button
        Then Customer should see the search bar focused
        When Customer clicks on "Find a gift registry" Button
        Then Customer should be navigated to the gift registry
        When Customer clicks on "Shop new arrivals" Button
        Then Customer should be navigated to the new arrivals page
        And Customer should be able to see the Chat with us Button

        Examples:
            | searchTerm | expectedUrl                   | h1    |
            | xxyyyz     | /kids/search_noresults?query= | Oops! |