Feature: Browse Product Test Cases

  @Monogram_Crate @BrowseProduct
  Scenario Outline: As a Guest user add Monogram SKU to cart
    Given the Product Detail Page with "<monogrammingSKU>" sku is retrieved
    When that a customer navigates to the PDP
    Then they see the product detail page
    And They see STYLE grouper on Product Detail Page
    When They click "Personalized" in STYLE grouper on Product Detail Page
    Then Verify price is updated with Monogramming fees
    And They select font "<FONT>" and enter text on Product Detail Page
    And They select thread on Product Detail Page
    Then They see Add to cart Container on Product Detail Page
    When They Click On Add to Cart on Product Detail Page
    Then Monogramming Double Dare popup should appear on Product Detail Page
    And They click on Decline button on Double Dare popup
    When They Click On Add to Cart on Product Detail Page
    Then Monogramming Double Dare popup should appear on Product Detail Page
    And They click on Accept button on Double Dare popup

    @CBUS
    Examples:
      | monogrammingSKU      | FONT    |
      | monogramBackpackSKU  | CB Sans |
      | monogramBackpackSKU  | Cotford |
      | monogramNapkinSetSKU | Beloved |
      | monogramTowelSKU     | CB Sans |
      | monogramTowelSKU     | Cotford |

    @CBCA
    Examples:
      | monogrammingSKU         | FONT    |
      | monogrammingBackpackSKU | Cotford |
      | monogrammingBackpackSKU | CB Sans |

    @CB2US
    Examples:
      | monogrammingSKU | FONT    |
      | napkinSKU       | CB Sans |
      | napkinSetSKU    | CB Sans |

    @CB2CA
    Examples:
      | monogrammingSKU           | FONT    |
      | monogrammingNapkinSKU1    | CB Sans |
      | monogrammingNapkinSKU2    | Cotford |
      | monogrammingNapkinSetSKU1 | CB Sans |
      | monogrammingNapkinSetSKU2 | Cotford |