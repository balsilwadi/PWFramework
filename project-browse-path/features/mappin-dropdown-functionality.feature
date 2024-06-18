@Regression @Smoke @Homepage @HomeHeader @BrowsePath
Feature: Browse Path Test Cases
  As a user
  I want to launch Homepage and verify Mappin dropdown on Homepage

  @MappinDropdown @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline: Mappin dropdown Validation
    Given the customer is on the home page
    When Customer hover on location icon
    Then Customer should see default shipping to option with appropriate zip code and default select my store option
    When Customer clicks on arrow beside zipcode
    Then Customer should be able to enter a new zipcode "<zipCode>"

    Examples: 
      | zipCode |
      |   60148 |
