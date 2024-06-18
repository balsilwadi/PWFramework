Feature: Searching for a registry
  As a customer I want to be able to filter a registry

@grss @Regression @FilterRegistry
Scenario Outline: Filter categories in registry page
  Given the customer navigates to the registry
  When the customer selects "<number>" random category
  Then the customer should see "<number>" accordion
  Examples:
        |number|
        |1     |
        |2     |


@grss @Regression @FilterRegistry
Scenario Outline: Filter price in registry page
  Given the customer navigates to the registry
  When the customer selects "<number>" random price
  Then the customer should see filtered items according to price
  Examples:
        |number|
        |1     |
        |2     |