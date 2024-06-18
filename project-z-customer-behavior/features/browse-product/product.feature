Feature: Browse Path Test Cases
        As a user
        I want to Search for Furniture SKU
        AddToCart from Product Page

    @PDP
    Scenario Outline: As a Guest user add Furniture Sku to cart
        Given the customer is on the home page
        Then Customer search for SKU "<sku>"
        Then Verify the loaded Product page for SKU "<sku>"
        Then Click On "Depth" Drawer
        Then Click On "Size" Drawer
        Then Click On "Fabric" Drawer
        Then Click on Get Free Swatch Button
        Then Click on ADD To CART button
        And Click on CHECKOUT NOW button
        Examples:
            | sku    |
            | 483522 |
