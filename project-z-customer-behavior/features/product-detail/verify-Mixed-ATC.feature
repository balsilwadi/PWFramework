Feature: Mixed sku Browse Product Test Cases


    @mixed_browse  @BrowseProduct @CBUS @CBCA @CB2US @CB2CA
    Scenario: Adding  Mixed products to cart one FT and one HWS
        # Given the customer is on the home page
        Given the Product Detail Page with "parcelSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they see store pickup on product detail page
        When they Click On Add to Cart on Product Detail Page
        When they click on Continue Shopping button
        Given the Product Detail Page with "FurnitureSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        When they Click On Add to Cart on Product Detail Page
        When they click on Continue Shopping button
        Given the Product Detail Page with "onlineSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        When they Click On Add to Cart on Product Detail Page
