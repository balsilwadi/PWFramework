@HWS @BrowsePath @Homepage @Smoke @Regression @CBUS @CBCA @CB2US @CB2CA
Feature: Footer Validation
  As a customer,
  I want to verify the Footer

  @Footer
  Scenario Outline: As a customer I want to verify footer on homepage
    Given the customer is on the home page
    When customer navigates to footer
    Then customer verifies Contact us
    Then customer verifies Crate and Barrel Credit Card
    Then customer verifies Order Tracking & Schedule Delivery
    Then customer verifies WeddingRegistry image
    Then customer verifies OurCompany options
    Then customer verifies Resources options
    Then customer verifies ShoppingApp options
    Then customer verifies SocialMedia options