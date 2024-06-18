Feature: As a Customer I want to setup a new gift registry
    As a Customer
    I want to test
    setting up a new gift registry for a logged in user

  Background: Launch the Home page

  @CBUS @CBCA @Regression @Smoke @GiftRegistry @ACNT_1558 @Domestic
  Scenario Outline: Create new GiftRegistry
    Given the customer is on the Gift Registry Setup page
    Then Gift Registry form page should show
    When the customer fills out the Gift Registry setup with <Email>
    Then the customer submits the Gift Registry setup with <Email>, <Password>
    When the customer fills out the Gift Registry Contact form
    Then the Gift Registry Location form loads with same address
    When the customer fills out the Gift Registry Location form
    When the customer fills out the Gift Registry Preferences form
    Then the New Gift Registry page loads

    Examples: 
      | Email                      | Password    |
      | "order-tracking@gmail.com" | "Crate123!" |

  @CBUS @CBCA @Regression @Smoke @GiftRegistry @ACNT_2340 @Domestic
  Scenario Outline: Edit GiftRegistry after Create
    Given the customer is on the Gift Registry Setup page
    Then Gift Registry form page should show
    When the customer fills out the Gift Registry setup with <Email>
    Then the customer submits the Gift Registry setup with <Email>, <Password>
    When the customer fills out the Gift Registry Contact form
    Then the Gift Registry Location form loads with same address
    When the customer fills out the Gift Registry Location form
    When the customer fills out the Gift Registry Preferences form
    Then the New Gift Registry page loads
    Then go to Registrant Page
    Then go to Edit Page
    Then verify the Edit Gift Registry page loads correctly

    Examples: 
      | Email                      | Password    |
      | "order-tracking@gmail.com" | "Crate123!" |

  @CBUS @CBCA @Regression @Smoke @GiftRegistry @ACNT_2165 @Domestic
  Scenario Outline: Start new GiftRegistry and Expect Existing Account
    Given the customer is on the Gift Registry Setup page
    Then Gift Registry form page should show
    When the customer fills out the Gift Registry setup with <Email>
    Then the customer submits the Gift Registry setup with <Email>, <Password> and expects existing account

    Examples: 
      | Email                      | Password    |
      | "order-tracking@gmail.com" | "Crate123!" |

  @CBUS @CBCA @Regression @Smoke @GiftRegistry @ACNT_2165 @Domestic
  Scenario Outline: Start new GiftRegistry and Expect No Existing Account
    Given the customer is on the Gift Registry Setup page
    Then Gift Registry form page should show
    When the customer fills out the Gift Registry setup with <Email>
    Then the customer submits the Gift Registry setup with <Email>, <Password> and does not expect existing account

    Examples: 
      | Email                          | Password    |
      | "random.crate+51747@gmail.com" | "Crate123!" |
