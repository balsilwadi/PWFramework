Feature: Grouper Browse Product Test Cases
    As a user
    I want to Search for Grouper SKU and validate grouper options
    and AddToCart from Product Page

    @Regression @BrowseProduct @Smoke @Grouper
    Scenario Outline: As a Customer Wants to verify Grouper Options
# Given The customer is on "<testSite>" Home page
# When Customer opens PDP page "<sku>"
# Then Verify the loaded Product page for SKU "<sku>"
# Then Customer Verify Groupers
# Then Customer Clicks on "<size>" Size
# Then Customer Clicks on "<color>" Color
# Then Customer Verify Drawers
# When Customer Click On Add to Cart Button

# Examples:
#     | testSite | sku | size | color |
#     | crate_us | 201593 | 10'x14' | Grey |
#     | crate_us | 222893 | King | Graphite |