Feature: Parcel sku Browse Product Test Cases


    @parcel_browse  @BrowseProduct @CBUS @CBCA @CB2US @CB2CA
    Scenario: Adding  Parcel product to cart
        # Given the customer is on the home page
        Given the Product Detail Page with "parcelSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they see store pickup on product detail page
        When they Click On Add to Cart on Product Detail Page
