# Feature: Find a Registry section Validation
#     As a Customer I should able to Search the Registries based on Name

#     @regression @smoke @giftregistry  @UI @findRegistry
#     Scenario:As a Customer I should able to Search the Registries based on Name


#         Given The customer is on "<testSite>" Home page
#         When Customer navigates to sign in page
#         Then Login page displayed with sign in form
#         And Signin form displayed with create account option
#         When Customer sign in with valid '<Email ID>' and 'Crate@321'
#         Then Account page should display with Hi message
#         When Customer navigates to the wedding Registry link from "header"
#         Then Customer verifies the Wedding Registry Page
#         When Customer  search a registry with "<First Name>" and "<LastName>"
#         Then Verifies the search results displayed for "<First Name>" and "<LastName>"
#         When Customer sort the results by sorting option
#         When Customer opens a registry with event type as "<Event type>" from search results
#         Then Customer Validates the Registry details page
#         When Customer sort the products by "Price"
#         And Customer Validates the product details
#         ##And Customer validates the product details popup
#         ##Then Customer verifies the store availability popup
#         ## And Customer verifies the Free shipping popup
#         When Customer update the quantity "<quantity>" of Registry product
#         And Customer add a product to the cart
#         Then Customer validate the add to cart confirmation popup


#         @CrateUS
#         Examples:
#             | First Name | LastName | Event type | quantity | testSite | Email ID         |
#             | Shibendu   | K        | Wedding    | 1        | crate_us  | GRAutomation001@crate.com |

#         @Cb2US
#         Examples:
#             | First Name | LastName | Event type | quantity | testSite | Email ID            |
#             | Shibendu   | K        | Birthday   | 1        | cb2_us    | GRAutomation001@cb2.com |