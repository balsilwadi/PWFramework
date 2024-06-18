Feature: Browse Product Super SOR Tests

  @SOR_Crate @BrowseProduct
  Scenario Outline: Adding Super SOR Sectional Sofa (1 non fabric and 1 Fabric choice) to cart
    Given the Product Detail Page with "<sorSKU>" sku is retrieved
    When that a customer navigates to the PDP
    Then they see the product detail page
    And they verify the presence of Grouper Drawers
    Then they click "<non-fabric>" grouper
    And they validate "<non-fabric>" grouper option choices
    Then they click "<fabric>" grouper
    And they validate "<fabric>" grouper option choices
    Then they see Add to cart Container on Product Deatil Page
    Then they see "DETAILS" drawer on Product Deatil Page
    Then they see "DIMENSIONS" drawer on Product Deatil Page
    Then they Click On Add to Cart on Product Detail Page

    @CBUS @CBCA
    Examples:
      | sorSKU         | non-fabric   | fabric  |
      | sectionalSofa1 | Size & Shape | Fabric  |
      | sectionalSofa2 | Size & Shape | Leather |


    @CB2US @CB2CA
    Examples:
      | sorSKU         | non-fabric   | fabric |
      | sectionalSofa1 | SIZE & SHAPE | FABRIC |
      | sectionalSofa2 | SIZE & SHAPE | FABRIC |

  @SOR_Crate @CBUS @CBCA @BrowseProduct
  Scenario Outline: Adding Super SOR for Sofa with 1 Non Fabric and 1 Fabric choices to cart
    Given the Product Detail Page with "sorSofa2" sku is retrieved
    When that a customer navigates to the PDP
    Then they see the product detail page
    And they verify the presence of Grouper Drawers
    Then they click "Size" grouper
    And they validate "Size" grouper option choices
    Then they click "Leather" grouper
    And they validate "Leather" grouper option choices
    Then they see Add to cart Container on Product Deatil Page
    Then they see "DETAILS" drawer on Product Deatil Page
    Then they see "RESPONSIBLE DESIGN" drawer on Product Deatil Page
    Then they see "DIMENSIONS" drawer on Product Deatil Page
    Then they Click On Add to Cart on Product Detail Page
    Then Double Dare popup should appear on Product Detail Page
    And they click Accept terms button on Double Dare popup



  @SOR_Crate @BrowseProduct
  Scenario Outline: Adding Super SOR sku with 2 non fabric and 2 Fabric choices to cart
    Given the Product Detail Page with "<sorSKU>" sku is retrieved
    When that a customer navigates to the PDP
    Then they see the product detail page
    And they verify the presence of Grouper Drawers
    Then they click "<grouper>" grouper
    And they validate "<grouper>" grouper option choices
    Then they see Add to cart Container on Product Deatil Page
    Then they see "DETAILS" drawer on Product Deatil Page
    Then they see "DIMENSIONS" drawer on Product Deatil Page
    Then they Click On Add to Cart on Product Detail Page
    Then Double Dare popup should appear on Product Detail Page
    And they click Accept terms button on Double Dare popup
    Then Double Dare popup should appear on Product Detail Page
    And they click Accept terms button on Double Dare popup

    @CBUS @CBCA
    Examples:
      | sorSKU   | grouper |
      | sorSofa1 | Depth   |
      | sorSofa1 | Size    |
      | sorSofa1 | Fabric  |
      | sorSofa1 | Leg     |


  @SOR_Crate @CBUS @CBCA @CB2US @CB2CA @BrowseProduct
  Scenario Outline: Adding Super SOR for Sofa with 1 Fabric choice to cart
    Given the Product Detail Page with "sofa_1FabricGrouper" sku is retrieved
    When that a customer navigates to the PDP
    Then they see the product detail page
    And they verify the presence of Grouper Drawers
    Then they click "Fabric" grouper
    And they validate "Fabric" grouper option choices
    Then they see Add to cart Container on Product Deatil Page
    Then they see "DETAILS" drawer on Product Deatil Page
    Then they see "DIMENSIONS" drawer on Product Deatil Page
    Then they see "CARE" drawer on Product Deatil Page
    Then they Click On Add to Cart on Product Detail Page
    Then Double Dare popup should appear on Product Detail Page
    And they click Accept terms button on Double Dare popup



