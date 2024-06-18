# @Regression
# Feature: Verify Multiple Product Detail Page
# TC_FT_026
# MPDP
# verifying MPDP page


# Background: Sets the customer's location for in stock ship and delivery availability
#     Given the customer is on the home page
#     And they have the "Naper191Location" location

Feature: MPDP Browse Product Test Cases
    @MPDP_crate @CBUS @CBCA @CB2US @CB2CA @BrowseProduct
    Scenario: Adding  MPDP non sor product to cart
        Given the Product Detail Page with "mpdpSKU" sku is retrieved
        When that a customer navigates to the family sku page
        Then they see the family product detail page
        Then they see line items
        Then Verify title for each line item
        Then Verify price change for each line item
        Then compare price and sku with PDP for line items
        When they Click On Add to Cart on Product Detail Page

    @MPDP_crate @CBUS @CBCA @CB2US @CB2CA @BrowseProduct
    Scenario: Adding  MPDP grouper product to cart
        Given the Product Detail Page with "mpdpGrouperSKU" sku is retrieved
        When that a customer navigates to the family sku page
        Then they see the family product detail page
        Then they see line items
        Then Verify title for each line item
        Then Verify price change for each line item
        Then Verify SOR updates for line items
        Then compare price and sku with PDP for line items
        When they Click On Add to Cart on Product Detail Page

    @MPDP_crate @CBUS @CBCA @CB2US @CB2CA @BrowseProduct
    Scenario: Adding  MPDP SuperSOR product to cart
        Given the Product Detail Page with "mpdpSuperSORSKU" sku is retrieved
        When that a customer navigates to the family sku page
        Then they see the family product detail page
        When they Click On Add to Cart on Product Detail Page

    @MPDP_crate @CBUS @CBCA @BrowseProduct
    Scenario: Adding  MPDP kids sor product to cart
        Given the Product Detail Page with "mpdpkidsSORSKU" sku is retrieved
        When that a customer navigates to the family sku page
        Then they see the family product detail page
        Then they see line items
        # Then Verify title for each line item
        # Then Verify price change for each line item
        Then Verify SOR updates for line items
        Then compare price and sku with PDP for line items
        When they Click On Add to Cart on Product Detail Page

    @MPDP_crate  @CBCA @CB2US @CB2CA @BrowseProduct
    Scenario: Adding  MPDP sor product to cart
        Given the Product Detail Page with "mpdpSORSKU" sku is retrieved
        When that a customer navigates to the family sku page
        Then they see the family product detail page
        Then they see line items
        Then Verify price change for each line item
        When they Click On Add to Cart on Product Detail Page
        Then Double Dare popup should appear on Product Detail Page
        And they click Accept terms button on Double Dare popup



