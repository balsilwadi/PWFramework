# @Regression
# Feature: Verify Product Detail Page - Vendor Drop Ship


#     Background: Sets the customer's location for in stock ship and delivery availability
#         Given the customer is on the home page
#         And they have the "Naper191Location" location

#     @Regression
#     Scenario Outline: PDP - Vendor Drop Ship - verify availability messaging
#         Given the customer goes to the product detail page "<url>"
#         Then they see the product detail page

# Verify Vendor Drop Ship availability messaging here

# @CrateUS @CrateCA @CB2US @CB2CA
# Examples:
#     | description                   | url                                     |
#     | Product Detail Vendor         | BrowseData.PdpDetail-Vendor-Ship.url.3  |
#     | Product Detail Grouper Vendor | BrowseData.PdpGrouper-Vendor-Ship.url.3 |

# @CrateUS @CrateCA
# Examples:
#     | description                        | url                                         |
#     | Product Detail Kids Vendor         | BrowseData.PPdpDetailKids-Vendor-Ship.url.3 |
#     | Product Detail Grouper Kids Vendor | BrowseData.PdpGrouperKids-Vendor-Ship.url.3 |

Feature: Browse Product Vendor PDP Tests

    @vendorpdp @BrowseProduct @CBUS @CB2US
    Scenario Outline: Adding vendorPDP to cart
        Given the Product Detail Page with "vendorpdpSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see logo on Product Detail Page
        Then they see vendor drop ship link on Product Detail Page
        Then they verify vendor drop ship link
        Then they Click On Add to Cart on Product Detail Page