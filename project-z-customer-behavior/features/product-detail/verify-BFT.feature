Feature: BFT Browse Product Test Cases


    @BFT_browse  @BrowseProduct
    Scenario: Adding  BFT product to cart
        # Given the customer is on the home page
        Given the Product Detail Page with "bftSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they change "<BFTZipcode>" zipcode
        When they Click On Add to Cart on Product Detail Page
        Then they Click on CHECKOUT NOW button
        Then BFT label should be shown on cart page

        @CBUS @CB2US
        Examples:
            | BFTZipcode |
            | 61820      |

        @CBCA @CB2CA
        Examples:
            | BFTZipcode |
            | L5T2T5     |








