Feature: Searching for a registry
  As a customer I want to be able to search for a registry

@Smoke
Scenario: Find registry search with no results
  Given the customer is on the registry search page
  And they have entered 'ZZZZ' as the first name
  And they have entered 'AAAA' as the last name
  When they click search
  Then the customer goes to the registry search results page
  And there are 0 results

@Smoke
Scenario: Registry homepage search with no results
  Given the customer is on the registry home page
  And they have entered 'ZZZZ' as the first name'ZZZZ'
  And they have entered 'AAAA' as the last name'AAAA'
  When they click search
  Then the customer goes to the registry search results page
  And there are 0 results

@Smoke
Scenario: Registry search with some results
  Given the customer searched for a registry
  When they go to the registry search results page with first name 'J' and last name 'D'
  Then there are some results
  And the search results details are visible

#### ERROR STATES #####
Scenario: Find registry search with missing first name
  Given the customer is on the registry search page
  And they have entered 'ZZZZ' as the last name
  When they click search
  Then the first name error message is visible

Scenario: Find registry search with missing last name
  Given the customer is on the registry search page
  And they have entered 'ZZZZ' as the first name
  When they click search
  Then the last name error message is visible

Scenario: Registry homepage search with missing first name
  Given the customer is on the registry home page
  And they have entered 'ZZZZ' as the last name
  When they click search
  Then the first name error message is visible

Scenario: Registry homepage search with missing last name
  Given the customer is on the registry home page
  And they have entered 'ZZZZ' as the first name
  When they click search
  Then the last name error message is visible

