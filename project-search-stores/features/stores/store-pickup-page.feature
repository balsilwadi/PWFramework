Feature: Store Pickup Page
  Customer should be able to navigate to store list page from the store pickup page and verify the store pickup page

  @Stores @Search @TC_SCH_019 @StorePickupPage @CB2US
  Scenario Outline: Customer navigate to store pickup page and verify the page with breadcrumb, list of states and its corresponding stores
    Given the customer is on the home page
    When The customer navigate to Store Locator page
    And Customer click on learn more link under ORDER ONLINE PICK UP IN STORE
    Then Customer should see header1 tag as "store and warehouse pick up"
    And Customer should be able to see and interact with the Store pick up FAQ
    And Customer should be able to see and interact the store location list
