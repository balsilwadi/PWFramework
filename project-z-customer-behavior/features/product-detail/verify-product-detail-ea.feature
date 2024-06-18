# Feature: Verify Product Detail Page - Extended Assortment


#     Background: Sets the customer's location for in stock ship and delivery availability
#         Given the customer is on the home page
#         And they have the "Naper191Location" location

#     @Regression
#     Scenario Outline: PDP - Extended Assortment - verify availability messaging
#         Given the customer goes to the product detail page "<url>"
#         Then they see the product detail page

# Verify Extended Assortment availability messaging here

# @CrateUS @CrateCA @CB2US @CB2CA
# Examples:
#     | description               | url                                 |
#     | Product Detail EA         | BrowseData.PdpDetail-EA-Ship.url.3  |
#     | Product Detail Grouper EA | BrowseData.PdpGrouper-EA-Ship.url.3 |

# @CrateUS @CrateCA
# Examples:
#     | description            | url                                    |
#     | Product Detail Kids EA | BrowseData.PdpDetailKids-EA-Ship.url.3 |