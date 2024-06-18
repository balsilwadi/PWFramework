Feature: BOPS Browse Product Test Cases

    @BOPS_browse  @BrowseProduct @CBUS @CBCA @CB2US @CB2CA
    Scenario: Adding BOPS HWS product to cart
        Given the customer is on the home page
        When customer adds "SKU_OVERSIZED" to cart as "Pickup"
        Then cart page should be displayed with added item details
        And proceed to checkout as a guest user with "OVERSIZED_ITEMS" in cart

    @BOPS_browse  @BrowseProduct @CBUS @CBCA @CB2US @CB2CA
    Scenario: Adding BOPS FT product to cart
        Given the customer is on the home page
        When customer adds "SKU_BOPS" to cart as "Pickup"
        Then cart page should be displayed with added item details

    @BOPS_browse  @BrowseProduct @CBUS @CBCA @CB2US @CB2CA
    Scenario: Adding BOSS HWS product to cart
        Given the customer is on the home page
        When customer adds "SKU_BOSS" to cart as "Pickup"
        Then cart page should be displayed with added item details
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart

