Feature: Checkout - Availability
  As a Customer,
  I would like to compare the availability and arrives message displayed in PDP and Cart Page

  Background: Customer launches Home page
    Given the customer is on the home page

  @CHK_001 @Smoke @Regression @TargettedRegression @Priority1 @Checkout @Cart @Cart @Availability @CBUS @CBCA @CB2US @CB2CA
  Scenario: CHK_001_Availability message in PDP and Cart pages should match
    When customer adds "<item_type>" to cart as "Ship"
    Then cart page should display same availability as seen in PDP for "<item_type>"

    Examples:
      | item_type     |
      | SKU_PARCEL    |
      | SKU_FURNITURE |
      | SKU_MTO       |