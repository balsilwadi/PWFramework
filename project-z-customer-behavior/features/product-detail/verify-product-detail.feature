# @Regression
# Feature: Verify Product Detail Page
# TC_FT_037
# Carousels - verifying Add to cart

# Background: Sets the customer's location for in stock ship and delivery availability
#     Given the customer is on the home page
#     And they have the "Naper191Location" location


# @Regression @Browse @PDP
# Scenario Outline: Verify product detail page
#     Given the customer goes to the product detail page "<url>"
#     Then they see the product detail pages

# Verify PDP detail here

# When they see the add to cart container
# And they add to cart
# Then they see the add to cart confirmation modal

# When they select continue shopping
# Then the add to cart confirmation modal closes

# When they see the add to cart container
# And they set the quantity to "3"
# Then they see the quantity as "3"

# When they add to cart
# Then they see the add to cart confirmation modal with quantity "3"

# When they select checkout now
# Then they see their cart
# And they see their product

# When they empty their cart
# Then their cart is empty

# @CrateUS @CrateCA @CB2US @CB2CA
# Examples:
#     | description                   | url                                     |
#     | Product Detail Stock          | BrowseData.PdpDetail.url.3              |
#     | Product Detail Grouper Stock  | BrowseData.PdpGrouper.url.3             |
#     | Product Detail EA             | BrowseData.PdpDetail-EA-Ship.url.3      |
#     | Product Detail Grouper EA     | BrowseData.PdpGrouper-EA-Ship.url.3     |
#     | Product Detail Vendor         | BrowseData.PdpDetail-Vendor-Ship.url.3  |
#     | Product Detail Grouper Vendor | BrowseData.PdpGrouper-Vendor-Ship.url.3 |

# @CrateUS @CrateCA
# Examples:
#     | description                        | url                                         |
#     | Product Detail Kids Stock          | BrowseData.PdpDetailKids.url.3              |
#     | Product Detail Kids EA             | BrowseData.PdpDetailKids-EA-Ship.url.3      |
#     | Product Detail Kids Vendor         | BrowseData.PPdpDetailKids-Vendor-Ship.url.3 |
#     | Product Detail Grouper Kids Vendor | BrowseData.PdpGrouperKids-Vendor-Ship.url.3 |