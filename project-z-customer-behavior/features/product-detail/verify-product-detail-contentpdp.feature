Feature: Browse Product Content PDP Tests

    @contentpdp @BrowseProduct @CBUS  @CBCA
    Scenario Outline: Adding contentPDP to cart
        Given the Product Detail Page with "contentpdpSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they verify pagetype
        Then they see "dimensions" drawer on Product Deatil Page
        Then they see "details & care" drawer on Product Deatil Page
        Then they see "reviews" drawer on Product Deatil Page
        Then they see "assembly" drawer on Product Deatil Page
        Then they Click On Add to Cart on Product Detail Page

