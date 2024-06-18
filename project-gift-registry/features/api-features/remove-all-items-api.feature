Feature: Remove all registry items from GRAPI

  @api
  Scenario: Remove items from registry
    Given registry with items
    When items are deleted
    Then items should be deleted
