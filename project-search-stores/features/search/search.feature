Feature: Search PLP testcases
  Customer should be able to search and verify  Search PLP is loaded with Filters, Related Categories and Related Searches section

  @Search @TC_SCH_001 @SearchPLP @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline: Customer search with a keyword and verify the Search PLP
    Given the customer is on the home page
    When Customer searches for Keyword "<searchTerm>"
    Then Customer should be navigated to "<searchTerm>" Search PLP
    And Customer should be navigated to "<expectedUrl>"
    Then validate "Product List Viewed" event on "SEARCH-PAGE"
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
      | searchTerm | expectedUrl    |
      | table      | /search?query= |

  @Search @TC_SCH_006 @SearchPLPKids @CBUS @CBCA
  Scenario Outline: Customer search with a keyword and verify the Search PLP on Crate&Kids
    Given the customer is on the home page
    And The customer clicks on Crate & Kids home page
    When Customer searches for Keyword "<searchTerm>"
    Then Customer should be navigated to "<searchTerm>" Search PLP
    And Customer should be navigated to "<expectedUrl>"
    Then validate "Product List Viewed" event on "SEARCH-PAGE"
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
      | searchTerm | expectedUrl         |
      | chair      | /kids/search?query= |

  @Search @TC_SCH_005 @SearchTermValidation @CBUS @CBCA
  Scenario Outline: Crate - Different search term validation
    Given the customer is on the home page
    When Customer searches for Keyword "<searchTerm>"
    Then Customer should be navigated to "<url>"
    And Customer should verify the h1 tag displayed in the page as "<h1>"
    And validate DDL Page Viewed Event "<page>"

    Examples:
      | searchTerm                | url               | h1                                  | page          |
      | 215525                    | /s215525          | Nattie White Wine Glasses, Set of 8 | PDP           |
      | 215-525                   | /s215525          | Nattie White Wine Glasses, Set of 8 | PDP           |
      | 58609                     | /search           | 58609                               | Search        |
      | OXO ® 4-Cup Fat Separator | /search           | oxo ® 4-cup fat separator           | Search        |
      | Furniture                 | /furniture        | Furniture                           | SuperCat      |
      | Sectional Sofas           | /1                | Sectional Sofas                     | PLP           |
      | xyzzz cups                | /search_partial   | Oops!                               | PartialSearch |
      | xyzzzz                    | /search_noresults | Oops!                               | NoSearch      |

  @Search @TC_SCH_005 @SearchTermValidation @CB2US @CB2CA
  Scenario Outline: CB2 - Different search term validation
    Given the customer is on the home page
    When Customer searches for Keyword "<searchTerm>"
    Then Customer should be navigated to "<url>"
    And Customer should verify the h1 tag displayed in the page as "<h1>"
    And validate DDL Page Viewed Event "<page>"

    Examples:
      | searchTerm              | url               | h1                                               | page          |
      | 592866                  | /s592866          | CURVO 95\" white performance fabric sofa by goop | PDP           |
      | 592-866                 | /s592866          | CURVO 95\" white performance fabric sofa by goop | PDP           |
      | GWYNETH BOUCLE LOVESEAT | /search           | GWYNETH BOUCLE LOVESEAT                          | Search        |
      | 30586                   | /search           | 30586                                            | Search        |
      | xyzzz cups              | /search_partial   | Oops!                                            | PartialSearch |
      | xyzzzz                  | /search_noresults | Oops!                                            | NoSearch      |

  @Search @TC_SCH_009 @FilterByAvailabity @CBUS @CB2US
  Scenario Outline: US - Customer search with a keyword and verify the Filter By Availability
    Given the customer is on the home page
    When Customer searches for Keyword "<searchTerm>"
    Then Customer should be navigated to "<searchTerm>" Search PLP
    And Customer should be navigated to "<expectedUrl>"
    And Customer should be able to see the product count
    And Customer should be able to see the View All and FBA buttons on the page
    When Customer clicks on Ready to Ship availability filter "<button>"
    Then Verify zipcode location is displayed
    And Verify the pageurl contains the availability attribute "<button>"
    And Customer should see Product Count decrease
    When Customer enters a valid zipcode "<valid zipcode>"
    Then Customer should see Product Count decrease
    When Customer enters an invalid zipcode "<invalid zipcode>"
    Then Customer should see the error message "<Error Message>"
    When Customer enters a valid zipcode "60601"
    When Customer clicks on View All filter
    #Then Customer should be able to see product count order as viewAll > shipsWithin4Weeks > readyToShip


    Examples:
      | searchTerm | expectedUrl    | Error Message                  | valid zipcode | invalid zipcode | button      |
      | white      | /search?query= | Please enter a valid ZIP code. | 36925         | 11111           | ReadyToShip |
      | glass      | /search?query= | Please enter a valid ZIP code. | 99950         |                 | ReadyToShip |
      | table      | /search?query= | Please enter a valid ZIP code. | 60455         | K0G 0A7         | ReadyToShip |
      | glass      | /search?query= | Please enter a valid ZIP code. | 85001         | 605             | ReadyToShip |

  @Search @TC_SCH_009 @FilterByAvailabity @CBCA @CB2CA
  Scenario Outline: Canada - Customer search with a keyword and verify the Filter By Availability
    Given the customer is on the home page
    When Customer searches for Keyword "<searchTerm>"
    Then Customer should be navigated to "<searchTerm>" Search PLP
    And Customer should be navigated to "<expectedUrl>"
    And Customer should be able to see the product count
    And Customer should be able to see the View All and FBA buttons on the page
    When Customer clicks on Ready to Ship availability filter "<button>"
    Then Verify zipcode location is displayed
    And Verify the pageurl contains the availability attribute "<button>"
    And Customer should see Product Count decrease
    When Customer enters a valid zipcode "<valid zipcode>"
    Then Customer should see Product Count decrease
    When Customer enters an invalid zipcode "<invalid zipcode>"
    Then Customer should see the error message "<Error Message>"
    When Customer enters a valid zipcode "L5T2T5"
    When Customer clicks on View All filter
    #Then Customer should be able to see product count order as viewAll > shipsWithin4Weeks > readyToShip

    Examples:
      | searchTerm | expectedUrl    | Error Message                     | valid zipcode | invalid zipcode | button      |
      | glass      | /search?query= | Please enter a valid postal code. | K0G 0A7       | 60450           | ReadyToShip |
      | white      | /search?query= | Please enter a valid postal code. | K0G0A7        |                 | ReadyToShip |
      | chair      | /search?query= | Please enter a valid postal code. | R5K 0A7       | K0G             | ReadyToShip |
      | table      | /search?query= | Please enter a valid postal code. | M9W2T5        | 60450           | ReadyToShip |

  @Search @TC_SCH_010 @SortByValidation @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline: Customer search with a keyword and verify SortBy
    Given the customer is on the home page
    When Customer searches for Keyword "<searchTerm>"
    Then Customer should be able to see the sortBy dropdown button
    And Customer should be able to see the sortBy option on "most relevant"
    When Customer click on Sort by dropdown
    Then Cusomer should be able to see all sortBy options displayed and clickable
    When Customer click on Sort by dropdown
    And Select Price Low to High option
    Then Verify the Price displayed is sorted from Low to High
    When Customer click on Sort by dropdown
    And Select Price High to Low option
    Then Verify the Price displayed is sorted from High to Low
    When Customer click on Sort by dropdown
    And Select Top Rated option
    Then Verify the products are displayed based on the highest rating
    When Customer click on Sort by dropdown
    And Select Best Selling option
    Then Verify the products are displayed based on the Best Selling
    When Customer click on Sort by dropdown
    And Select new option
    Then Verify the products are displayed based on the New Arrival

    Examples:
      | searchTerm  |
      | white       |
      | glass       |
      | xyzzz table |

  @Search @TC_SCH_011 @SearchSustainabilityFilter @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline: Customer search with a keyword and verify the sustainability filter search
    Given the customer is on the home page
    When Customer searches for Keyword "<searchTerm>"
    When Customer click on the Filter button
    Then Filter drawers should be displayed
    When Customer selects Responsible Design filter
    When Customer selects Type filter
    Then Verify the Responsible Design and Type filters are selected
    And Click on Filter Apply button
    When Customer click on Clear All link
    Then All the filter selections should be cleared

    Examples:
      | searchTerm |
      | white      |

  @Search @TC_SCH_012 @SearchUserEnterPriceFilter @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline: Customer search with a keyword and verify the entered price filter search
    Given the customer is on the home page
    When Customer searches for Keyword "<searchTerm>"
    When Customer click on the Filter button
    Then Filter drawers should be displayed
    When Customer selects Type filter
    Then Verify the Type filter is selected
    When Customer enters Min Price "<minPrice>"
    Then Customer click on Price Range button
    And Verify the Price Range filter is selected
    When Customer enters Max Price "<maxPrice>"
    Then Customer click on Price Range button
    And Verify the Price Range filter is selected
    When Customer enters Min Price "<maxPrice>" greater than Max Price "<minPrice>"
    Then Customer click on Price Range button
    And Verify the Price Range filter is selected
    When Customer enters Min and Max Price as empty value
    Then Customer click on Price Range button
    And Verify the error message is displayed
    When Customer enters Min "<minPrice>" and Max "<maxPrice>" Price Range
    Then Customer click on Price Range button
    And Verify the Price Range filter is selected
    And Click on Filter Apply button
    When Customer click on Clear All link
    Then All the filter selections should be cleared

    Examples:
      | searchTerm | minPrice | maxPrice |
      | table      | 10       | 1000     |

  #CB2 CA doesnt have user entered width filter
  @Search @TC_SCH_013 @SearchUserEnterWidthFilter @CBUS @CBCA @CB2US
  Scenario Outline: Customer search with a keyword and verify the entered width filter search
    Given the customer is on the home page
    When Customer searches for Keyword "<searchTerm>"
    When Customer click on the Filter button
    Then Filter drawers should be displayed
    When Customer selects Type filter
    Then Verify the Type filter is selected
    When Customer enters Min Width "<minWidth>"
    Then Customer click on Width Range button
    And Verify the Width Range filter is selected
    When Customer enters Max Width "<maxWidth>"
    Then Customer click on Width Range button
    And Verify the Width Range filter is selected
    When Customer enters Min Width "<maxWidth>" greater than Max Width "<minWidth>"
    Then Customer click on Width Range button
    And Verify the Width Range filter is selected
    When Customer enters Min and Max Width as empty value
    Then Customer click on Width Range button
    And Verify the error message is displayed
    When Customer enters Min "<minWidth>" and Max "<maxWidth>" Width Range
    Then Customer click on Width Range button
    And Verify the Width Range filter is selected
    And Click on Filter Apply button
    When Customer click on Clear All link
    Then All the filter selections should be cleared

    Examples:
      | searchTerm | minWidth | maxWidth |
      | table      | 10       | 1000     |


