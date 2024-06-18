# @Regression
# Feature: Verify Product Detail Page - Made to Order
# TC_FT_013
# MTO
# Verifying MTO PDP page


# Background: Sets the customer's location for in stock ship and delivery availability
#     Given the customer is on the home page
#     And they have the "Naper191Location" location


# @Regression @Browse @PDP
# Scenario Outline: Verify product detail page for MTO products
#     Given the customer goes to the product detail page "<url>"
#     Then they see the product detail page

# Verify Product Detail Page MTO here

# When they see the add to cart container
# And they add to cart
# Then they see the add to cart confirmation with terms modal

# When they select continue shopping
# Then the add to cart confirmation with terms modal closes

# When they set the quantity to "3"
# Then they see the quantity as "3"

# Add to Cart Decline

# Add to Cart Accept

# When they empty their cart
# Then their cart is empty

# @CrateUS @CrateCA @CB2US @CB2CA
# Examples:
#     | description                  | url                                            |
#     | Product Detail MTO           | BrowseData.PdpDetail-MTO-DeliveryTerms.url.2   |
#     | Product Detail Grouper MTO   | BrowseData.PdpGrouper-MTO-DeliveryTerms.url.2  |
#     | Product Detail SOR MTO       | BrowseData.PdpSor-MTO-DeliveryTerms.url.2      |
#     | Product Detail Super SOR MTO | BrowseData.PdpSuperSor-MTO-DeliveryTerms.url.2 |
#     | Product Detail SOR REF       | BrowseData.PdpSor-REF-DeliveryTerms.url.2      |
#     | Product Detail Super SOR REF | BrowseData.PdpSuperSor-REF-DeliveryTerms.url.2 |

Feature: MTO Browse Product Test Cases


    @MTO_crate @CBUS @CBCA @CB2US @CB2CA @BrowseProduct
    Scenario: Adding  MTO product to cart

        Given the Product Detail Page with "mtoSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they see availability as MTO
        Then they see Add to cart Container on Product Deatil Page
        Then they see "DETAILS" drawer on Product Deatil Page
        Then they see "DIMENSIONS" drawer on Product Deatil Page
        Then they see "CARE" drawer on Product Deatil Page
        When they Click On Add to Cart on Product Detail Page
        Then Double Dare popup should appear on Product Detail Page
        Then Verify SummaryText on Double dare popup
        When they click on Decline button on Double Dare popup
        Then they see the product detail page
        Then they Click On Add to Cart on Product Detail Page
        Then Double Dare popup should appear on Product Detail Page
        And they click Accept terms button on Double Dare popup

    @MTO_crate @CBUS @CBCA @CB2US @CB2CA @BrowseProduct
    Scenario: Adding  custom product to cart

        Given the Product Detail Page with "customSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they see availability as MTO
        Then they see Add to cart Container on Product Deatil Page
        Then they see "DETAILS" drawer on Product Deatil Page
        Then they see "DIMENSIONS" drawer on Product Deatil Page
        Then they see "CARE" drawer on Product Deatil Page
        When they Click On Add to Cart on Product Detail Page
        Then Double Dare popup should appear on Product Detail Page
        When they click on Decline button on Double Dare popup
        Then they see the product detail page
        Then they Click On Add to Cart on Product Detail Page
        Then Double Dare popup should appear on Product Detail Page
        And they click Accept terms button on Double Dare popup

    @MTO_crate @CBUS @CBCA @CB2US @CB2CA @BrowseProduct
    Scenario: Adding  custom leather product to cart

        Given the Product Detail Page with "leathermtoSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they see availability as MTO
        Then they see Add to cart Container on Product Deatil Page
        Then they see "DETAILS" drawer on Product Deatil Page
        Then they see "DIMENSIONS" drawer on Product Deatil Page
        # Then they see "CARE" drawer on Product Deatil Page
        When they Click On Add to Cart on Product Detail Page
        Then Double Dare popup should appear on Product Detail Page
        When they click on Decline button on Double Dare popup
        Then they see the product detail page
        When they Click On Add to Cart on Product Detail Page
        Then Double Dare popup should appear on Product Detail Page
        And they click Accept terms button on Double Dare popup


