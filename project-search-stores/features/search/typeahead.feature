Feature: Typeahead dropdown testcases
  Customer should be able to type in a keyword into the search bar and be able to see and navigate around the dropdown

  @Search @TC_SCH_004 @TypeAheadDropdown @CBUS @CBCA
  Scenario Outline: Crate Typeahead dropdown validation
    Given the customer is on the home page
    When Customer navigates to "<url>"
    And Customer enters "<keyword>" in searchBar
    Then The typeahead dropdown should be displayed
    And The typeahead content should contain "<keyword>"
    When Customer searches for "<keyword>"
    And Customer navigates to HomePage
    Then Custormer should be able to see the recent searches dropdown with "<keyword>" displayed

    Examples:
      | keyword | url                                                        |
      | tab     |                                                            |
      | plate   | /search                                                    |
      | tray    | /checkout/cart                                             |
      | white   | /stores                                                    |
      | tab     | /search_partial?query=cups%20xyzzz                         |
      | tab     | /search_noresults?query=xyzzzz                             |
      | tab     | /wedding-gift-registry/                                    |
      | plate   | /kids                                                      |
      | tray    | /baby-registry                                             |
      | white   | /Search/SearchProductListing/KidsSearchPartial?query=xyzzz |

  @Search @TC_SCH_004 @TypeAheadDropdown @CB2US @CB2CA
  Scenario Outline: Crate Typeahead dropdown validation
    Given the customer is on the home page
    When Customer navigates to "<url>"
    And Customer enters "<keyword>" in searchBar
    Then The typeahead dropdown should be displayed
    And The typeahead content should contain "<keyword>"
    When Customer searches for "<keyword>"
    And Customer navigates to HomePage
    Then Custormer should be able to see the recent searches dropdown with "<keyword>" displayed

    Examples:
      | keyword | url                                |
      | tab     |                                    |
      | plate   | /search                            |
      | tray    | /checkout/cart                     |
      | white   | /stores                            |
      | cup     | /search_partial?query=cups%20xyzzz |
      | glass   | /search_noresults?query=xyzzzz     |
