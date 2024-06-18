Feature: Checkout - Bug/Feature Tests
    Bug/Feature Test
    @CHK-8088 @CPU @BugFix
    Scenario Outline: Set 1 - Verify the furniture warehouse listed for inmpyut zipcode
        Given the customer is on the home page
        When customer adds "SKU_LIST_CHK8088" to cart as "Ship"
        Then cart page should be displayed with added item details
        And storegrid should contain correct warehouse
            | zipCode | expectedWarehouse            | wrongWarehouse           |
            | 05901   | Boston Warehouse             | North Haven Warehouse    |
            | 07777   | Cranbury Warehouse           | Philadelphia Cross Dock  |
            | 14616   | Cranbury Warehouse           | Philadelphia Cross Dock  |
            | 29386   | Lincolnton Warehouse         | Atlanta Warehouse        |
            | 78260   | Austin Warehouse             | Houston Warehouse        |
            | 80423   | Denver Warehouse             | Salt Lake City Warehouse |
            | 85379   | Arizona Warehouse            | Las Vegas Cross Dock     |
            | 91371   | LA Warehouse                 | Las Vegas Cross Dock     |
            | 63021   | Kansas City Warehouse        | Naperville Warehouse     |
            | 63952   | Nashville Crossdock          | Kansas City Warehouse    |
            | 43456   | Detroit Crossdock            | Columbus Warehouse       |
            | 49448   | Naperville Warehouse         | Detroit Crossdock        |
            | 50246   | Minnesota Warehouse          | Kansas City Warehouse    |
            | 50848   | Kansas City Warehouse        | Minnesota Warehouse      |
            | 36722   | Atlanta Warehouse            | Nashville Crossdock      |
            | 37044   | Nashville Crossdock          | Atlanta Warehouse        |
            | 43260   | Columbus Warehouse           | Detroit Crossdock        |
            | 01505   | Boston Warehouse             | North Haven Warehouse    |
            | 04039   | Boston Warehouse             | North Haven Warehouse    |
            | 08701   | Cranbury Warehouse           | Philadelphia Cross Dock  |
            | 10108   | Cranbury Warehouse           | Philadelphia Cross Dock  |
            | 10577   | North Haven Warehouse        | Cranbury Warehouse       |
            | 92239   | Las Vegas Cross Dock         | LA Warehouse             |
            | 92708   | LA Warehouse                 | Las Vegas Cross Dock     |
            | 97475   | Portland Furniture Crossdock | Seattle Warehouse        |
            | 97489   | Portland Furniture Crossdock | Seattle Warehouse        |
            | 77574   | Houston Warehouse            | Austin Warehouse         |
            | 78764   | Austin Warehouse             | Houston Warehouse        |
            | 40446   | Nashville Crossdock          | Columbus Warehouse       |
            | 47243   | Columbus Warehouse           | Nashville Crossdock      |
            | 54173   | Naperville Warehouse         | Minnesota Warehouse      |
            | 54915   | Naperville Warehouse         | Minnesota Warehouse      |
            | 16058   | Columbus Warehouse           | Washington DC Warehouse  |


    @CHK-8088 @CPU @BugFix2
    Scenario Outline: Set 2 - Verify the furniture warehouse listed for inmpyut zipcode
        Given the customer is on the home page
        When customer adds "SKU_LIST_CHK8088" to cart as "Ship"
        Then cart page should be displayed with added item details
        And storegrid should contain correct warehouse
            | zipCode | expectedWarehouse       | wrongWarehouse               |
            | 18655   | Philadelphia Cross Dock | Cranbury Warehouse           |
            | 18956   | Philadelphia Cross Dock | Cranbury Warehouse           |
            | 28147   | Lincolnton Warehouse    | Richmond Crossdock           |
            | 29505   | Lincolnton Warehouse    | Atlanta Warehouse            |
            | 01057   | North Haven Warehouse   | Boston Warehouse             |
            | 01610   | Boston Warehouse        | North Haven Warehouse        |
            | 04011   | Boston Warehouse        | North Haven Warehouse        |
            | 10920   | North Haven Warehouse   | Cranbury Warehouse           |
            | 37128   | Nashville Crossdock     | Atlanta Warehouse            |
            | 76657   | Austin Warehouse        | Dallas Warehouse             |
            | 98273   | Seattle Warehouse       | Portland Furniture Crossdock |
            | 99337   | Seattle Warehouse       | Portland Furniture Crossdock |
            | 54474   | Minnesota Warehouse     | Naperville Warehouse         |
            | 71148   | Dallas Warehouse        | Houston Warehouse            |
            | 38801   | Nashville Crossdock     | Atlanta Warehouse            |
            #   | 42532   | Nashville Crossdock     | Atlanta Warehouse            |
            | 44282   | Columbus Warehouse      | Detroit Crossdock            |
            | 50309   | Kansas City Warehouse   | Minnesota Warehouse          |
            | 52052   | Naperville Warehouse    | Minnesota Warehouse          |
            | 07833   | Cranbury Warehouse      | Philadelphia Cross Dock      |
            | 17108   | Washington DC Warehouse | Philadelphia Cross Dock      |
            | 24024   | Richmond Crossdock      | Lincolnton Warehouse         |
            | 27846   | Richmond Crossdock      | Washington DC Warehouse      |
            | 32963   | Miami Warehouse         | Tampa Warehouse              |
            | 67340   | Kansas City Warehouse   | Dallas Warehouse             |
            | 78834   | Austin Warehouse        | Houston Warehouse            |
            | 35406   | Nashville Crossdock     | Atlanta Warehouse            |
            | 54138   | Minnesota Warehouse     | Naperville Warehouse         |
            | 61635   | Naperville Warehouse    | Kansas City Warehouse        |
            | 08085   | Philadelphia Cross Dock | Cranbury Warehouse           |
            | 08666   | Philadelphia Cross Dock | Cranbury Warehouse           |
            | 09107   | Cranbury Warehouse      | Philadelphia Cross Dock      |
            | 15729   | Washington DC Warehouse | Columbus Warehouse           |
            | 17745   | Washington DC Warehouse | Philadelphia Cross Dock      |
            | 18508   | Cranbury Warehouse      | Philadelphia Cross Dock      |

    @CHK-8088 @CPU @BugFix3
    Scenario Outline: Set 3 - Verify the furniture warehouse listed for inmpyut zipcode
        Given the customer is on the home page
        When customer adds "SKU_LIST_CHK8088" to cart as "Ship"
        Then cart page should be displayed with added item details
        And storegrid should contain correct warehouse
            | zipCode | expectedWarehouse            | wrongWarehouse               |
            | 70616   | Houston Warehouse            | Austin Warehouse             |
            | 85309   | Arizona Warehouse            | Las Vegas Cross Dock         |
            | 90734   | LA Warehouse                 | Las Vegas Cross Dock         |
            | 97321   | Portland Furniture Crossdock | Seattle Warehouse            |
            | 49546   | Detroit Crossdock            | Naperville Warehouse         |
            | 54124   | Naperville Warehouse         | Minnesota Warehouse          |
            | 60935   | Naperville Warehouse         | Detroit Crossdock            |
            | 61285   | Naperville Warehouse         | Minnesota Warehouse          |
            | 41832   | Lincolnton Warehouse         | Columbus Warehouse           |
            | 43449   | Detroit Crossdock            | Columbus Warehouse           |
            | 43540   | Detroit Crossdock            | Columbus Warehouse           |
            | 46207   | Columbus Warehouse           | Naperville Warehouse         |
            | 24577   | Richmond Crossdock           | Lincolnton Warehouse         |
            | 25088   | Columbus Warehouse           | Lincolnton Warehouse         |
            | 25984   | Lincolnton Warehouse         | Columbus Warehouse           |
            | 28791   | Lincolnton Warehouse         | Atlanta Warehouse            |
            | 30079   | Atlanta Warehouse            | Nashville Crossdock          |
            | 04865   | Boston Warehouse             | North Haven Warehouse        |
            | 09506   | Cranbury Warehouse           | Philadelphia Cross Dock      |
            | 15295   | Columbus Warehouse           | Washington DC Warehouse      |
            | 15904   | Washington DC Warehouse      | Richmond Crossdock           |
            | 16331   | Columbus Warehouse           | Washington DC Warehouse      |
            | 20510   | Washington DC Warehouse      | Richmond Crossdock           |
            | 99323   | Seattle Warehouse            | Portland Furniture Crossdock |
            | 79702   | Austin Warehouse             | Dallas Warehouse             |
            | 91987   | LA Warehouse                 | Las Vegas Cross Dock         |
            | 97825   | Portland Furniture Crossdock | Seattle Warehouse            |
            | 62776   | Naperville Warehouse         | Kansas City Warehouse        |