@Regression @Smoke @Homepage @BrowsePath
Feature: Browse Path Test Cases
  As a customer, I want to launch Homepage and verify cart functionality on homepage

  @HeaderCart @CBUS @CBCA @CB2US @CB2CA
  Scenario: Verify cart functionality while not logged in
    Given the customer is on the home page
    When the customer hovers over cart icon
    Then the cart should not have any items in the cart
    And cart flyout should show Guest View

  @HeaderCart
  Scenario: Verify cart functionality while not logged in and add an item
    Given the customer is on the home page
    When the customer hovers over cart icon
    Then the cart should not have any items in the cart
    When the customer adds <sku> to cart while not logged in
    Then cart should show newly added sku: <sku> after user hovers over cart icon again

    @CBUS @CBCA
    Examples: 
      | sku      |
      | "211081" |

    @CB2US @CB2CA
    Examples: 
      | sku      |
      | "449915" |

  @HeaderCart
  Scenario: Verify cart functionality while not logged in and then logging in
    Given the customer is on the home page
    And the customer has previously added skus: <sku1>, <sku2> to their cart
    When the customer hovers over cart icon
    Then cart should show previously added skus: <sku1>, <sku2> after user hovers over cart icon again
    When the customer adds <sku3> to cart while not logged in
    Then cart should show newly added sku: <sku3> along with previously added skus: <sku1>, <sku2> after user hovers over cart icon again
    And Customer clicks on sign in from header
    And Customer sign in with "Favorites" login credentials
    When the customer hovers over cart icon
    Then the customer should see newly added skus: <sku1>, <sku2>, <sku3> after user hovers over cart icon again

    @CBUS @CBCA
    Examples: 
      | sku1     | sku2     | sku3     |
      | "211081" | "339551" | "172907" |

    @CB2US @CB2CA
    Examples: 
      | sku1     | sku2     | sku3     |
      | "449915" | "309635" | "452413" |

  @Regression @Smoke @Homepage @HeaderCart
  Scenario: Verify cart functionality after customer has added product with quantity of more than open
    Given the customer is on the home page
    When customer adds <sku> to cart with selected quantity of <quantity>
    Then cart should show newly added sku: <sku> with quantity: <quantity> after user hovers over cart icon again

    @CBUS @CBCA
    Examples: 
      | sku      | quantity |
      | "211081" | "2"      |

    @CB2US @CB2CA
    Examples: 
      | sku      | quantity |
      | "449915" | "3"      |
