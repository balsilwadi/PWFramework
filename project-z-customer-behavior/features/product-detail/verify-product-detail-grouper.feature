# @Regression
# Feature: Verify Product Detail Page - Grouper
# TC_FT_009
# Grouper
# Verifying Grouper Options on PDP


# Background: Sets the customer's location for in stock ship and delivery availability
#     Given the customer is on the home page
#     And they have the "Naper191Location" location


# @Regression @Browse @PDP
# Scenario Outline: Verify product detail page for grouper products - 1 image attribute group
#     Given the customer goes to the product detail page "<url>"
#     Then they see the product detail page

# Verify Grouper functionality here

# Add to Cart


# @Regression @Browse @PDP
# Scenario Outline: Verify product detail page for grouper products - 1 text attribute group
#     Given the customer goes to the product detail page "<url>"
#     Then they see the product detail page

# Verify Grouper functionality here

# Add to Cart
Feature: Grouper Browse Product Test Cases
    Background: Customer launches Home page
        Given the customer is on the home page

    @grouperpdp_crate @grouperpdp_cb2 @BrowseProduct
    Scenario: Adding 1 Grouper product to cart
        Given the Product Detail Page with "grouper1SKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they see groupers
        Then they Clicks on "<color>" Color
        When they Click On Add to Cart on Product Detail Page
        @CBUS @CBCA
        Examples:
            | color |
            | Black |
        @CB2US @CB2CA
        Examples:
            | color          |
            | BLACK EBONIZED |

    @grouperpdp_crate @BrowseProduct
    Scenario: Adding 2 Grouper product to cart
        Given the Product Detail Page with "grouper2SKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they see groupers
        Then they Clicks on "<quantity>" Size
        Then they Clicks on "<color>" Color
        When they Click On Add to Cart on Product Detail Page
        @CBUS @CBCA
        Examples:
            | quantity | color |
            | Set of 8 | Grey  |

    @grouperpdp_cb2 @BrowseProduct
    Scenario: Adding 2 Grouper product to cart
        Given the Product Detail Page with "grouper2SKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they see groupers
        Then they Clicks on "<size>" Size
        Then they Clicks on "<color>" Color
        When they Click On Add to Cart on Product Detail Page
        @CB2US @CB2CA
        Examples:
            | size | color       |
            | 12   | MATTE BLACK |


    @grouperpdp_crate @BrowseProduct
    Scenario: Adding 4 Grouper product to cart
        Given the Product Detail Page with "grouper4SKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        # Then they see logo on Product Detail Page
        Then they see groupers
        Then they Clicks on "<color>" Color
        Then they Clicks on "<size>" Size
        Then they Clicks on "<type>" Type
        Then they Clicks on "<qunatity>" Quantity

        @CBUS
        Examples:
            | size  | color | type          | qunatity |
            | Large | Black | With Dividers | Set of 3 |


    @grouperpdp_crate @BrowseProduct
    Scenario: Adding 3 Grouper product to cart
        Given the Product Detail Page with "grouper3SKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they see groupers
        Then they Clicks on "<color>" Color
        Then they Clicks on "<quantity>" Quantity
        Then they Clicks on "<type>" Type
        When they Click On Add to Cart on Product Detail Page

        @CBUS @CBCA
        Examples:
            | quantity | color | type              |
            | Set of 8 | Linen | Flat Dinner Plate |

    @grouperpdp_cb2 @BrowseProduct
    Scenario: Adding 3 Grouper product to cart
        Given the Product Detail Page with "grouper3SKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        # Then they see logo on Product Detail Page
        Then they see groupers
        Then they Clicks on "<color>" Color
        Then they Clicks on "<quantity>" Quantity
        Then they Clicks on "<quantity>" Type
        When they Click On Add to Cart on Product Detail Page

        @CB2US @CB2CA
        Examples:
            | color    | size   | quantity |
            | CHARCOAL | MEDIUM | SET OF 2 |

    @grouperpdp_crate @BrowseProduct
    Scenario: Adding kids Grouper product to cart
        Given the Product Detail Page with "kidsGrouperSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they see groupers
        Then they Clicks on "<color>" Color
        When they Click On Add to Cart on Product Detail Page

        @CBUS @CBCA
        Examples:
            | color |
            | Gold  |