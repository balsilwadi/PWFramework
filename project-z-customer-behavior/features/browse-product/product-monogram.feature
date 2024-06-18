# Feature: Browse Product Test Cases
#     As a user
#     I want to Search for Monogram SKU and do validations
#     @PDP @E2E @Monogram @CrateUS
#     Scenario: As a Guest user add Monogram Sku to cart
#         Given The customer is on "<testSite>" Home page
#         When Customer opens PDP page "<sku>"
#         Then Verify the loaded Product page for SKU "<sku>"
#         When Customer Click on Personalized
#         Then Customer Enters text
#         When Customer changes font style to "Cotford"
#         Then Customer clicks "Magenta" thread color
#         When Customer Click On Add to Cart Button
#         Then Double Dare popup should appear
#         # When Customer clicks Decline button
#         When Customer clicks Accept button on monogram pop up

#         Examples:
#             | testSite |  | sku    |
#             | crate_us |  | 308634 |


#     @PDP @E2E @Monogram @CrateUS
#     Scenario: As a Guest user add Boomer Sku to cart
#         Given The customer is on "<testSite>" Home page
#         When Customer opens PDP page "<sku>"
#         Then Verify the loaded Product page for SKU "<sku>"
#         When Customer Click on Personalized
#         Then Customer Enters text
#         When Customer changes font style to "CB Sans"
#         Then Customer clicks "Dijon" thread color
#         When Customer Click On Add to Cart Button
#         Then Double Dare popup should appear
#         When Customer clicks Accept button on monogram pop up
#         Examples:
#             | testSite |  | sku    |
#             | crate_us |  | 304993 |