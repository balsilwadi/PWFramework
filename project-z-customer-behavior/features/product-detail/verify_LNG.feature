Feature: LNG Browse Product Test Cases

    @LNG_browse  @BrowseProduct
    Scenario: Adding LNG product to cart
        # Given the customer is on the home page
        Given the Product Detail Page with "lngSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they change "<LNGZipcode>" zipcode
        When they Click On Add to Cart on Product Detail Page
        Then they Click on CHECKOUT NOW button
        Then long distance label should be shown on cart page


        @CBUS @CB2US
        Examples:
            | LNGZipcode |
            | 59901      |

        @CBCA @CB2CA
        Examples:
            | LNGZipcode |
            | S7K1B1     |
