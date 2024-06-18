Feature: Partial Search page
    Customer should be able to search and verify  Partial Search PLP is loaded with Filters,
    Related Categories and Related Searches section

    @Search @TC_SCH_002 @PartialSearch @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Customer search with a partial search keyword and verify the partial search page
        Given the customer is on the home page
        When Customer searches for Keyword "<searchTerm>"
        Then Customer should be navigated to "<searchTerm>" Search PLP
        And Customer should be navigated to "<expectedUrl>"
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        Then Customer should verify the h1 tag displayed in the page as "Oops!"
        Then Customer should see the search results message "<searchTerm>"
        When Customer clicks on "Try a new search" Button
        Then Customer should see the search bar focused
        When Customer clicks on "Find a gift registry" Button
        Then Customer should be navigated to the gift registry
        When Customer clicks on "Shop new arrivals" Button
        Then Customer should be navigated to the new arrivals page
        And Customer should be able to see the Chat with us Button
        And Verify only first 12 products are displayed in Partial Search page
        When Customer clicks on View More Products button
        Then Verify the product count displayed in Partial Search page after clicking the View More Products button
        When Customer click on the Filter button
        Then Filter drawers should be displayed
        When Customer selects Type filter
        Then Verify the Type filter is selected
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        Then validate "Filter Interaction" event on "SEARCH-PAGE"
        When Customer selects Color filter
        Then Verify the Color filter is selected
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        Then validate "Filter Interaction" event on "SEARCH-PAGE"
        When Customer selects Price filter
        Then Verify the Price filter is selected
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        Then validate "Filter Interaction" event on "SEARCH-PAGE"
        When Customer selects Material filter
        Then Verify the Material filter is selected
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        Then validate "Filter Interaction" event on "SEARCH-PAGE"
        And Click on Filter Apply button
        When Customer click on Clear All link
        Then All the filter selections should be cleared
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        When Customer navigates to Related searches
        Then The corresponding related search page should be loaded
        When Customer navigates to Related Categories
        Then The corresponding related categories page should be loaded

        Examples:
            | searchTerm | partialCount | expectedUrl     |
            | xyz cup    | 12           | /search_partial |

    @Search @TC_SCH_007 @PartialSearchKids @CBUS @CBCA
    Scenario Outline: Customer search with a partial search keyword and verify the partial search page on Crate&Kids
        Given the customer is on the home page
        And The customer clicks on Crate & Kids home page
        When Customer searches for Keyword "<searchTerm>"
        Then Customer should be navigated to "<searchTerm>" Search PLP
        And Customer should be navigated to "<expectedUrl>"
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        Then Customer should verify the h1 tag displayed in the page as "Oops!"
        Then Customer should see the search results message "<searchTerm>"
        When Customer clicks on "Try a new search" Button
        Then Customer should see the search bar focused
        When Customer clicks on "Find a gift registry" Button
        Then Customer should be navigated to the gift registry
        When Customer clicks on "Shop new arrivals" Button
        Then Customer should be navigated to the new arrivals page
        And Customer should be able to see the Chat with us Button
        And Verify only first 12 products are displayed in Partial Search page
        When Customer clicks on View More Products button
        Then Verify the product count displayed in Partial Search page after clicking the View More Products button
        When Customer click on the Filter button
        Then Filter drawers should be displayed
        When Customer selects Type filter
        Then Verify the Type filter is selected
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        Then validate "Filter Interaction" event on "SEARCH-PAGE"
        When Customer selects Color filter
        Then Verify the Color filter is selected
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        Then validate "Filter Interaction" event on "SEARCH-PAGE"
        When Customer selects Price filter
        Then Verify the Price filter is selected
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        Then validate "Filter Interaction" event on "SEARCH-PAGE"
        When Customer selects Material filter
        Then Verify the Material filter is selected
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        Then validate "Filter Interaction" event on "SEARCH-PAGE"
        And Click on Filter Apply button
        When Customer click on Clear All link
        Then All the filter selections should be cleared
        Then validate "Product List Viewed" event on "SEARCH-PAGE"
        When Customer navigates to Related searches
        Then The corresponding related search page should be loaded
        When Customer navigates to Related Categories
        Then The corresponding related categories page should be loaded

        Examples:
            | searchTerm | partialCount | expectedUrl        |
            | xyzzz cups | 12           | /KidsSearchPartial |
