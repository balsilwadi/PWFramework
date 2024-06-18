Feature: MTO Browse Product Test Cases
    As a user
    I want to Search for MTO Furniture SKU
    and AddToCart from Product Page

    @Regression @BrowseProduct @Smoke
    Scenario Outline: As Customer Want to verify MTO PDP page
        Given The customer is on "<testSite>" Home page
        When Customer opens PDP page "<sku>"
        Then Customer should see the product Detail page
        Given Customer is on MTO PDP
        When Customer click on MTO Add to Cart
        Then Double Dare popup should appear
        When Customer clicks Decline button
        When Customer clicks Accept button

        Examples:
            | testSite | sku    |
            | crate_us | 293150 |