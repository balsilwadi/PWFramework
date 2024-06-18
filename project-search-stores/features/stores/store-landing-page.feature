Feature: Store Landing Page Validation
  Customer should be able to navigate to the store landing page, browse fopr stores, and navigate to a store details page from the locator page

  @Stores @Search @TC_SCH_018 @StoreLandingPage @CBUS
  Scenario Outline: Crate US - Customer navigates to store locator page and searches for different stores
    Given the customer is on the home page
    When The customer navigate to Store Locator page
    Then Verify customer navigates to store locator page
    And Customer should verify the h1 tag displayed in the page as "Find a Store"
    And Customer should be able see and interact with the "Free Design Services" section
    And Customer should be able see and interact with the "Buy Online Pickup in Store" section
    And Customer should be able see and interact with the "We're Hiring" section
    When Customer click on View All Stores and Facilities link from the Store Locator page
    Then Customer should be navigated to the store list page
    When Customer navigates back to the store locator page
    And Customer enters the  zipcode "<zipcode>" and clicks the find button
    Then Customer should be able to see the Store list header as "Store Locations Nearest <zipcode>"
    And Customer should be able to see the map
    And Customer should be able to see the list of stores
    And Customer should see the stores sorted by distance
    And Customer should be able to interact with the displayed stores
    And View store detail button should navigate customer to coresponding stores details page
    And View upcomming events button should navigate customer to coresponding stores details page
    And Make This My Store button should select the store as My Store
    And Customer should be able to interact with the filters

    Examples:
      | zipcode |
      | 60455   |

  @Stores @Search @TC_SCH_018 @StoreLandingPage @CBCA
  Scenario Outline: Crate CA - Customer navigates to store page and searches for stores
    Given the customer is on the home page
    When The customer navigate to Store Locator page
    Then Customer should be able see and interact with the "Free Design Services" section
    And Customer should be able see and interact with the "Buy Online Pickup in Store" section
    And Customer should be able see and interact with the "We're Hiring" section
    And Customer should be able to see the list of stores
    And Customer should be able to interact with the displayed stores
    And View store detail button should navigate customer to coresponding stores details page
    And View upcomming events button should navigate customer to coresponding stores details page
    And Make This My Store button should select the store as My Store
    And Customer should be able to interact with the filters

  @Stores @Search @TC_SCH_018 @StoreLandingPage @CB2US
  Scenario Outline: CB2 US - Customer navigates to store locator page and searches for different stores
    Given the customer is on the home page
    When The customer navigate to Store Locator page
    Then Verify customer navigates to store locator page
    And Customer should verify the h1 tag displayed in the page as "STORES & SERVICES"
    When The customer clicks on the "View All Stores" button
    Then Customer should be navigated to "/?viewIndex=storeList"
    When Customer navigates back to the store locator page
    And The customer clicks on the "View Stores by State" button
    Then Customer should be navigated to "/list-state/retail-stores"
    When Customer navigates back to the store locator page
    And Customer should be able see and interact with the "STORE SERVICES" section
    And Customer should be able see and interact with the "ORDER ONLINE PICK UP IN STORE" section
    And Customer enters the  zipcode "<zipcode>" and clicks the find button
    Then Customer should be able to see the Store list header as "Store Locations Nearest <zipcode>"
    And Customer should be able to see the list of stores
    And Customer should see the stores sorted by distance
    And Customer should be able to interact with the displayed stores
    And View store detail button should navigate customer to coresponding stores details page
    And Make This My Store button should select the store as My Store
    Examples:
      | zipcode |
      | 60455   |

  @Stores @Search @TC_SCH_018 @StoreLandingPage @CB2CA
  Scenario Outline: CB2 CA - Customer navigates to store locator page and searches for different stores
    Given the customer is on the home page
    When The customer navigate to Store Locator page
    Then Verify customer navigates to store locator page
    And Customer should verify the h1 tag displayed in the page as "STORES & SERVICES"
    When The customer clicks on the "View Canada Warehouses" button
    Then Customer should be navigated to "/stores/list-warehouse"
    When Customer navigates back to the store locator page
    And The customer clicks on the first canada store
    Then Customer should be navigated to the correspoding store details page
    When Customer navigates back to the store locator page
    Then Cusomer should be able to click on the "VIEW U.S. WAREHOUSES" button to navigate to "www.cb2.com/stores/list-warehouse"
    And Cusomer should be able to click on the "US_Store" button to navigate to "www.cb2.com/stores/scottsdale-quarter"
    And Customer should be able see and interact with the "STORE SERVICES" section
    And Customer should be able see and interact with the "ORDER ONLINE PICK UP IN STORE" section


  @Stores @Search @TC_SCH_021 @StoreGeoLocation @CBUS @CB2US
  Scenario Outline: Customer navigates to store locator page enters different examples of store zipcodes
    Given the customer is on the home page
    When The customer navigate to Store Locator page
    And Customer enters the  zipcode "<Valid zipcode>" and clicks the find button
    Then Customer should be able to see the Store list header as "Store Locations Nearest <Valid zipcode>"
    When Customer enters the  zipcode "<invalid zipcode>" and clicks the find button
    Then Customer should see the zipcode error message "<error>"
    Examples:
      | Valid zipcode | invalid zipcode | error                             |
      | 60605         | L5T2T5          | Please enter a valid ZIP code.    |
      | Chicago,IL    | chicago         | Please enter a valid City, State. |
      | 33101         |                 | Please enter a valid ZIP code.    |
      | 90001         | 1234            | Please enter a valid ZIP code.    |


